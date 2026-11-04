import React from 'react';

interface TgmLogoProps {
  variant?: 'nav' | 'footer' | 'hero' | 'compact';
  onDark?: boolean;
  className?: string;
}

export const TgmLogo: React.FC<TgmLogoProps> = ({
  variant = 'nav',
  onDark = false,
  className = '',
}) => {
  // Use forest green logo on light backgrounds, ivory logo on dark backgrounds
  const logoGreen = '/assets/aistudio/TGM_LOGO.png_2_4c0345ff.png';
  const logoIvory = '/assets/aistudio/TGM_LOGO.png_1_23d09716.png';
  const logoSrc = onDark ? logoIvory : logoGreen;

  if (variant === 'nav') {
    return (
      <div className={`brand-link ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
        <div className="brand-logo-clean" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logoSrc}
            alt="TGM - Transparency | Governance | Materiality"
            className="brand-logo-img"
            style={{
              height: '46px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            loading="eager"
          />
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`tgm-footer-logo ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ maxWidth: '240px' }}>
          <img
            src={logoSrc}
            alt="TGM - Transparency | Governance | Materiality"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // Hero / Center display
  return (
    <div
      className={`tgm-hero-logo ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <img
          src={logoSrc}
          alt="TGM - Transparency | Governance | Materiality"
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};
