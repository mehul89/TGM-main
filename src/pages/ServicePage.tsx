import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES, SERVICES_BY_SLUG } from '../data/services';
import { SITE_CONFIG } from '../data/siteConfig';
import { CorridorMap } from '../components/CorridorMap';
import { CtaBand } from '../components/CtaBand';

export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? SERVICES_BY_SLUG[slug] : undefined;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | TGM Accounting & Auditing`;
    }
  }, [service]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const isAfrica = service.slug === 'africa-corridor';
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <main id="main">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <Link to="/">Home</Link> / <Link to="/#services">Services</Link> / {service.short}
          </p>
          <p className="eyebrow forest">{service.eyebrow}</p>
          <h1
            className="h1"
            style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', maxWidth: '860px' }}
          >
            {service.h1}
          </h1>
          <p className="lead">{service.lead}</p>
          <div className="btns">
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

      {/* What's included */}
      <section className="sec sec-cream">
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Scope &amp; Deliverables</p>
            <h2 className="h2">{service.subsTitle || 'What We Deliver'}</h2>
          </div>
          <div className="grid g3">
            {service.subs.map(([title, desc], idx) => (
              <div key={idx} className="card sub">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          {service.subs2 && (
            <>
              <h2
                className="h2"
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 36px)',
                  margin: '56px 0 24px',
                }}
              >
                {service.subs2Title}
              </h2>
              <div className="grid g3">
                {service.subs2.map(([title, desc], idx) => (
                  <div key={idx} className="card sub">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {service.note && (
            <div className="note" style={{ marginTop: '36px' }}>
              <b>Regulatory &amp; Scope Note:</b> {service.note}
            </div>
          )}
        </div>
      </section>

      {/* Extra Process / Corridor details if applicable */}
      {service.process && (
        <section className="sec sec-ivory">
          <div className="wrap">
            <div className="sec-head">
              <p className="eyebrow">Advisory Sequence</p>
              <h2 className="h2">From Initial Analysis to Facility Disbursement</h2>
            </div>
            <div
              className="grid"
              style={{
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
              }}
            >
              {service.process.map(([num, title, desc]) => (
                <div key={num} className="step">
                  <p className="mono">{num}</p>
                  <h3 className="h3">{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
            {service.lenders && (
              <div style={{ marginTop: '56px', maxWidth: '740px' }}>
                <p className="eyebrow">Underwriting Criteria</p>
                <h3 className="h3" style={{ marginBottom: '16px' }}>
                  What UAE Corporate &amp; SME Lenders Require
                </h3>
                <ul className="checks">
                  {service.lenders.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <p className="small muted" style={{ margin: '20px 0 0' }}>
                  Every financial institution operates within individual risk appetite parameters. Not fully ready? A Finance Health Check resolves gaps before the lender's credit committee review.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {isAfrica && (
        <section className="sec sec-forest-dark">
          <div className="wrap corridor">
            <div>
              <p className="eyebrow on-dark">In-Country Footprint</p>
              <h2 className="h2" style={{ marginBottom: '20px' }}>
                Three sovereign jurisdictions, backed by direct operating tenure.
              </h2>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: '17px',
                  lineHeight: '28px',
                  color: 'rgba(255, 242, 223, 0.9)',
                }}
              >
                In-country Group Finance Controller and Finance Manager roles in Tanzania and Mozambique; active cross-border treasury in Zambia; fractional CFO governance across five East African markets. We only represent jurisdictions where a partner has managed ledgers on the ground.
              </p>
              <div className="facts">
                <div>
                  <p className="eyebrow on-dark">Tanzania</p>
                  <p>TRA · Swahili &amp; English</p>
                </div>
                <div>
                  <p className="eyebrow on-dark">Zambia</p>
                  <p>ZRA · English</p>
                </div>
                <div>
                  <p className="eyebrow on-dark">Mozambique</p>
                  <p>AT · Portuguese</p>
                </div>
              </div>
            </div>
            <div>
              <CorridorMap />
            </div>
          </div>
        </section>
      )}

      {/* Who it's for & other services */}
      <section className="sec sec-white">
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '56px',
          }}
        >
          <div>
            <p className="eyebrow">Target Profiles</p>
            <h2 className="h3" style={{ fontSize: '24px', marginBottom: '20px' }}>
              Who This Practice Is For
            </h2>
            <ul className="checks">
              {service.who.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Practice Directory</p>
            <h2 className="h3" style={{ fontSize: '24px', marginBottom: '20px' }}>
              Related Practices
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '12px',
              }}
            >
              {otherServices.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/services/${o.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      backgroundColor: 'var(--cream)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    <span>{o.short}</span>
                    <span style={{ color: 'var(--forest)' }}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />
    </main>
  );
};
