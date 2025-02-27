import "./globals.css";
import { Caveat, Lato } from "next/font/google";
import * as Tooltip from "@radix-ui/react-tooltip";
import { WindowContextProvider } from "@/context/WindowContext";
import OfflineOverlay from "@/components/OfflineOverlay";
import type { Metadata } from "next";

const caveat = Caveat({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-caveat",
});

const lato = Lato({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
});

const fontClassName = [caveat.variable, lato.variable].join(" ");

export const metadata: Metadata = {
  description: "A software engineer building products that help people.",
  keywords: ["engineer", "software"],
  robots: {
    index: true,
    follow: true,
  },
  title: {
    default: "Brian Patrick Kemper",
    template: "%s | Brian Patrick Kemper",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={fontClassName} lang="en">
      <body>
        <Tooltip.Provider delayDuration={100}>
          <WindowContextProvider>
            {children}
            <OfflineOverlay />
          </WindowContextProvider>
        </Tooltip.Provider>
      </body>
    </html>
  );
}
