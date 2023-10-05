"use client";
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-row justify-start"> 
      <Sidebar />
      <div className="bg-pampas-50 flex-1 p-4 dark:text-text-lighter">
         {children}
      </div>
    </div>
  );
}

export default Layout;