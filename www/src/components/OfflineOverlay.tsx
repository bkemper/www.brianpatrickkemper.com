import { WindowContext } from "../context/WindowContext";
import * as Dialog from "@radix-ui/react-dialog";
import { use } from "react";

const OfflineOverlay = () => {
  const { isWindowOnline } = use(WindowContext);

  return (
    <Dialog.Root open={isWindowOnline === false}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-field/80 backdrop-blur-[2px] animate-[fadeIn_500ms_ease-in-out_1]" />
        <Dialog.Content className="fixed top-0 max-w-md p-6 text-ink animate-[fadeIn_1s_ease-in-out_1]">
          <Dialog.Title className="mb-1 font-serif text-2xl">Lost Connection</Dialog.Title>
          <Dialog.Description className="text-sm leading-relaxed">
            Check your network connection, then reload this page.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OfflineOverlay;
