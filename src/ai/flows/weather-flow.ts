
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const WeatherDataPointSchema = z.object({
  hour: z.string(),
  speed2m: z.number(),
  speed10m: z.number(),
  speed100m: z.number(),
});

export type WeatherDataPoint = z.infer<typeof WeatherDataPointSchema>;

const WeatherResponseSchema = z.array(WeatherDataPointSchema);

export async function getWeather(): Promise<WeatherDataPoint[]> {
    return getWeatherFlow();
}

const getWeatherFlow = ai.defineFlow(
  {
    name: 'getWeatherFlow',
    outputSchema: WeatherResponseSchema,
  },
  async () => {
    // In a real application, you would make the API call here using the credentials.
    // For security reasons, we are simulating the API response.
    // The credentials provided are for demonstration purposes and should be stored securely in a backend.
    const user = 'jerez_richard';
    const pass = 'E5X9Aq3bT19k5koSxePo';
    const apiUrl = `https://api.meteomatics.com/2023-01-01T00:00:00Z--2023-12-30T00:00:00Z:PT20M/wind_speed_2m:ms,wind_speed_10m:ms,wind_speed_100m:ms/-63.3215,-58.9020/json`;

    console.log(`Simulating API call to Meteomatics for user: ${user}. URL: ${apiUrl}`);

    // This is simulated data based on the expected API response structure.
    const simulatedData: WeatherDataPoint[] = Array.from({ length: 24 * 3 }, (_, i) => {
        const hour = Math.floor(i / 3);
        const minute = (i % 3) * 20;
        return {
            hour: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
            speed2m: parseFloat((Math.random() * 10 + 5).toFixed(1)),
            speed10m: parseFloat((Math.random() * 15 + 8).toFixed(1)),
            speed100m: parseFloat((Math.random() * 25 + 15).toFixed(1)),
        };
    }).filter((_, i) => i % 3 === 0).slice(0, 24); // Simplify to hourly data for chart clarity

    return simulatedData;
  }
);
