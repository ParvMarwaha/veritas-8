'use client';

import React, { useEffect, useState, useRef, memo } from 'react';
import { motion, useInView } from "framer-motion";

// Physics Configuration
const HOVER_RADIUS = 550;       // Tone down radius slightly
const MAX_ELEVATION = 24;       // Moderate depth, not too extreme
const SPRING_STIFFNESS = 0.08;
const SPRING_DAMPING = 0.85;

interface TileState {
  el: SVGRectElement;
  cx: number;
  cy: number;
  z: number;
  vz: number;
  targetZ: number;
  introStartTime: number;
  introDone: boolean;
}

export const StaticHeroBackground = memo(function StaticHeroBackground({ onRevealComplete }: { onRevealComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const inViewRef = useRef(true);

  useEffect(() => {
    inViewRef.current = isInView;
  }, [isInView]);

  const [svgContent, setSvgContent] = useState<string>('');
  const tilesRef = useRef<TileState[]>([]);
  // Use target coordinates to lerp the mouse position for buttery smooth tracking
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, isHovering: false });
  const svgMetricsRef = useRef({ left: 0, top: 0, scale: 1, offsetX: 0, offsetY: 0 });
  const reqRef = useRef<number | null>(null);
  const introCompletionFiredRef = useRef(false);

  const globalParallaxRef = useRef({ x: 0, y: 0 });

  // Fetch and manipulate the raw SVG string for injection
  useEffect(() => {
    fetch('/bg-svg.svg')
      .then(res => res.text())
      .then(text => {
        // Strip hardcoded dimensions to let CSS scale it, and inject preserveAspectRatio
        const modifiedSvg = text
          .replace(/width="\d+"/, 'width="100%"')
          .replace(/height="\d+(\.\d+)?"/, 'height="100%"')
          .replace(
            '<svg ', 
            '<svg preserveAspectRatio="xMidYMid slice" style="transform-style: preserve-3d; overflow: visible;" '
          );
        setSvgContent(modifiedSvg);
      })
      .catch(console.error);
  }, []);

  // Initialize Physics Engine and Global Event Listeners
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg') as SVGSVGElement;
    if (!svgElement) return;

    // Cache metrics to prevent massive Layout Thrashing in the RAF loop
    const updateMetrics = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const svgRatio = 1440 / 1040;
      const rectRatio = rect.width / rect.height;
      let scale = 1, offsetX = 0, offsetY = 0;
      
      if (rectRatio > svgRatio) {
        scale = rect.width / 1440;
        offsetY = (rect.height - 1040 * scale) / 2;
      } else {
        scale = rect.height / 1040;
        offsetX = (rect.width - 1440 * scale) / 2;
      }
      
      // Prevent division by zero if container is temporarily hidden or minimized
      if (scale === 0 || isNaN(scale)) scale = 1;
      
      svgMetricsRef.current = { left: rect.left, top: rect.top, scale, offsetX, offsetY };
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      svgMetricsRef.current.left = rect.left;
      svgMetricsRef.current.top = rect.top;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Global mouse tracking so interaction doesn't break when hovering over z-index text
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isHovering = true;
      if (mouseRef.current.x === -1000) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };
    
    const handleGlobalMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.targetX = -1000;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    // Ensure the SVG ignores pointer events so our parent container captures them seamlessly
    svgElement.style.pointerEvents = 'none';

    // Parse all tiles
    const rects = Array.from(svgElement.querySelectorAll('rect'));
    const now = Date.now();
    const maxX = Math.max(...rects.map(r => parseFloat(r.getAttribute('x') || '0')));
    const maxY = Math.max(...rects.map(r => parseFloat(r.getAttribute('y') || '0')));

    tilesRef.current = rects.map(rect => {
      // SVGs coordinate origin is top-left
      const x = parseFloat(rect.getAttribute('x') || '0');
      const y = parseFloat(rect.getAttribute('y') || '0');
      const width = parseFloat(rect.getAttribute('width') || '0');
      const height = parseFloat(rect.getAttribute('height') || '0');
      
      // Hardware acceleration hints and 3D origin
      rect.style.willChange = 'transform, filter, opacity';
      rect.style.transformOrigin = 'center center';
      rect.style.transformBox = 'fill-box';

      // Sweeping staggered delay: Bottom-Left to Top-Right
      const normalizedX = maxX > 0 ? (x / maxX) : 0;
      const normalizedY = maxY > 0 ? (y / maxY) : 0;
      
      const delay = (normalizedX * 600) + ((1 - normalizedY) * 600);

      return {
        el: rect,
        cx: x + width / 2,
        cy: y + height / 2,
        z: 0,
        vz: 0,
        targetZ: 0,
        introStartTime: now + delay,
        introDone: false
      };
    });

    // 60FPS Render Loop
    const render = () => {
      if (!inViewRef.current) {
        reqRef.current = requestAnimationFrame(render);
        return;
      }

      try {
        if (!svgElement) return;

        const mouse = mouseRef.current;
        
        // Lerp mouse coordinates for fluid, organic gliding effect
        if (mouse.isHovering) {
          if (mouse.x === -1000) {
             mouse.x = mouse.targetX;
             mouse.y = mouse.targetY;
          }
          // Smooth fluid lerp (0.12) to create a beautiful trailing interaction that feels like moving through liquid
          mouse.x += (mouse.targetX - mouse.x) * 0.12;
          mouse.y += (mouse.targetY - mouse.y) * 0.12;
        }
        
        const mouseX = mouse.x;
        const mouseY = mouse.y;
        const isHovering = mouse.isHovering;
        
        // Convert screen space mouse to SVG internal viewBox space (1440x1040)
        let svgMouse = { x: -1000, y: -1000 };
        if (isHovering) {
          const { left, top, scale, offsetX, offsetY } = svgMetricsRef.current;
          const relativeX = mouseX - left;
          const relativeY = mouseY - top;
          svgMouse.x = (relativeX - offsetX) / scale;
          svgMouse.y = (relativeY - offsetY) / scale;
        }
        
        // Global Background Parallax
        const parallax = globalParallaxRef.current;
        let targetParallaxX = 0;
        let targetParallaxY = 0;

        if (isHovering) {
          // Fallback to 1 to prevent division by zero NaN infection when browser tab is inactive and width is 0
          const centerX = window.innerWidth / 2 || 1; 
          const centerY = window.innerHeight / 2 || 1;
          // Shift up to 12px opposite to mouse movement
          targetParallaxX = ((mouseX - centerX) / centerX) * -12;
          targetParallaxY = ((mouseY - centerY) / centerY) * -12;
        }

        // Very smooth organic drift
        parallax.x += (targetParallaxX - parallax.x) * 0.05;
        parallax.y += (targetParallaxY - parallax.y) * 0.05;

        // Failsafe for NaN infection
        if (isNaN(parallax.x) || isNaN(parallax.y)) {
          parallax.x = 0;
          parallax.y = 0;
        }

        if (containerRef.current) {
          // scale(1.02) to prevent edges from showing during parallax shift
          containerRef.current.style.transform = `translate(${parallax.x}px, ${parallax.y}px) scale(1.02)`;
        }

        const currentTime = Date.now();
        let allTilesIntroDone = true;

        tilesRef.current.forEach(t => {
          if (!t.introDone) {
            allTilesIntroDone = false;
            const elapsed = currentTime - t.introStartTime;
            
            if (elapsed < 0) {
              // Pre-intro state
              t.el.style.opacity = '0';
              t.el.style.transform = 'translate(0px, 150px) scale(0.9)';
              return; // Skip physics until started
            }
            
            if (elapsed < 800) {
              // Animating in with easeOutCubic
              const p = elapsed / 800;
              const ease = 1 - Math.pow(1 - p, 3);
              t.el.style.opacity = ease.toString();
              
              const yOffset = 150 * (1 - ease);
              const scaleStart = 0.9 + (0.1 * ease);
              t.el.style.transform = `translate(0px, ${yOffset}px) scale(${scaleStart})`;
              return; // Skip physics during animation
            } else {
              t.introDone = true;
              t.el.style.opacity = '1';
            }
          }

          let isHoveredNode = false;
          if (isHovering) {
            const dist = Math.hypot(t.cx - svgMouse.x, t.cy - svgMouse.y);
            if (dist < HOVER_RADIUS) {
              // Wider Gaussian bell curve mapping distance to elevation for an incredibly soft, liquid slope
              const falloff = Math.exp(-Math.pow(dist / (HOVER_RADIUS * 0.5), 2));
              t.targetZ = falloff * MAX_ELEVATION;
              isHoveredNode = true;
            }
          }
          
          if (!isHoveredNode) {
            // Idle Ambient Breathing Wave
            // Faster time scale and tighter wave frequency for visible ripples across the grid
            const time = Date.now() * 0.0015; 
            const wave1 = Math.sin(time + t.cx * 0.006 + t.cy * 0.006);
            const wave2 = Math.cos(time * 0.8 - t.cx * 0.004 + t.cy * 0.005);
            const combinedWave = (wave1 + wave2) * 0.5; // -1 to 1
            
            // Map the wave to a much more visible elevation (0px to ~6px max)
            t.targetZ = Math.max(0, combinedWave + 1) * 1.5; 
          }

          // Spring Physics Step
          const force = (t.targetZ - t.z) * SPRING_STIFFNESS;
          t.vz = (t.vz + force) * SPRING_DAMPING;
          t.z += t.vz;

          // Visual Apply
          if (Math.abs(t.z) > 0.01 || Math.abs(t.vz) > 0.01) {
            // 2.5D Parallax: scale up and shift slightly away from mouse to simulate true perspective depth natively
            const scale = 1 + (t.z * 0.006); 
            const shiftX = isHovering ? ((t.cx - svgMouse.x) * (t.z * 0.0015)) : 0;
            const shiftY = isHovering ? ((t.cy - svgMouse.y) * (t.z * 0.0015)) : 0;
            
            t.el.style.transform = `translate(${shiftX}px, ${shiftY}px) scale(${scale})`;
            
            // Shadows and lighting based on elevation
            if (t.z > 0.5) {
              const shadowIntensity = Math.min(t.z / MAX_ELEVATION, 1);
              t.el.style.filter = `
                drop-shadow(0px ${t.z * 0.6}px ${t.z * 1.8}px rgba(0,0,0,0.75))
                brightness(${1 + shadowIntensity * 0.2})
                contrast(${1 + shadowIntensity * 0.15})
              `;
            } else {
              t.el.style.filter = 'none';
            }
          } else if (t.z !== 0 || t.vz !== 0) {
            // Snap to exactly 0 to stop layout trashing when at rest
            t.z = 0;
            t.vz = 0; // CRITICAL: Reset velocity to prevent NaN infections from permanently freezing the tile
            t.el.style.transform = 'translate(0px, 0px) scale(1)';
            t.el.style.filter = 'none';
          }
          
          // Failsafe: if math evaluates to NaN (e.g. during a window resize width=0 edge case), reset the spring
          if (isNaN(t.z) || isNaN(t.vz)) {
             t.z = 0;
             t.vz = 0;
          }
        });

        if (allTilesIntroDone && !introCompletionFiredRef.current) {
          introCompletionFiredRef.current = true;
          if (onRevealComplete) {
            onRevealComplete();
          }
        }
      } catch (err) {
        // Silently catch any DOM or math errors that occur during tab switching/backgrounding
      }

      reqRef.current = requestAnimationFrame(render);
    };

    reqRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [svgContent]);

  return (
    <div 
      className="absolute inset-0 z-0 bg-[#090909] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Target SVG Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      
      {/* Premium Subsurface Glow Effect */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300">
        <GlowOverlay mouseRef={mouseRef} svgMetricsRef={svgMetricsRef} inViewRef={inViewRef} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#090909] to-transparent z-10 pointer-events-none" />
    </div>
  );
});

// Independent component to handle just the glowing cursor update to prevent React from re-rendering the heavy SVG dom
function GlowOverlay({ mouseRef, svgMetricsRef, inViewRef }: { mouseRef: React.MutableRefObject<any>, svgMetricsRef: React.MutableRefObject<any>, inViewRef: React.MutableRefObject<boolean> }) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let req: number;
    const render = () => {
      if (!inViewRef.current) {
        req = requestAnimationFrame(render);
        return;
      }

      if (glowRef.current) {
        const { x, y, isHovering } = mouseRef.current;
        const { left, top } = svgMetricsRef.current;
        glowRef.current.style.background = isHovering 
          ? `radial-gradient(circle 450px at ${x - left}px ${y - top}px, rgba(167,154,200,0.18) 0%, rgba(208,39,23,0.12) 40%, transparent 70%)` 
          : 'transparent';
      }
      req = requestAnimationFrame(render);
    };
    req = requestAnimationFrame(render);
    return () => cancelAnimationFrame(req);
  }, [mouseRef]);

  return <div ref={glowRef} className="absolute inset-0 w-full h-full" />;
}
