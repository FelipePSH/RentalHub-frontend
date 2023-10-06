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
      <div className="max-h-[calc(100vh-30px)] overflow-y-auto">
        <div className="py-12 px-20 bg-white rounded-lg shadow-xl p-4 hover:shadow-lg border-1 ml-12 mr-12 sm:ml-12 sm:mr-12">
         {children}
      </div>
      </div>
      </div>
    </div>
  );
}

export default Layout;