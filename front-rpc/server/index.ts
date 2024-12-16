// server/index.ts
import { createRequestHandler } from "@react-router/express";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import { ServerBuild } from "react-router";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const MODE = process.env.NODE_ENV;
const BUILD_DIR = path.join(process.cwd(), "server/build");

const viteDevServer =
  MODE === "production"
    ? undefined
    : await import("vite").then((vite) =>
      vite.createServer({
        server: { middlewareMode: true },
      })
    );

const app = express();

// create an httpServer from the Express app
const httpServer = createServer(app);

// and create the socket.io server from the httpServer
const io = new Server(httpServer, {
  transports: ["websocket"], // only websocket transport
});

// then list to the connection event and get a socket object
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("message", "Welcome to the chat");

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  });
});

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable("x-powered-by");

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static("build/client", { maxAge: "1h" }));

app.use(morgan("tiny"));

async function getBuild() {
  try {
    const build = viteDevServer
      ? await viteDevServer.ssrLoadModule("virtual:react-router/server-build")
      : // @ts-expect-error - the file might not exist yet but it will
      // eslint-disable-next-line import/no-unresolved
      await import("../build/server/remix.js");

    return { build: build as unknown as ServerBuild, error: null };
  } catch (error) {
    // Catch error and return null to make express happy and avoid an unrecoverable crash
    console.error("Error creating build:", error);
    return { error: error, build: null as unknown as ServerBuild };
  }
}
// handle SSR requests
app.all(
  "*", await build()
);

const port = process.env.PORT || 5173;
httpServer.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`)
);

async function build() {
  const { error, build } = await getBuild();
  if (error) {
    throw error;
  }

  return createRequestHandler({
    build,
  });
}