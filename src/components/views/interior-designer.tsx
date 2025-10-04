"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ResetIcon, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

type Option<T> = {
  value: T;
  label: string;
  description: string;
};

// --- Configuration ---
const categories = {
  style: {
    title: "Estilo",
    options: [
      { value: "minimalista", label: "Minimalista", description: "Líneas limpias y espacios despejados para una mente clara." },
      { value: "calido", label: "Cálido", description: "Materiales orgánicos y texturas suaves para un ambiente acogedor." },
      { value: "cientifico", label: "Científico", description: "Superficies funcionales y organización optimizada para la investigación." },
    ],
  },
  layout: {
    title: "Distribución",
    options: [
      { value: "compacta", label: "Compacta", description: "Máxima eficiencia del espacio, ideal para tareas individuales." },
      { value: "social", label: "Social", description: "Área común abierta para fomentar la interacción y el descanso." },
      { value: "foco", label: "Foco", description: "Zonas de trabajo aisladas para una concentración profunda." },
    ],
  },
  lighting: {
    title: "Iluminación",
    options: [
      { value: "circadiana", label: "Circadiana", description: "Luz que simula el ciclo natural del día para regular el sueño." },
      { value: "calida", label: "Cálida", description: "Tonos anaranjados que invitan a la relajación y el confort." },
      { value: "fria", label: "Fría", description: "Luz blanca y brillante para potenciar la concentración y la energía." },
    ],
  },
  privacy: {
    title: "Privacidad",
    options: [
      { value: "baja", label: "Baja", description: "Espacio abierto y diáfano sin barreras visuales." },
      { value: "media", label: "Media", description: "Paneles translúcidos que delimitan zonas sin aislar." },
      { value: "alta", label: "Alta", description: "Módulos cerrados para una total privacidad y aislamiento acústico." },
    ],
  },
  nature: {
    title: "Naturaleza",
    options: [
      { value: "sin-plantas", label: "Sin Plantas", description: "Un entorno puramente tecnológico y funcional." },
      { value: "pared-vegetal", label: "Pared Vegetal", description: "Un jardín vertical que purifica el aire y añade vida." },
      { value: "maceteros", label: "Maceteros", description: "Toques de verde distribuidos para una conexión sutil con la naturaleza." },
    ],
  },
};

type Style = typeof categories.style.options[number]["value"];
type Layout = typeof categories.layout.options[number]["value"];
type Lighting = typeof categories.lighting.options[number]["value"];
type Privacy = typeof categories.privacy.options[number]["value"];
type Nature = typeof categories.nature.options[number]["value"];

interface DesignState {
  style: Style;
  layout: Layout;
  lighting: Lighting;
  privacy: Privacy;
  nature: Nature;
}

const defaultDesign: DesignState = {
  style: "minimalista",
  layout: "compacta",
  lighting: "circadiana",
  privacy: "baja",
  nature: "sin-plantas",
};

// --- Main Component ---
export function InteriorDesigner() {
  const [design, setDesign] = useState<DesignState>(defaultDesign);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();
  const [currentImageSrc, setCurrentImageSrc] = useState(PlaceHolderImages.find(img => img.id === 'habitat-interior')?.imageUrl || '');
  const [nextImageSrc, setNextImageSrc] = useState('');
  const [isFading, setIsFading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);


  const getCurrentImageDetails = () => {
    const styleOpt = categories.style.options.find(o => o.value === design.style);
    return {
      title: styleOpt?.label || 'Diseño Personalizado',
      description: styleOpt?.description || 'Un espacio único en Marte.',
    };
  };

  const handleImageTransition = useCallback((newSrc: string) => {
    if (newSrc !== currentImageSrc) {
        setNextImageSrc(newSrc);
        setIsFading(true);

        const timer = setTimeout(() => {
            setCurrentImageSrc(newSrc);
            setIsFading(false);
            setNextImageSrc('');
        }, 300);

        return () => clearTimeout(timer);
    }
  }, [currentImageSrc]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedDesign = localStorage.getItem("habitatDesign");
      if (savedDesign) {
        setDesign(JSON.parse(savedDesign));
      }
    } catch (error) {
      console.error("Failed to parse design from localStorage", error);
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage and update image on design change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("habitatDesign", JSON.stringify(design));
      // For this example, we'll just cycle through placeholder images
      // A real implementation would use the layered approach or named images.
      const imageMap: { [key: string]: string } = {
        minimalista: "habitat-interior",
        calido: "habitat-interior",
        cientifico: "habitat-interior",
      };
      const placeholderId = imageMap[design.style] || 'habitat-interior';
      const newImageUrl = PlaceHolderImages.find(img => img.id === placeholderId)?.imageUrl || '';
      handleImageTransition(newImageUrl);
    }
  }, [design, isMounted, handleImageTransition]);

  const handleOptionChange = (category: keyof DesignState, value: string) => {
    setDesign((prev) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    setDesign(defaultDesign);
    toast({ title: "Diseño restablecido", description: "Se han cargado las opciones por defecto." });
  };

  const handleDownload = () => {
    if (imageRef.current) {
        const link = document.createElement('a');
        link.href = imageRef.current.src;
        link.download = 'habitat-design.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "Descarga iniciada", description: "Tu diseño se está descargando." });
    }
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    Object.entries(design).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    navigator.clipboard.writeText(url.toString());
    toast({ title: "Enlace copiado", description: "¡Comparte tu diseño con otros!" });
  };

  if (!isMounted) {
    return null; // or a loading skeleton
  }
  
  const { title, description } = getCurrentImageDetails();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:space-y-6 h-full flex flex-col">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Diseñador de Interiores
        </h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleReset} aria-label="Restablecer diseño">
                <ResetIcon className="mr-2 h-4 w-4" />
                Restablecer
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} aria-label="Descargar imagen">
                <Download className="mr-2 h-4 w-4" />
                Descargar
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} aria-label="Compartir diseño">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
            </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Controls */}
        <div className="md:col-span-1 space-y-4 overflow-y-auto">
            {Object.entries(categories).map(([key, category]) => (
                <Card key={key}>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            value={design[key as keyof DesignState]}
                            onValueChange={(value) => handleOptionChange(key as keyof DesignState, value)}
                            aria-label={category.title}
                        >
                            {category.options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={`${key}-${option.value}`} />
                                    <Label htmlFor={`${key}-${option.value}`} className="cursor-pointer">{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
        </div>
        {/* Right Column: Preview */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-2">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                {currentImageSrc && (
                    <Image
                        ref={imageRef}
                        key={currentImageSrc}
                        src={currentImageSrc}
                        alt={description}
                        fill
                        className={cn(
                          "object-cover transition-opacity duration-300",
                          isFading ? 'opacity-0' : 'opacity-100'
                        )}
                        priority
                    />
                )}
                 {nextImageSrc && (
                    <Image
                        src={nextImageSrc}
                        alt={description}
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
