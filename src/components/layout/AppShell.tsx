"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-stone-100 font-sans text-stone-900 relative">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:block w-64 flex-shrink-0 sticky top-0 h-screen z-20">
        <Sidebar />
      </aside>

      {/* Mobile Drawer (overlay sidebar) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
            onClick={closeSidebar}
          ></div>
          {/* Menu Drawer */}
          <div className="absolute top-0 bottom-0 left-0 w-64 shadow-xl z-40 transform transition-transform duration-300">
            <Sidebar onClose={closeSidebar} />
          </div>
        </div>
      )}

      {/* Main Window */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        <Header onMenuClick={toggleSidebar} />
        
        {/* Children content area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
