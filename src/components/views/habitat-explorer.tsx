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
  const domeRef = useRef<THREE.Mesh>();
  const piezoRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("hsl(25 50% 10%)");
    scene.fog = new THREE.Fog(0x934322, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffae8b, 1.5);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x934322 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    const habitatGroup = new THREE.Group();
    scene.add(habitatGroup);

    const mainMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5e34 });

    // Central Hub
    const hubGeometry = new THREE.CylinderGeometry(4, 4, 1.5, 64);
    const hub = new THREE.Mesh(hubGeometry, mainMaterial);
    hub.position.y = 0.75;
    hub.castShadow = true;
    hub.receiveShadow = true;
    habitatGroup.add(hub);

    const hubRoofGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 64);
    const hubRoofMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5, roughness: 0.5 });
    const hubRoof = new THREE.Mesh(hubRoofGeometry, hubRoofMaterial);
    hubRoof.position.y = 1.6;
    hubRoof.castShadow = true;
    habitatGroup.add(hubRoof);

    // Towers
    const towerRadius = 1.5;
    const towerHeight = 5;
    const towerDistance = 10;
    const towerCount = 6;
    const towerGeometry = new THREE.CylinderGeometry(towerRadius, towerRadius, towerHeight, 48);

    for (let i = 0; i < towerCount; i++) {
        const angle = (i / towerCount) * Math.PI * 2;
        const x = Math.cos(angle) * towerDistance;
        const z = Math.sin(angle) * towerDistance;

        const tower = new THREE.Mesh(towerGeometry, mainMaterial);
        tower.position.set(x, towerHeight / 2, z);
        tower.castShadow = true;
        tower.receiveShadow = true;
        habitatGroup.add(tower);
    }
    
    // Greenhouses
    const greenhouseGeo = new THREE.BoxGeometry(4, 3, 6);
    const greenhouseMat = new THREE.MeshStandardMaterial({ color: 0x90a955 });
    const greenhouse1 = new THREE.Mesh(greenhouseGeo, greenhouseMat);
    greenhouse1.position.set(0, 1.5, -10);
    greenhouse1.castShadow = true;
    habitatGroup.add(greenhouse1);

    const greenhouse2 = new THREE.Mesh(greenhouseGeo, greenhouseMat);
    greenhouse2.position.set(0, 1.5, 10);
    greenhouse2.castShadow = true;
    habitatGroup.add(greenhouse2);

    // Invisible Dome for effects
    const domeGeometry = new THREE.SphereGeometry(6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMaterial = new THREE.MeshStandardMaterial({ 
        color: "hsl(var(--primary))", 
        transparent: true, 
        opacity: 0.1,
        visible: false,
        side: THREE.BackSide
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = 0;
    scene.add(dome);
    domeRef.current = dome;

    // Piezoelectric layer
    const piezoGeometry = new THREE.SphereGeometry(6.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const piezoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.2,
        visible: false,
        side: THREE.BackSide,
        emissive: 0x00ffff,
        emissiveIntensity: 0
    });
    const piezo = new THREE.Mesh(piezoGeometry, piezoMaterial);
    piezo.position.y = 0;
    scene.add(piezo);
    piezoRef.current = piezo;


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
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);
  
  const handleStormChange = (value: number[]) => {
    const intensity = value[0];
     if (stormIntensityRef.current) {
        stormIntensityRef.current.textContent = (intensity * 1.5).toFixed(1);
    }
    if (piezoRef.current) {
        const material = piezoRef.current.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = intensity / 100;
    }
  }

  return (
    <div className="relative h-full w-full flex-1">
      <div ref={mountRef} className="absolute inset-0" />
      <Card className="absolute bottom-4 left-4 w-80 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="storm-intensity">Storm Intensity: <span ref={stormIntensityRef}>0</span> kWe</Label>
                <Slider defaultValue={[0]} max={100} step={1} onValueChange={handleStormChange}/>
            </div>
            <div className="flex items-center space-x-2">
                <Switch id="dome-toggle" onCheckedChange={(checked) => domeRef.current && (domeRef.current.material as THREE.MeshStandardMaterial).visible  === checked}/>
                <Label htmlFor="dome-toggle">Show Force Field</Label>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="piezo-toggle" onCheckedChange={(checked) => piezoRef.current && (piezoRef.current.material as THREE.MeshStandardMaterial).visible === checked}/>
                <Label htmlFor="piezo-toggle">Show Piezoelectric Layer</Label>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
