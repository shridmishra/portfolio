"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, PreviewArea, ToggleButton } from "./_components";

export default function ComponentsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeComponent, setActiveComponent] = useState("magnetic-button");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground/50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Floating Toggle Button */}
      <ToggleButton
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Sidebar */}
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        isOpen={sidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <PreviewArea activeComponent={activeComponent} />
      </main>
    </div>
  );
}
