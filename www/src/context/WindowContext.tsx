import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

const defaultValue = {
  isWindowOnline: true,
};

export const WindowContext = createContext(defaultValue);

export const WindowContextProvider = ({ children }: PropsWithChildren) => {
  const [isWindowOnline, setIsWindowOnline] = useState(defaultValue.isWindowOnline);

  useEffect(() => {
    setIsWindowOnline(window.navigator.onLine);
  }, [setIsWindowOnline]);

  useEventListener("offline", () => {
    setIsWindowOnline(false);
  });

  useEventListener("online", () => {
    setIsWindowOnline(true);
  });

  return (
    <WindowContext.Provider
      value={{
        isWindowOnline,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
