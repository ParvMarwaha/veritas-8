'use client';

import React, { useId, useRef } from 'react';
import { useInView } from 'framer-motion';
import type { SeriesId } from '@/data/insights';

/**
 * Original artwork for each Insights category, generated in code (no stock imagery).
 * Same visual language as the rest of the site: near-black field, hairlines,
 * Veritas red + lavender accents.
 *
 *  - lets-get-esops-right → a cap-table grid with a rising red path (getting the maths right)
 *  - esops-and-beyond     → stacked vesting schedules, from equal steps to a smooth curve
 *  - pre-ipo-series       → orbits converging on a single point: the listing
 *
 * viewBox is 800x1000 and rendered with "slice", so keep key shapes near the centre.
 * Everything is deterministic (no Math.random) so server and client render identically.
 */

const RED = '#D02717';
const LAV = '#A79AC8';

const r = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* 01 · Cap-table grid                                                 */
/* ------------------------------------------------------------------ */

function Foundations({ uid }: { uid: string }) {
  // A fine outlined cap-table grid with one red path climbing through it.
  const cols = 12;
  const rows = 15;
  const pitch = 66;
  const cell = 40;
  const ox = r((800 - cols * pitch) / 2 + (pitch - cell) / 2);
  const oy = r((1000 - rows * pitch) / 2 + (pitch - cell) / 2);

  // Staircase from bottom-left to top-right.
  const path: [number, number][] = [];
  for (let i = 0; i < cols - 1; i++) {
    path.push([i, 13 - i]);
    path.push([i + 1, 13 - i]);
  }
  const pathIndex = new Map(path.map(([i, j], n) => [`${i},${j}`, n]));
  const center = ([i, j]: [number, number]) => ({
    x: ox + i * pitch + cell / 2,
    y: oy + j * pitch + cell / 2,
  });

  const tiles: React.ReactNode[] = [];
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const n = pathIndex.get(`${i},${j}`);
      const x = ox + i * pitch;
      const y = oy + j * pitch;
      if (n !== undefined) {
        tiles.push(
          <rect
            key={`${i}-${j}`}
            x={x}
            y={y}
            width={cell}
            height={cell}
            rx={2}
            fill={RED}
            fillOpacity={r(0.14 + 0.78 * (n / (path.length - 1)))}
            className="art-pop"
            style={{ animationDelay: `${r(0.3 + n * 0.07)}s` }}
          />
        );
      } else {
        const v = (Math.sin(i * 0.9 + j * 0.5) + Math.sin(j * 0.7 - i * 0.3) + 2) / 4;
        tiles.push(
          <rect
            key={`${i}-${j}`}
            x={x}
            y={y}
            width={cell}
            height={cell}
            rx={2}
            fill="#fff"
            fillOpacity={v > 0.72 ? 0.05 : 0}
            stroke="#fff"
            strokeOpacity={0.12}
            className="art-breathe"
            style={{ animationDelay: `${r(((i * 3 + j * 5) % 11) * 0.5)}s` }}
          />
        );
      }
    }
  }

  const pts = path.map(center);
  const last = pts[pts.length - 1];

  return (
    <>
      <defs>
        <radialGradient id={`${uid}-a`} cx="88%" cy="10%" r="65%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.3" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-b`} cx="8%" cy="100%" r="60%">
          <stop offset="0%" stopColor={LAV} stopOpacity="0.16" />
          <stop offset="100%" stopColor={LAV} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${uid}-a)`} />
      <rect width="800" height="1000" fill={`url(#${uid}-b)`} />
      {tiles}
      <polyline
        points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="#fff"
        strokeOpacity={0.8}
        strokeWidth={1.5}
        strokeLinejoin="round"
        pathLength={1}
        className="art-draw"
        style={{ animationDelay: '0.3s', animationDuration: '2.8s' }}
      />
      <circle cx={last.x} cy={last.y} r={6} fill="#fff" className="art-pop" style={{ animationDelay: '2.2s' }} />
      <circle cx={last.x} cy={last.y} r={6} fill="none" stroke="#fff" strokeWidth={1.5} className="art-ping" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Vesting schedules                                              */
/* ------------------------------------------------------------------ */

function Vesting({ uid }: { uid: string }) {
  const x0 = 70;
  const x1 = 730;
  const W = x1 - x0;
  const H = 125;
  const bases = [260, 410, 560, 710];
  const xAt = (t: number) => r(x0 + W * t);

  // Cumulative vesting after each of 4 years.
  const stepLanes: { base: number; levels: number[] }[] = [
    { base: bases[0], levels: [0.25, 0.5, 0.75, 1] }, // standard 4-year, 25% a year
    { base: bases[1], levels: [0.1, 0.3, 0.6, 1] }, // progressive 10/20/30/40
    { base: bases[2], levels: [0, 0.4, 0.4, 1] }, // milestone-linked
  ];

  const stepPath = (base: number, levels: number[]) => {
    let d = `M${x0} ${base}`;
    let prev = 0;
    levels.forEach((lv, k) => {
      d += ` H${xAt((k + 1) / 4)} V${r(base - lv * H)}`;
      prev = lv;
    });
    return { line: d, area: `${d} V${base} Z`, last: prev };
  };

  const curveBase = bases[3];
  const curve = `M${x0} ${curveBase} C${r(x0 + W * 0.45)} ${curveBase}, ${r(x0 + W * 0.55)} ${curveBase - H}, ${x1} ${curveBase - H}`;

  return (
    <>
      <defs>
        <linearGradient id={`${uid}-w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-r`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={RED} stopOpacity="0.45" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-g`} cx="20%" cy="0%" r="80%">
          <stop offset="0%" stopColor={LAV} stopOpacity="0.22" />
          <stop offset="100%" stopColor={LAV} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${uid}-g)`} />

      {/* Year gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={xAt(t)} x2={xAt(t)} y1={120} y2={730} stroke="#fff" strokeOpacity={0.07} strokeDasharray="3 9" />
      ))}

      {/* Step lanes */}
      {stepLanes.map((lane, idx) => {
        const p = stepPath(lane.base, lane.levels);
        return (
          <g key={idx}>
            <line x1={x0} x2={x1} y1={lane.base} y2={lane.base} stroke="#fff" strokeOpacity={0.12} />
            <path d={p.area} fill={`url(#${uid}-w)`} className="art-pop" style={{ animationDelay: `${r(0.6 + idx * 0.25)}s` }} />
            <path
              d={p.line}
              fill="none"
              stroke="#fff"
              strokeOpacity={0.8 - idx * 0.12}
              strokeWidth={2}
              strokeLinejoin="round"
              pathLength={1}
              className="art-draw"
              style={{ animationDelay: `${r(idx * 0.25)}s` }}
            />
            {lane.levels.map((lv, k) => (
              <circle
                key={k}
                cx={xAt((k + 1) / 4)}
                cy={r(lane.base - lv * H)}
                r={4}
                fill="#fff"
                fillOpacity={0.85}
                className="art-pop"
                style={{ animationDelay: `${r(0.5 + idx * 0.25 + k * 0.18)}s` }}
              />
            ))}
          </g>
        );
      })}

      {/* Smooth (market-linked) lane in red */}
      <line x1={x0} x2={x1} y1={curveBase} y2={curveBase} stroke="#fff" strokeOpacity={0.12} />
      <path d={`${curve} V${curveBase} Z`} fill={`url(#${uid}-r)`} className="art-pop" style={{ animationDelay: '1.3s' }} />
      <path d={curve} fill="none" stroke={RED} strokeWidth={3} strokeLinecap="round" pathLength={1} className="art-draw" style={{ animationDelay: '0.75s' }} />
      <circle cx={x1} cy={curveBase - H} r={7} fill={RED} className="art-pop" style={{ animationDelay: '2.4s' }} />
      <circle cx={x1} cy={curveBase - H} r={7} fill="none" stroke={RED} strokeWidth={2} className="art-ping" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Orbits converging on the listing                               */
/* ------------------------------------------------------------------ */

function Orbit({ uid }: { uid: string }) {
  const F = { x: 420, y: 430 };

  const radii = [70, 130, 190, 250, 310, 370, 430, 490, 550];

  // Cubic bezier point helper for the dots along the trajectory.
  const P = [
    { x: 40, y: 900 },
    { x: 160, y: 700 },
    { x: 250, y: 520 },
    { x: F.x, y: F.y },
  ];
  const bez = (t: number) => {
    const u = 1 - t;
    return {
      x: r(u * u * u * P[0].x + 3 * u * u * t * P[1].x + 3 * u * t * t * P[2].x + t * t * t * P[3].x),
      y: r(u * u * u * P[0].y + 3 * u * u * t * P[1].y + 3 * u * t * t * P[2].y + t * t * t * P[3].y),
    };
  };

  const ticks = Array.from({ length: 48 }, (_, k) => {
    const a = (k * 7.5 * Math.PI) / 180;
    const r1 = 575;
    const r2 = k % 4 === 0 ? 610 : 594;
    return {
      x1: r(F.x + Math.cos(a) * r1),
      y1: r(F.y + Math.sin(a) * r1),
      x2: r(F.x + Math.cos(a) * r2),
      y2: r(F.y + Math.sin(a) * r2),
      major: k % 4 === 0,
    };
  });

  return (
    <>
      <defs>
        <radialGradient id={`${uid}-f`} cx={F.x / 800} cy={F.y / 1000} r="45%">
          <stop offset="0%" stopColor={RED} stopOpacity="0.42" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-l`} cx="0%" cy="100%" r="70%">
          <stop offset="0%" stopColor={LAV} stopOpacity="0.2" />
          <stop offset="100%" stopColor={LAV} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="1000" fill={`url(#${uid}-l)`} />
      <rect width="800" height="1000" fill={`url(#${uid}-f)`} />

      {/* Crosshair */}
      <line x1={0} x2={800} y1={F.y} y2={F.y} stroke="#fff" strokeOpacity={0.08} />
      <line x1={F.x} x2={F.x} y1={0} y2={1000} stroke="#fff" strokeOpacity={0.08} />

      {/* Rings */}
      {radii.map((rad, i) => (
        <circle
          key={rad}
          cx={F.x}
          cy={F.y}
          r={rad}
          fill="none"
          stroke="#fff"
          strokeOpacity={r(0.2 - i * 0.015)}
          strokeDasharray={i % 2 === 0 ? undefined : '2 10'}
          strokeLinecap="round"
          className="art-breathe"
          style={{ animationDelay: `${r(i * 0.3)}s` }}
        />
      ))}

      {/* Dial ticks */}
      {ticks.map((t, k) => (
        <line key={k} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#fff" strokeOpacity={t.major ? 0.35 : 0.16} />
      ))}

      {/* Trajectories */}
      <path
        d="M40 900 C300 880, 380 700, 420 430"
        fill="none"
        stroke="#fff"
        strokeOpacity={0.22}
        strokeWidth={1.5}
        pathLength={1}
        className="art-draw"
        style={{ animationDelay: '0.2s', animationDuration: '3s' }}
      />
      <path
        d={`M${P[0].x} ${P[0].y} C${P[1].x} ${P[1].y}, ${P[2].x} ${P[2].y}, ${P[3].x} ${P[3].y}`}
        fill="none"
        stroke={RED}
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        className="art-draw"
        style={{ animationDelay: '0.1s', animationDuration: '2.6s' }}
      />
      {[0.18, 0.36, 0.54, 0.72].map((t, k) => {
        const p = bez(t);
        return (
          <circle
            key={t}
            cx={p.x}
            cy={p.y}
            r={3 + k * 1.5}
            fill="#fff"
            fillOpacity={0.9}
            className="art-pop"
            style={{ animationDelay: `${r(0.6 + k * 0.5)}s` }}
          />
        );
      })}

      {/* The listing */}
      <circle cx={F.x} cy={F.y} r={10} fill={RED} className="art-pop" style={{ animationDelay: '2.3s' }} />
      <circle cx={F.x} cy={F.y} r={10} fill="none" stroke={RED} strokeWidth={2} className="art-ping" />
      <circle cx={F.x} cy={F.y} r={10} fill="none" stroke={RED} strokeWidth={2} className="art-ping" style={{ animationDelay: '1.4s' }} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

export function CategoryArt({ id, className = '' }: { id: SeriesId; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  // Draw-on animations wait until the artwork is actually on screen.
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      ref={ref}
      data-play={inView ? 'true' : 'false'}
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {id === 'lets-get-esops-right' && <Foundations uid={uid} />}
      {id === 'esops-and-beyond' && <Vesting uid={uid} />}
      {id === 'pre-ipo-series' && <Orbit uid={uid} />}
    </svg>
  );
}
