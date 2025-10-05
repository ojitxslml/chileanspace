"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function LandingPage() {
  const { t } = useTranslation();
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === "mars-landscape"
  );

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover animate-zoom-pan"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-5xl font-bold tracking-tight font-headline md:text-7xl lg:text-8xl">
          {t('landing.title')}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80 md:text-xl">
          {t('landing.subtitle')}
        </p>
        <Link href="/habitat?view=explorer" className="mt-8">
          <Button size="lg" className="text-lg">
            {t('landing.explore_button')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <p className="mt-8 max-w-4xl text-base text-white/70">
          {t('landing.lorem_ipsum')}
        </p>
      </div>
    </div>
  );
}
