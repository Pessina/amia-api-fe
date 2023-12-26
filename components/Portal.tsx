import { ReactNode, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

type PortalProps = {
  children: ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ children }) => {
  const container = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};
