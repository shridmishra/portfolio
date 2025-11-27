"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, PreviewArea, ToggleButton } from "./_components";

export default function ComponentsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeComponent, setActiveComponent] = useState("border-frame");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar by default on mobile, open on desktop
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground/50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Floating Toggle Button - always visible, positioned at sidebar edge */}
      <ToggleButton
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Floating Sidebar */}
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <main className="min-h-screen">
        <PreviewArea activeComponent={activeComponent} sidebarOpen={sidebarOpen} />
      </main>
    </div>
  );
}
