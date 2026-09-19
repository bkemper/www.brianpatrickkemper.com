import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import NotFound from "../components/NotFound";
import OfflineOverlay from "../components/OfflineOverlay";
import { WindowContextProvider } from "../context/WindowContext";
import appCss from "../styles.css?url";

const canonicalOrigin = "https://www.brianpatrickkemper.com";
const siteTitle = "Brian Patrick Kemper";
const siteDescription =
  "I'm a Product Software Engineer building digital products that make work life easier by understanding your domain and leading teams to deliver a thoughtful user experience.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteTitle },
      { name: "description", content: siteDescription },
      { name: "keywords", content: "engineer, software" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${canonicalOrigin}/` },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: siteDescription },
      { property: "og:image", content: `${canonicalOrigin}/logo.png` },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: siteTitle },
      { name: "twitter:description", content: siteDescription },
      { name: "twitter:image", content: `${canonicalOrigin}/logo.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: `${canonicalOrigin}/` },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
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
      <body className="font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
