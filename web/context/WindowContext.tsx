"use client";

import { createContext, PropsWithChildren, RefObject, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

const defaultValue = {
  isWindowOnline: true,
  isWindowVisible: true,
};

export const WindowContext = createContext(defaultValue);

export const WindowContextProvider = ({ children }: PropsWithChildren) => {
  const documentRef = useRef<Document>(null);
  const [isWindowOnline, setIsWindowOnline] = useState(defaultValue.isWindowOnline);
  const [isWindowVisible, setIsWindowVisible] = useState(defaultValue.isWindowVisible);

  useEffect(() => {
    setIsWindowOnline(window.navigator.onLine);
    setIsWindowVisible(window.document.visibilityState === "visible");
  }, [setIsWindowOnline, setIsWindowVisible]);

  useEventListener("offline", () => {
    setIsWindowOnline(false);
  });

  useEventListener("online", () => {
    setIsWindowOnline(true);
  });

  useEventListener(
    "visibilitychange",
    (event) => {
      const document = event.target as Document;
      setIsWindowVisible(document.visibilityState === "visible");
    },
    documentRef as RefObject<Document>
  );

  return (
    <WindowContext.Provider
      value={{
        isWindowOnline,
        isWindowVisible,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
