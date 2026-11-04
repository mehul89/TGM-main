import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../data/siteConfig';

interface CtaBandProps {
  title?: string;
  text?: string;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  title = "Let's find out what your numbers aren't telling you.",
  text = "Start with a Finance Health Check. We review your books and controls view-only without changing anything, and you receive an independent findings memo valued in dirhams.",
}) => {
  return (
    <section className="sec sec-ivory" style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div
        className="wrap"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '36px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1 1 540px', minWidth: 0 }}>
          <p className="eyebrow forest" style={{ marginBottom: '10px' }}>
            Next Step
          </p>
          <h2 className="h2" style={{ color: 'var(--forest-deep)' }}>
            {title}
          </h2>
          <p className="lead" style={{ marginTop: '14px', color: 'var(--text-body)' }}>
            {text}
          </p>
        </div>
        <div className="btns" style={{ marginTop: 0, flexShrink: 0 }}>
          <Link className="btn btn-forest" to="/contact">
            Book a 20-min call
          </Link>
          <a
            className="btn btn-line-forest"
            href={SITE_CONFIG.wa}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
};
