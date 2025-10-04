
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  Bell,
  ChevronRight,
  Droplets,
  Gauge,
  Lightbulb,
  PlugZap,
  Radiation,
  Settings,
  ShieldCheck,
  Siren,
  Thermometer,
  Users,
  Vibrate,
  Volume2,
  Wind,
  Wrench,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

const sectorData = {
  "command-center": {
    name: "Centro de Mando (A)",
    status: {
      label: "Nominal",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    activityLevel: 85,
    crewCondition: 92,
    energy: {
      consumption: 12.5,
      capacity: 15,
      internalSourcePct: 78,
      systemTemp: 45,
      thermalEfficiency: 99.1,
      alerts: [],
    },
    environment: {
      lighting: 450,
      emergencyLights: "OK",
      temperature: 21.5,
      airQuality: 99.8,
      co2: 410,
      noise: 40,
    },
    infrastructure: {
      integrity: 99.9,
      vibrations: "None",
      maintenance: [],
      lifeSupport: "Nominal",
    },
    events: [
      { id: 1, type: "info", text: "J. Rodriguez ingresó al sector.", time: "hace 2m" },
      { id: 2, type: "info", text: "Sistema de navegación activado.", time: "hace 5m" },
      { id: 3, type: "system", text: "Calibración de antena completada.", time: "hace 15m" },
    ],
    crew: {
      assigned: 5,
      status: "Activo",
      occupation: 100,
      comfort: 4.8,
    },
  },
  "science-lab": {
    name: "Laboratorio Científico (B)",
    status: {
      label: "En Revisión",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    activityLevel: 60,
    crewCondition: 88,
    energy: {
      consumption: 18.2,
      capacity: 20,
      internalSourcePct: 65,
      systemTemp: 52,
      thermalEfficiency: 98.5,
      alerts: ["Pico de consumo en espectrómetro"],
    },
    environment: {
      lighting: 600,
      emergencyLights: "OK",
      temperature: 20.1,
      airQuality: 99.5,
      co2: 450,
      noise: 55,
    },
    infrastructure: {
      integrity: 99.7,
      vibrations: "Low",
      maintenance: ["Calibrar sensor de gases #3"],
      lifeSupport: "Nominal",
    },
    events: [
        { id: 1, type: "warning", text: "Pico de consumo detectado en espectrómetro.", time: "hace 1m" },
        { id: 2, type: "info", text: "Análisis de muestra #A-34 iniciado.", time: "hace 8m" },
        { id: 3, type: "info", text: "Dr. Petrova ingresó al sector.", time: "hace 12m" },
    ],
    crew: {
      assigned: 4,
      status: "Activo",
      occupation: 75,
      comfort: 4.5,
    },
  },
}

type SectorId = keyof typeof sectorData

export function SectionalAnalysis() {
  const [selectedSector, setSelectedSector] = React.useState<SectorId>("command-center")
  const data = sectorData[selectedSector]

  const StatusIndicator = ({
    icon: Icon,
    label,
    value,
    unit,
    badgeText,
    badgeVariant = "secondary",
  }: {
    icon: React.ElementType
    label: string
    value: React.ReactNode
    unit?: string
    badgeText?: string
    badgeVariant?: React.ComponentProps<typeof Badge>["variant"]
  }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-muted rounded-md">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold">
            {value}
            {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
      </div>
      {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
    </div>
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6 bg-background text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            Análisis Sectorial
          </h2>
          <p className="text-muted-foreground">
            Estado de infraestructura y condiciones ambientales.
          </p>
        </div>
        <div className="w-full md:w-64">
           <Select value={selectedSector} onValueChange={(val) => setSelectedSector(val as SectorId)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Sector" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sectorData).map(([id, { name }]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* General Status Card */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Estado General: {data.name}</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${data.status.bgColor} ${data.status.color}`}>{data.status.label}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                 <StatusIndicator icon={Activity} label="Nivel de Actividad" value={data.activityLevel} unit="%" />
                 <StatusIndicator icon={Users} label="Condición del Personal" value={data.crewCondition} unit="%" badgeText="Promedio" />
                 <StatusIndicator icon={Users} label="Tripulación Asignada" value={data.crew.assigned} />
                 <StatusIndicator icon={Gauge} label="Nivel de Confort" value={data.crew.comfort} unit="/ 5" />
            </CardContent>
        </Card>
        
        {/* Events Card */}
        <Card className="lg:col-span-2 flex flex-col">
            <CardHeader>
                <CardTitle>Issues y Acontecimientos Recientes</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <ScrollArea className="h-48">
                    <div className="space-y-4 pr-4">
                    {data.events.map(event => (
                        <div key={event.id} className="flex items-start gap-3">
                            <div>
                                {event.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-400 mt-1" />}
                                {event.type === 'info' && <Bell className="h-4 w-4 text-blue-400 mt-1" />}
                                {event.type === 'system' && <Settings className="h-4 w-4 text-gray-400 mt-1" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm leading-tight">{event.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>

        {/* Energy & Systems Card */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><PlugZap className="h-5 w-5"/> Energía y Sistemas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <p className="text-muted-foreground">Consumo</p>
                        <p><span className="font-semibold">{data.energy.consumption}</span> / {data.energy.capacity} kW</p>
                    </div>
                    <Progress value={(data.energy.consumption / data.energy.capacity) * 100} />
                </div>
                <StatusIndicator icon={BatteryCharging} label="Fuentes Internas" value={`${data.energy.internalSourcePct}%`} />
                <StatusIndicator icon={Thermometer} label="Temp. Sistema Eléctrico" value={`${data.energy.systemTemp}°C`} />
                {data.energy.alerts.length > 0 && (
                    <div className="p-2 bg-destructive/20 rounded-md">
                        <p className="text-xs text-destructive flex items-center gap-2"><Siren className="h-4 w-4" /> {data.energy.alerts[0]}</p>
                    </div>
                )}
            </CardContent>
        </Card>
        
        {/* Lighting & Environment Card */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5"/> Iluminación y Ambiente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <StatusIndicator icon={Lightbulb} label="Iluminación Promedio" value={data.environment.lighting} unit="lux" />
                <StatusIndicator icon={Thermometer} label="Temperatura Ambiente" value={data.environment.temperature} unit="°C" />
                <StatusIndicator icon={Wind} label="Calidad del Aire (CO₂)" value={data.environment.co2} unit="ppm" />
                <StatusIndicator icon={Volume2} label="Ruido Ambiental" value={data.environment.noise} unit="dB" />
            </CardContent>
        </Card>
        
        {/* Infrastructure Card */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5"/> Infraestructura y Condiciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <StatusIndicator icon={ShieldCheck} label="Integridad Estructural" value={`${data.infrastructure.integrity}%`} />
                <StatusIndicator icon={Droplets} label="Soporte Vital (ECLSS)" badgeText={data.infrastructure.lifeSupport} badgeVariant={data.infrastructure.lifeSupport === 'Nominal' ? 'success' : 'destructive'} />
                <StatusIndicator icon={Vibrate} label="Vibraciones Anómalas" badgeText={data.infrastructure.vibrations} />
                <Card className="bg-muted/50">
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm">Mantenimiento Pendiente</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-sm">
                        {data.infrastructure.maintenance.length > 0 ? (
                             <p className="text-yellow-400">{data.infrastructure.maintenance[0]}</p>
                        ) : (
                            <p className="text-muted-foreground">No hay tareas pendientes.</p>
                        )}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

    