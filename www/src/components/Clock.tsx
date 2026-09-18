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

  let note: string | null = null;
  if (minutesOffset !== undefined) {
    if (minutesOffset === 0) {
      note = "Nice! I work in the same time zone as you.";
    } else {
      const absOffset = Math.abs(minutesOffset);
      const hoursOffset = Math.floor(absOffset / 60);
      const remainderMinutes = absOffset % 60;
      note = `I'm ${hoursOffset} hours ${
        remainderMinutes !== 0 ? `and ${remainderMinutes} minutes` : ""
      } ${minutesOffset > 0 ? "behind" : "ahead"} you.`;
    }
  }

  return (
    <div className="max-w-56 text-right">
      <time
        className={classNames("text-sm text-ink", {
          "inline-block animate-[puff_1s_ease-in-out_1]": isAnimated,
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
      {note ? <p className="mt-1 text-xs leading-snug text-muted-ink">{note}</p> : null}
    </div>
  );
};

export default withClient(Clock);
