import { Metadata } from "@grpc/grpc-js";

export class TchatService {
  metadata: Metadata;
  baseApiUrl = process.env.VITE_BACKEND_APIURL || '';

  constructor() {
    this.metadata = new Metadata();
    this.metadata.set('api-key', process.env.VITE_BACKEND_APIKEY || '');
  }

  async GetEventTchat({ userId, eventId }: { userId: string, eventId: string }) {
  }

  async SendMessage({ userId, eventId, message }: { userId: string, eventId: string, message: string }) {
  }
}