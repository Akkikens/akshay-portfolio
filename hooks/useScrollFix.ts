import { useEffect } from 'react';

/**
 * Force-enable scrolling on the page to fix scroll blocking issues
 */
export const useScrollFix = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Ensure body and html can scroll
    const forceScroll = () => {
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
      document.body.style.height = 'auto';
      document.body.style.minHeight = '100vh';
      document.documentElement.style.height = 'auto';
      document.documentElement.style.minHeight = '100vh';
    };

    // Apply immediately
    forceScroll();

    // Apply again after a short delay to override any competing styles
    const timeoutId = setTimeout(forceScroll, 100);

    // Re-apply on any route change or state update
    const observer = new MutationObserver(forceScroll);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);
};
