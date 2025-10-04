
"use client"

import { Bell, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

const notifications = [
    {
        title: "High Radiation Alert",
        description: "High radiation levels detected near Sector Gamma-7. EVA missions suspended.",
        type: "alert" as const,
        time: "2m ago"
    },
    {
        title: "Supply Ship Arrival",
        description: "ESA supply ship is scheduled to arrive at Sol 345.",
        type: "info" as const,
        time: "1h ago"
    },
    {
        title: "Solar Flare Prediction",
        description: "Peak solar flare activity predicted for Sol 350. All external systems should be monitored.",
        type: "warning" as const,
        time: "3h ago"
    },
    {
        title: "System Maintenance",
        description: "ECLSS maintenance scheduled for tomorrow at 08:00 habitat time.",
        type: "info" as const,
        time: "1d ago"
    }
]

export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
         <div className="md:hidden flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold font-headline">CHILEANSPACE</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0">{notifications.filter(n => n.type === 'alert').length}</Badge>
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <Card className="border-none shadow-none">
              <CardHeader className="p-2 pt-0">
                <CardTitle className="text-base">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-0">
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div>
                        {notification.type === 'alert' && <AlertTriangle className="h-4 w-4 text-destructive mt-1" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
