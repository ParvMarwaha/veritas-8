'use client';

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Playful, cursor-reactive field for the hero.
 *
 * - Particles drift on a low-frequency noise field.
 * - Cursor pushes nearby particles away ("magnetic field").
 * - Click emits an expanding ring that ripples through the field.
 * - A soft crimson glow follows the cursor.
 * - Connections within range are drawn; near the cursor they turn crimson.
 */
export function InteractiveHeroBackground({ layoutMode = 'hero' }: { layoutMode?: 'hero' | 'menu' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes: any[] = [];
    let ripples: any[] = [];

    const mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, px: 0, py: 0 };

    type Zone = 
      | { type: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
      | { type: 'rect'; x: number; y: number; w: number; h: number };

    const getExclusionZones = (width: number, height: number): Zone[] => {
      const isMobile = width < 768;
      const zones: Zone[] = [];

      if (layoutMode === 'menu') {
        zones.push({
          type: 'ellipse',
          cx: isMobile ? width / 2 : 320, 
          cy: height / 2,
          rx: isMobile ? width * 0.4 : 260, 
          ry: isMobile ? height * 0.35 : 280, 
        });
      } else {
        // Center text zone
        zones.push({
          type: 'ellipse',
          cx: width / 2,
          cy: height / 2 + 30, // Shifted slightly down
          rx: Math.min(380, width * 0.28),
          ry: Math.min(280, height * 0.35),
        });

        // Logo zone (Top Left)
        zones.push({
          type: 'rect',
          x: 40,
          y: 20,
          w: 140,
          h: 60,
        });

        // Navbar buttons zone (Top Right)
        zones.push({
          type: 'rect',
          x: width - (isMobile ? 240 : 320),
          y: 20,
          w: isMobile ? 220 : 280,
          h: 60,
        });
      }
      return zones;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const zones = getExclusionZones(w, h);

      // Uniform grid-based distribution for even coverage
      const targetDensity = Math.floor((w * h) / 4500);
      const cols = Math.ceil(Math.sqrt(targetDensity * (w / h)));
      const rows = Math.ceil(targetDensity / cols);
      const cellW = w / cols;
      const cellH = h / rows;

      nodes = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * cellW + Math.random() * cellW;
          let y = j * cellH + Math.random() * cellH;
          
          let insideZone = false;
          for (const zone of zones) {
            if (zone.type === 'ellipse') {
              const dx = x - zone.cx;
              const dy = y - zone.cy;
              if ((dx * dx) / (zone.rx * zone.rx) + (dy * dy) / (zone.ry * zone.ry) < 1.2) {
                insideZone = true;
                break;
              }
            } else if (zone.type === 'rect') {
              const dx = Math.max(zone.x - x, 0, x - (zone.x + zone.w));
              const dy = Math.max(zone.y - y, 0, y - (zone.y + zone.h));
              if (dx * dx + dy * dy < 100) {
                insideZone = true;
                break;
              }
            }
          }
          
          if (!insideZone) {
            nodes.push({
              x, y, ox: x, oy: y,
              vx: 0, vy: 0,
              r: 1.2 + Math.random() * 1.8,
              hue: Math.random() < 0.08 ? 1 : 0,
              opacityMult: 1,
            });
          }
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.vx = x - mouse.px;
      mouse.vy = y - mouse.py;
      mouse.px = x;
      mouse.py = y;
      mouse.x = x;
      mouse.y = y;
      mouse.active = x >= 0 && y >= 0 && x <= w && y <= h;
    };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > w || y > h) return;
      ripples.push({ x, y, t: 0 });
      if (ripples.length > 8) ripples.shift();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);

    let t = 0;
    const PUSH_RADIUS = 180;
    const CONNECT = 210;

    const tick = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);

      // soft cursor glow
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(208,39,23,0.08)");
        g.addColorStop(0.45, "rgba(208,39,23,0.025)");
        g.addColorStop(1, "rgba(208,39,23,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      const zones = getExclusionZones(w, h);

      // update nodes
      for (const n of nodes) {
        // calculate opacity based on distance from exclusion zones
        let minOpacity = 1;
        for (const zone of zones) {
          if (zone.type === 'ellipse') {
            const dcx = n.x - zone.cx;
            const dcy = n.y - zone.cy;
            const distSq = (dcx * dcx) / (zone.rx * zone.rx) + (dcy * dcy) / (zone.ry * zone.ry);
            minOpacity = Math.min(minOpacity, Math.max(0, (distSq - 0.6) * 2.5));
          } else if (zone.type === 'rect') {
            const dx = Math.max(zone.x - n.x, 0, n.x - (zone.x + zone.w));
            const dy = Math.max(zone.y - n.y, 0, n.y - (zone.y + zone.h));
            const distSq = dx * dx + dy * dy;
            minOpacity = Math.min(minOpacity, Math.max(0, (distSq - 100) / 900));
          }
        }
        n.opacityMult = Math.min(1, minOpacity);

        // gentle noise drift around origin
        const nx = Math.sin(n.ox * 0.004 + t * 1.1) * 14;
        const ny = Math.cos(n.oy * 0.004 + t * 0.9) * 14;
        const targetX = n.ox + nx;
        const targetY = n.oy + ny;
        n.vx += (targetX - n.x) * 0.012;
        n.vy += (targetY - n.y) * 0.012;

        // cursor push
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < PUSH_RADIUS * PUSH_RADIUS) {
            const d = Math.sqrt(d2) + 0.001;
            const f = (1 - d / PUSH_RADIUS);
            n.vx += (dx / d) * f * 1.8;
            n.vy += (dy / d) * f * 1.8;
          }
        }

        // ripple push
        for (const r of ripples) {
          const dx = n.x - r.x;
          const dy = n.y - r.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const radius = r.t * 8.5;
          const band = Math.abs(d - radius);
          if (band < 28) {
            const f = (1 - band / 28) * (1 - r.t / 90);
            if (f > 0) {
              n.vx += (dx / d) * f * 3.2;
              n.vy += (dy / d) * f * 3.2;
            }
          }
        }

        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > CONNECT * CONNECT) continue;
          
          const d = Math.sqrt(d2);
          const baseAlpha = (1 - d / CONNECT) * 0.45;
          const alpha = baseAlpha * a.opacityMult * b.opacityMult;
          if (alpha <= 0.01) continue;

          let stroke = `rgba(24,24,27,${alpha})`;
          if (mouse.active) {
            const cx = (a.x + b.x) * 0.5 - mouse.x;
            const cy = (a.y + b.y) * 0.5 - mouse.y;
            const cd = Math.sqrt(cx * cx + cy * cy);
            if (cd < 180) {
              const k = 1 - cd / 180;
              const activeAlpha = Math.min(0.9, alpha + k * 0.55 * a.opacityMult * b.opacityMult);
              stroke = `rgba(208,39,23,${activeAlpha})`;
            }
          }
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // draw nodes
      for (const n of nodes) {
        if (n.opacityMult <= 0.01) continue;
        const speed = Math.min(1, (Math.abs(n.vx) + Math.abs(n.vy)) * 0.5);
        if (n.hue === 1) {
          ctx.fillStyle = `rgba(208,39,23,${(0.65 + speed * 0.35) * n.opacityMult})`;
        } else {
          ctx.fillStyle = `rgba(24,24,27,${(0.55 + speed * 0.35) * n.opacityMult})`;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + speed * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw ripples
      ripples = ripples.filter((r) => r.t < 90);
      for (const r of ripples) {
        const radius = r.t * 8.5;
        const alpha = Math.max(0, 0.4 * (1 - r.t / 90));
        ctx.strokeStyle = `rgba(208,39,23,${alpha})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        // inner ring
        ctx.strokeStyle = `rgba(24,24,27,${alpha * 0.5})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(0, radius - 14), 0, Math.PI * 2);
        ctx.stroke();
        r.t += 1;
      }

      // decay cursor velocity
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute inset-0 z-0 overflow-hidden bg-white"
    >
      <canvas
        ref={ref}
        aria-hidden
        className="w-full h-full"
      />
    </motion.div>
  );
}
