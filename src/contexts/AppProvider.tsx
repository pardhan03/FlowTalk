import React, { createContext, useState } from "react";

import type { Channel, LocalMessage } from "stream-chat";

type AppContextType = {
  channel: Channel | null;
  setChannel: (channel: Channel | null) => void;
  thread: LocalMessage | null;
  setThread: (thread: LocalMessage | null) => void;
};

export const AppContext = createContext<AppContextType>({
  channel: null,
  setChannel: (channel) => { },
  thread: null,
  setThread: (thread) => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<LocalMessage | null>(null);

  const handleSetChannel = (newChannel: Channel | null) => {
    if (newChannel) {
      const originalMarkRead = newChannel.markRead;
      // Prevent multiple wraps of the same channel instance
      if (!(originalMarkRead as any).isWrapped) {
        const wrappedMarkRead = async function (this: any, options?: any) {
          try {
            return await originalMarkRead.apply(this, arguments as any);
          } catch (error) {
            if (options && options.thread_id) {
              console.log("Ignored markRead error for thread:", error);
              return null as any;
            }
            throw error;
          }
        };
        (wrappedMarkRead as any).isWrapped = true;
        newChannel.markRead = wrappedMarkRead;
      }
    }
    setChannel(newChannel);
  };

  return (
    <AppContext.Provider value={{ channel, setChannel: handleSetChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);