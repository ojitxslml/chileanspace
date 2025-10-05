
'use server';

import { ai } from '@/ai/genkit';
import { WeatherResponseSchema, type WeatherDataPoint } from '@/ai/schemas/weather-schemas';


export async function getWeather(): Promise<WeatherDataPoint[]> {
    return getWeatherFlow();
}

const getWeatherFlow = ai.defineFlow(
  {
    name: 'getWeatherFlow',
    outputSchema: WeatherResponseSchema,
  },
  async () => {
    const user = process.env.METEOMATICS_USER || 'jerez_richard';
    const pass = process.env.METEOMATICS_PASS || 'E5X9Aq3bT19k5koSxePo';
    
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    const startDate = sevenDaysAgo.toISOString().split('.')[0] + "Z";
    const endDate = today.toISOString().split('.')[0] + "Z";

    const apiUrl = `https://api.meteomatics.com/${startDate}--${endDate}:PT1H/wind_speed_2m:ms,wind_speed_10m:ms,wind_speed_100m:ms/-63.3215,-58.9020/json`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${user}:${pass}`)
            }
        });

        if (!response.ok) {
            throw new Error(`Meteomatics API request failed with status ${response.status}`);
        }

        const data = await response.json();

        const transformedData: WeatherDataPoint[] = [];
        if (data && data.data && data.data[0].coordinates[0].dates) {
             const dates = data.data[0].coordinates[0].dates;
             const speed2m = data.data.find((p: any) => p.parameter === 'wind_speed_2m:ms').coordinates[0].dates;
             const speed10m = data.data.find((p: any) => p.parameter === 'wind_speed_10m:ms').coordinates[0].dates;
             const speed100m = data.data.find((p: any) => p.parameter === 'wind_speed_100m:ms').coordinates[0].dates;

             for (let i = 0; i < dates.length; i++) {
                 const date = new Date(dates[i].date);
                 transformedData.push({
                     hour: `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`,
                     speed2m: speed2m[i].value,
                     speed10m: speed10m[i].value,
                     speed100m: speed100m[i].value,
                 });
             }
        }
        return transformedData.filter((_, i) => i % 4 === 0);

    } catch (error) {
        console.error("Error fetching from Meteomatics API:", error);
        // Fallback to simulated data if API fails
        const simulatedData: WeatherDataPoint[] = Array.from({ length: 42 }, (_, i) => {
            const hour = (i * 4) % 24;
            const day = Math.floor(i/6) + 1;
            return {
                hour: `Day ${day} ${String(hour).padStart(2, '0')}:00`,
                speed2m: parseFloat((Math.random() * 10 + 5).toFixed(1)),
                speed10m: parseFloat((Math.random() * 15 + 8).toFixed(1)),
                speed100m: parseFloat((Math.random() * 25 + 15).toFixed(1)),
            };
        });
        return simulatedData;
    }
  }
);
