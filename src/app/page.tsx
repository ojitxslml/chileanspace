"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "mars-landscape"
  );

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-5xl font-bold tracking-tight font-headline md:text-7xl lg:text-8xl">
          CHILEANSPACE
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
          Diseñando un futuro sostenible en Marte. Explore nuestro innovador
          concepto de hábitat, diseñado para la resiliencia y la habitabilidad
          en el Planeta Rojo.
        </p>
        <Link href="/habitat" className="mt-8">
          <Button size="lg" className="text-lg">
            Explorar el Hábitat
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      <footer className="absolute bottom-4 z-10 text-center text-xs text-white/50">
        Un proyecto de exploración conceptual.
      </footer>
    </div>
  );
}
