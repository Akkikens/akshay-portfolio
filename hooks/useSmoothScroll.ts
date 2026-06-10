import { useEffect } from 'react';
import { scrollToTarget } from './useLenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Anchor clicks route through Lenis (or native fallback) via scrollToTarget
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const element = document.querySelector<HTMLElement>(href);
          if (element) {
            e.preventDefault();
            scrollToTarget(element);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};
