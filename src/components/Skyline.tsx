import React from 'react';

const TOWERS_SPEC = [
  { delay: 0.1, width: 4, height: 110, kind: '' },
  { delay: 0.25, width: 6, height: 170, kind: 'gulf' },
  { delay: 0.4, width: 3, height: 90, kind: '' },
  { delay: 0.55, width: 5, height: 220, kind: '' },
  { delay: 0.7, width: 7, height: 150, kind: 'earth crane' },
  { delay: 0.85, width: 4, height: 260, kind: '' },
  { delay: 1.0, width: 7, height: 330, kind: 'burj' },
  { delay: 1.15, width: 5, height: 200, kind: 'gold' },
  { delay: 1.3, width: 4, height: 240, kind: '' },
  { delay: 1.45, width: 6, height: 130, kind: 'gulf' },
  { delay: 1.6, width: 3, height: 180, kind: '' },
  { delay: 1.75, width: 5, height: 100, kind: 'hide-sm' },
];

export const Skyline: React.FC = () => {
  return (
    <div className="skyline" aria-hidden="true">
      <div className="sun" />
      <div className="towers">
        {TOWERS_SPEC.map((t, idx) => {
          const isBurj = t.kind === 'burj';
          const hasCrane = t.kind.includes('crane');
          const cleanCls = `tower ${t.kind.replace('crane', '').trim()}`.trim();

          return (
            <div
              key={idx}
              className={cleanCls}
              style={{
                animationDelay: `${t.delay}s`,
                width: `${t.width}%`,
                height: `${t.height}px`,
              }}
            >
              {hasCrane && <span className="crane" />}
              {isBurj && (
                <>
                  <i style={{ width: '6%', minWidth: '3px', height: '70px' }} />
                  <i style={{ width: '34%', height: '60px' }} />
                  <i style={{ width: '64%', height: '80px' }} />
                  <i style={{ width: '100%', height: '120px' }} />
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="dune" />
      <div className="dune-base" />
    </div>
  );
};
