"use client";

import { WindowContext } from "@/context/WindowContext";
import * as Dialog from "@radix-ui/react-dialog";
import { use } from "react";

const OfflineOverlay = () => {
  const { isWindowOnline } = use(WindowContext);

  return (
    <Dialog.Root open={isWindowOnline === false}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-[fadeIn_500ms_ease-in-out_1] backdrop-blur-[2px] bg-opacity-75 bg-day dark:bg-opacity-75 dark:bg-night fixed inset-0" />
        <Dialog.Content className="animate-[fadeIn_1s_ease-in-out_1] fixed max-w-md p-6 text-night dark:text-day top-0">
          <Dialog.Title className="text-lg">Lost Connection</Dialog.Title>
          <Dialog.Description className="text-sm">
            It is a bummer that you lost your internet connection. Try shaking your mouse, yelling
            at your internet service provider, or restart your computer 3 times.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OfflineOverlay;
