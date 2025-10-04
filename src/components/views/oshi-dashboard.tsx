
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  oshiCrewData,
  CrewMemberOshi,
  OshiDimension,
} from "@/lib/oshi-data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, BrainCircuit, Calendar, MessageSquare, Puzzle, Search, SlidersHorizontal, SunMoon, TrendingUp, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

const dimensionDetails: Record<
  OshiDimension,
  { label: string; icon: React.ElementType; description: string }
> = {
  variety: {
    label: "Variety",
    icon: Puzzle,
    description: "Diversity of activities and tasks performed.",
  },
  balance: {
    label: "Balance",
    icon: SlidersHorizontal,
    description: "Equilibrium between active and passive tasks.",
  },
  circadian: {
    label: "Circadian",
    icon: SunMoon,
    description: "Alignment with the habitat's day/night cycle.",
  },
  sensory: {
    label: "Sensory Load",
    icon: Zap,
    description: "Time spent in environments with optimal sensory input.",
  },
  motivation: {
    label: "Motivation",
    icon: TrendingUp,
    description: "Self-reported drive and physiological indicators of engagement.",
  },
  social: {
    label: "Social",
    icon: MessageSquare,
    description: "Meaningful interaction with other crew members.",
  },
  meaningful: {
    label: "Meaningful",
    icon: BrainCircuit,
    description: "Time dedicated to personally fulfilling activities.",
  },
};

const getStatusClass = (status: "Optimal" | "Stable" | "Concern") => {
  switch (status) {
    case "Optimal":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Stable":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Concern":
      return "bg-red-500/20 text-red-400 border-red-500/30";
  }
};

export function OshiDashboard() {
  const [selectedCrewId, setSelectedCrewId] = React.useState<string>(
    oshiCrewData[0].id
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCrew = oshiCrewData.filter((crew) =>
    crew.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCrew = oshiCrewData.find((c) => c.id === selectedCrewId);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          OSHI Dashboard
        </h2>
        <p className="text-muted-foreground">
          Occupational Space Health Index for all crew members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Crew Roster</CardTitle>
            <CardDescription>
              Select a crew member to view their OSHI details.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-2 flex flex-col min-h-0">
             <div className="relative p-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crew..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-2 p-2">
                {filteredCrew.map((crew) => (
                  <div
                    key={crew.id}
                    className={cn(
                      "flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-colors",
                      selectedCrewId === crew.id
                        ? "bg-accent border-primary"
                        : "hover:bg-accent/50"
                    )}
                    onClick={() => setSelectedCrewId(crew.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={crew.avatar} alt={crew.name} />
                      <AvatarFallback>
                        {crew.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{crew.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {crew.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-xl font-bold">{crew.oshiScore}</p>
                      <span
                        className={cn(
                          "px-2 py-0.5 text-xs rounded-full font-medium",
                          getStatusClass(crew.status)
                        )}
                      >
                        {crew.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col">
          {selectedCrew ? (
            <>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedCrew.avatar}
                      alt={selectedCrew.name}
                    />
                    <AvatarFallback>
                      {selectedCrew.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">
                      {selectedCrew.name}
                    </CardTitle>
                    <CardDescription>{selectedCrew.role}</CardDescription>
                  </div>
                  <div
                    className={cn(
                      "ml-auto px-3 py-1 text-sm rounded-full font-semibold",
                      getStatusClass(selectedCrew.status)
                    )}
                  >
                    OSHI: {selectedCrew.oshiScore} ({selectedCrew.status})
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">OSHI Dimensions</h4>
                  {Object.keys(selectedCrew.dimensions).map((key) => {
                    const dimKey = key as OshiDimension;
                    const value = selectedCrew.dimensions[dimKey];
                    const details = dimensionDetails[dimKey];
                    return (
                      <div key={dimKey}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                             <details.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{details.label}</span>
                           </div>
                          <span className="text-sm font-bold">
                            {(value * 100).toFixed(0)}
                          </span>
                        </div>
                        <Progress value={value * 100} className="h-2" />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col min-h-0">
                    <div className="mb-4">
                        <h4 className="font-semibold text-lg mb-2">OSHI Trend (30d)</h4>
                        <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={selectedCrew.oshiHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))",
                                    }}
                                />
                                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex-1 min-h-0">
                        <h4 className="font-semibold text-lg mb-2">Recent Events & Alerts</h4>
                         <ScrollArea className="h-full pr-4">
                            <div className="space-y-3">
                            {selectedCrew.events.map(event => (
                                <div key={event.id} className="flex items-start gap-3 text-sm">
                                    {event.type === 'alert' && <AlertCircle className="h-4 w-4 text-red-400 mt-0.5" />}
                                    {event.type === 'suggestion' && <BrainCircuit className="h-4 w-4 text-blue-400 mt-0.5" />}
                                    {event.type === 'system' && <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />}
                                    {event.type === 'user' && <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />}
                                    <div>
                                        <p className="font-medium">{event.message}</p>
                                        <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-muted-foreground">
                Select a crew member to see their OSHI data.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
