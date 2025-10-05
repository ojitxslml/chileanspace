
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
import { getSectorAnalysisData } from "@/lib/sector-data"
import { useTranslation } from "@/lib/i18n/LanguageContext";

type SectorId = keyof ReturnType<typeof getSectorAnalysisData>

export function SectionalAnalysis() {
  const { t } = useTranslation();
  const sectorAnalysisData = getSectorAnalysisData(t);

  const [selectedSector, setSelectedSector] = React.useState<SectorId>("command-center")
  const data = sectorAnalysisData[selectedSector]

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

  const getBadgeVariant = (label: string) => {
    if (label === t('analysis.status_nominal')) return 'success';
    if (label === t('analysis.ls_alert')) return 'destructive';
    return 'outline';
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6 bg-background text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">
            {t('analysis.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('analysis.subtitle')}
          </p>
        </div>
        <div className="w-full md:w-64">
           <Select value={selectedSector} onValueChange={(val) => setSelectedSector(val as SectorId)}>
              <SelectTrigger>
                <SelectValue placeholder={t('analysis.select_sector')} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sectorAnalysisData).map(([id, { name }]) => (
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
                    <span>{t('analysis.general_status_title', { sectorName: data.name })}</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${data.status.bgColor} ${data.status.color}`}>{data.status.label}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                 <StatusIndicator icon={Activity} label={t('analysis.activity_level')} value={data.activityLevel} unit="%" />
                 <StatusIndicator icon={Users} label={t('analysis.crew_condition')} value={data.crewCondition} unit="%" badgeText={t('analysis.average')} />
                 <StatusIndicator icon={Users} label={t('analysis.assigned_crew')} value={data.crew.assigned} />
                 <StatusIndicator icon={Gauge} label={t('analysis.comfort_level')} value={data.crew.comfort} unit="/ 5" />
            </CardContent>
        </Card>
        
        {/* Events Card */}
        <Card className="lg:col-span-2 flex flex-col">
            <CardHeader>
                <CardTitle>{t('analysis.recent_events_title')}</CardTitle>
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
                <CardTitle className="flex items-center gap-2"><PlugZap className="h-5 w-5"/> {t('analysis.energy_systems_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <p className="text-muted-foreground">{t('analysis.consumption')}</p>
                        <p><span className="font-semibold">{data.energy.consumption}</span> / {data.energy.capacity} kW</p>
                    </div>
                    <Progress value={(data.energy.consumption / data.energy.capacity) * 100} />
                </div>
                <StatusIndicator icon={BatteryCharging} label={t('analysis.internal_sources')} value={`${data.energy.internalSourcePct}%`} />
                <StatusIndicator icon={Thermometer} label={t('analysis.electrical_system_temp')} value={`${data.energy.systemTemp}°C`} />
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
                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-5 w-5"/> {t('analysis.lighting_env_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <StatusIndicator icon={Lightbulb} label={t('analysis.avg_lighting')} value={data.environment.lighting} unit="lux" />
                <StatusIndicator icon={Thermometer} label={t('analysis.ambient_temp')} value={data.environment.temperature} unit="°C" />
                <StatusIndicator icon={Wind} label={t('analysis.air_quality')} value={data.environment.co2} unit="ppm" />
                <StatusIndicator icon={Volume2} label={t('analysis.ambient_noise')} value={data.environment.noise} unit="dB" />
            </CardContent>
        </Card>
        
        {/* Infrastructure Card */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5"/> {t('analysis.infra_conditions_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <StatusIndicator icon={ShieldCheck} label={t('analysis.structural_integrity')} value={`${data.infrastructure.integrity}%`} />
                <StatusIndicator icon={Droplets} label={t('analysis.life_support')} badgeText={data.infrastructure.lifeSupport} badgeVariant={getBadgeVariant(data.infrastructure.lifeSupport)} />
                <StatusIndicator icon={Vibrate} label={t('analysis.anomalous_vibrations')} badgeText={data.infrastructure.vibrations} />
                <Card className="bg-muted/50">
                    <CardHeader className="p-3">
                        <CardTitle className="text-sm">{t('analysis.pending_maintenance')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-sm">
                        {data.infrastructure.maintenance.length > 0 ? (
                             <p className="text-yellow-400">{data.infrastructure.maintenance[0]}</p>
                        ) : (
                            <p className="text-muted-foreground">{t('analysis.no_pending_tasks')}</p>
                        )}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

    