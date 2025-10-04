
"use client";

import { useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { Dashboard } from "@/components/views/dashboard";
import { HabitatExplorer } from "@/components/views/habitat-explorer";
import { SectionalAnalysis } from "@/components/views/sectional-analysis";
import { MaterialViewer } from "@/components/views/material-viewer";
import { ProvisionsManagement } from "@/components/views/provisions-management";
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
import { Settings, Globe, Save } from "lucide-react";
import { OshiDashboard } from "@/components/views/oshi-dashboard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FirebaseClientProvider } from "@/firebase/client-provider";


export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "oshi":
        return <OshiDashboard />;
      case "provisions":
        return <ProvisionsManagement />;
      case "explorer":
        return <HabitatExplorer />;
      case "analysis":
        return <SectionalAnalysis />;
      case "materials":
        return <MaterialViewer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FirebaseClientProvider>
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
                <DropdownMenuContent className="mb-2 w-64 p-4" side="top" align="end">
                  <DropdownMenuLabel>Language</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>English</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>Español</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Meteomatics API</DropdownMenuLabel>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="meteo-user" className="text-xs">Username</Label>
                      <Input id="meteo-user" placeholder="Your username" />
                    </div>
                     <div>
                      <Label htmlFor="meteo-pass" className="text-xs">Password</Label>
                      <Input id="meteo-pass" type="password" placeholder="Your password" />
                    </div>
                    <Button variant="secondary" size="sm" className="w-full">
                      <Save className="mr-2 h-4 w-4"/>
                      Save Credentials
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
