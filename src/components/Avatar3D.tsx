'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Avatar3DProps {
  className?: string;
  defaultWithHeadphones?: boolean;
}

export const Avatar3D: React.FC<Avatar3DProps> = ({
  className = '',
  defaultWithHeadphones = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [withHeadphones, setWithHeadphones] = useState(defaultWithHeadphones);

  const meshRef = useRef<THREE.Mesh | null>(null);
  const texRefReference = useRef<THREE.Texture | null>(null);
  const texRefHeadphones = useRef<THREE.Texture | null>(null);

  // Switch base texture between reference and headphones
  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    if (withHeadphones && texRefHeadphones.current) {
      mat.map = texRefHeadphones.current;
      mat.needsUpdate = true;
    } else if (!withHeadphones && texRefReference.current) {
      mat.map = texRefReference.current;
      mat.needsUpdate = true;
    }
  }, [withHeadphones]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();

    const fov = 34;
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-3, -1, 3);
    scene.add(fillLight);

    // Interactive point light that follows cursor
    const cursorLight = new THREE.PointLight(0xffffff, 1.2, 6);
    cursorLight.position.set(0, 0, 2.5);
    scene.add(cursorLight);

    // --- Load Textures ---
    const textureLoader = new THREE.TextureLoader();

    const texReference = textureLoader.load(
      '/avatars/avatar-base-no-eyes.png',
      () => {
        if (!withHeadphones && meshRef.current) {
          (meshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      }
    );
    texReference.colorSpace = THREE.SRGBColorSpace;
    texRefReference.current = texReference;

    const texHeadphones = textureLoader.load(
      '/avatars/avatar-headphones-base-no-eyes.png',
      () => {
        if (withHeadphones && meshRef.current) {
          (meshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
        }
      }
    );
    texHeadphones.colorSpace = THREE.SRGBColorSpace;
    texRefHeadphones.current = texHeadphones;

    // --- Avatar Static 3D Bust ---
    const avatarGroup = new THREE.Group();
    // Static center position, strictly NO rotation or tilting
    avatarGroup.position.set(0, -0.12, 0);
    scene.add(avatarGroup);

    const planeWidth = 2.45;
    const planeHeight = 2.45;
    const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);

    // Subtle natural 3D curvature across face
    const posAttr = planeGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const distFromCenter = Math.sqrt(x * x + y * y);
      const zOffset = Math.max(0, (1.2 - distFromCenter * 0.7) * 0.14);
      posAttr.setZ(i, zOffset);
    }
    planeGeo.computeVertexNormals();

    const avatarMat = new THREE.MeshStandardMaterial({
      map: withHeadphones ? texHeadphones : texReference,
      transparent: true,
      roughness: 0.45,
      metalness: 0.05,
      alphaTest: 0.005,
      side: THREE.DoubleSide,
    });

    const avatarMesh = new THREE.Mesh(planeGeo, avatarMat);
    avatarGroup.add(avatarMesh);
    meshRef.current = avatarMesh;

    // --- Interactive 3D Eyeballs ---
    // Eye positions matching reference avatar proportions exactly
    // Left eye center: (-0.150, 0.182), Right eye center: (0.192, 0.170)
    const leftEyeBase = { x: -0.150, y: 0.182, z: 0.052 };
    const rightEyeBase = { x: 0.192, y: 0.170, z: 0.052 };

    const eyeRadius = 0.058;
    const eyeGeo = new THREE.SphereGeometry(eyeRadius, 24, 24);
    eyeGeo.scale(1.0, 0.96, 0.65); // Subtle flattened button bead shape

    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x18181e, // Deep dark clay button
      roughness: 0.22,
      metalness: 0.18,
    });

    // Left Eyeball
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(leftEyeBase.x, leftEyeBase.y, leftEyeBase.z);
    avatarGroup.add(leftEyeGroup);

    const leftEyeball = new THREE.Mesh(eyeGeo, eyeMat);
    leftEyeGroup.add(leftEyeball);

    // Catchlight Sparkle for Left Eye
    const catchlightGeo = new THREE.SphereGeometry(0.012, 12, 12);
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftCatchlight = new THREE.Mesh(catchlightGeo, catchlightMat);
    leftCatchlight.position.set(0.014, 0.016, 0.032);
    leftEyeball.add(leftCatchlight);

    // Right Eyeball
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(rightEyeBase.x, rightEyeBase.y, rightEyeBase.z);
    avatarGroup.add(rightEyeGroup);

    const rightEyeball = new THREE.Mesh(eyeGeo, eyeMat);
    rightEyeGroup.add(rightEyeball);

    // Catchlight Sparkle for Right Eye
    const rightCatchlight = new THREE.Mesh(catchlightGeo, catchlightMat);
    rightCatchlight.position.set(0.014, 0.016, 0.032);
    rightEyeball.add(rightCatchlight);

    // --- Mouse Tracking State ---
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1 relative to window center
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- Responsive Resize ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Animation Loop ---
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth Lerp for Eye Tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.085;
      mouse.y += (mouse.targetY - mouse.y) * 0.085;

      // Calculate directional gaze vector
      const maxEyeShiftX = 0.032;
      const maxEyeShiftY = 0.026;

      // Shift eyeballs inside sockets based on mouse position
      const eyeOffsetX = THREE.MathUtils.clamp(mouse.x * 0.032, -maxEyeShiftX, maxEyeShiftX);
      const eyeOffsetY = THREE.MathUtils.clamp(mouse.y * 0.026, -maxEyeShiftY, maxEyeShiftY);

      leftEyeGroup.position.x = leftEyeBase.x + eyeOffsetX;
      leftEyeGroup.position.y = leftEyeBase.y + eyeOffsetY;

      rightEyeGroup.position.x = rightEyeBase.x + eyeOffsetX;
      rightEyeGroup.position.y = rightEyeBase.y + eyeOffsetY;

      // Eyeball slight 3D rotation to gaze towards mouse
      leftEyeball.rotation.y = eyeOffsetX * 6.0;
      leftEyeball.rotation.x = -eyeOffsetY * 6.0;

      rightEyeball.rotation.y = eyeOffsetX * 6.0;
      rightEyeball.rotation.x = -eyeOffsetY * 6.0;

      // Move point light slightly for dynamic catchlight gleam
      cursorLight.position.x = mouse.x * 2.0;
      cursorLight.position.y = mouse.y * 1.5;

      // Note: Avatar body and head are strictly static!
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);

      renderer.dispose();
      planeGeo.dispose();
      avatarMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      catchlightGeo.dispose();
      catchlightMat.dispose();
      texReference.dispose();
      texHeadphones.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden pointer-events-none select-none ${className}`}
      aria-label="Interactive 3D Avatar"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Discreet Headphone Toggle (allows switching between original reference and headphones) */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-auto flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-sm text-xs font-mono">
        <button
          type="button"
          onClick={() => setWithHeadphones(!withHeadphones)}
          className="flex items-center gap-1.5 text-neutral-700 hover:text-black font-semibold cursor-pointer transition-colors"
          title="Toggle Headphones"
        >
          <span>🎧</span>
          <span>{withHeadphones ? 'Headphones ON' : 'Headphones OFF'}</span>
        </button>
      </div>
    </div>
  );
};

export default Avatar3D;
