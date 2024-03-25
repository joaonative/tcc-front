import { ReactNode } from "react";
import Button from "./Button";

interface Props {
  title: string;
  children: ReactNode;
  cancelMessage?: string;
  confirmMessage?: string;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const Modal = ({
  title,
  children,
  handleCancel,
  handleConfirm,
  cancelMessage,
  confirmMessage,
}: Props) => {
  return (
    <div className="scrollbar scrollbar-thumb-purple dark:scrollbar-thumb-green scrollbar-track-white dark:scrollbar-track-gray max-h-[600px] overflow-y-scroll fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 bg-lightGray dark:bg-dark rounded-2xl p-5 shadow-2xl backdrop:blur-3xl">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-prompt capitalize">{title}</h1>
        {children}
        <div className="flex items-center justify-end w-full gap-5">
          <Button variant="outline" onClick={handleCancel}>
            {cancelMessage}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {confirmMessage}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
