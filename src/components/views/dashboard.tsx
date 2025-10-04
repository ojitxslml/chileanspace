
"use client"

import { useEffect, useState } from "react"
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
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { Droplets, ShieldCheck, Users, Zap, HeartPulse, Wind, Thermometer, Building, Sunrise, Sunset, RadioTower, AlertTriangle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { crewData, sectorData } from "@/lib/sector-data"
import { getWeather } from "@/ai/flows/weather-flow"
import { Skeleton } from "@/components/ui/skeleton"
import { WeatherDataPoint } from "@/ai/schemas/weather-schemas"

const energyChartData = [
  { month: "January", solar: 186, piezoelectric: 80 },
  { month: "February", solar: 305, piezoelectric: 200 },
  { month: "March", solar: 237, piezoelectric: 120 },
  { month: "April", solar: 73, piezoelectric: 190 },
  { month: "May", solar: 209, piezoelectric: 130 },
  { month: "June", solar: 214, piezoelectric: 140 },
];

const energyChartConfig = {
  solar: {
    label: "Solar",
    color: "hsl(var(--chart-1))",
  },
  piezoelectric: {
    label: "Piezoelectric",
    color: "hsl(var(--chart-2))",
  },
};

export function Dashboard() {
  const [selectedSectorId, setSelectedSectorId] = useState("all");
  const filteredCrew = selectedSectorId === "all" ? crewData : crewData.filter(c => c.sector === selectedSectorId);
  const [selectedCrewMemberId, setSelectedCrewMemberId] = useState(filteredCrew.length > 0 ? filteredCrew[0].id : "");
  const [windData, setWindData] = useState<WeatherDataPoint[]>([]);
  const [loadingWindData, setLoadingWindData] = useState(true);


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

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoadingWindData(true);
        const data = await getWeather();
        setWindData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoadingWindData(false);
      }
    }
    fetchWeather();
  }, []);
  
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
            <div className="text-2xl font-bold">20/20</div>
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tripulación</CardTitle>
            <CardDescription>Monitoreo de signos vitales de la tripulación en {sectorData.find(s => s.id === selectedSectorId)?.name || 'Todos los Sectores'}.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {filteredCrew.length > 0 ? (
                <>
                    <ScrollArea className="h-72">
                      <RadioGroup value={selectedCrewMemberId} className="grid gap-4 pr-4" onValueChange={setSelectedCrewMemberId}>
                      {filteredCrew.map((member) => (
                          <div key={member.id}>
                          <RadioGroupItem value={member.id} id={member.id} className="peer sr-only" />
                          <Label
                              htmlFor={member.id}
                              className="flex flex-col items-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                              <span className="text-lg font-semibold">{member.name}</span>
                              <span className="text-sm text-muted-foreground">{member.role}</span>
                          </Label>
                          </div>
                      ))}
                      </RadioGroup>
                    </ScrollArea>
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
            <CardTitle>Energy Production (Last 6 Months)</CardTitle>
            <CardDescription>Solar vs. Piezoelectric Output</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={energyChartConfig} className="h-[300px] w-full">
              <BarChart
                accessibilityLayer
                data={energyChartData}
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
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar
                  dataKey="solar"
                  fill="var(--color-solar)"
                  radius={4}
                />
                 <Bar
                  dataKey="piezoelectric"
                  fill="var(--color-piezoelectric)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>External Situation & Alerts</CardTitle>
            <CardDescription>Live data from outside the habitat.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <h4 className="text-sm font-medium mb-2">Current Conditions</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <span>Temp: <span className="font-semibold">-63°C</span></span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Wind className="h-4 w-4 text-muted-foreground" />
                          <span>Pressure: <span className="font-semibold">0.6 kPa</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Sunrise className="h-4 w-4 text-muted-foreground" />
                          <span>Radiation: <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">High</Badge></span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Sunset className="h-4 w-4 text-muted-foreground" />
                          <span>Storms: <Badge variant="outline">Clear</Badge></span>
                      </div>
                  </div>
              </div>
              <Separator />
              <div>
                  <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
                  <ul className="space-y-1 text-sm list-disc pl-4 text-muted-foreground">
                      <li><span className="font-semibold text-foreground">Sol 345:</span> Supply Ship Arrival (ESA)</li>
                      <li><span className="font-semibold text-foreground">Sol 350:</span> Solar Flare Peak Predicted</li>
                  </ul>
              </div>
              <Separator />
               <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    Active Alerts
                  </h4>
                  <ul className="space-y-1 text-sm list-disc pl-4 text-muted-foreground">
                       <li><span className="font-semibold text-destructive">High radiation levels detected near Sector Gamma-7. EVA missions suspended.</span></li>
                  </ul>
              </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Wind Speed (Last 24h)</CardTitle>
          <CardDescription>Wind speed at different altitudes from the surface.</CardDescription>
        </CardHeader>
        <CardContent>
           {loadingWindData ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="space-y-4 w-full p-4">
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-48 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/6" />
                  <Skeleton className="h-6 w-1/6" />
                  <Skeleton className="h-6 w-1/6" />
                </div>
              </div>
            </div>
          ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={windData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis label={{ value: 'm/s', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="speed2m" name="2m Altitude" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="speed10m" name="10m Altitude" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="speed100m" name="100m Altitude" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
