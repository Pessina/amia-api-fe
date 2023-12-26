import { ReactNode } from "react";

import { Portal } from "./Portal";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className="bg-black60 fixed z-40 flex items-center justify-center top-0 left-0 w-full h-full">
        <div
          className={`${className} shadow-lg rounded-3xl relative z-50 bg-white opacity-100 overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
