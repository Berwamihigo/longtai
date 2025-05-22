import { useCallback } from 'react';
import NProgress from 'nprogress';

export const useProgressBar = () => {
  const handleNavigation = useCallback((path: string) => {
    NProgress.start();
    
    // Reset progress bar after navigation
    setTimeout(() => {
      NProgress.done();
    }, 1000);
  }, []);

  return handleNavigation;
}; 