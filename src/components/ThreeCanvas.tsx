import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface InfNode {
  id: string;
  name: string;
  status: string;
  type: string;
  metrics: string;
  position: THREE.Vector3;
  color: number;
}

export default function ThreeCanvas({ isDarkMode = true }: { isDarkMode?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<InfNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<InfNode | null>(null);

  // Define cluster nodes
  const nodes: InfNode[] = [
    {
      id: "api-gateway",
      name: "Sembark Core API Cluster",
      status: "ACTIVE",
      type: "Gateway / Reverse Proxy",
      metrics: "99.99% SLA, Load: 42%, RT: ~14ms",
      position: new THREE.Vector3(0, 1.8, 0),
      color: 0x38bdf8 // Cyan
    },
    {
      id: "auth-firebase",
      name: "Firebase Auth & Guard",
      status: "SECURED",
      type: "Identification & Token Vault",
      metrics: "Verified Handshake, Active sessions: 14.8k",
      position: new THREE.Vector3(-2.8, 0.4, 1.2),
      color: 0xf59e0b // Amber
    },
    {
      id: "database",
      name: "Relational DB Instance",
      status: "STRENGTHENED",
      type: "PostgreSQL & SQLite Replica",
      metrics: "I/O 14k/sec, Sync lag: 2ms",
      position: new THREE.Vector3(2.8, 0.4, -1.2),
      color: 0x10b981 // Emerald Green
    },
    {
      id: "healthguard",
      name: "HealthGuard Symptom Classifier",
      status: "INFERENCE ACTIVE",
      type: "AI Diagnostic Predictor Pipeline",
      metrics: "Inference 85ms, Accuracy: 94.2%",
      position: new THREE.Vector3(-1.8, -1.5, -1.8),
      color: 0xa855f7 // Purple
    },
    {
      id: "medibot",
      name: "MediBot Follow-up Core",
      status: "STREAMING",
      type: "NLP Diagnostic Agent Engine",
      metrics: "Output: 62 tokens/sec, Context: 8k",
      position: new THREE.Vector3(1.8, -1.5, 1.8),
      color: 0xec4899 // Pink
    },
    {
      id: "fraud-evaluator",
      name: "Fraud Engine Service",
      status: "MONITORING",
      type: "Random Forest Decision Matrix",
      metrics: "Data: 6.3M records, Score: 0.98 Area-ROC",
      position: new THREE.Vector3(3.2, 2.0, 1.5),
      color: 0xef4444 // Red
    },
    {
      id: "air-canvas-router",
      name: "Gesture Vector Router",
      status: "IDLE",
      type: "Low-Latency Image Pipeline",
      metrics: "FP-Rate: <1%, Latency: 4.8ms",
      position: new THREE.Vector3(-3.2, 2.0, -1.5),
      color: 0x14b8a6 // Teal
    }
  ];

  // Connections mapping (indices in nodes array)
  const connections = [
    [0, 1], // Core gateway -> Auth
    [0, 2], // Core gateway -> DB
    [0, 3], // Core gateway -> HealthGuard
    [0, 4], // Core gateway -> MediBot
    [0, 5], // Core gateway -> Fraud Engine
    [0, 6], // Core gateway -> Air Canvas Router
    [1, 2], // Auth -> DB
    [3, 4], // HealthGuard -> MediBot
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // SCENE & SYSTEM
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x050505 : 0xf8fafc, 0.05);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ROOT HIERARCHY GROUP
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // AMBIENT BACKGROUND STARS PARTICLES
    const starCount = 300;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      // Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 12 + Math.random() * 25;

      starPositions[idx] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = r * Math.cos(phi);

      // Deep cyan/purple background stars (dark) or soft slate/teal points (light)
      if (isDarkMode) {
        starColors[idx] = 0.2 + Math.random() * 0.3;
        starColors[idx + 1] = 0.4 + Math.random() * 0.4;
        starColors[idx + 2] = 0.8 + Math.random() * 0.2;
      } else {
        starColors[idx] = 0.4 + Math.random() * 0.15;
        starColors[idx + 1] = 0.5 + Math.random() * 0.15;
        starColors[idx + 2] = 0.6 + Math.random() * 0.15;
      }
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // CREATE GEOMETRIES & MESHES FOR NODES
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeOuterGlows: THREE.Mesh[] = [];

    nodes.forEach((n) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.copy(n.position);

      // Core Solid Sphere
      const sizeMultiplier = n.id === "api-gateway" ? 1.3 : 1.0;
      const coreGeo = new THREE.SphereGeometry(0.24 * sizeMultiplier, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: n.color,
        transparent: true,
        opacity: 0.95
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { nodeId: n.id };
      nodeMeshes.push(coreMesh);
      nodeSubGroup.add(coreMesh);

      // Outer Glowing Ring / Atmosphere
      const glowGeo = new THREE.SphereGeometry(0.38 * sizeMultiplier, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: n.color,
        transparent: true,
        opacity: 0.25,
        wireframe: true
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.userData = { nodeId: n.id };
      nodeOuterGlows.push(glowMesh);
      nodeSubGroup.add(glowMesh);

      systemGroup.add(nodeSubGroup);
    });

    // RENDER INTERACTION LANES (LINES)
    const lineMat = new THREE.LineBasicMaterial({
      color: isDarkMode ? 0x334155 : 0xcbd5e1, // Slate or Light Slate
      transparent: true,
      opacity: 0.6
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePoints: number[] = [];

    connections.forEach(([sourceIdx, targetIdx]) => {
      const p1 = nodes[sourceIdx].position;
      const p2 = nodes[targetIdx].position;
      linePoints.push(p1.x, p1.y, p1.z);
      linePoints.push(p2.x, p2.y, p2.z);
    });

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const infrastructureLines = new THREE.LineSegments(linesGeometry, lineMat);
    systemGroup.add(infrastructureLines);

    // DATA PACKETS FLOWING ALONG EDGES
    interface DataPacket {
      source: THREE.Vector3;
      target: THREE.Vector3;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
      color: number;
    }
    const dataPackets: DataPacket[] = [];
    const packetGeometry = new THREE.SphereGeometry(0.06, 8, 8);

    const spawnPacket = (sourceIdx: number, targetIdx: number) => {
      const sourceNode = nodes[sourceIdx];
      const targetNode = nodes[targetIdx];
      const pMat = new THREE.MeshBasicMaterial({
        color: sourceNode.color,
        transparent: true,
        opacity: 0.9
      });
      const pMesh = new THREE.Mesh(packetGeometry, pMat);
      systemGroup.add(pMesh);

      dataPackets.push({
        source: sourceNode.position.clone(),
        target: targetNode.position.clone(),
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        mesh: pMesh,
        color: sourceNode.color
      });
    };

    // Fast-spawn initial packets
    connections.forEach(([s, t]) => {
      if (Math.random() > 0.3) {
        spawnPacket(s, t);
      }
    });

    // LIGHTING FOR RAYCASTING / MATERIAL
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // MOUSE DRAG ROTATION MECHANIC WITH SPRING INTERPOLATION
    let isDragging = false;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let previousMouseX = 0;
    let previousMouseY = 0;

    // RAYCASTING
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateMouseCoords = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        previousMouseX = clientX;
        previousMouseY = clientY;
      }

      // Update pointer for hover detection
      updateMouseCoords(clientX, clientY);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // CLICK EVENT DETECTOR FOR SPECIFIC NODES
    const handlePointerClick = (e: MouseEvent) => {
      updateMouseCoords(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const nodeId = clickedMesh.userData.nodeId;
        const matchedNode = nodes.find(n => n.id === nodeId);
        if (matchedNode) {
          setSelectedNode(matchedNode);

          // Visual pop on select - burst particles or custom ripple action
          clickedMesh.scale.set(1.6, 1.6, 1.6);
          setTimeout(() => {
            clickedMesh.scale.set(1, 1, 1);
          }, 300);

          // Force spawn packets on connection routes from this node
          connections.forEach(([s, t]) => {
            const matchedIndex = nodes.findIndex(n => n.id === matchedNode.id);
            if (s === matchedIndex) spawnPacket(s, t);
            if (t === matchedIndex) spawnPacket(t, s);
          });
        }
      }
    };

    // REGISTER EVENT LISTENERS
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('click', handlePointerClick);

    // Touch Support
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // ANIMATION TICK LOOP
    let animationFrameId: number;
    let tick = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      tick += 0.01;

      // Smooth inertia rotation transition
      currentRotationX += (targetRotationX - currentRotationX) * 0.07;
      currentRotationY += (targetRotationY - currentRotationY) * 0.07;

      // Constrain rotation pitch to avoid flipping upside down
      currentRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, currentRotationX));

      systemGroup.rotation.y = currentRotationY;
      systemGroup.rotation.x = currentRotationX;

      // Breathe effect for StarField and Nodes
      starField.rotation.y = tick * 0.012;
      starField.rotation.x = tick * 0.005;

      nodeOuterGlows.forEach((outerMesh, i) => {
        const pulse = 1.0 + Math.sin(tick * 3 + i * 1.5) * 0.12;
        outerMesh.scale.set(pulse, pulse, pulse);
        outerMesh.rotation.y += 0.005;
        outerMesh.rotation.z -= 0.003;
      });

      // Animate flowing packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const pk = dataPackets[i];
        pk.progress += pk.speed;

        if (pk.progress >= 1.0) {
          // Recycle/Remove packet
          systemGroup.remove(pk.mesh);
          dataPackets.splice(i, 1);

          // Spawn next packet with some probability to keep loop going
          if (Math.random() > 0.4 && dataPackets.length < 15) {
            const randomConn = connections[Math.floor(Math.random() * connections.length)];
            spawnPacket(randomConn[0], randomConn[1]);
          }
        } else {
          // Lerp position
          pk.mesh.position.lerpVectors(pk.source, pk.target, pk.progress);
          // Add a tiny sine curve offset for high visual impact "flying" physics
          const dist = pk.source.distanceTo(pk.target);
          const arc = Math.sin(pk.progress * Math.PI) * (dist * 0.15);
          pk.mesh.position.y += arc;
        }
      }

      // Spawn occasional ambient packet if empty
      if (dataPackets.length < 4) {
        const randomConn = connections[Math.floor(Math.random() * connections.length)];
        spawnPacket(randomConn[0], randomConn[1]);
      }

      // RAYCAST HOVER CHECKER
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const nodeId = hoveredMesh.userData.nodeId;
        const matchedNode = nodes.find(n => n.id === nodeId);
        if (matchedNode) {
          setHoveredNode(matchedNode);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode(null);
        container.style.cursor = 'grab';
        if (isDragging) container.style.cursor = 'grabbing';
      }

      renderer.render(scene, camera);
    };

    animate();

    // AUTO RESIZE HANDLER
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: currentW, height: currentH } = entries[0].contentRect;
      const finalH = currentH || 500;

      camera.aspect = currentW / finalH;
      camera.updateProjectionMatrix();
      renderer.setSize(currentW, finalH);
    });

    resizeObserver.observe(container);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      // Clear memory references
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('click', handlePointerClick);

      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      dataPackets.forEach((p) => {
        systemGroup.remove(p.mesh);
      });

      starGeometry.dispose();
      starMaterial.dispose();
      linesGeometry.dispose();
      lineMat.dispose();
      packetGeometry.dispose();

      nodeMeshes.forEach(m => (m.geometry.dispose(), (m.material as THREE.Material).dispose()));
      nodeOuterGlows.forEach(m => (m.geometry.dispose(), (m.material as THREE.Material).dispose()));

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div className={`relative w-full h-full min-h-[460px] cursor-grab select-none rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
      isDarkMode 
        ? "bg-gradient-to-br from-[#07080d] to-[#0f111a] border border-[#1e293b]/60 shadow-[inset_0_1px_3px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)]" 
        : "bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
    }`}>
      {/* Absolute Header Overlay */}
      <div className={`p-4 flex justify-between items-center z-10 w-full transition-colors duration-300 ${
        isDarkMode ? "bg-gradient-to-b from-[#07080d] to-transparent" : "bg-gradient-to-b from-[#f8fafc] to-transparent"
      }`}>
        <div>
          <span className={`text-[10px] uppercase font-mono tracking-widest ${
            isDarkMode 
              ? "text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20" 
              : "text-[#0d9488] bg-[#0d9488]/10 border border-[#0d9488]/10"
          } px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
            Cloud-Native Service Topology Mesh
          </span>
          <h3 className={`text-sm font-medium font-sans tracking-tight mt-1 ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
            Real-Time System API Graph
          </h3>
        </div>
        <span className={`text-[10px] font-mono border px-2 py-1 rounded transition-colors duration-300 ${
          isDarkMode ? "text-slate-400 border-slate-800 bg-[#0b0c13]" : "text-slate-600 border-slate-200 bg-slate-50"
        }`}>
          DRAG TO ROTATE
        </span>
      </div>

      {/* Actual 3D Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" id="service-mesh-canvas" />

      {/* Floating Interactive Tooltip / Detail Overlay */}
      <div className={`p-4 z-10 w-full border-t transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gradient-to-t from-[#07080d] via-[#07080d]/90 to-transparent border-[#1e293b]/20" 
          : "bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/95 to-transparent border-slate-200"
      }`}>
        {selectedNode ? (
          <div className={`backdrop-blur-md rounded-xl p-3 max-w-full flex-col gap-1.5 shadow-lg animate-fade-in border transition-all duration-300 ${
            isDarkMode ? "bg-[#0b0c13]/90 border-[#38bdf8]/30 text-white" : "bg-white/95 border-[#14b8a6]/20 text-slate-800 shadow-md"
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold tracking-wide font-sans flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `#${selectedNode.color.toString(16)}` }}></span>
                {selectedNode.name}
              </span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded text-emerald-500 bg-emerald-500/10 border border-emerald-500/20">
                {selectedNode.status}
              </span>
            </div>
            <div className={`grid grid-cols-2 gap-2 mt-2 text-[11px] font-mono border-t pt-2 transition-colors duration-300 ${
              isDarkMode ? "border-slate-800 text-slate-300" : "border-slate-200 text-slate-600"
            }`}>
              <div>
                <span className={`block uppercase text-[8px] tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Node Type:</span>
                <span className="font-sans font-medium text-[11px]">{selectedNode.type}</span>
              </div>
              <div className="text-right">
                <span className={`block uppercase text-[8px] tracking-wider ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Metrics Payload:</span>
                <span className={`font-semibold text-[11px] ${isDarkMode ? "text-[#38bdf8]" : "text-[#0d9488]"}`}>{selectedNode.metrics}</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }} 
                className={`text-[9px] font-mono transition px-2 py-0.5 rounded border ${
                  isDarkMode 
                    ? "text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border-slate-700" 
                    : "text-slate-600 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 border-slate-200"
                }`}
              >
                Clear Pin
              </button>
            </div>
          </div>
        ) : hoveredNode ? (
          <div className={`backdrop-blur-sm rounded-lg p-2.5 max-w-full flex-col gap-1 transition-all duration-300 border ${
            isDarkMode ? "bg-[#0b0c13]/80 border-slate-800 text-white" : "bg-white/90 border-slate-200 shadow text-slate-800"
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${hoveredNode.color.toString(16)}` }}></span>
              <span className={`text-xs font-medium font-sans ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{hoveredNode.name}</span>
            </div>
            <p className={`text-[10px] font-mono mt-1 max-w-[400px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              Type: {hoveredNode.type} • Status: {hoveredNode.status}
            </p>
          </div>
        ) : (
          <div className={`rounded-lg p-2.5 text-center text-[11px] font-mono max-w-full transition-colors duration-300 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
            💡 Click on any active network node to pin telemetry details and trigger trace streams.
          </div>
        )}
      </div>
    </div>
  );
}
