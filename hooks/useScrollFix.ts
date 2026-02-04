import { useEffect } from 'react';

/**
 * Force-enable scrolling on the page to fix scroll blocking issues
 */
export const useScrollFix = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Ensure body and html can scroll - apply once on mount
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
    document.body.style.height = 'auto';
    document.body.style.minHeight = '100vh';
  }, []);
};
