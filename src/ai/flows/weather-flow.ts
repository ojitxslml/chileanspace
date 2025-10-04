
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
    const apiUrl = `https://api.meteomatics.com/2023-01-01T00:00:00Z--2023-12-30T00:00:00Z:PT20M/wind_speed_2m:ms,wind_speed_10m:ms,wind_speed_100m:ms/-63.3215,-58.9020/json`;

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
                     hour: `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`,
                     speed2m: speed2m[i].value,
                     speed10m: speed10m[i].value,
                     speed100m: speed100m[i].value,
                 });
             }
        }
        return transformedData.filter((_, i) => i % 3 === 0).slice(0, 24);

    } catch (error) {
        console.error("Error fetching from Meteomatics API:", error);
    }
    

    const simulatedData: WeatherDataPoint[] = Array.from({ length: 24 * 3 }, (_, i) => {
        const hour = Math.floor(i / 3);
        const minute = (i % 3) * 20;
        return {
            hour: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            speed2m: parseFloat((Math.random() * 10 + 5).toFixed(1)),
            speed10m: parseFloat((Math.random() * 15 + 8).toFixed(1)),
            speed100m: parseFloat((Math.random() * 25 + 15).toFixed(1)),
        };
    }).filter((_, i) => i % 3 === 0).slice(0, 24); 

    return simulatedData;
  }
);
