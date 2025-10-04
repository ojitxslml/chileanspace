"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
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
import { RotateCcw, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Option<T> = {
  value: T;
  label: string;
  description: string;
};

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

export function InteriorDesigner() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [design, setDesign] = useState<DesignState>(defaultDesign);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

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

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("habitatDesign", JSON.stringify(design));
    }
  }, [design, isMounted]);
  
  useEffect(() => {
    if (!isMounted || !mountRef.current) return;
    
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('hsl(var(--background))');
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(2, 3, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Room Geometry
    const roomSize = { width: 6, height: 3, depth: 4 };
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.BackSide });
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    
    const floor = new THREE.Mesh(new THREE.BoxGeometry(roomSize.width, 0.1, roomSize.depth), floorMaterial);
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);
    
    const ceiling = new THREE.Mesh(new THREE.BoxGeometry(roomSize.width, 0.1, roomSize.depth), wallMaterial);
    ceiling.position.y = roomSize.height + 0.05;
    scene.add(ceiling);

    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, roomSize.height, roomSize.depth), wallMaterial);
    wall1.position.x = roomSize.width / 2;
    wall1.position.y = roomSize.height / 2;
    scene.add(wall1);

    const wall2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, roomSize.height, roomSize.depth), wallMaterial);
    wall2.position.x = -roomSize.width / 2;
    wall2.position.y = roomSize.height / 2;
    scene.add(wall2);
    
    const wall3 = new THREE.Mesh(new THREE.BoxGeometry(roomSize.width, roomSize.height, 0.1), wallMaterial);
    wall3.position.z = roomSize.depth / 2;
    wall3.position.y = roomSize.height / 2;
    scene.add(wall3);

    const wall4 = new THREE.Mesh(new THREE.BoxGeometry(roomSize.width, roomSize.height, 0.1), wallMaterial);
    wall4.position.z = -roomSize.depth / 2;
    wall4.position.y = roomSize.height / 2;
    scene.add(wall4);


    // Basic furniture
    const bed = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.6, 3), new THREE.MeshStandardMaterial({color: 0x335599}));
    bed.position.set(-roomSize.width / 2 + 0.8, 0.3, 0);
    bed.castShadow = true;
    scene.add(bed);

    const desk = new THREE.Mesh(new THREE.BoxGeometry(2, 0.8, 0.8), new THREE.MeshStandardMaterial({color: 0x886644}));
    desk.position.set(roomSize.width / 2 - 1.2, 0.4, 0.5);
    desk.castShadow = true;
    scene.add(desk);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!currentMount) return;
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };

  }, [isMounted, design]);

  const handleOptionChange = (category: keyof DesignState, value: string) => {
    setDesign((prev) => ({ ...prev, [category]: value }));
  };

  const handleReset = () => {
    setDesign(defaultDesign);
    toast({ title: "Diseño restablecido", description: "Se han cargado las opciones por defecto." });
  };

  const handleDownload = () => {
    toast({
        variant: "destructive",
        title: "Función no disponible",
        description: "La descarga de imágenes desde la vista 3D aún no está implementada."
    });
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
  
  const styleOpt = categories.style.options.find(o => o.value === design.style);
  const title = styleOpt?.label || 'Diseño Personalizado';
  const description = styleOpt?.description || 'Un espacio único en Marte.';

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 md:space-y-6 h-full flex flex-col">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">
          Diseñador de Interiores
        </h2>
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleReset} aria-label="Restablecer diseño">
                <RotateCcw className="mr-2 h-4 w-4" />
                Restablecer
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} aria-label="Descargar imagen" disabled>
                <Download className="mr-2 h-4 w-4" />
                Descargar
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare} aria-label="Compartir diseño">
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
            </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(categories).map(([key, category]) => (
                <div key={key} className="space-y-3">
                    <h3 className="font-semibold text-sm">{category.title}</h3>
                    <RadioGroup
                        value={design[key as keyof DesignState]}
                        onValueChange={(value) => handleOptionChange(key as keyof DesignState, value)}
                        aria-label={category.title}
                        className="flex flex-row flex-wrap gap-2"
                    >
                        {category.options.map((option) => (
                            <div key={option.value}>
                                <RadioGroupItem value={option.value} id={`${key}-${option.value}`} className="sr-only peer" />
                                <Label htmlFor={`${key}-${option.value}`} className="cursor-pointer rounded-md border-2 border-muted bg-popover px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            ))}
        </CardContent>
      </Card>
      <Card className="flex-1 flex flex-col">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-2 relative">
            <div ref={mountRef} className="absolute inset-0 w-full h-full rounded-lg overflow-hidden border">
                {/* 3D Scene will be rendered here */}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

    