
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { getWeather, getTemperature, getRadiation } from "@/ai/flows/weather-flow";
import { type WeatherDataPoint, type TemperatureDataPoint, type RadiationDataPoint } from "@/ai/schemas/weather-schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Thermometer, Wind, Sun, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function HabitatExplorer() {
  const { t } = useTranslation();
  const mountRef = useRef<HTMLDivElement>(null);
  const stormIntensityRef = useRef<HTMLSpanElement>(null);
  const piezoGroupRef = useRef<THREE.Group>();
  const stormParticlesRef = useRef<THREE.Points>();
  const stormIntensityValue = useRef(0);
  const flashLightsRef = useRef<THREE.PointLight[]>([]);
  const modelRef = useRef<THREE.Object3D>();

  const [mode, setMode] = useState<"simulated" | "live">("live");
  const [windData, setWindData] = useState<WeatherDataPoint[]>([]);
  const [temperatureData, setTemperatureData] = useState<TemperatureDataPoint[]>([]);
  const [radiationData, setRadiationData] = useState<RadiationDataPoint[]>([]);
  const [apiDataLoading, setApiDataLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);

  const isLoading = apiDataLoading || !modelLoaded;

  const currentConditions = useMemo(() => {
    const latestWind = windData.length > 0 ? windData[windData.length - 1].speed10m : 0;
    const latestTemp = temperatureData.length > 0 ? temperatureData[temperatureData.length - 1].temp2m : 0;
    const latestRadiation = radiationData.length > 0 ? radiationData[radiationData.length - 1].global : 0;

    return {
      wind: latestWind.toFixed(1),
      temperature: latestTemp.toFixed(1),
      radiation: latestRadiation.toFixed(1),
    };
  }, [windData, temperatureData, radiationData]);

  useEffect(() => {
    async function fetchAllData() {
      try {
        setApiDataLoading(true);
        const [wind, temp, rad] = await Promise.all([
          getWeather(),
          getTemperature(),
          getRadiation(),
        ]);
        setWindData(wind);
        setTemperatureData(temp);
        setRadiationData(rad);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setApiDataLoading(false);
      }
    }
    fetchAllData();
  }, []);

  useEffect(() => {
    if (mode === 'live' && windData.length > 0) {
        const latestWindSpeed = windData[windData.length - 1].speed10m;
        const maxWind = 40;
        const intensity = Math.min(100, (latestWindSpeed / maxWind) * 100);
        handleStormChange([intensity]);
    }
  }, [mode, windData]);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffae8b, 2);
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
    
    const piezoMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.3,
        emissive: 0x00ffff,
        emissiveIntensity: 0,
        depthWrite: false,
    });

    const loader = new GLTFLoader();
    loader.load(
        '/white_mesh.glb',
        function (gltf) {
            const model = gltf.scene;
            model.scale.set(5, 5, 5);
            model.position.y = 2;
            model.traverse(function (child) {
                if ((child as THREE.Mesh).isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(model);
            modelRef.current = model;

            const piezoGroup = new THREE.Group();
            model.traverse((object) => {
              if ((object as THREE.Mesh).isMesh) {
                const mesh = object as THREE.Mesh;
                const piezoMesh = new THREE.Mesh(mesh.geometry, piezoMaterial);
                piezoGroup.add(piezoMesh);
              }
            });

            piezoGroup.position.copy(model.position);
            piezoGroup.rotation.copy(model.rotation);
            piezoGroup.scale.copy(model.scale).multiplyScalar(1.05);

            piezoGroup.visible = false;
            scene.add(piezoGroup);
            piezoGroupRef.current = piezoGroup;
            setModelLoaded(true);
        },
        undefined, 
        function (error) {
            console.error(error);
            setModelLoaded(true); // Still treat as loaded to not block forever
        }
    );

    loader.load(
      '/reactor.glb',
      function (gltf) {
          const reactorModel = gltf.scene;
          reactorModel.scale.set(2, 2, 2);
          reactorModel.position.set(12, 1, 0); 
          reactorModel.traverse(function (child) {
              if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({ color: 0xE5E5E5 });
              }
          });
          scene.add(reactorModel);
      },
      undefined, 
      function (error) {
          console.error("Error loading reactor.glb: ", error);
      }
    );

    loader.load(
      '/solar.glb',
      function (gltf) {
          const basePanel = gltf.scene;
          basePanel.traverse(function (child) {
              if ((child as THREE.Mesh).isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
              }
          });
          
          const panel1 = basePanel.clone();
          panel1.scale.set(3, 3, 3);
          panel1.position.set(-12, 0, 5);
          scene.add(panel1);

          const panel2 = basePanel.clone();
          panel2.scale.set(3, 3, 3);
          panel2.position.set(-18, 0, 5);
          scene.add(panel2);
      },
      undefined,
      function (error) {
          console.error("Error loading solar.glb: ", error);
      }
  );

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
        opacity: 0,
        blending: THREE.AdditiveBlending
    });
    const stormParticles = new THREE.Points(particles, particleMaterial);
    scene.add(stormParticles);
    stormParticlesRef.current = stormParticles;
    
    const flashPoolSize = 30;
    for (let i = 0; i < flashPoolSize; i++) {
        const light = new THREE.PointLight(0xffffff, 0, 5);
        light.userData.life = 0;
        flashLightsRef.current.push(light);
        scene.add(light);
    }
    
    const raycaster = new THREE.Raycaster();

    const clock = new THREE.Clock();
    const animate = function () {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const intensity = stormIntensityValue.current / 100;

      if(stormParticlesRef.current && intensity > 0) {
        const positions = stormParticlesRef.current.geometry.attributes.position.array as Float32Array;
        const speed = (10 + intensity * 100) * delta;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] -= speed;
            if (positions[i] < -50) {
                positions[i] = 50;
            }
        }
        stormParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        (stormParticlesRef.current.material as THREE.PointsMaterial).opacity = Math.min(0.7, 0.02 + Math.pow(intensity, 2) * 0.68);

      } else if (stormParticlesRef.current) {
        (stormParticlesRef.current.material as THREE.PointsMaterial).opacity = 0;
      }
      
      if (piezoGroupRef.current) {
        piezoGroupRef.current.traverse(child => {
            if((child as THREE.Mesh).isMesh) {
                const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
                material.emissiveIntensity = intensity;
            }
        })
      }
      
      if (modelRef.current && intensity > 0) {
          if (Math.random() < intensity * 0.5) { // Probability based on intensity
              const availableLight = flashLightsRef.current.find(l => l.userData.life <= 0);
              if (availableLight) {
                  const model = modelRef.current;
                  const mesh = model.children[0] as THREE.Mesh;
                  if (mesh && mesh.geometry) {
                      const positionAttribute = mesh.geometry.attributes.position;
                      const randomIndex = Math.floor(Math.random() * positionAttribute.count);
                      const randomVertex = new THREE.Vector3().fromBufferAttribute(positionAttribute, randomIndex);
                      randomVertex.applyMatrix4(model.matrixWorld); // Transform to world coordinates
                      
                      availableLight.position.copy(randomVertex);
                      availableLight.intensity = 5 + Math.random() * 5;
                      availableLight.userData.life = 1; // Start life
                  }
              }
          }
      }

      flashLightsRef.current.forEach(light => {
          if (light.userData.life > 0) {
              light.userData.life -= delta * 5; // Fade over ~0.2 seconds
              light.intensity = Math.max(0, light.intensity - delta * 50);
          } else {
              light.userData.life = 0;
              light.intensity = 0;
          }
      });


      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
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
  }

  const togglePiezo = (checked: boolean) => {
    if (piezoGroupRef.current) {
      piezoGroupRef.current.visible = checked;
    }
  }

  return (
    <div className="relative h-full w-full flex-1">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Icons.logo className="h-16 w-16 text-primary animate-pulse-subtle" />
            <p className="text-foreground">Cargando Escena...</p>
          </div>
        </div>
      )}
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute top-4 right-4 space-y-2">
        <Card className="w-40 lg:w-60 bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-2 lg:gap-4 space-y-0 p-3">
                <Wind className="h-6 w-6 text-muted-foreground"/>
                <div className="truncate">
                    <CardTitle className="text-xs lg:text-base">{t('dashboard.wind_speed_title').split('(')[0]}</CardTitle>
                    <div className="text-base lg:text-2xl font-bold">{apiDataLoading ? <Skeleton className="h-6 lg:h-8 w-20" /> : `${currentConditions.wind} m/s`}</div>
                </div>
            </CardHeader>
        </Card>
        <Card className="w-40 lg:w-60 bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-2 lg:gap-4 space-y-0 p-3">
                <Thermometer className="h-6 w-6 text-muted-foreground"/>
                <div>
                    <CardTitle className="text-xs lg:text-base">{t('dashboard.temperature_title').split('(')[0]}</CardTitle>
                    <div className="text-base lg:text-2xl font-bold">{apiDataLoading ? <Skeleton className="h-6 lg:h-8 w-20" /> : `${currentConditions.temperature} °C`}</div>
                </div>
            </CardHeader>
        </Card>
        <Card className="w-40 lg:w-60 bg-background/80 backdrop-blur-sm">
            <CardHeader className="flex-row items-center gap-2 lg:gap-4 space-y-0 p-3">
                <Sun className="h-6 w-6 text-muted-foreground"/>
                <div>
                    <CardTitle className="text-xs lg:text-base">{t('dashboard.radiation_title').split('(')[0]}</CardTitle>
                    <div className="text-base lg:text-2xl font-bold">{apiDataLoading ? <Skeleton className="h-6 lg:h-8 w-20" /> : `${currentConditions.radiation} J/m²`}</div>
                </div>
            </CardHeader>
        </Card>
      </div>

      <div className="absolute bottom-4 left-4">
        <Button 
          size="icon" 
          className="z-10"
          onClick={() => setControlsOpen(!controlsOpen)}
        >
          <Settings className="h-5 w-5" />
        </Button>
        {controlsOpen && (
           <Card className="absolute bottom-0 left-12 w-80 bg-background/80 backdrop-blur-sm">
            <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                    <Label>{t('explorer.intensity_mode')}</Label>
                    <RadioGroup value={mode} onValueChange={(value) => setMode(value as "simulated" | "live")} className="flex space-x-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="simulated" id="simulated" />
                            <Label htmlFor="simulated">{t('explorer.simulated')}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="live" id="live" />
                            <Label htmlFor="live">{t('explorer.live')}</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="storm-intensity">
                      {t('explorer.storm_intensity')}: {' '}
                      <span ref={stormIntensityRef}>
                         {apiDataLoading && mode === 'live' ? '...' : ((stormIntensityValue.current / 100) * 40).toFixed(1)}
                      </span> m/s
                    </Label>
                    <Slider 
                      id="storm-intensity"
                      defaultValue={[stormIntensityValue.current]} 
                      max={100} 
                      step={1} 
                      onValueChange={handleStormChange}
                      disabled={mode === 'live'}
                      value={mode === 'live' ? [stormIntensityValue.current] : undefined}
                    />
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="piezo-toggle" onCheckedChange={togglePiezo}/>
                    <Label htmlFor="piezo-toggle">{t('explorer.show_piezo_layer')}</Label>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
