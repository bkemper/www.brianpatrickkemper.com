import { RefObject, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
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
  const [, startTransition] = useTransition();

  const minutesOffset = useMemo(() => {
    const myOffset = getTimeZoneOffset(MY_TIME_ZONE);
    const theirOffset = getTimeZoneOffset();

    if (myOffset === undefined || theirOffset === undefined) {
      return;
    }

    return theirOffset - myOffset;
  }, []);

  const refreshTime = useCallback(() => {
    startTransition(() => {
      setIsAnimated(true);
      setNow(getNow);
    });
  }, [startTransition, setIsAnimated, setNow]);

  useEffect(() => {
    const msToMinute = (SECONDS_IN_MINUTE - now.getSeconds()) * 1000;

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
    timeRef as RefObject<HTMLTimeElement>,
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
    return <div className="flex flex-col items-end gap-1">{time}</div>;
  }

  const absOffset = Math.abs(minutesOffset);
  const hoursOffset = Math.floor(absOffset / 60);
  const remainderMinutes = absOffset % 60;

  const note =
    minutesOffset === 0
      ? "Nice! I work in the same time zone as you."
      : `I'm ${hoursOffset} hours ${
          remainderMinutes !== 0 ? `and ${remainderMinutes} minutes` : ""
        } ${minutesOffset > 0 ? "behind" : "ahead"} you.`;

  return (
    <div className="flex flex-col items-end gap-1 max-w-[14rem] text-right">
      {time}
      <p className="text-xs text-gray leading-snug">{note}</p>
    </div>
  );
};

export default withClient(Clock);
