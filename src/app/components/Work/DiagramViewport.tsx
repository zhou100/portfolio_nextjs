'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export default function DiagramViewport({ children, start }: { children: ReactNode; start: number }) {
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = viewport.current;
    if (element && window.matchMedia('(max-width: 900px)').matches) {
      element.scrollLeft = Math.max(0, element.scrollWidth * start - element.clientWidth / 2);
    }
  }, [start]);
  return <div ref={viewport} className="architecture__viewport" tabIndex={0} role="region" aria-label="Architecture diagram; scroll to explore">{children}</div>;
}
