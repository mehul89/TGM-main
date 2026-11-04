import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../data/siteConfig';

export const ContactPage: React.FC = () => {
  const [businessType, setBusinessType] = useState('');
  const [turnover, setTurnover] = useState('');
  const [software, setSoftware] = useState('');
  const [promptReason, setPromptReason] = useState('');
  const [contactName, setContactName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Contact | TGM Accounting & Auditing, Al Mankhool, Dubai';
  }, []);

  const handleQuickPrep = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello TGM Accounting & Auditing,\n\nI would like to schedule a 20-min consultation.\n\nName / Organization: ${contactName || 'Business Owner'}\nIndustry & Countries: ${businessType || 'SME'}\nApprox Turnover / Entities: ${turnover || 'Not specified'}\nAccounting Software: ${software || 'Not specified'}\nPrimary Objective: ${promptReason || 'Finance Review / Audit Readiness'}`
    );
    window.open(`${SITE_CONFIG.wa}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <p className="crumbs">
            <Link to="/">Home</Link> / Contact
          </p>
          <p className="eyebrow forest">Direct Consultation</p>
          <h1
            className="h1"
            style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', maxWidth: '860px' }}
          >
            Start with a 20-minute conversation.
          </h1>
          <p className="lead">
            Tell us which numbers you rely on and where an error would hurt. If a Finance Health Check makes sense, we'll say so — and if it doesn't, we'll say that too.
          </p>
        </div>
      </section>

      <section className="sec sec-cream">
        <div
          className="wrap"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: '52px',
          }}
        >
          {/* Direct Contact Details */}
          <div>
            <ul className="contact-list">
              <li>
                <p className="eyebrow">Official Inquiries</p>
                <p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    style={{ fontWeight: 600, fontSize: '18px', color: 'var(--forest-dark)' }}
                  >
                    {SITE_CONFIG.email}
                  </a>
                </p>
              </li>
              <li>
                <p className="eyebrow">Direct Line</p>
                <p>
                  <a
                    href={`tel:${SITE_CONFIG.phoneTel}`}
                    style={{ fontWeight: 600, fontSize: '18px', color: 'var(--forest-dark)' }}
                  >
                    {SITE_CONFIG.phoneDisplay}
                  </a>
                </p>
              </li>
              <li>
                <p className="eyebrow">Messaging Channels</p>
                <p>
                  <a
                    href={SITE_CONFIG.wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 600, color: 'var(--forest)' }}
                  >
                    Direct Message on WhatsApp →
                  </a>
                </p>
              </li>
              <li>
                <p className="eyebrow">Dubai Headquarters</p>
                <p style={{ color: 'var(--text-dark)', lineHeight: '24px' }}>
                  {SITE_CONFIG.address}
                </p>
                <p className="small" style={{ marginTop: '8px' }}>
                  <a
                    href={SITE_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--forest)', fontWeight: 600 }}
                  >
                    Open in Google Maps →
                  </a>
                </p>
              </li>
              <li>
                <p className="eyebrow">Operating Hours</p>
                <p style={{ color: 'var(--text-muted)' }}>
                  {SITE_CONFIG.hours}
                </p>
              </li>
            </ul>

            <div className="btns" style={{ marginTop: '36px' }}>
              <a
                className="btn btn-forest"
                href={`mailto:${SITE_CONFIG.email}?subject=Finance%20Health%20Check%20enquiry`}
              >
                Send Formal Email
              </a>
              <a
                className="btn btn-line-forest"
                href={SITE_CONFIG.wa}
                target="_blank"
                rel="noopener noreferrer"
              >
                Direct WhatsApp
              </a>
            </div>
          </div>

          {/* Call Preparation & Inquiry Form */}
          <div className="card" style={{ padding: '36px' }}>
            <p className="eyebrow">Briefing Guide</p>
            <h2
              className="h3"
              style={{ fontSize: '24px', lineHeight: '30px', marginBottom: '16px' }}
            >
              Help us prepare for the call
            </h2>
            <ul className="checks" style={{ fontSize: '15px', lineHeight: '24px' }}>
              <li>What your business does, and in which countries</li>
              <li>Approximate annual turnover and number of operating entities</li>
              <li>The accounting software you use (e.g., ERPNext, Tally, Zoho, Sage)</li>
              <li>
                What prompted you to get in touch — a lender request, a tax deadline, or a cash pinch
              </li>
            </ul>

            <form
              onSubmit={handleQuickPrep}
              style={{
                marginTop: '32px',
                borderTop: '1px solid var(--border)',
                paddingTop: '24px',
                display: 'grid',
                gap: '14px',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--forest-dark)',
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                Instant Consultation Briefing:
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Your Name / Organization"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Turnover / No. of entities"
                  value={turnover}
                  onChange={(e) => setTurnover(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <input
                  type="text"
                  placeholder="Accounting Software"
                  value={software}
                  onChange={(e) => setSoftware(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Industry & Countries (e.g. Trading, UAE & Tanzania)"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <textarea
                  rows={2}
                  placeholder="What prompted you to get in touch?"
                  value={promptReason}
                  onChange={(e) => setPromptReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--cream)',
                    color: 'var(--text-dark)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-gold"
                style={{ width: '100%', cursor: 'pointer', marginTop: '6px' }}
              >
                Generate Briefing via WhatsApp
              </button>
              {submitted && (
                <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--forest)', fontWeight: 600 }}>
                  Connecting directly to WhatsApp with your consultation details...
                </p>
              )}
            </form>

            <p className="small muted" style={{ margin: '24px 0 0', lineHeight: '20px' }}>
              We treat all financial records and disclosures with strict institutional confidentiality. No entries or configurations in your systems are altered.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
