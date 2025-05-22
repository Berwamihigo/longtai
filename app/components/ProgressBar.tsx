"use client";

import { useEffect, Suspense } from 'react';
import NProgress from 'nprogress';
import { usePathname } from 'next/navigation';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

function ProgressBarContent() {
  const pathname = usePathname();

  useEffect(() => {
    // Start progress bar when navigation begins
    const handleStart = () => {
      NProgress.start();
    };

    // Complete progress bar when navigation ends
    const handleStop = () => {
      NProgress.done();
    };

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleStart);
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href && !link.href.startsWith('javascript:')) {
        handleStart();
      }
    });

    // Clean up
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      handleStop();
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return null;
}

export default function ProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBarContent />
    </Suspense>
  );
} 