import { useState, useEffect, useRef } from "react";
import {
  PresenceData,
  LanyardWebSocketMessage,
  LanyardHelloData,
} from "../types/lanyard";

const LANYARD_API_URL = "wss://api.lanyard.rest/socket";
const OP = { EVENT: 0, HELLO: 1, INITIALIZE: 2, HEARTBEAT: 3 };

export function useLanyard(discordId: string) {
  const [presenceData, setPresenceData] = useState<PresenceData | null>(null);
  const socket = useRef<WebSocket | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!discordId) return;

    const cleanup = () => {
      if (socket.current) {
        //socket.current.close();
        socket.current = null;
      }
      if (heartbeatInterval.current) {
        clearInterval(heartbeatInterval.current);
      }
    };

    socket.current = new WebSocket(LANYARD_API_URL);

    socket.current.onmessage = (event) => {
      const data: LanyardWebSocketMessage = JSON.parse(event.data);

      switch (data.op) {
        case OP.HELLO: {
          const helloData = data.d as LanyardHelloData;
          heartbeatInterval.current = setInterval(() => {
            socket.current?.send(JSON.stringify({ op: OP.HEARTBEAT }));
          }, helloData.heartbeat_interval);

          socket.current?.send(
            JSON.stringify({
              op: OP.INITIALIZE,
              d: { subscribe_to_id: discordId },
            }),
          );
          break;
        }
        case OP.EVENT:
          setPresenceData(data.d as PresenceData);
          break;
      }
    };

    socket.current.onclose = cleanup;
    socket.current.onerror = cleanup;

    return cleanup;
  }, [discordId]);

  return presenceData;
}
