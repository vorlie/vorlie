import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  LanyardHelloData,
  LanyardWebSocketMessage,
  PresenceData,
} from "../types/lanyard";

const LANYARD_API_URL = "wss://api.lanyard.rest/socket";

const OP = {
  EVENT: 0,
  HELLO: 1,
  INITIALIZE: 2,
  HEARTBEAT: 3,
} as const;

const DISCORD_ID = "614807913302851594";

interface LanyardContextValue {
  presence: PresenceData | null;
  connected: boolean;
}

const LanyardContext = createContext<LanyardContextValue | null>(null);

interface LanyardProviderProps {
  children: ReactNode;
}

export function LanyardProvider({ children }: LanyardProviderProps) {
  const [presence, setPresence] = useState<PresenceData | null>(null);
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const socket = new WebSocket(LANYARD_API_URL);

    socketRef.current = socket;

    const cleanup = () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(
        event.data,
      ) as LanyardWebSocketMessage;

      switch (message.op) {
        case OP.HELLO: {
          const hello = message.d as LanyardHelloData;

          socket.send(
            JSON.stringify({
              op: OP.INITIALIZE,
              d: {
                subscribe_to_id: DISCORD_ID,
              },
            }),
          );

          heartbeatRef.current = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(
                JSON.stringify({
                  op: OP.HEARTBEAT,
                }),
              );
            }
          }, hello.heartbeat_interval);

          break;
        }

        case OP.EVENT: {
          if (message.d) {
            setPresence(message.d as PresenceData);
          }

          break;
        }
      }
    };

    socket.onerror = () => {
      setConnected(false);
    };

    socket.onclose = () => {
      cleanup();
      setConnected(false);
    };

    return () => {
      cleanup();

      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  }, []);

  return (
    <LanyardContext.Provider value={{ presence, connected }}>
      {children}
    </LanyardContext.Provider>
  );
}

export function useLanyard() {
  const context = useContext(LanyardContext);

  if (!context) {
    throw new Error(
      "useLanyard must be used inside a LanyardProvider",
    );
  }

  return context;
}