'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';

const FRAME_COUNT = 168;

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/hero-sequence/ezgif-frame-${paddedIndex}.jpg`;
};

export function ImageSequenceScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.0001
  });

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = images[index - 1];
    if (!img) return;

    const canvas = canvasRef.current;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const zoomFactor = 1.45; 
    const finalScale = scale * zoomFactor;

    const x = (canvas.width / 2) - (img.width / 2) * finalScale;
    const y = (canvas.height / 2) - (img.height / 2) * finalScale;

    ctx.drawImage(img, x, y, img.width * finalScale, img.height * finalScale);
  };

  useEffect(() => {
    if (images.length === 0) return;

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      
      const currentProgress = smoothProgress.get();
      const effectiveProgress = Math.min(currentProgress / 0.8, 1);
      const currentFrame = Math.max(1, Math.ceil(effectiveProgress * FRAME_COUNT));
      drawFrame(currentFrame);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [images]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latestProgress) => {
      const effectiveProgress = Math.min(latestProgress / 0.8, 1);
      const frameIndex = Math.max(1, Math.ceil(effectiveProgress * FRAME_COUNT));
      
      requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    });

    return () => unsubscribe();
  }, [smoothProgress, images]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden mix-blend-screen opacity-90">
        <canvas 
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
