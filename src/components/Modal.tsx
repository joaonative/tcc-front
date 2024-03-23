import { ReactNode } from "react";
import Button from "./Button";

interface Props {
  title: string;
  children: ReactNode;
  cancelMessage?: "cancelar" | string;
  confirmMessage?: "confirmar" | string;
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
    <div className="absolute top-72 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 bg-lightGray dark:bg-dark rounded-2xl p-5">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-prompt capitalize">{title}</h1>
        {children}
        <div className="flex items-center justify-center gap-8">
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
