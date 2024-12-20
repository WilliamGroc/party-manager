import { Server as HttpServer } from "http";
import { AddMessageRequest } from "proto/tchat/AddMessageRequest";
import { DefaultEventsMap, Server, Socket } from "socket.io";
import { TchatService } from "~/services/tchat/index.server";

export class SocketServer {
  io: Server;
  tchatService: TchatService;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      transports: ["websocket"], // only websocket transport
    });

    this.io.on("connection", this.handleWsRequest.bind(this));
    console.log('init chat service')
    this.tchatService = new TchatService();
  }

  handleWsRequest(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    socket.on('join', (roomId: string) => {
      socket.join(roomId);
    });

    socket.on('leave', (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on('sendMessage', async (message, roomId) => {
      try {
        const payload = JSON.parse(message) as AddMessageRequest;
        const response = await this.tchatService.AddMessage(payload);
        this.io.to(roomId).emit('eventMessage', response.message);
      } catch (e) {
        console.error(e);
      }
    });
  }

  close() {
    this.io.close();
  }
}