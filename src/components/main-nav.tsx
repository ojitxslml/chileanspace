
"use client";

import {
  Home,
  Box,
  LayoutGrid,
  SquareGanttChart,
  Layers,
  Settings,
  User,
  LogOut,
  Globe,
  Package,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    { id: "provisions", label: "Provisions", icon: Package },
    { id: "explorer", label: "3D Explorer", icon: Box },
    { id: "designer", label: "Interior Designer", icon: LayoutGrid },
    { id: "analysis", label: "Sectional Analysis", icon: SquareGanttChart },
    { id: "materials", label: "Material Viewer", icon: Layers },
  ];

  return (
    <div
      className={cn(
        "group peer hidden text-sidebar-foreground md:block border-r",
        className
      )}
      data-state="expanded"
    >
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
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                   <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/cmdr-alex/40/40" alt="Cmdr. Alex Reyes" />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                    <span className="truncate text-sm font-medium">Cmdr. Alex Reyes</span>
                </div>
                 <div className="flex items-center gap-1">
                    <SidebarMenuButton variant="ghost" size="icon" className="h-8 w-8" tooltip={{children: "Log Out"}}>
                      <LogOut className="h-4 w-4" />
                    </SidebarMenuButton>
                 </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </div>
  );
}
