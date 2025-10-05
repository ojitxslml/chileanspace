
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cameraData, Camera } from "@/lib/camera-data";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function CameraViewer() {
  const { t } = useTranslation();
  const [selectedCamera, setSelectedCamera] = React.useState<Camera>(
    cameraData[0]
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 pt-6 h-full flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          {t('camera_viewer.title')}
        </h2>
        <p className="text-muted-foreground">{t('camera_viewer.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>
              {t('camera_viewer.live_feed')}: {selectedCamera.name}
            </CardTitle>
            <CardDescription>{t(`camera_viewer.${selectedCamera.location}`)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video">
              <Image
                src={selectedCamera.imageUrl}
                alt={`View from ${selectedCamera.name}`}
                fill
                className="object-cover rounded-md border"
                data-ai-hint={selectedCamera.imageHint}
              />
              <Badge
                className={cn(
                  "absolute top-2 left-2",
                  selectedCamera.status === "Online"
                    ? "bg-green-500/80 text-white"
                    : "bg-red-500/80 text-white"
                )}
              >
                {selectedCamera.status === "Online" ? t('camera_viewer.online') : t('camera_viewer.offline')}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>{t('camera_viewer.select_camera')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-2 pr-4">
                {cameraData.map((camera) => (
                  <div
                    key={camera.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors flex items-center gap-4",
                      selectedCamera.id === camera.id
                        ? "bg-accent border-primary"
                        : "hover:bg-accent/50"
                    )}
                    onClick={() => setSelectedCamera(camera)}
                  >
                    <div className="relative w-24 h-16 rounded-md overflow-hidden bg-muted">
                        <Image src={camera.imageUrl} alt={camera.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{camera.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`camera_viewer.${camera.location}`)}
                      </p>
                    </div>
                     <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        camera.status === "Online"
                          ? "bg-green-500"
                          : "bg-red-500"
                      )}
                    ></div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
