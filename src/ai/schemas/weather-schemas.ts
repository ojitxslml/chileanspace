
import { z } from 'zod';

export const WeatherDataPointSchema = z.object({
  hour: z.string(),
  speed2m: z.number(),
  speed10m: z.number(),
  speed100m: z.number(),
});

export type WeatherDataPoint = z.infer<typeof WeatherDataPointSchema>;

export const WeatherResponseSchema = z.array(WeatherDataPointSchema);
