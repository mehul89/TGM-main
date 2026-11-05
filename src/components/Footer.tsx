import React from 'react';
import { Link } from 'react-router-dom';
import { TgmLogo } from './TgmLogo';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-grid">
          {/* Brand Column */}
          <div>
            <Link to="/" aria-label="TGM Accounting & Auditing — home">
              <TgmLogo variant="footer" onDark={true} />
            </Link>
            <p className="foot-desc">
              {SITE_CONFIG.address}
            </p>
            <div className="foot-contact-pills">
              <a href={`tel:${SITE_CONFIG.phoneTel}`} className="foot-contact-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--gold-light)' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="foot-contact-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--gold-light)' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <p className="foot-heading">Practice Areas</p>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm Column */}
          <div>
            <p className="foot-heading">The Firm</p>
            <ul>
              <li>
                <Link to="/partners">Partners Profile</Link>
              </li>
              <li>
                <Link to="/services/finance-health-check">Finance Health Check</Link>
              </li>
              <li>
                <Link to="/services/africa-corridor">UAE–Africa Desk</Link>
              </li>
              <li>
                <Link to="/contact">Book Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p className="foot-heading">Direct Access</p>
            <ul>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phoneTel}`}>{SITE_CONFIG.phoneDisplay}</a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Consultation
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dubai Office (Google Maps)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Tagline Banner in Footer */}
        <div className="foot-tagline-wrapper">
          <div className="brand-tagline-bar foot-tagline">
            <span className="rule" />
            <span className="text">TRANSPARENCY | GOVERNANCE | MATERIALITY</span>
            <span className="rule" />
          </div>
        </div>

        {/* Foot Base */}
        <div className="foot-base">
          <span>
            © 2026 TGM Accounting &amp; Auditing LLC · Dubai Mainland · Commercial Licence {SITE_CONFIG.licence}
          </span>
          <span className="regions">
            UAE · Africa · India
          </span>
        </div>
      </div>
    </footer>
  );
};
