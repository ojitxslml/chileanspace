"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { Dashboard } from "@/components/views/dashboard";
import { HabitatExplorer } from "@/components/views/habitat-explorer";
import { InteriorDesigner } from "@/components/views/interior-designer";
import { SectionalAnalysis } from "@/components/views/sectional-analysis";
import { MaterialViewer } from "@/components/views/material-viewer";

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "explorer":
        return <HabitatExplorer />;
      case "designer":
        return <InteriorDesigner />;
      case "analysis":
        return <SectionalAnalysis />;
      case "materials":
        return <MaterialViewer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <MainNav activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <div className="flex h-screen flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-sm md:hidden">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold font-headline">CHILEANSPACE</h1>
          </header>
          <main className="flex-1 overflow-auto">{renderActiveView()}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
