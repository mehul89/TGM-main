import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type RegionKey = 'all' | 'uae' | 'africa' | 'india';

interface PlanetGlobeProps {
  activeRegion: RegionKey;
  activePinId: string;
  onSelectPin: (pinId: string, region: 'uae' | 'africa' | 'india') => void;
  hoveredRegion: RegionKey | null;
}

interface LocationCoord {
  id: string;
  region: 'uae' | 'africa' | 'india';
  city: string;
  country: string;
  lat: number;
  lon: number;
}

const LOCATIONS: LocationCoord[] = [
  { id: 'dubai', region: 'uae', city: 'Dubai & Abu Dhabi', country: 'UAE', lat: 25.2, lon: 55.3 },
  { id: 'tanzania', region: 'africa', city: 'Dar es Salaam', country: 'Tanzania', lat: -6.8, lon: 39.3 },
  { id: 'zambia', region: 'africa', city: 'Lusaka & Copperbelt', country: 'Zambia', lat: -15.4, lon: 28.3 },
  { id: 'mozambique', region: 'africa', city: 'Maputo & Beira', country: 'Mozambique', lat: -25.9, lon: 32.6 },
  { id: 'india', region: 'india', city: 'Gujarat & Mumbai', country: 'India', lat: 19.1, lon: 72.9 },
];

const GLOBE_RADIUS = 100;

// Convert lat/long to 3D Cartesian coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Draw authentic world map texture with highlighted UAE, Africa, and India
function createWorldTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const W = canvas.width;
  const H = canvas.height;

  // 1. Deep luxury ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
  oceanGrad.addColorStop(0, '#051810');
  oceanGrad.addColorStop(0.5, '#072418');
  oceanGrad.addColorStop(1, '#03100A');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  // Helper: map (lon, lat) to canvas (x, y)
  const toX = (lon: number) => ((lon + 180) / 360) * W;
  const toY = (lat: number) => ((90 - lat) / 180) * H;

  // 2. Subtle latitude & longitude grid
  ctx.strokeStyle = 'rgba(197, 159, 90, 0.08)';
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 6]);

  for (let lat = -80; lat <= 80; lat += 20) {
    ctx.beginPath();
    ctx.moveTo(0, toY(lat));
    ctx.lineTo(W, toY(lat));
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    ctx.beginPath();
    ctx.moveTo(toX(lon), 0);
    ctx.lineTo(toX(lon), H);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Helper function to draw polygons from coordinate arrays
  const drawPolygon = (
    coords: [number, number][],
    fillColor: string,
    strokeColor: string,
    strokeWidth = 1.5,
    glow = false
  ) => {
    if (coords.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(toX(coords[0][0]), toY(coords[0][1]));
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(toX(coords[i][0]), toY(coords[i][1]));
    }
    ctx.closePath();

    if (glow) {
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 14;
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  // 3. World Continents (Exact Authentic Geography)
  // Eurasia / North Asia
  drawPolygon(
    [
      [-9, 36], [0, 44], [3, 47], [9, 54], [12, 57], [25, 71], [40, 68],
      [60, 70], [80, 73], [105, 78], [130, 72], [160, 70], [175, 66],
      [160, 56], [142, 50], [130, 42], [120, 32], [110, 20], [104, 10],
      [100, 4], [98, 10], [90, 22], [80, 22], [75, 28], [68, 25],
      [60, 25], [55, 30], [45, 40], [35, 36], [28, 41], [22, 38],
      [14, 40], [10, 44], [3, 43], [-4, 37], [-9, 36]
    ],
    '#0B2B1E',
    'rgba(197, 159, 90, 0.22)'
  );

  // North America
  drawPolygon(
    [
      [-168, 65], [-150, 70], [-130, 70], [-100, 72], [-80, 72], [-65, 60],
      [-55, 50], [-70, 42], [-75, 35], [-80, 26], [-87, 21], [-97, 19],
      [-105, 23], [-115, 30], [-124, 38], [-125, 48], [-140, 58], [-160, 56]
    ],
    '#0B2B1E',
    'rgba(197, 159, 90, 0.18)'
  );

  // South America
  drawPolygon(
    [
      [-75, 10], [-60, 8], [-50, -2], [-35, -6], [-38, -16], [-48, -28],
      [-55, -38], [-68, -54], [-75, -45], [-72, -30], [-78, -15], [-80, -2]
    ],
    '#0B2B1E',
    'rgba(197, 159, 90, 0.18)'
  );

  // Australia
  drawPolygon(
    [
      [114, -22], [122, -18], [130, -12], [142, -11], [150, -22],
      [153, -28], [148, -37], [138, -35], [128, -32], [115, -34], [113, -25]
    ],
    '#0B2B1E',
    'rgba(197, 159, 90, 0.18)'
  );

  // West & North Africa (Context)
  drawPolygon(
    [
      [-17, 15], [-17, 21], [-13, 28], [-6, 36], [10, 37], [25, 32],
      [32, 31], [32, 24], [37, 20], [43, 12], [40, 4], [30, 3],
      [15, 4], [8, 4], [3, 6], [-4, 5], [-12, 8], [-17, 15]
    ],
    '#0F3827',
    'rgba(197, 159, 90, 0.35)'
  );

  // =====================================================================
  // 4. HIGHLIGHTED OPERATIONAL REGIONS (Authentic Sovereign Boundaries)
  // =====================================================================

  // A. EAST & SOUTHERN AFRICA (Tanzania, Zambia, Mozambique, Kenya, South Africa)
  drawPolygon(
    [
      [30, 4], [35, 4], [41, 4], [44, -1], [40, -4], [39.3, -6.8], [40.5, -10.5],
      [40.5, -15], [36, -18], [35, -24], [32.6, -25.9], [31, -30], [26, -34],
      [18.5, -34.4], [18, -33], [14.5, -23], [12, -15], [13, -9], [17, -5],
      [22, -10], [28.3, -15.4], [33, -12], [35, -5], [30, 4]
    ],
    '#1B5E43',
    '#DFBA79',
    2.5,
    true
  );

  // Madagascar
  drawPolygon(
    [
      [49.3, -12], [50.5, -16], [47, -25.5], [44, -25], [43.5, -20], [48, -13]
    ],
    '#174F38',
    '#C59F5A',
    1.5
  );

  // B. ARABIAN PENINSULA & UNITED ARAB EMIRATES
  // Entire Arabian Peninsula outline
  drawPolygon(
    [
      [32.5, 30], [35, 29.5], [39, 21.5], [43, 14.8], [43.5, 12.6],
      [45, 12.8], [49, 14.5], [54, 17], [59.8, 22.5], [58.6, 23.6],
      [56.4, 26.2], [55.3, 25.2], [54.3, 24.4], [51.5, 25.3], [48, 29.4],
      [45, 31], [37, 31.5], [32.5, 30]
    ],
    '#164D37',
    'rgba(223, 186, 121, 0.65)',
    1.8
  );

  // UAE Specific Sovereign Focus (Vibrant Golden Glow Highlight)
  drawPolygon(
    [
      [51.6, 24.2], [52.8, 24.1], [54.0, 24.3], [55.3, 25.3],
      [56.4, 26.1], [56.3, 24.8], [55.8, 24.2], [55.2, 23.8],
      [53.8, 23.5], [52.4, 23.8], [51.6, 24.2]
    ],
    '#C59F5A',
    '#FFF2DF',
    2.8,
    true
  );

  // C. INDIAN SUBCONTINENT (Authentic Shape: Gujarat, Mumbai, Peninsular India)
  drawPolygon(
    [
      [68.8, 23.8], [69.0, 22.3], [70.9, 20.7], [72.2, 21.7], [72.8, 21.2],
      [72.9, 19.1], [73.8, 15.5], [74.8, 12.9], [76.3, 9.9], [77.5, 8.1],
      [80.3, 13.1], [83.3, 17.7], [88.3, 22.5], [89, 26], [85, 27],
      [78, 30], [74, 32], [70, 28], [68.8, 23.8]
    ],
    '#1D6347',
    '#DFBA79',
    2.4,
    true
  );

  // Sri Lanka
  drawPolygon(
    [
      [80, 9.8], [81.8, 8.5], [81.5, 6.8], [80.5, 6.0], [79.8, 7.5]
    ],
    '#174F38',
    '#C59F5A',
    1.5
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const PlanetGlobe: React.FC<PlanetGlobeProps> = ({
  activeRegion,
  activePinId,
  onSelectPin,
  hoveredRegion,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.15, y: -0.9 });
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const [pinScreenCoords, setPinScreenCoords] = useState<{ [key: string]: { x: number; y: number; visible: boolean } }>({});

  // Rotation targets for each corridor view (bringing them front & center)
  useEffect(() => {
    const region = hoveredRegion || activeRegion;
    let targetY = -0.9; // Default corridor center (Middle East / Indian Ocean)
    let targetX = 0.15;

    if (region === 'uae') {
      targetY = -0.95; // Dubai directly facing camera
      targetX = 0.22;
    } else if (region === 'africa') {
      targetY = -0.65; // East & Southern Africa facing camera
      targetX = -0.05;
    } else if (region === 'india') {
      targetY = -1.25; // India facing camera
      targetX = 0.25;
    }

    targetRotationRef.current = { x: targetX, y: targetY };
  }, [activeRegion, hoveredRegion]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 440;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 270);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Globe Group Hierarchy
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = targetRotationRef.current.x;
    globeGroup.rotation.y = targetRotationRef.current.y;
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 3. Globe Base Sphere & Texture
    const worldTexture = createWorldTexture();
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      map: worldTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x34d399),
      shininess: 14,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // 4. Subtle Outer Atmosphere Glow
    const atmosGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.05, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0xdfba79,
      transparent: true,
      opacity: 0.09,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 5. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff2df, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff2df, 1.8);
    sunLight.position.set(200, 150, 150);
    scene.add(sunLight);

    const rimLight = new THREE.PointLight(0xc59f5a, 2.5, 400);
    rimLight.position.set(-180, -100, -100);
    scene.add(rimLight);

    // 6. 3D Trade Flight Arcs (Dubai to Africa and India)
    const dubaiVec = latLonToVector3(25.2, 55.3, GLOBE_RADIUS);
    const arcDestinations = [
      { id: 'tanzania', lat: -6.8, lon: 39.3 },
      { id: 'zambia', lat: -15.4, lon: 28.3 },
      { id: 'mozambique', lat: -25.9, lon: 32.6 },
      { id: 'india', lat: 19.1, lon: 72.9 },
    ];

    const arcLines: THREE.Line[] = [];
    arcDestinations.forEach((dest) => {
      const destVec = latLonToVector3(dest.lat, dest.lon, GLOBE_RADIUS);
      const midVec = dubaiVec.clone().lerp(destVec, 0.5);
      const distance = dubaiVec.distanceTo(destVec);
      midVec.normalize().multiplyScalar(GLOBE_RADIUS + distance * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(dubaiVec, midVec, destVec);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const curveMat = new THREE.LineDashedMaterial({
        color: 0xdfba79,
        dashSize: 4,
        gapSize: 2.5,
        linewidth: 2,
        transparent: true,
        opacity: 0.85,
      });

      const line = new THREE.Line(curveGeo, curveMat);
      line.computeLineDistances();
      globeGroup.add(line);
      arcLines.push(line);
    });

    // 7. Location Pins & Radar Blips
    const pinRings: THREE.Mesh[] = [];
    LOCATIONS.forEach((loc) => {
      const pos = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS);
      const normal = pos.clone().normalize();

      // Glowing Node Pin
      const pinGeo = new THREE.SphereGeometry(loc.id === 'dubai' ? 2.8 : 2.2, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({
        color: loc.id === 'dubai' ? 0xfff2df : 0xdfba79,
      });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(1.2)));
      globeGroup.add(pinMesh);

      // Radar Ring
      const ringGeo = new THREE.RingGeometry(1.5, 3.2, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xdfba79,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().add(normal.clone().multiplyScalar(0.4)));
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      globeGroup.add(ringMesh);
      pinRings.push(ringMesh);
    });

    // 8. Mouse Drag Interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x + deltaY * 0.006));
      targetRotationRef.current = { x: globeGroup.rotation.x, y: globeGroup.rotation.y };

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;
      globeGroup.rotation.y += deltaX * 0.007;
      globeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, globeGroup.rotation.x + deltaY * 0.007));
      targetRotationRef.current = { x: globeGroup.rotation.x, y: globeGroup.rotation.y };
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 440;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let ringScale = 1;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth Lerp towards target region rotation when not actively dragging
      if (!isDraggingRef.current) {
        globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.04;
        globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.04;
      }

      // Animate pulsed radar rings
      ringScale += delta * 1.5;
      if (ringScale > 2.8) ringScale = 1;
      pinRings.forEach((ring) => {
        ring.scale.set(ringScale, ringScale, 1);
        (ring.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.85 - (ringScale - 1) * 0.45);
      });

      // Animate dashed arc flow
      arcLines.forEach((line) => {
        const mat = line.material as THREE.LineDashedMaterial;
        mat.dashSize = 4 + Math.sin(clock.getElapsedTime() * 3) * 0.5;
      });

      // Project 3D Pin Coordinates to 2D Screen Space for Interactive Badges
      const newCoords: { [key: string]: { x: number; y: number; visible: boolean } } = {};
      const tempVec = new THREE.Vector3();

      LOCATIONS.forEach((loc) => {
        const localPos = latLonToVector3(loc.lat, loc.lon, GLOBE_RADIUS + 4);
        localPos.applyMatrix4(globeGroup.matrixWorld);

        // Check if facing camera (dot product with camera ray)
        tempVec.copy(localPos).project(camera);
        const isFacing = localPos.z > 0;

        const screenX = ((tempVec.x + 1) * width) / 2;
        const screenY = ((-tempVec.y + 1) * height) / 2;

        newCoords[loc.id] = {
          x: screenX,
          y: screenY,
          visible: isFacing && screenX > 20 && screenX < width - 20 && screenY > 20 && screenY < height - 20,
        };
      });

      setPinScreenCoords(newCoords);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      sphereGeo.dispose();
      sphereMat.dispose();
      worldTexture.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      renderer.dispose();
      if (domEl.parentNode) {
        domEl.parentNode.removeChild(domEl);
      }
    };
  }, []);

  return (
    <div className="planet-globe-wrapper" ref={mountRef}>
      {/* Interactive 3D Screen Overlay Badges */}
      {LOCATIONS.map((loc) => {
        const coord = pinScreenCoords[loc.id];
        if (!coord || !coord.visible) return null;
        const isSelected = activePinId === loc.id;
        const isDubai = loc.id === 'dubai';

        return (
          <button
            key={loc.id}
            type="button"
            className={`globe-pin-label ${isSelected ? 'active' : ''} ${isDubai ? 'dubai-hub' : ''}`}
            style={{
              transform: `translate3d(${coord.x}px, ${coord.y}px, 0)`,
            }}
            onClick={() => onSelectPin(loc.id, loc.region)}
          >
            <span className="globe-pin-beacon" />
            <span className="globe-pin-text">{loc.city}</span>
          </button>
        );
      })}

      {/* Orbit Helper Instruction */}
      <div className="globe-drag-hint" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
        <span>Drag to rotate planet · Click hubs to inspect</span>
      </div>
    </div>
  );
};
