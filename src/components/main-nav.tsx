"use client";

import {
  Home,
  Cube,
  LayoutGrid,
  SquareGantt,
  Layers,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

interface MainNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  className?: string;
}

export function MainNav({
  activeView,
  setActiveView,
  className,
}: MainNavProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "explorer", label: "3D Explorer", icon: Cube },
    { id: "designer", label: "Interior Designer", icon: LayoutGrid },
    { id: "analysis", label: "Sectional Analysis", icon: SquareGantt },
    { id: "materials", label: "Material Viewer", icon: Layers },
  ];

  return (
    <div className={cn("group peer hidden text-sidebar-foreground md:block border-r", className)} data-state="expanded">
      <div className="flex h-full min-h-screen flex-col">
        <SidebarHeader>
          <div className="flex h-14 items-center gap-2 border-b p-2 px-4">
            <Icons.logo className="h-8 w-8 text-primary" />
            <div className="overflow-hidden">
              <h1 className="truncate text-lg font-semibold font-headline">
                CHILEANSPACE
              </h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveView(item.id)}
                  isActive={activeView === item.id}
                  tooltip={{ children: item.label }}
                  className="justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="truncate">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: "Settings" }} className="justify-start">
                <Settings className="h-5 w-5" />
                <span className="truncate">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </div>
  );
}
