import * as Toggle from "@radix-ui/react-toggle";
import * as Tooltip from "@radix-ui/react-tooltip";
import { GearIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MODES = ["system", "light", "dark"] as const;

const DarkModeToggle = () => {
  const [mode, setMode] = useLocalStorage<(typeof MODES)[number]>(
    "color-scheme",
    "system",
  );
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
    const colorScheme =
      mode === "system" ? (matches ? "dark" : "light") : mode;
    document.documentElement.dataset.colorScheme = colorScheme;
  }, [matches, mode]);

  const icons = {
    dark: <MoonIcon height="1rem" width="1rem" />,
    light: <SunIcon height="1rem" width="1rem" />,
    system: <GearIcon height="1rem" width="1rem" />,
  };

  const labels = {
    dark: "Using dark appearance. Click for system.",
    light: "Using light appearance. Click for dark.",
    system: "Matching your system. Click for light.",
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Toggle.Root
          aria-label="Change appearance"
          className="
            duration-300
            ease-in-out
            p-2
            rounded-sm
            text-mist
            hover:text-ink
            dark:hover:text-day
            text-base
            transition-colors
            focus-visible:bg-ink/5
            dark:focus-visible:bg-day/10
          "
          onClick={toggle}
        >
          {icons[mode]}
        </Toggle.Root>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="bg-ink dark:bg-day p-2 rounded-sm text-day dark:text-ink text-xs"
          sideOffset={5}
        >
          {labels[mode]}
          <Tooltip.Arrow className="fill-ink dark:fill-day" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

export default DarkModeToggle;
