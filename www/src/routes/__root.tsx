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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brian Patrick Kemper" },
      {
        name: "description",
        content: "A software engineer building products that help people.",
      },
      { name: "keywords", content: "engineer, software" },
      { name: "robots", content: "index, follow" },
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
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap",
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
      <body className="bg-field font-serif text-ink antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
