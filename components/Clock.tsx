"use client";

import { useEffect, useState, useTransition } from "react";
import ms from "ms";
import withClient from "./withClient";

// "the runtime's default locale is used when undefined"
// see, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
const LOCALES = undefined;
const REFRESH_RATE_OFFSET = ms("300");
const SECONDS_IN_MINUTE = 60;

const getNow = () => new Date();

const Clock = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const [now, setNow] = useState(getNow);

  useEffect(() => {
    const msToMinute = (SECONDS_IN_MINUTE - now.getSeconds()) * ms("1000") - REFRESH_RATE_OFFSET;
    const timeoutId = window.setTimeout(() => {
      startTransition(() => {
        setNow(getNow);
      });
    }, msToMinute);

    return () => clearTimeout(timeoutId);
  }, [now]);

  return (
    <time className="text-sm text-night dark:text-day" dateTime={now.toISOString()}>
      {now.toLocaleTimeString(LOCALES, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
        timeZoneName: "short",
      })}
    </time>
  );
};

export default withClient(Clock);
