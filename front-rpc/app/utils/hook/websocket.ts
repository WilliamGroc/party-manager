import { useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io";
import io, { Socket } from "socket.io-client";

export function useWebSocket({
  url,
  roomPrefix,
  roomId
}: {
  url: string,
  roomPrefix: string,
  roomId: string
}) {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ["websocket"],
    });

    socketIo.on("connect", () => {
      setIsConnected(true);
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  useEffect(() => {
    if (socket) {
      socket.emit("join", `${roomPrefix}:${roomId}`);
    }

    return () => {
      if (socket) {
        socket.emit("leave", `${roomPrefix}:${roomId}`);
      }
    }
  }, [socket, roomId]);

  const listen = (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  }

  return { socket, isConnected, listen };
}