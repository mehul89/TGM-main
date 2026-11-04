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
            <TgmLogo variant="footer" onDark={false} />
            <p
              style={{
                marginTop: '18px',
                fontSize: '13px',
                lineHeight: '22px',
                color: 'var(--text-muted)',
                maxWidth: '300px',
              }}
            >
              {SITE_CONFIG.address}
            </p>
          </div>

          {/* Services Column */}
          <div>
            <p className="eyebrow forest">Practice Areas</p>
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
            <p className="eyebrow forest">The Firm</p>
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
            <p className="eyebrow forest">Direct Access</p>
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
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
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
        <div
          style={{
            marginTop: '44px',
            paddingTop: '28px',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div className="brand-tagline-bar" style={{ color: 'var(--forest)' }}>
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
          <span>
            Dubai · Tanzania · Zambia · Mozambique
          </span>
        </div>
      </div>
    </footer>
  );
};
