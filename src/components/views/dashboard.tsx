
"use client"

import { useEffect, useState, useMemo } from "react"
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
import { Droplets, ShieldCheck, Users, Zap, HeartPulse, Wind, Thermometer, Building, Sunrise, Sunset, RadioTower, AlertTriangle, Sun } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getWeather, getTemperature, getRadiation } from "@/ai/flows/weather-flow"
import { Skeleton } from "@/components/ui/skeleton"
import { WeatherDataPoint, TemperatureDataPoint, RadiationDataPoint } from "@/ai/schemas/weather-schemas"
import { getSectorData, getCrewData } from "@/lib/sector-data";
import { useTranslation } from "@/lib/i18n/LanguageContext"


export function Dashboard() {
  const { t } = useTranslation();
  const sectorData = getSectorData(t);
  const crewData = getCrewData(t);

  const energyChartData = [
    { month: t('energy.month_jan'), solar: 186, piezoelectric: 80, nuclear: 350 },
    { month: t('energy.month_feb'), solar: 305, piezoelectric: 200, nuclear: 400 },
    { month: t('energy.month_mar'), solar: 237, piezoelectric: 120, nuclear: 370 },
    { month: t('energy.month_apr'), solar: 73, piezoelectric: 190, nuclear: 300 },
    { month: t('energy.month_may'), solar: 209, piezoelectric: 130, nuclear: 380 },
    { month: t('energy.month_jun'), solar: 214, piezoelectric: 140, nuclear: 390 },
  ];

  const energyChartConfig = {
    solar: {
      label: t('dashboard.chart_solar'),
      color: "hsl(var(--chart-1))",
    },
    piezoelectric: {
      label: t('dashboard.chart_piezoelectric'),
      color: "hsl(var(--chart-2))",
    },
    nuclear: {
      label: t('dashboard.chart_nuclear'),
      color: "hsl(var(--chart-4))",
    },
  };

  const [selectedSectorId, setSelectedSectorId] = useState("all");
  const [windData, setWindData] = useState<WeatherDataPoint[]>([]);
  const [loadingWindData, setLoadingWindData] = useState(true);
  const [temperatureData, setTemperatureData] = useState<TemperatureDataPoint[]>([]);
  const [loadingTemperatureData, setLoadingTemperatureData] = useState(true);
  const [radiationData, setRadiationData] = useState<RadiationDataPoint[]>([]);
  const [loadingRadiationData, setLoadingRadiationData] = useState(true);

  const filteredCrew = useMemo(() => {
    if (selectedSectorId === "all") return crewData;
    return crewData.filter(c => c.sector === selectedSectorId);
  }, [selectedSectorId, crewData]);

  const [selectedCrewMemberId, setSelectedCrewMemberId] = useState("");

  useEffect(() => {
    if (filteredCrew.length > 0 && !filteredCrew.find(c => c.id === selectedCrewMemberId)) {
      setSelectedCrewMemberId(filteredCrew[0].id);
    }
  }, [filteredCrew, selectedCrewMemberId]);

  const selectedCrewMember = useMemo(() => {
    return crewData.find(m => m.id === selectedCrewMemberId) || null;
  }, [selectedCrewMemberId, crewData]);
  
  const currentConditions = useMemo(() => {
    const latestTemp = temperatureData.length > 0 ? temperatureData[temperatureData.length - 1].temp2m : -63;
    const latestRadiation = radiationData.length > 0 ? radiationData[radiationData.length - 1].global : 0;
    const latestWind = windData.length > 0 ? windData[windData.length - 1].speed10m : 0;

    let radiationStatus: "High" | "Moderate" | "Low" = "Low";
    if (latestRadiation > 400) {
      radiationStatus = "High";
    } else if (latestRadiation > 150) {
      radiationStatus = "Moderate";
    }
    
    const windAlert = latestWind > 20 ? t('dashboard.wind_alert', { windSpeed: latestWind.toFixed(1) }) : null;

    return {
      temperature: latestTemp.toFixed(1),
      pressure: "0.6",
      radiation: radiationStatus,
      uvIndex: "Extreme", 
      windAlert: windAlert,
    };
  }, [temperatureData, radiationData, windData, t]);


  const handleSectorChange = (sectorId: string) => {
    setSelectedSectorId(sectorId);
  }

  useEffect(() => {
    async function fetchRadiation() {
      try {
        setLoadingRadiationData(true);
        const data = await getRadiation();
        setRadiationData(data);
      } catch (error) {
        console.error("Failed to fetch radiation data:", error);
      } finally {
        setLoadingRadiationData(false);
      }
    }
    
    async function fetchTemperature() {
      try {
        setLoadingTemperatureData(true);
        const data = await getTemperature();
        setTemperatureData(data);
      } catch (error) {
        console.error("Failed to fetch temperature data:", error);
      } finally {
        setLoadingTemperatureData(false);
      }
    }

    async function fetchWeather() {
      try {
        setLoadingWindData(true);
        const data = await getWeather();
        setWindData(data);
      } catch (error) {
        console.error("Error fetching from Meteomatics API:", error);
      } finally {
        setLoadingWindData(false);
      }
    }

    fetchWeather();
    fetchTemperature();
    fetchRadiation();
  }, []);

  const getRadiationStatusText = (status: "High" | "Moderate" | "Low") => {
    switch (status) {
      case 'High': return t('dashboard.radiation_high');
      case 'Moderate': return t('dashboard.radiation_moderate');
      case 'Low': return t('dashboard.radiation_low');
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          {t('dashboard.title')}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.total_energy_output')}
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 kWe</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.energy_stat')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.crew_members')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20/20</div>
            <p className="text-xs text-muted-foreground">{t('dashboard.crew_stat')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.water_reserves')}</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.recycling_rate')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.eclss_redundancy')}
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{t('dashboard.sector_active')}</div>
            <p className="text-xs text-muted-foreground">
              {t('dashboard.eclss_stat')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>{t('dashboard.sector_status_title')}</CardTitle>
                <CardDescription>{t('dashboard.sector_status_desc')}</CardDescription>
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
                        <span className="font-medium">{t('dashboard.all_sectors')}</span>
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
                        <Badge variant={sector.status === t('dashboard.sector_nominal') ? "default": "secondary"} className={
                            sector.status === t('dashboard.sector_nominal') ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30" : 
                            sector.status === t('dashboard.sector_active') ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30" : 
                            "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30"
                        }>{sector.status}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('dashboard.crew_title')}</CardTitle>
            <CardDescription>{t('dashboard.crew_desc', { sectorName: sectorData.find(s => s.id === selectedSectorId)?.name || t('dashboard.all_sectors_label') })}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
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
                    <CardDescription>{t('dashboard.vital_signs')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <HeartPulse className="h-8 w-8 text-red-500" />
                        <div>
                            <p className="text-sm text-muted-foreground">{t('dashboard.heart_rate')}</p>
                            <p className="text-2xl font-bold">{selectedCrewMember.vitals.hr} <span className="text-sm font-normal">BPM</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Wind className="h-8 w-8 text-blue-500" />
                        <div>
                            <p className="text-sm text-muted-foreground">{t('dashboard.spo2_saturation')}</p>
                            <p className="text-2xl font-bold">{selectedCrewMember.vitals.spo2}<span className="text-sm font-normal">%</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Thermometer className="h-8 w-8 text-orange-500" />
                        <div>
                            <p className="text-sm text-muted-foreground">{t('dashboard.body_temp')}</p>
                            <p className="text-2xl font-bold">{selectedCrewMember.vitals.temp}<span className="text-sm font-normal">°C</span></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>{t('dashboard.energy_prod_title')}</CardTitle>
            <CardDescription>{t('dashboard.energy_prod_desc')}</CardDescription>
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
                <Legend />
                <Bar
                  dataKey="solar"
                  fill="var(--color-solar)"
                  radius={4}
                  stackId="a"
                />
                 <Bar
                  dataKey="piezoelectric"
                  fill="var(--color-piezoelectric)"
                  radius={4}
                  stackId="a"
                />
                <Bar
                  dataKey="nuclear"
                  fill="var(--color-nuclear)"
                  radius={4}
                  stackId="a"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>{t('dashboard.external_situation_title')}</CardTitle>
            <CardDescription>{t('dashboard.external_situation_desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <h4 className="text-sm font-medium mb-2">{t('dashboard.current_conditions')}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <span>{t('dashboard.temp')}: <span className="font-semibold">{currentConditions.temperature}°C</span></span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Wind className="h-4 w-4 text-muted-foreground" />
                          <span>{t('dashboard.pressure')}: <span className="font-semibold">{currentConditions.pressure} kPa</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-muted-foreground" />
                          <span>{t('dashboard.radiation')}: <Badge variant="outline" className={cn(
                            currentConditions.radiation === "High" && "text-yellow-500 border-yellow-500/50",
                            currentConditions.radiation === "Moderate" && "text-orange-500 border-orange-500/50",
                          )}>{getRadiationStatusText(currentConditions.radiation)}</Badge></span>
                      </div>
                       <div className="flex items-center gap-2">
                          <Sunrise className="h-4 w-4 text-muted-foreground" />
                          <span>{t('dashboard.uv_index')}: <Badge variant="outline" className="text-red-500 border-red-500/50">{t('dashboard.uv_extreme')}</Badge></span>
                      </div>
                  </div>
              </div>
              <Separator />
              <div>
                  <h4 className="text-sm font-medium mb-2">{t('dashboard.upcoming_events')}</h4>
                  <ul className="space-y-1 text-sm list-disc pl-4 text-muted-foreground">
                      <li><span className="font-semibold text-foreground">Sol 345:</span> {t('dashboard.supply_ship_event')}</li>
                      <li><span className="font-semibold text-foreground">Sol 350:</span> {t('dashboard.solar_flare_event')}</li>
                  </ul>
              </div>
              <Separator />
               <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    {t('dashboard.active_alerts')}
                  </h4>
                  <ul className="space-y-1 text-sm list-disc pl-4 text-muted-foreground">
                       {currentConditions.windAlert ? (
                         <li><span className="font-semibold text-destructive">{currentConditions.windAlert}</span></li>
                       ) : (
                         <li><span className="font-semibold text-foreground">{t('dashboard.no_critical_alerts')}</span></li>
                       )}
                  </ul>
              </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.wind_speed_title')}</CardTitle>
          <CardDescription>{t('dashboard.wind_speed_desc')}</CardDescription>
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
              <Line type="monotone" dataKey="speed2m" name={t('dashboard.altitude_2m')} stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="speed10m" name={t('dashboard.altitude_10m')} stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="speed100m" name={t('dashboard.altitude_100m')} stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.temperature_title')}</CardTitle>
          <CardDescription>{t('dashboard.temperature_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
           {loadingTemperatureData ? (
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
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp2m" name={t('dashboard.altitude_2m')} stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="temp20m" name={t('dashboard.altitude_20m')} stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="temp100m" name={t('dashboard.altitude_100m')} stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.radiation_title')}</CardTitle>
          <CardDescription>{t('dashboard.radiation_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
           {loadingRadiationData ? (
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
            <LineChart data={radiationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis label={{ value: 'J/m²', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }}/>
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="direct" name={t('dashboard.direct')} stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="diffuse" name={t('dashboard.diffuse')} stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="global" name={t('dashboard.global')} stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="clearSky" name={t('dashboard.clear_sky')} stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

    