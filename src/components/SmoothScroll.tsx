'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

/**
 * Lenis keeps its own animated scroll position. If a link is clicked while it is still gliding,
 * Next.js scrolls the new page to the top and Lenis then slides it back to the old target, so the
 * page opens part-way down. Re-syncing Lenis on every route change fixes that.
 */
function ResetScrollOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPath = useRef(pathname);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!lenis || previousPath.current === pathname) return;
    previousPath.current = pathname;

    // Back / forward: keep whatever position the browser restored, just stop Lenis fighting it.
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      return;
    }

    // Links like /framework#mathematics should still land on their section.
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    lenis.scrollTo(target ?? 0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{
      lerp: 0.06,
      duration: 1.8,
      smoothWheel: true,
      wheelMultiplier: 0.8
    }}>
      <ResetScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}
