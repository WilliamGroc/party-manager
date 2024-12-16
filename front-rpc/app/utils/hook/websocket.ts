import { useEffect, useState } from "react";
import { DefaultEventsMap } from "socket.io";
import io, { Socket } from "socket.io-client";

export function useWebSocket(url: string) {
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

  return { socket, isConnected };
}