"use client";

import * as Popover from "@radix-ui/react-popover";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import ms from "ms";
import withClient from "./withClient";
import classNames from "classnames";
import { useEventListener } from "usehooks-ts";

// "the runtime's default locale is used when undefined"
// see, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#locales
const LOCALES = undefined;
const MY_TIME_ZONE = "America/New_York";
const SECONDS_IN_MINUTE = 60;

const getNow = () => new Date();

const getTimeZoneOffset = (timeZone?: string) => {
  const timeZoneName = Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
    .formatToParts()
    .find((part) => part.type === "timeZoneName")?.value;

  if (timeZoneName === undefined) {
    return;
  }

  const [match, offset, hours, minutes] = /GMT([+-])(\d\d):(\d\d)/.exec(timeZoneName) ?? [];

  if (!match) {
    return 0;
  }

  return (offset === "-" ? -1 : 1) * (parseInt(hours) * 60 + parseInt(minutes));
};

const Clock = () => {
  const timeRef = useRef<HTMLTimeElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [now, setNow] = useState(getNow);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const minutesOffset = useMemo(() => {
    const myOffset = getTimeZoneOffset(MY_TIME_ZONE);
    const theirOffset = getTimeZoneOffset();

    if (myOffset === undefined || theirOffset === undefined) {
      return;
    }

    return theirOffset - myOffset;
  }, []);

  const refreshTime = useCallback(() => {
    // run in background for performance
    startTransition(() => {
      setIsAnimated(true);
      setNow(getNow);
    });
  }, [startTransition, setIsAnimated, setNow]);

  useEffect(() => {
    // calculate the difference for precision
    const msToMinute = (SECONDS_IN_MINUTE - now.getSeconds()) * ms("1000");

    // @todo, this keeps running when tab is not active
    const timeoutId = window.setTimeout(refreshTime, msToMinute);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [now, refreshTime]);

  useEventListener(
    "animationend",
    () => {
      setIsAnimated(false);
    },
    // @todo, remove type assertion, see https://github.com/juliencrn/usehooks-ts/pull/675
    timeRef as RefObject<HTMLTimeElement>
  );

  const time = (
    <time
      className={classNames("text-sm", "text-night", "dark:text-day", {
        "animate-[puff_1s_ease-in-out_1] inline-block": isAnimated,
      })}
      dateTime={now.toISOString()}
      ref={timeRef}
    >
      {now.toLocaleTimeString(LOCALES, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: MY_TIME_ZONE,
        timeZoneName: "short",
      })}
    </time>
  );

  if (minutesOffset === undefined) {
    return time;
  }

  return (
    <Popover.Root defaultOpen open modal={false}>
      <Popover.Trigger asChild>{time}</Popover.Trigger>
      <Popover.Content
        align="center"
        alignOffset={0}
        arrowPadding={0}
        avoidCollisions
        collisionPadding={0}
        side="bottom"
        sideOffset={0}
        sticky="always"
      >
        <p className="max-w-40 p-1 text-center text-xs text-gray">
          {minutesOffset === 0
            ? "Nice! I work in the same time zone as you."
            : `I'm ${Math.abs(Math.floor(minutesOffset / 60))} hours ${
                minutesOffset % 60 !== 0 ? `and ${minutesOffset % 60} minutes` : ""
              } ${minutesOffset > 0 ? "behind" : "ahead"} you.`}
        </p>
      </Popover.Content>
    </Popover.Root>
  );
};

export default withClient(Clock);
