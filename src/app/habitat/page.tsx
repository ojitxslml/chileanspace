"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { Dashboard } from "@/components/views/dashboard";
import { HabitatExplorer } from "@/components/views/habitat-explorer";
import { InteriorDesigner } from "@/components/views/interior-designer";
import { SectionalAnalysis } from "@/components/views/sectional-analysis";
import { MaterialViewer } from "@/components/views/material-viewer";
import { AppHeader } from "@/components/app-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, Globe } from "lucide-react";


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
          <AppHeader />
          <main className="flex-1 overflow-auto">{renderActiveView()}</main>
        </div>
        <div className="fixed bottom-4 right-4 z-50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shadow-lg">
                  <Settings className="h-6 w-6" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-2 w-48" side="top" align="end">
                <DropdownMenuItem>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>English</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Español</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
