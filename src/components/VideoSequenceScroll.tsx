'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useSpring } from 'framer-motion';

export function VideoSequenceScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.0001
  });

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latestProgress) => {
      if (!videoRef.current || duration === 0) return;
      const effectiveProgress = Math.min(latestProgress / 0.8, 1);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = effectiveProgress * duration;
        }
      });
    });

    return () => unsubscribe();
  }, [smoothProgress, duration]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        videoRef.current?.pause();
      }).catch(() => {});
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden mix-blend-screen opacity-90 flex items-center justify-center">
        <video 
          ref={videoRef}
          src="/hero-video.mp4"
          playsInline
          muted
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          className="w-full h-full object-cover"
          style={{ transform: 'scale(1.45)' }}
        />
      </div>
    </div>
  );
}
