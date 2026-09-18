import { WindowContext } from "../context/WindowContext";
import * as Dialog from "@radix-ui/react-dialog";
import { use } from "react";

const OfflineOverlay = () => {
  const { isWindowOnline } = use(WindowContext);

  return (
    <Dialog.Root open={isWindowOnline === false}>
      <Dialog.Portal>
        <Dialog.Overlay className="animate-[fadeIn_500ms_ease-in-out_1] backdrop-blur-[2px] bg-day/75 dark:bg-night/75 fixed inset-0" />
        <Dialog.Content className="animate-[fadeIn_1s_ease-in-out_1] fixed max-w-md overscroll-contain p-6 text-night dark:text-day top-0">
          <Dialog.Title className="mb-1 text-2xl">Lost Connection</Dialog.Title>
          <Dialog.Description className="text-sm">
            Your internet connection dropped. Check your network, then refresh the page when you are
            back online.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OfflineOverlay;
