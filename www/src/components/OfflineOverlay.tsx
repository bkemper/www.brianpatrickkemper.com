import { WindowContext } from "../context/WindowContext";
import * as Dialog from "@radix-ui/react-dialog";
import { use } from "react";

const OfflineOverlay = () => {
  const { isWindowOnline } = use(WindowContext);

  return (
    <Dialog.Root open={isWindowOnline === false}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-[fadeIn_500ms_ease-in-out_1] backdrop-blur-[2px] bg-day/80 dark:bg-night/80 fixed inset-0" />
        <Dialog.Content className="animate-[fadeIn_1s_ease-in-out_1] fixed max-w-md p-6 text-ink dark:text-day top-0 left-0">
          <Dialog.Title className="mb-1 font-sign text-2xl">
            You&apos;re offline
          </Dialog.Title>
          <Dialog.Description className="text-sm text-mist">
            This page needs a connection for the live clock. Check your network,
            then come back — I&apos;ll still be here in Eastern time.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OfflineOverlay;
