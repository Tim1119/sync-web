// hooks/useBreakpoint.ts
"use client"
import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const useBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
  const breakpointValue = breakpoints[breakpoint];
  
  // 1. Move initial state calculation here:
  const [isSmaller, setIsSmaller] = useState<boolean>(() => {
    // We must check if window is defined (for SSR)
    if (typeof window === 'undefined') return false; 
    
    // Calculate the initial state only once when the component mounts
    return window.innerWidth < breakpointValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Define the media query based on the calculated breakpoint value
    const mediaQuery = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`);
    
    // The handler function that updates the state
    const handler = (e: MediaQueryListEvent) => {
      // 2. The handler still calls setState, but this is asynchronous (in response to an external event)
      setIsSmaller(e.matches); 
    };

    // Listen for changes
    // Modern approach: mediaQuery.addEventListener('change', handler);
    // Backward compatibility:
    mediaQuery.addListener(handler);

    // Cleanup: remove the listener when the component unmounts
    return () => {
      // Modern approach: mediaQuery.removeEventListener('change', handler);
      mediaQuery.removeListener(handler);
    };
    
  }, [breakpointValue]); // Dependency: recalculate if the breakpoint changes

  return isSmaller;
};

export default useBreakpoint;