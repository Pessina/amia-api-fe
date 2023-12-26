import React, { ReactNode } from "react";

import Header from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header className="shrink-0" />
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
