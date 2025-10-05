
import { z } from 'zod';

export const WeatherDataPointSchema = z.object({
  hour: z.string(),
  speed2m: z.number(),
  speed10m: z.number(),
  speed100m: z.number(),
});

export type WeatherDataPoint = z.infer<typeof WeatherDataPointSchema>;

export const WeatherResponseSchema = z.array(WeatherDataPointSchema);


export const TemperatureDataPointSchema = z.object({
  hour: z.string(),
  temp2m: z.number(),
  temp20m: z.number(),
  temp100m: z.number(),
});

export type TemperatureDataPoint = z.infer<typeof TemperatureDataPointSchema>;

export const TemperatureResponseSchema = z.array(TemperatureDataPointSchema);


export const RadiationDataPointSchema = z.object({
    hour: z.string(),
    direct: z.number(),
    diffuse: z.number(),
    global: z.number(),
    clearSky: z.number(),
});

export type RadiationDataPoint = z.infer<typeof RadiationDataPointSchema>;

export const RadiationResponseSchema = z.array(RadiationDataPointSchema);
