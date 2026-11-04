import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TgmLogo } from './TgmLogo';
import { SERVICES } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAfrica = path === '/services/africa-corridor';
  const isPartners = path === '/partners';
  const isContact = path === '/contact';
  const isServices = path.startsWith('/services') || (path === '/' && location.hash === '#services');

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`site-head ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap">
          <Link to="/" aria-label="TGM Accounting & Auditing — home">
            <TgmLogo variant="nav" onDark={true} />
          </Link>

          <nav className="main-nav" aria-label="Main Navigation">
            {/* Services with Dropdown */}
            <div className="nav-dropdown-wrapper">
              <Link
                to="/#services"
                className="nav-dropdown-trigger"
                aria-current={isServices ? 'page' : undefined}
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>
              <div className="nav-dropdown-menu">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="nav-dropdown-item"
                  >
                    {s.short}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/services/africa-corridor"
              className="nav-link"
              aria-current={isAfrica ? 'page' : undefined}
            >
              UAE–Africa
            </Link>
            <Link
              to="/partners"
              className="nav-link"
              aria-current={isPartners ? 'page' : undefined}
            >
              Partners
            </Link>
            <Link
              to="/contact"
              className="nav-link"
              aria-current={isContact ? 'page' : undefined}
            >
              Contact
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link className="btn btn-gold" to="/contact">
              Book a 20-min call
            </Link>
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(197, 159, 90, 0.25)',
            paddingBottom: '16px',
          }}
        >
          <TgmLogo variant="nav" onDark={true} />
          <button
            type="button"
            onClick={closeMobile}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory)',
              cursor: 'pointer',
              padding: '6px',
            }}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '12px',
          }}
        >
          <Link
            to="/#services"
            onClick={closeMobile}
            style={{
              color: 'var(--ivory)',
              fontSize: '17px',
              fontWeight: 600,
              padding: '8px 0',
            }}
          >
            Services Overview
          </Link>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingLeft: '14px',
              borderLeft: '2px solid rgba(197, 159, 90, 0.3)',
            }}
          >
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                onClick={closeMobile}
                style={{
                  color: 'rgba(255, 242, 223, 0.8)',
                  fontSize: '14px',
                }}
              >
                {s.short}
              </Link>
            ))}
          </div>

          <Link
            to="/services/africa-corridor"
            onClick={closeMobile}
            style={{
              color: 'var(--ivory)',
              fontSize: '17px',
              fontWeight: 600,
              padding: '8px 0',
              marginTop: '8px',
            }}
          >
            UAE–Africa Corridor
          </Link>
          <Link
            to="/partners"
            onClick={closeMobile}
            style={{
              color: 'var(--ivory)',
              fontSize: '17px',
              fontWeight: 600,
              padding: '8px 0',
            }}
          >
            Partners
          </Link>
          <Link
            to="/contact"
            onClick={closeMobile}
            style={{
              color: 'var(--ivory)',
              fontSize: '17px',
              fontWeight: 600,
              padding: '8px 0',
            }}
          >
            Contact
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <Link
            className="btn btn-gold"
            to="/contact"
            onClick={closeMobile}
            style={{ width: '100%' }}
          >
            Book a 20-min call
          </Link>
          <a
            className="btn btn-line-ivory"
            href={SITE_CONFIG.wa}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%', marginTop: '10px' }}
          >
            Direct WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};
