'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PreloaderContextType {
  isPreloaderComplete: boolean;
  completePreloader: () => void;
}

const PreloaderContext = createContext<PreloaderContextType>({
  isPreloaderComplete: true, // Default to true for SSR/Safety
  completePreloader: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(true);
  
  useEffect(() => {
    // Run only on client
    const hasLoaded = sessionStorage.getItem('veritas_initial_loaded');
    if (!hasLoaded) {
      setIsPreloaderComplete(false);
    }
  }, []);

  const completePreloader = () => {
    sessionStorage.setItem('veritas_initial_loaded', 'true');
    setIsPreloaderComplete(true);
  };

  return (
    <PreloaderContext.Provider value={{ isPreloaderComplete, completePreloader }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
