"use client";

import { type FunctionComponent, useEffect, useState } from "react";

// see, https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content
const withClient = <TProps extends object>(Component: FunctionComponent<TProps>) => {
  const Wrapper = (props: TProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    if (isClient === false) {
      return null;
    }

    return <Component {...props} />;
  };

  Wrapper.displayName = `withClient(${Component.displayName || Component.name})`;

  return Wrapper;
};

export default withClient;
