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
          Designing a sustainable future on Mars. Explore our innovative
          habitat concept, engineered for resilience and habitability on the
          Red Planet.
        </p>
        <Link href="/habitat" className="mt-8">
          <Button size="lg" className="text-lg">
            Explore The Habitat
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="mt-8 max-w-4xl text-base text-white/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
