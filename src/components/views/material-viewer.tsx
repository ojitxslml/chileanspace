
"use client";

import { useState, useMemo } from "react";
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
import { Separator } from "@/components/ui/separator";
import { useCollection, useFirebase, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

interface Material {
  id: string;
  name: string;
  type: string;
  description: string;
  details: string;
  images: {
    src: string;
    alt: string;
    hint: string;
  }[];
}

export function MaterialViewer() {
  const { firestore } = useFirebase();
  const materialsRef = useMemoFirebase(() => firestore ? collection(firestore, 'materials') : null, [firestore]);
  const { data: materials, isLoading } = useCollection<Material>(materialsRef);

  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const selectedMaterial = useMemo(() => {
    if (!materials) return null;
    if (selectedMaterialId) {
      return materials.find(m => m.id === selectedMaterialId) ?? null;
    }
    return materials[0] ?? null;
  }, [materials, selectedMaterialId]);

  if (isLoading) {
    return (
       <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 h-full flex flex-col">
        <div className="flex items-center justify-between space-y-2">
           <Skeleton className="h-10 w-1/4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <Card className="lg:col-span-1">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20" />)}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 flex flex-col">
             <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardHeader>
              <CardContent className="flex-1">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-40 w-full" />
                  </div>
              </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 h-full flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Material Viewer
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Construction Materials</CardTitle>
            <CardDescription>
              Select a material to see its details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2 pr-4">
                {materials?.map((material) => (
                  <div
                    key={material.id}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      selectedMaterial?.id === material.id
                        ? "bg-accent border-primary"
                        : "hover:bg-accent/50"
                    )}
                    onClick={() => setSelectedMaterialId(material.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{material.name}</h3>
                      <Badge variant="secondary">{material.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {material.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 flex flex-col">
          {selectedMaterial ? (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {selectedMaterial.name}
                </CardTitle>
                <CardDescription>{selectedMaterial.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: selectedMaterial.details,
                    }}
                  />

                  {selectedMaterial.images &&
                    selectedMaterial.images.length > 0 && (
                      <>
                        <Separator className="my-6" />
                        <h4 className="text-lg font-semibold mb-4">Gallery</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedMaterial.images.map((image, index) => (
                            <div
                              key={index}
                              className="relative aspect-video rounded-md overflow-hidden border"
                            >
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                data-ai-hint={image.hint}
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                </ScrollArea>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-muted-foreground">
                Select a material to view details.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
