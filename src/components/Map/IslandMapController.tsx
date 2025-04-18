// 📝 Путь: src/components/Map/IslandMapController.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './IslandMapController.module.css';

interface Props {
  children: React.ReactNode;
}

export const IslandMapController = ({ children }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(2, Math.max(0.8, scale - e.deltaY * 0.001));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !startRef.current) return;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    startRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setDragging(false);
    startRef.current = null;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    const element = mapRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        startRef.current = {x: touch.clientX, y: touch.clientY};
        setDragging(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging || !startRef.current || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const dx = touch.clientX - startRef.current.x;
      const dy = touch.clientY - startRef.current.y;

      setPosition(prev => ({
        x: prev.x + dx,
        y: prev.y + dy,
      }));

      startRef.current = {x: touch.clientX, y: touch.clientY};
    };

    const handleTouchEnd = () => {
      setDragging(false);
      startRef.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, {passive: false});
    element.addEventListener('touchmove', handleTouchMove, {passive: false});
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    }
    
  }, [dragging]);

  return (
    <div
      className={styles.viewport}
      ref={mapRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <div
        className={styles.inner}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
