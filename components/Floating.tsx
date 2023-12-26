import {
  Placement,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useState } from "react";

import useOnClickOutside from "../hooks/useOnClickOutside";

type FloatingComponentProps = {
  children: React.ReactNode;
  wrappedComponent: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  placement?: Placement;
  strategy?: "fixed" | "absolute";
  floatingOffset?: number;
};

const FloatingComponent: React.FC<FloatingComponentProps> = ({
  children,
  wrappedComponent,
  isOpen,
  onClose,
  placement = "bottom",
  strategy = "absolute",
  floatingOffset = 8,
}) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const { refs, floatingStyles } = useFloating({
    elements: {
      reference: referenceElement,
    },
    placement,
    strategy,
    middleware: [
      offset(floatingOffset),
      flip({ padding: 4 }),
      shift({ padding: 4 }),
    ],
  });

  useOnClickOutside(refs.floating, onClose);

  return (
    <>
      <div ref={setReferenceElement}>{wrappedComponent}</div>
      {isOpen && (
        <div ref={refs.setFloating} style={floatingStyles} onClick={onClose}>
          {children}
        </div>
      )}
    </>
  );
};

export default FloatingComponent;
