import { WindowContext } from "../context/WindowContext";
import * as Dialog from "@radix-ui/react-dialog";
import { use } from "react";

const OfflineOverlay = () => {
  const { isWindowOnline } = use(WindowContext);

  return (
    <Dialog.Root open={isWindowOnline === false}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-[fadeIn_500ms_ease-in-out_1] fixed inset-0 bg-day/80 backdrop-blur-[2px] dark:bg-night/80" />
        <Dialog.Content className="animate-[fadeIn_1s_ease-in-out_1] fixed top-0 max-w-md border border-night/20 bg-day p-6 text-night dark:border-day/20 dark:bg-night dark:text-day">
          <Dialog.Title className="mb-1 text-2xl font-semibold">Lost Connection</Dialog.Title>
          <Dialog.Description className="text-sm leading-relaxed">
            Your connection dropped. Check the network, then refresh when you are back online.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OfflineOverlay;
