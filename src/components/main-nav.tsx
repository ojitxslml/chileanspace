
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
  HeartPulse,
  Zap,
  Camera,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
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
import { useTranslation } from "@/lib/i18n/LanguageContext";

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
  const { t } = useTranslation();
  
  const menuItems = [
    { id: "explorer", label: t('common.explorer_3d'), icon: Box },
    { id: "dashboard", label: t('common.dashboard'), icon: Home },
    { id: "oshi", label: t('common.oshi_dashboard'), icon: HeartPulse },
    { id: "provisions", label: t('common.provisions'), icon: Package },
    { id: "energy", label: t('common.energy_generation'), icon: Zap },
    { id: "analysis", label: t('common.sectional_analysis'), icon: SquareGanttChart },
    { id: "materials", label: t('common.material_viewer'), icon: Layers },
    { id: "cameras", label: t('common.camera_viewer'), icon: Camera },
  ];

  return (
    <div
      className={cn(
        "group hidden h-screen flex-col border-r bg-background text-foreground md:flex",
        className
      )}
    >
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
                    <span className="truncate text-sm font-medium">{t('main_nav.user_name')}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <SidebarMenuButton variant="ghost" size="icon" className="h-8 w-8" tooltip={{children: t('common.logout')}}>
                      <LogOut className="h-4 w-4" />
                    </SidebarMenuButton>
                 </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </div>
  );
}
