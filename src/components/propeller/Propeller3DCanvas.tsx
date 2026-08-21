import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RadialSectionGeometry, PropellerType } from '../../types/propeller';
import { RotateCw, Play, Pause, Eye, Cpu, Compass, Grid, Sparkles, Sliders, Scissors, Layers, Info } from 'lucide-react';

interface Propeller3DCanvasProps {
  numBlades: number;
  diameterM: number;
  pitchRatio: number;
  expandedAreaRatio: number;
  radialGeometry: RadialSectionGeometry[];
  propellerType: PropellerType;
  materialName?: string;
  onPropellerTypeChange?: (type: PropellerType) => void;
}

export const Propeller3DCanvas: React.FC<Propeller3DCanvasProps> = ({
  numBlades,
  diameterM,
  pitchRatio,
  expandedAreaRatio,
  radialGeometry,
  propellerType: initialPropType,
  materialName = 'Nickel Aluminium Bronze',
  onPropellerTypeChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Interactive States
  const [isPlaying, setIsPlaying] = useState(true);
  const [rpmSpeed, setRpmSpeed] = useState(60);
  const [reverseRotation, setReverseRotation] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [localPropType, setLocalPropType] = useState<PropellerType>(initialPropType);
  const [colorMode, setColorMode] = useState<'metallic' | 'pressure' | 'velocity' | 'cavitation' | 'transparent' | 'exploded'>('metallic');
  
  // Cross-Section Clipping Tool State
  const [isClippingActive, setIsClippingActive] = useState(false);
  const [sectionCutR, setSectionCutR] = useState(0.70); // 0.20R to 1.00R cut (default 0.70R standard)
  const [showFlowLines, setShowFlowLines] = useState(true);

  // Sync prop changes
  useEffect(() => {
    setLocalPropType(initialPropType);
  }, [initialPropType]);

  const activePropType = localPropType;

  const handleTypeChange = (newType: PropellerType) => {
    setLocalPropType(newType);
    if (onPropellerTypeChange) {
      onPropellerTypeChange(newType);
    }
  };

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const propellerGroupRef = useRef<THREE.Group | null>(null);
  const flowLinesGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // dark slate background
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, diameterM * 1.8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.3);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 0.7);
    dirLight2.position.set(-5, -8, -5);
    scene.add(dirLight2);

    // Grid / Axis helper
    const gridHelper = new THREE.GridHelper(diameterM * 3, 20, 0x334155, 0x1e293b);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.z = -diameterM * 0.5;
    scene.add(gridHelper);

    // Propeller Main Group
    const propellerGroup = new THREE.Group();
    scene.add(propellerGroup);
    propellerGroupRef.current = propellerGroup;

    // Flow Lines Group
    const flowLinesGroup = new THREE.Group();
    scene.add(flowLinesGroup);
    flowLinesGroupRef.current = flowLinesGroup;

    // Orbit Controls using mouse drag
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const domElem = renderer.domElement;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !propellerGroupRef.current) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      propellerGroupRef.current.rotation.y += deltaMove.x * 0.008;
      propellerGroupRef.current.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.max(diameterM * 0.8, Math.min(diameterM * 4, cameraRef.current.position.z + e.deltaY * 0.003));
    };

    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('wheel', handleWheel);

    // Build 3D Geometry
    buildPropellerMesh();

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying && propellerGroupRef.current) {
        // Rotate along Z axis according to RPM & direction
        const dirMult = reverseRotation ? -1 : 1;
        const rotSpeedRadPerSec = ((rpmSpeed / 60) * 2 * Math.PI) / 10;
        propellerGroupRef.current.rotation.z += dirMult * rotSpeedRadPerSec * delta;
      }

      if (flowLinesGroupRef.current && showFlowLines) {
        flowLinesGroupRef.current.children.forEach((child) => {
          child.position.z += 0.08;
          if (child.position.z > diameterM) {
            child.position.z = -diameterM;
          }
        });
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate(performance.now());

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('wheel', handleWheel);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, [diameterM, numBlades, pitchRatio, expandedAreaRatio, activePropType, reverseRotation]);

  // Re-build mesh whenever parameters or modes change
  useEffect(() => {
    buildPropellerMesh();
  }, [colorMode, sectionCutR, isClippingActive, numBlades, diameterM, pitchRatio, expandedAreaRatio, showFlowLines, isWireframe, activePropType]);

  const buildPropellerMesh = () => {
    const group = propellerGroupRef.current;
    if (!group) return;

    // Clear previous children
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    const flowGroup = flowLinesGroupRef.current;
    if (flowGroup) {
      while (flowGroup.children.length > 0) {
        flowGroup.remove(flowGroup.children[0]);
      }
    }

    const R = diameterM / 2;
    // Hub ratio varies by type: CPP needs larger hub (~0.28-0.30), Ducted ~0.22, FPP ~0.18
    const isCPP = activePropType === 'CPP';
    const isDucted = activePropType === 'Ducted_Kort' || activePropType === 'Kaplan';
    const hubR = R * (isCPP ? 0.28 : isDucted ? 0.22 : 0.18);
    const hubLength = R * (isCPP ? 0.7 : 0.6);

    // 3D Visual Cross-Section Plane Ring when Clipping Tool is ON
    if (isClippingActive) {
      const cutRadius = hubR + (R - hubR) * sectionCutR;
      
      // Semi-transparent cutting plane ring in XY plane
      const ringGeo = new THREE.RingGeometry(cutRadius - R * 0.02, cutRadius + R * 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4, // Cyan plane
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      group.add(ringMesh);

      // Bright outer ring contour
      const borderGeo = new THREE.TorusGeometry(cutRadius, R * 0.008, 16, 64);
      const borderMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b, // Amber highlight
      });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      group.add(borderMesh);
    }

    // Material definitions based on colorMode and isWireframe toggle
    let bladeMaterial: THREE.Material;
    const forceWire = isWireframe || colorMode === 'velocity';

    if (colorMode === 'metallic') {
      bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0xd97706, // Amber/Bronze
        metalness: 0.85,
        roughness: 0.25,
        wireframe: forceWire,
      });
    } else if (colorMode === 'pressure') {
      bladeMaterial = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.3,
        metalness: 0.2,
        wireframe: forceWire,
      });
    } else if (colorMode === 'velocity') {
      bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x06b6d4, // Cyan velocity
        wireframe: true,
      });
    } else if (colorMode === 'cavitation') {
      bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0xef4444, // Red cavitation warning
        roughness: 0.4,
        wireframe: forceWire,
      });
    } else if (colorMode === 'transparent') {
      bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.45,
        metalness: 0.9,
        wireframe: forceWire,
      });
    } else {
      // Exploded
      bladeMaterial = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.5,
        roughness: 0.4,
        wireframe: forceWire,
      });
    }

    const hubMaterial = new THREE.MeshStandardMaterial({
      color: colorMode === 'exploded' ? 0x64748b : 0xb45309,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: forceWire,
    });

    // 1. Hub Cylindrical Mesh
    const hubGeo = new THREE.CylinderGeometry(hubR, hubR * 0.88, hubLength, 32);
    hubGeo.rotateX(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeo, hubMaterial);

    if (colorMode === 'exploded') {
      hubMesh.position.z = -R * 0.3;
    }
    group.add(hubMesh);

    // Hub Cap / Cone
    const coneGeo = new THREE.ConeGeometry(hubR * 0.88, hubLength * 0.6, 32);
    coneGeo.rotateX(Math.PI / 2);
    const coneMesh = new THREE.Mesh(coneGeo, hubMaterial);
    coneMesh.position.z = hubLength * 0.5 + (hubLength * 0.3) / 2;
    if (colorMode === 'exploded') {
      coneMesh.position.z += R * 0.4;
    }
    group.add(coneMesh);

    // 2. CPP Pitch Palm Mechanism (for Controllable Pitch Propeller)
    if (isCPP) {
      const palmMaterial = new THREE.MeshStandardMaterial({
        color: 0x94a3b8, // Stainless steel / Titanium palm plate
        metalness: 0.9,
        roughness: 0.3,
        wireframe: forceWire,
      });

      for (let i = 0; i < numBlades; i++) {
        const bladeAngle = (i * 2 * Math.PI) / numBlades;
        const palmRadius = hubR * 0.45;
        const palmGeo = new THREE.CylinderGeometry(palmRadius, palmRadius, hubR * 0.15, 24);
        const palmMesh = new THREE.Mesh(palmGeo, palmMaterial);
        
        // Position palm flush on hub wall
        palmMesh.position.x = hubR * 0.98 * Math.cos(bladeAngle);
        palmMesh.position.y = hubR * 0.98 * Math.sin(bladeAngle);
        palmMesh.rotation.z = bladeAngle + Math.PI / 2;
        palmMesh.rotation.x = Math.PI / 2;

        if (colorMode === 'exploded') {
          palmMesh.position.x *= 1.3;
          palmMesh.position.y *= 1.3;
        }

        group.add(palmMesh);
      }
    }

    // 3. Kort Nozzle Hydrofoil Duct (for Ducted / Kaplan Propellers)
    if (isDucted) {
      // Create hydrofoil duct ring
      const nozzleLength = hubLength * 1.6;
      const nozzleInnerR = R * 1.02; // Small tip clearance
      const nozzleOuterR = R * 1.15;
      
      const nozzleGeo = new THREE.CylinderGeometry(nozzleOuterR, nozzleInnerR, nozzleLength, 48, 1, true);
      nozzleGeo.rotateX(Math.PI / 2);
      
      const nozzleMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        transparent: true,
        opacity: isWireframe ? 1 : 0.65,
        wireframe: forceWire,
        side: THREE.DoubleSide,
        metalness: 0.8,
        roughness: 0.3,
      });
      const nozzleMesh = new THREE.Mesh(nozzleGeo, nozzleMat);
      group.add(nozzleMesh);

      // Inlet Bell-Mouth Flare Ring
      const flareGeo = new THREE.TorusGeometry(nozzleOuterR, R * 0.05, 16, 48);
      flareGeo.rotateX(Math.PI / 2);
      const flareMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        wireframe: forceWire,
        metalness: 0.8,
      });
      const flareMesh = new THREE.Mesh(flareGeo, flareMat);
      flareMesh.position.z = -nozzleLength * 0.5;
      group.add(flareMesh);
    }

    // 4. Build Individual Blade Meshes around Hub
    for (let i = 0; i < numBlades; i++) {
      const bladeAngle = (i * 2 * Math.PI) / numBlades;
      const bladeGeo = buildSingleBladeGeometry(
        R,
        hubR,
        pitchRatio,
        expandedAreaRatio,
        isClippingActive ? sectionCutR : 1.0,
        colorMode === 'pressure',
        activePropType
      );
      const bladeMesh = new THREE.Mesh(bladeGeo, bladeMaterial);

      bladeMesh.rotation.z = bladeAngle;

      if (colorMode === 'exploded') {
        const explRad = R * 0.3;
        bladeMesh.position.x = explRad * Math.cos(bladeAngle);
        bladeMesh.position.y = explRad * Math.sin(bladeAngle);
      }

      group.add(bladeMesh);
    }

    // 5. Streamlines / Flow Particle lines
    if (showFlowLines && flowGroup) {
      for (let k = 0; k < 24; k++) {
        const rad = hubR * 1.1 + (R * 0.9 * k) / 24;
        const ang = (k * Math.PI) / 6;
        const curvePoints: THREE.Vector3[] = [];
        for (let z = -R; z <= R; z += R / 10) {
          const twistAng = ang + (z / R) * 0.6;
          curvePoints.push(new THREE.Vector3(rad * Math.cos(twistAng), rad * Math.sin(twistAng), z));
        }
        const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveMat = new THREE.LineBasicMaterial({
          color: k % 2 === 0 ? 0x38bdf8 : 0xf59e0b,
          transparent: true,
          opacity: 0.6,
        });
        const line = new THREE.Line(curveGeo, curveMat);
        flowGroup.add(line);
      }
    }
  };

  // Helper to build a parametrically twisted 3D blade geometry
  const buildSingleBladeGeometry = (
    R: number,
    hubR: number,
    pRatio: number,
    ear: number,
    cutRRatio: number,
    useVertexColors: boolean,
    pType: PropellerType
  ): THREE.BufferGeometry => {
    const geometry = new THREE.BufferGeometry();
    const radialSteps = 14;
    const chordSteps = 12;

    const vertices: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];

    const effectiveMaxR = Math.min(R, hubR + (R - hubR) * cutRRatio);
    const isKaplan = pType === 'Kaplan' || pType === 'Ducted_Kort';

    for (let rIdx = 0; rIdx <= radialSteps; rIdx++) {
      const frac = rIdx / radialSteps;
      const curR = hubR + (effectiveMaxR - hubR) * frac;
      const rRatioVal = curR / R;

      // Chord length at radius
      // Kaplan blades have wide square tips to fit tight in Kort nozzles
      const chordDistribution = isKaplan
        ? (1.2 - 0.4 * Math.pow(rRatioVal - 0.7, 2))
        : (1.0 - 1.8 * Math.pow(rRatioVal - 0.6, 2));

      const chordLen = ((Math.PI * R * 2 * ear) / (numBlades * 1.4)) * chordDistribution;
      const pitchLoc = pRatio * R * 2;
      const twistRad = Math.atan(pitchLoc / (2 * Math.PI * curR));

      // Skew & Rake
      const skewAngle = 0.45 * Math.pow(rRatioVal, 2);
      const rakeZ = 0.08 * R * Math.pow(rRatioVal, 1.5);

      for (let cIdx = 0; cIdx <= chordSteps; cIdx++) {
        const cFrac = cIdx / chordSteps - 0.5; // -0.5 to 0.5
        const xChord = cFrac * Math.max(0.01, chordLen);

        // NACA thickness distribution
        const s = cIdx / chordSteps;
        const thick = (0.08 * R * (1.1 - 0.8 * rRatioVal)) * (4 * s * (1 - s));

        // Coordinate transformations
        const localX = curR + xChord * Math.sin(skewAngle);
        const localY = xChord * Math.cos(twistRad);
        const localZ = rakeZ + xChord * Math.sin(twistRad) + thick * 0.5;

        vertices.push(localX, localY, localZ);

        // Hydrodynamic CFD Color Mapping (Pressure coefficient CP: red on face, blue on back)
        if (useVertexColors) {
          const pressureCp = (1 - s) * (1 - rRatioVal) * 1.2;
          if (pressureCp > 0.5) {
            colors.push(0.9, 0.2, 0.2); // High pressure red
          } else if (pressureCp > 0.2) {
            colors.push(0.9, 0.8, 0.2); // Yellow
          } else {
            colors.push(0.2, 0.6, 0.9); // Low pressure blue
          }
        }
      }
    }

    // Build triangular indices
    const stride = chordSteps + 1;
    for (let rIdx = 0; rIdx < radialSteps; rIdx++) {
      for (let cIdx = 0; cIdx < chordSteps; cIdx++) {
        const i1 = rIdx * stride + cIdx;
        const i2 = i1 + 1;
        const i3 = (rIdx + 1) * stride + cIdx;
        const i4 = i3 + 1;

        indices.push(i1, i2, i3);
        indices.push(i2, i4, i3);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    if (useVertexColors && colors.length > 0) {
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  };

  const handleResetCamera = () => {
    if (cameraRef.current && propellerGroupRef.current) {
      cameraRef.current.position.set(0, 0, diameterM * 1.8);
      propellerGroupRef.current.rotation.set(0, 0, 0);
    }
  };

  // Calculated hydrofoil section profile properties for HUD card
  const R = diameterM / 2;
  const isCPP = activePropType === 'CPP';
  const isDucted = activePropType === 'Ducted_Kort' || activePropType === 'Kaplan';
  const hubR = R * (isCPP ? 0.28 : isDucted ? 0.22 : 0.18);
  const curCutR = hubR + (R - hubR) * sectionCutR;
  const isKaplan = activePropType === 'Kaplan' || activePropType === 'Ducted_Kort';
  const chordDistFactor = isKaplan
    ? (1.2 - 0.4 * Math.pow(sectionCutR - 0.7, 2))
    : (1.0 - 1.8 * Math.pow(sectionCutR - 0.6, 2));
  const sectionChord = ((Math.PI * R * 2 * expandedAreaRatio) / (numBlades * 1.4)) * chordDistFactor;
  const sectionThickness = 0.08 * R * (1.1 - 0.8 * sectionCutR);
  const sectionPitch = pitchRatio * diameterM;
  const sectionTwistDeg = (Math.atan(sectionPitch / (2 * Math.PI * Math.max(0.01, curCutR))) * 180) / Math.PI;

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 space-y-4 relative overflow-hidden shadow-2xl">
      {/* Top Header Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/90 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm text-white hidden sm:inline">3D Hydrodynamic Propeller View</span>
          
          {/* Quick Propeller Type Selector inside 3D Toolbar */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] hidden md:inline">Type:</span>
            <select
              value={activePropType}
              onChange={(e) => handleTypeChange(e.target.value as PropellerType)}
              className="bg-transparent text-cyan-300 font-bold focus:outline-none cursor-pointer"
            >
              <option value="FPP" className="bg-slate-900 text-white">Fixed Pitch (FPP)</option>
              <option value="CPP" className="bg-slate-900 text-white">Controllable Pitch (CPP)</option>
              <option value="Ducted_Kort" className="bg-slate-900 text-white">Ducted Kort Nozzle</option>
              <option value="Wageningen_B" className="bg-slate-900 text-white">Wageningen B-Series</option>
              <option value="Gawn_Series" className="bg-slate-900 text-white">Gawn High-Speed</option>
              <option value="Ice_Class" className="bg-slate-900 text-white">Ice Class Heavy Duty</option>
            </select>
          </div>
        </div>

        {/* View Mode & Wireframe Controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {/* Cross-Section Clipping Toggle */}
          <button
            onClick={() => setIsClippingActive(!isClippingActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition shadow-sm ${
              isClippingActive
                ? 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Toggle Cross-Section Radial Slicing & Profile Cut View"
          >
            <Scissors className="w-3.5 h-3.5" />
            Section Cut: {isClippingActive ? 'ON' : 'OFF'}
          </button>

          {/* Preset Station Buttons when Clipping is active */}
          {isClippingActive && (
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold px-1">Station:</span>
              {[0.2, 0.5, 0.7, 0.9].map((station) => (
                <button
                  key={station}
                  onClick={() => setSectionCutR(station)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                    Math.abs(sectionCutR - station) < 0.02
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {station.toFixed(1)}R
                </button>
              ))}
            </div>
          )}

          {/* Wireframe Toggle Button */}
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition shadow-sm ${
              isWireframe
                ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
            title="Toggle Mesh Wireframe Rendering"
          >
            <Grid className="w-3.5 h-3.5" />
            Wireframe: {isWireframe ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setColorMode('metallic')}
            className={`px-3 py-1.5 rounded-xl transition ${
              colorMode === 'metallic'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Bronze
          </button>
          <button
            onClick={() => setColorMode('pressure')}
            className={`px-3 py-1.5 rounded-xl transition ${
              colorMode === 'pressure'
                ? 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Pressure Map
          </button>
          <button
            onClick={() => setColorMode('velocity')}
            className={`px-3 py-1.5 rounded-xl transition ${
              colorMode === 'velocity'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Velocity
          </button>
          <button
            onClick={() => setColorMode('cavitation')}
            className={`px-3 py-1.5 rounded-xl transition ${
              colorMode === 'cavitation'
                ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Cavitation
          </button>
          <button
            onClick={() => setColorMode('exploded')}
            className={`px-3 py-1.5 rounded-xl transition ${
              colorMode === 'exploded'
                ? 'bg-indigo-500 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Exploded
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Real-time Rotation & Simulation HUD Overlay */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 space-y-2.5 text-xs text-slate-200 shadow-2xl max-w-xs">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <span className="font-bold text-cyan-400 flex items-center gap-1.5">
              <RotateCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              Real-time Rotation
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setReverseRotation(!reverseRotation)}
                className={`p-1 rounded-lg border text-[10px] font-bold transition ${
                  reverseRotation ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title="Toggle rotation direction (CW / CCW)"
              >
                {reverseRotation ? 'CCW' : 'CW'}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition"
                title={isPlaying ? 'Pause Rotation' : 'Start Rotation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Shaft Speed</span>
              <span className="font-bold text-cyan-400">{rpmSpeed} RPM</span>
            </div>
            <input
              type="range"
              min="10"
              max="240"
              step="5"
              value={rpmSpeed}
              onChange={(e) => setRpmSpeed(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Radial Section Cut Position</span>
              <span className="font-bold text-amber-400">{sectionCutR.toFixed(2)} R</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.0"
              step="0.05"
              value={sectionCutR}
              onChange={(e) => {
                setSectionCutR(Number(e.target.value));
                if (!isClippingActive) setIsClippingActive(true);
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px]">
            <span className="text-slate-400">Flow Streamlines</span>
            <input
              type="checkbox"
              checked={showFlowLines}
              onChange={(e) => setShowFlowLines(e.target.checked)}
              className="accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Info Overlay */}
        <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 text-right shadow-2xl">
          <div className="font-black text-white text-sm">{activePropType.replace('_', ' ')}</div>
          <div className="text-slate-400">Diameter (D): <span className="text-cyan-400 font-bold">{diameterM.toFixed(2)} m</span></div>
          <div className="text-slate-400">Blades (Z): <span className="text-white font-bold">{numBlades}</span></div>
          <div className="text-slate-400">Pitch Ratio (P/D): <span className="text-amber-400 font-bold">{pitchRatio.toFixed(2)}</span></div>
          <div className="text-slate-400">EAR: <span className="text-emerald-400 font-bold">{expandedAreaRatio.toFixed(2)}</span></div>
          <div className="text-slate-400 text-[10px] pt-1">{materialName}</div>
        </div>

        {/* Hydrofoil Cross-Section Profile Inspection Card */}
        {isClippingActive && (
          <div className="absolute bottom-12 right-3 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/40 text-xs text-slate-200 shadow-2xl max-w-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-amber-400" />
                Cross-Section Cut @ {sectionCutR.toFixed(2)} R
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px] border border-amber-500/30">
                PROFILE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Radius (r)</span>
                <span className="font-bold text-cyan-400">{curCutR.toFixed(3)} m</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Local Chord c(r)</span>
                <span className="font-bold text-emerald-400">{sectionChord.toFixed(3)} m</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Max Thickness t</span>
                <span className="font-bold text-amber-400">{sectionThickness.toFixed(3)} m</span>
              </div>
              <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px]">Twist Angle φ</span>
                <span className="font-bold text-rose-400">{sectionTwistDeg.toFixed(1)}°</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 pt-1 flex justify-between items-center border-t border-slate-800/60">
              <span>t/c Ratio: <strong className="text-slate-200">{((sectionThickness / Math.max(0.001, sectionChord)) * 100).toFixed(1)}%</strong></span>
              <span className="text-cyan-400 font-semibold">NACA 66 / Mean a=0.8</span>
            </div>
          </div>
        )}

        {/* Bottom Navigation Hints & Reset */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-400 pointer-events-none">
          <span className="bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-800 backdrop-blur-md">
            Click & drag to orbit • Scroll to zoom
          </span>

          <button
            onClick={handleResetCamera}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-slate-800 backdrop-blur-md transition"
          >
            <Compass className="w-3.5 h-3.5" />
            Reset Camera
          </button>
        </div>
      </div>
    </div>
  );
};

