
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  SidebarProvider,
  SidebarInset,
  Sidebar,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { Dashboard } from "@/components/views/dashboard";
import { HabitatExplorer } from "@/components/views/habitat-explorer";
import { SectionalAnalysis } from "@/components/views/sectional-analysis";
import { MaterialViewer } from "@/components/views/material-viewer";
import { ProvisionsManagement } from "@/components/views/provisions-management";
import { CameraViewer } from "@/components/views/camera-viewer";
import { AppHeader } from "@/components/app-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, Globe } from "lucide-react";
import { OshiDashboard } from "@/components/views/oshi-dashboard";
import { EnergyGeneration } from "@/components/views/energy-generation";
import { useTranslation } from "@/lib/i18n/LanguageContext";


export default function HabitatContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") || "explorer";
  const [activeView, setActiveView] = useState(initialView);
  const { t, setLocale } = useTranslation();

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "oshi":
        return <OshiDashboard />;
      case "provisions":
        return <ProvisionsManagement />;
      case "energy":
        return <EnergyGeneration />;
      case "explorer":
        return <HabitatExplorer />;
      case "analysis":
        return <SectionalAnalysis />;
      case "materials":
        return <MaterialViewer />;
      case "cameras":
        return <CameraViewer />;
      default:
        return <HabitatExplorer />;
    }
  };

  return (
      <SidebarProvider>
        <Sidebar>
          <MainNav activeView={activeView} setActiveView={setActiveView} />
        </Sidebar>
        <SidebarInset>
          <div className="flex h-screen flex-col animate-fade-in">
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
                <DropdownMenuContent className="mb-2 w-64 p-4" side="top" align="end">
                  <DropdownMenuLabel>{t('common.language')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setLocale('en')}>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{t('common.english')}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setLocale('es')}>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{t('common.spanish')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
