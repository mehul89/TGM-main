import React, { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  '[role="button"]',
  'input:not([type="hidden"])',
  'textarea',
  'select',
  '[data-cursor]',
  '[tabindex]:not([tabindex="-1"])',
  '.mobile-drawer-backdrop',
].join(',');

type CursorMode = 'default' | 'hover' | 'view' | 'drag' | 'explore' | 'text';

function findInteractiveTarget(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const interactive = target.closest(INTERACTIVE_SELECTOR);
  return interactive instanceof HTMLElement ? interactive : null;
}

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringAnchorRef = useRef<HTMLSpanElement>(null);
  const dotAnchorRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!pointerQuery.matches || motionQuery.matches) return;

    const cursor = cursorRef.current;
    const ringAnchor = ringAnchorRef.current;
    const dotAnchor = dotAnchorRef.current;
    const label = labelRef.current;
    if (!cursor || !ringAnchor || !dotAnchor || !label) return;

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let animationFrame = 0;
    let hasPosition = false;
    let mode: CursorMode = 'default';

    const setMode = (target: HTMLElement | null) => {
      if (!target) {
        mode = 'default';
        cursor.dataset.mode = mode;
        label.textContent = '';
        cursor.classList.remove('is-text-entry');
        return;
      }

      const isTextEntry = target.matches('textarea, [contenteditable="true"], input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"])');
      cursor.classList.toggle('is-text-entry', isTextEntry);
      if (isTextEntry) {
        mode = 'text';
        label.textContent = '';
        cursor.dataset.mode = mode;
        return;
      }

      const requestedMode = target.dataset.cursor;
      if (requestedMode === 'view' || requestedMode === 'drag' || requestedMode === 'explore') {
        mode = requestedMode;
      } else if (target.querySelector('img')) {
        mode = 'view';
      } else {
        mode = 'hover';
      }

      cursor.dataset.mode = mode;
      label.textContent = mode === 'view' ? 'VIEW' : mode === 'drag' ? 'GRAB' : mode === 'explore' ? 'EXPLORE' : '';
    };

    const setPosition = (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      setPosition(ringAnchor, ringX, ringY);

      if (Math.abs(targetX - ringX) > 0.12 || Math.abs(targetY - ringY) > 0.12) {
        animationFrame = window.requestAnimationFrame(animateRing);
      } else {
        ringX = targetX;
        ringY = targetY;
        setPosition(ringAnchor, ringX, ringY);
        animationFrame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      setPosition(dotAnchor, targetX, targetY);

      if (!hasPosition) {
        ringX = targetX;
        ringY = targetY;
        setPosition(ringAnchor, ringX, ringY);
        hasPosition = true;
      }

      cursor.classList.add('is-visible');
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animateRing);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      setMode(findInteractiveTarget(event.target));
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      setMode(findInteractiveTarget(event.relatedTarget));
      if (!event.relatedTarget) cursor.classList.remove('is-visible');
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      if (!hasPosition) {
        targetX = event.clientX;
        targetY = event.clientY;
        ringX = targetX;
        ringY = targetY;
        setPosition(dotAnchor, targetX, targetY);
        setPosition(ringAnchor, ringX, ringY);
        hasPosition = true;
      }
      cursor.classList.add('is-pressed');
      if (mode === 'drag') {
        cursor.dataset.mode = 'grabbing';
        label.textContent = 'GRABBING';
      }
    };

    const handlePointerUp = () => {
      cursor.classList.remove('is-pressed');
      cursor.dataset.mode = mode;
      label.textContent = mode === 'view' ? 'VIEW' : mode === 'drag' ? 'GRAB' : mode === 'explore' ? 'EXPLORE' : '';
    };

    const hideCursor = () => {
      cursor.classList.remove('is-visible', 'is-pressed');
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) hideCursor();
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', hideCursor);
    document.documentElement.classList.add('tgm-custom-cursor-enabled');

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', hideCursor);
      document.documentElement.classList.remove('tgm-custom-cursor-enabled');
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="tgm-custom-cursor" aria-hidden="true">
      <span ref={ringAnchorRef} className="tgm-custom-cursor-anchor">
        <span className="tgm-custom-cursor-ring" />
        <span ref={labelRef} className="tgm-custom-cursor-label" />
      </span>
      <span ref={dotAnchorRef} className="tgm-custom-cursor-anchor">
        <span className="tgm-custom-cursor-dot" />
      </span>
    </div>
  );
};
