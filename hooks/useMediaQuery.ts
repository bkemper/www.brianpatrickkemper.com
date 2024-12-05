import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [mediaQuery, setMediaQuery] = useState<MediaQueryList | null>(null);

  useEffect(() => {
    const initialMediaQuery = window.matchMedia(query);
    const listener = (nextMediaQuery: MediaQueryListEvent) => {
      setMediaQuery(nextMediaQuery.currentTarget as MediaQueryList);
    };

    // hydrate
    setMediaQuery(initialMediaQuery);

    // listen for changes
    initialMediaQuery.addEventListener("change", listener);

    return () => {
      initialMediaQuery.removeEventListener("change", listener);
    };
  }, [query, setMediaQuery]);

  return mediaQuery;
};
