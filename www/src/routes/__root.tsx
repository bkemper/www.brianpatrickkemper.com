import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import OfflineOverlay from "../components/OfflineOverlay";
import { WindowContextProvider } from "../context/WindowContext";
import appCss from "../styles.css?url";

const canonicalOrigin = "https://www.brianpatrickkemper.com";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: "Brian Patrick Kemper" },
      {
        name: "description",
        content: "A software engineer building products that help people.",
      },
      { name: "keywords", content: "engineer, software" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "hsl(220 100% 98%)" },
      {
        name: "theme-color",
        content: "hsl(220 46% 16%)",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${canonicalOrigin}/` },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Caveat&family=Lato:wght@100;300;400;700;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat&family=Lato:wght@100;300;400;700;900&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Tooltip.Provider delayDuration={100}>
        <WindowContextProvider>
          <Outlet />
          <OfflineOverlay />
        </WindowContextProvider>
      </Tooltip.Provider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
