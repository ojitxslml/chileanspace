"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Droplets, ShieldCheck, Users, Zap, HeartPulse, Wind, Thermometer, Building } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Solar",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Piezoelectric",
    color: "hsl(var(--chart-2))",
  },
}

const crewData = [
    {
      id: "cmdr-alex",
      name: "Cmdr. Alex Reyes",
      role: "Comandante de Misión",
      vitals: { hr: 68, spo2: 99, temp: 36.8 },
      sector: "command-center",
    },
    {
      id: "dr-lena",
      name: "Dra. Lena Petrova",
      role: "Oficial Científico",
      vitals: { hr: 72, spo2: 98, temp: 37.0 },
      sector: "science-lab",
    },
    {
      id: "ken-sato",
      name: "Ken Sato",
      role: "Ingeniero de Sistemas",
      vitals: { hr: 75, spo2: 99, temp: 36.9 },
      sector: "eclss",
    },
    {
      id: "maya-singh",
      name: "Maya Singh",
      role: "Especialista de Hábitat",
      vitals: { hr: 65, spo2: 100, temp: 36.7 },
      sector: "greenhouses",
    },
]

const sectorData = [
    { id: "command-center", name: "Centro de Mando", status: "Nominal", color: "bg-green-500" },
    { id: "residential", name: "Módulos Residenciales", status: "Nominal", color: "bg-green-500" },
    { id: "science-lab", name: "Laboratorio Científico", status: "Activo", color: "bg-blue-500" },
    { id: "greenhouses", name: "Invernaderos", status: "Nominal", color: "bg-green-500" },
    { id: "eclss", name: "Soporte Vital (ECLSS)", status: "Nominal", color: "bg-green-500" },
    { id: "storage", name: "Almacenamiento", status: "En Espera", color: "bg-yellow-500" },
]


export function Dashboard() {
  const [selectedSectorId, setSelectedSectorId] = useState("all");
  const filteredCrew = selectedSectorId === "all" ? crewData : crewData.filter(c => c.sector === selectedSectorId);
  const [selectedCrewMemberId, setSelectedCrewMemberId] = useState(filteredCrew.length > 0 ? filteredCrew[0].id : "");

  const selectedCrewMember = crewData.find(m => m.id === selectedCrewMemberId) || (filteredCrew.length > 0 ? filteredCrew[0] : null);

  const handleSectorChange = (sectorId: string) => {
    setSelectedSectorId(sectorId);
    const newFilteredCrew = sectorId === "all" ? crewData : crewData.filter(c => c.sector === sectorId);
    if (newFilteredCrew.length > 0) {
      setSelectedCrewMemberId(newFilteredCrew[0].id);
    } else {
      setSelectedCrewMemberId("");
    }
  }
  
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Habitability Dashboard
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Energy Output
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 kWe</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crew Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/4</div>
            <p className="text-xs text-muted-foreground">All systems nominal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Reserves</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">
              Recycling rate: 98%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ECLSS Redundancy
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              No critical faults detected
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Estado de Sectores</CardTitle>
                <CardDescription>Estado operativo de las áreas de la colonia.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div
                    onClick={() => handleSectorChange("all")}
                    className={cn(
                        "flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer",
                        selectedSectorId === "all" && "bg-muted"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Todos los Sectores</span>
                    </div>
                </div>
                {sectorData.map(sector => (
                    <div 
                        key={sector.id}
                        onClick={() => handleSectorChange(sector.id)}
                        className={cn(
                            "flex justify-between items-center p-2 rounded-md hover:bg-muted/50 cursor-pointer",
                             selectedSectorId === sector.id && "bg-muted"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{sector.name}</span>
                        </div>
                        <Badge variant={sector.status === "Nominal" ? "default": "secondary"} className={
                            sector.status === "Nominal" ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30" : 
                            sector.status === "Activo" ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30" : 
                            "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30"
                        }>{sector.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Tripulación</CardTitle>
            <CardDescription>Monitoreo de signos vitales de la tripulación en {sectorData.find(s => s.id === selectedSectorId)?.name || 'Todos los Sectores'}.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {filteredCrew.length > 0 ? (
                <>
                    <RadioGroup value={selectedCrewMemberId} className="grid gap-4" onValueChange={setSelectedCrewMemberId}>
                    {filteredCrew.map((member) => (
                        <div key={member.id}>
                        <RadioGroupItem value={member.id} id={member.id} className="peer sr-only" />
                        <Label
                            htmlFor={member.id}
                            className="flex flex-col items-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            <span className="text-lg font-semibold">{member.name}</span>
                            <span className="text-sm text-muted-foreground">{member.role}</span>
                        </Label>
                        </div>
                    ))}
                    </RadioGroup>
                    {selectedCrewMember && (
                    <Card className="border-dashed">
                        <CardHeader>
                            <CardTitle>{selectedCrewMember.name}</CardTitle>
                            <CardDescription>Signos Vitales</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <HeartPulse className="h-8 w-8 text-red-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Ritmo Cardíaco</p>
                                    <p className="text-2xl font-bold">{selectedCrewMember.vitals.hr} <span className="text-sm font-normal">BPM</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Wind className="h-8 w-8 text-blue-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Saturación de O₂</p>
                                    <p className="text-2xl font-bold">{selectedCrewMember.vitals.spo2}<span className="text-sm font-normal">%</span></p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Thermometer className="h-8 w-8 text-orange-500" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Temperatura Corporal</p>
                                    <p className="text-2xl font-bold">{selectedCrewMember.vitals.temp}<span className="text-sm font-normal">°C</span></p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    )}
                </>
            ) : (
                <div className="sm:col-span-2 flex items-center justify-center h-full text-muted-foreground">
                    No hay tripulantes en este sector.
                </div>
            )}
            
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Energy Production (Last 24h)</CardTitle>
            <CardDescription>Solar vs. Piezoelectric Output</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value} kWe`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="desktop"
                  type="monotone"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={false}
                />
                 <Line
                  dataKey="mobile"
                  type="monotone"
                  stroke="var(--color-mobile)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Atmosphere Composition</CardTitle>
            <CardDescription>Key life support metrics.</CardDescription>
          </CardHeader>
          <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="desktop"
                  fill="var(--color-desktop)"
                  radius={4}
                />
                <Bar
                  dataKey="mobile"
                  fill="var(--color-mobile)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
