import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PARTNERS } from '../data/partners';
import { CtaBand } from '../components/CtaBand';

export const PartnersPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Partners | TGM Accounting & Auditing, Dubai';
  }, []);

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <Link to="/">Home</Link> / Partners
          </p>
          <p className="eyebrow forest">Leadership &amp; Practice Heads</p>
          <h1
            className="h1"
            style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', maxWidth: '860px' }}
          >
            One partner who runs the finance. One who knows what the bank will ask.
          </h1>
          <p className="lead">
            That combination is why owners call TGM instead of a bookkeeping firm or a loan brokerage.
          </p>
        </div>
      </section>

      {PARTNERS.map((p, index) => {
        const isEven = index % 2 === 0;
        const bgClass = isEven ? 'sec-cream' : 'sec-ivory';
        const displayName = p.id === 'yogesh' ? 'CA Yogesh Trivedi' : p.name;

        return (
          <section key={p.id} id={p.id} className={`sec ${bgClass}`}>
            <div className="wrap profile">
              <div>
                <div className="portrait">
                  <img
                    src={p.img}
                    alt={p.alt}
                    width="800"
                    height="1000"
                    loading="lazy"
                  />
                </div>
                <div style={{ marginTop: '20px' }}>
                  <p className="langs" style={{ maxWidth: '280px', borderTop: 'none', paddingTop: 0 }}>
                    <b style={{ color: 'var(--forest-dark)', display: 'block', marginBottom: '4px' }}>
                      Languages
                    </b>
                    {p.langs}
                  </p>
                  <p
                    className="langs"
                    style={{
                      maxWidth: '280px',
                      marginTop: '12px',
                    }}
                  >
                    <b style={{ color: 'var(--forest-dark)', display: 'block', marginBottom: '4px' }}>
                      Credentials
                    </b>
                    <span dangerouslySetInnerHTML={{ __html: p.creds }} />
                  </p>
                </div>
              </div>

              <div>
                <p className="eyebrow">{p.eyebrow}</p>
                <h2 className="h2">{displayName}</h2>
                <p className="role" style={{ fontSize: '16px', color: 'var(--forest)', fontWeight: 600 }}>
                  {p.role}
                </p>
                <div
                  style={{ fontSize: '16px', lineHeight: '28px', color: 'var(--text-dark)' }}
                  dangerouslySetInnerHTML={{ __html: p.introHtml }}
                />

                <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {p.contactUrl ? (
                    <a
                      href={p.contactUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <span>Contact {displayName}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  ) : null}
                  <Link to="/contact" className={p.contactUrl ? 'btn btn-forest' : 'btn btn-gold'}>
                    Schedule a Consultation
                  </Link>
                </div>

                <div className="grid g2" style={{ marginTop: '40px', gap: '44px' }}>
                  <div>
                    <p className="eyebrow">Operating Track Record</p>
                    <ul className="proof">
                      {p.proof.map(([metric, label], idx) => (
                        <li key={idx}>
                          <b>{metric}</b>
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="eyebrow">Professional Trajectory</p>
                    <ul className="timeline">
                      {p.timeline.map(([year, desc], idx) => (
                        <li key={idx}>
                          <span className="mono">{year}</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </main>
  );
};
