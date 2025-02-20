"use client";

import * as Toggle from "@radix-ui/react-toggle";
import * as Tooltip from "@radix-ui/react-tooltip";
import { GearIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const MODES = ["system", "light", "dark"] as const;

const DarkModeToggle = () => {
  const [mode, setMode] = useLocalStorage<(typeof MODES)[number]>("color-scheme", "system");
  const matches = useMediaQuery("(prefers-color-scheme: dark)");

  const toggle = useCallback(() => {
    setMode((prevMode) => {
      const prevIndex = MODES.findIndex((mode) => mode === prevMode);
      const nextIndex = prevIndex === MODES.length - 1 ? 0 : prevIndex + 1;
      const nextMode = MODES[nextIndex];

      return nextMode;
    });
  }, [setMode]);

  useEffect(() => {
    const colorScheme = mode === "system" ? (matches ? "dark" : "light") : mode;
    document.documentElement.dataset.colorScheme = colorScheme;
  }, [matches, mode]);

  const icons = {
    dark: <MoonIcon height="1rem" width="1rem" />,
    light: <SunIcon height="1rem" width="1rem" />,
    system: <GearIcon height="1rem" width="1rem" />,
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Toggle.Root
          className="
            duration-700
            ease-in-out
            focus:bg-night dark:focus:bg-day hover:bg-night dark:hover:bg-day
            p-2
            rounded-full
            text-night dark:text-day focus:text-day dark:focus:text-night hover:text-day dark:hover:text-night
            text-base
            transition-color
          "
          onClick={toggle}
        >
          {icons[mode]}
        </Toggle.Root>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-night dark:bg-day p-2 rounded text-day dark:text-night text-xs"
          sideOffset={5}
        >
          Toggle Color Scheme
          <Tooltip.Arrow className="fill-night dark:fill-day" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default DarkModeToggle;
