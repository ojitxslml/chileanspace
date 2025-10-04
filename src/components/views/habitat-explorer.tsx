
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
  const piezoGroupRef = useRef<THREE.Group>();
  const stormParticlesRef = useRef<THREE.Points>();
  const stormIntensityValue = useRef(0);

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
    
    // Add rocks
    const rockGeometry = new THREE.DodecahedronGeometry(1, 0);
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.8 });
    for (let i = 0; i < 50; i++) {
        const rock = new THREE.Mesh(rockGeometry, rockMaterial);
        rock.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() * 0.5),
            (Math.random() - 0.5) * 100
        );
        rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const scale = Math.random() * 0.5 + 0.2;
        rock.scale.set(scale, scale, scale);
        rock.castShadow = true;
        scene.add(rock);
    }
    
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

    // Towers and Piezoelectric layers
    const towerRadius = 1.5;
    const towerHeight = 5;
    const towerDistance = 10;
    const towerCount = 6;
    const towerGeometry = new THREE.CylinderGeometry(towerRadius, towerRadius, towerHeight, 48);

    const piezoGroup = new THREE.Group();
    piezoGroup.visible = false;
    scene.add(piezoGroup);
    piezoGroupRef.current = piezoGroup;

    const piezoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.2,
        emissive: 0x00ffff,
        emissiveIntensity: 0
    });
    const piezoGeometry = new THREE.CylinderGeometry(towerRadius + 0.05, towerRadius + 0.05, towerHeight, 48);


    for (let i = 0; i < towerCount; i++) {
        const angle = (i / towerCount) * Math.PI * 2;
        const x = Math.cos(angle) * towerDistance;
        const z = Math.sin(angle) * towerDistance;

        const tower = new THREE.Mesh(towerGeometry, mainMaterial);
        tower.position.set(x, towerHeight / 2, z);
        tower.castShadow = true;
        tower.receiveShadow = true;
        habitatGroup.add(tower);

        const piezoLayer = new THREE.Mesh(piezoGeometry, piezoMaterial);
        piezoLayer.position.copy(tower.position);
        piezoGroup.add(piezoLayer);
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

    // Storm particles
    const particleCount = 200000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffae8b,
        size: 0.25,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });
    const stormParticles = new THREE.Points(particles, particleMaterial);
    scene.add(stormParticles);
    stormParticlesRef.current = stormParticles;


    // Animation loop
    const clock = new THREE.Clock();
    const animate = function () {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if(stormParticlesRef.current && stormIntensityValue.current > 0) {
        const positions = stormParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const intensity = stormIntensityValue.current / 100;
        const speed = (10 + intensity * 100) * delta;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] -= speed; // X direction
            if (positions[i] < -50) {
                positions[i] = 50;
            }
        }
        stormParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        (stormParticlesRef.current.material as THREE.PointsMaterial).opacity = Math.max(0, Math.min(0.7, intensity * 2));
      } else if (stormParticlesRef.current) {
        (stormParticlesRef.current.material as THREE.PointsMaterial).opacity = 0;
      }

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
    stormIntensityValue.current = intensity;
     if (stormIntensityRef.current) {
        stormIntensityRef.current.textContent = ((intensity / 100) * 40).toFixed(1);
    }
    if (piezoGroupRef.current) {
        piezoGroupRef.current.children.forEach(child => {
            const mesh = child as THREE.Mesh;
            const material = mesh.material as THREE.MeshStandardMaterial;
            material.emissiveIntensity = intensity / 100;
        });
    }
  }

  const togglePiezo = (checked: boolean) => {
    if (piezoGroupRef.current) {
      piezoGroupRef.current.visible = checked;
    }
  }

  return (
    <div className="relative h-full w-full flex-1">
      <div ref={mountRef} className="absolute inset-0" />
      <Card className="absolute bottom-4 left-4 w-80 bg-background/80 backdrop-blur-sm">
        <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="storm-intensity">Storm Intensity: <span ref={stormIntensityRef}>0.0</span> m/s</Label>
                <Slider defaultValue={[0]} max={100} step={1} onValueChange={handleStormChange}/>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="piezo-toggle" onCheckedChange={togglePiezo}/>
                <Label htmlFor="piezo-toggle">Show Piezoelectric Layer</Label>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

    