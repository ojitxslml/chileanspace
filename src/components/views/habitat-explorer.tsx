"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export function HabitatExplorer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const stormIntensityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("hsl(var(--background))");
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 20;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // Habitat Base (Placeholder)
    const baseGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 32);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const habitatBase = new THREE.Mesh(baseGeometry, baseMaterial);
    habitatBase.position.y = 0.25;
    scene.add(habitatBase);

    // Habitat Dome (Placeholder)
    const domeGeometry = new THREE.SphereGeometry(3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshStandardMaterial({ 
        color: "hsl(var(--primary))", 
        transparent: true, 
        opacity: 0.7,
        side: THREE.DoubleSide
    });
    const habitatDome = new THREE.Mesh(domeGeometry, domeMaterial);
    habitatDome.position.y = 0.5;
    scene.add(habitatDome);


    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div className="relative h-full w-full flex-1">
      <div ref={mountRef} className="absolute inset-0" />
      <Card className="absolute bottom-4 left-4 w-80 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="storm-intensity">Storm Intensity: <span ref={stormIntensityRef}>0</span> kWe</Label>
                <Slider defaultValue={[0]} max={100} step={1} onValueChange={(value) => {
                    if (stormIntensityRef.current) {
                        stormIntensityRef.current.textContent = (value[0] * 1.5).toFixed(1);
                    }
                }}/>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="dome-toggle" defaultChecked/>
                <Label htmlFor="dome-toggle">Show Dome</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="piezo-toggle" />
                <Label htmlFor="piezo-toggle">Show Piezoelectric Layer</Label>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
