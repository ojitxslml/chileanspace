
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BatteryFull, BatteryCharging, Sun, Wind, Zap, Building } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const energyProductionChartData = [
  { month: "January", solar: 186, piezoelectric: 80 },
  { month: "February", solar: 305, piezoelectric: 200 },
  { month: "March", solar: 237, piezoelectric: 120 },
  { month: "April", solar: 73, piezoelectric: 190 },
  { month: "May", solar: 209, piezoelectric: 130 },
  { month: "June", solar: 214, piezoelectric: 140 },
];

const energyProductionChartConfig = {
  solar: { label: "Solar", color: "hsl(var(--chart-1))" },
  piezoelectric: { label: "Piezoelectric", color: "hsl(var(--chart-2))" },
};

const energyConsumptionChartData = [
  { name: "Command", consumption: 450 },
  { name: "Science", consumption: 780 },
  { name: "Residential", consumption: 600 },
  { name: "Greenhouse", consumption: 920 },
  { name: "ECLSS", consumption: 1100 },
  { name: "Storage", consumption: 150 },
];

const energyConsumptionChartConfig = {
    consumption: {
        label: "Consumption",
        color: "hsl(var(--chart-3))"
    }
}

export function EnergyGeneration() {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Energy Generation
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Output</CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Solar Array Status
            </CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimal</div>
            <p className="text-xs text-muted-foreground">Efficiency: 92%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Piezoelectric Status
            </CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Generating from dust storm
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Battery Storage</CardTitle>
            <BatteryFull className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Time to full: 3 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Energy Production (Last 6 Months)</CardTitle>
            <CardDescription>Solar vs. Piezoelectric Output</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={energyProductionChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart data={energyProductionChartData}>
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
                <Bar dataKey="solar" fill="var(--color-solar)" radius={4} />
                <Bar
                  dataKey="piezoelectric"
                  fill="var(--color-piezoelectric)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Consumption by Sector</CardTitle>
            <CardDescription>Current power draw per habitat sector.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer
              config={energyConsumptionChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                data={energyConsumptionChartData}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <XAxis type="number" dataKey="consumption" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="consumption" fill="var(--color-consumption)" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
