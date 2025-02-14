import "./globals.css";
import type { Metadata } from "next";
import { Caveat, Lato } from "next/font/google";
import * as Tooltip from "@radix-ui/react-tooltip";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={fontClassName} lang="en">
      <body>
        <Tooltip.Provider delayDuration={100}>{children}</Tooltip.Provider>
      </body>
    </html>
  );
}
