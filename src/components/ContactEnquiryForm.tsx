import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../data/siteConfig';

interface ContactEnquiryFormProps {
  initialPrompt?: string;
  compact?: boolean;
  heading?: string;
}

export const ContactEnquiryForm: React.FC<ContactEnquiryFormProps> = ({
  initialPrompt = '',
  compact = false,
  heading = 'Send a Consultation Enquiry:',
}) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [turnover, setTurnover] = useState('');
  const [software, setSoftware] = useState('');
  const [promptReason, setPromptReason] = useState(initialPrompt);
  const [website, setWebsite] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | 'whatsapp';
    message: string;
  } | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPromptReason(initialPrompt);
    }
  }, [initialPrompt]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: compact ? '9px 12px' : '12px 16px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--cream)',
    color: 'var(--text-dark)',
    fontFamily: 'inherit',
    fontSize: compact ? '13px' : '14px',
    outline: 'none',
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName,
          contactEmail,
          contactPhone,
          businessType,
          turnover,
          software,
          promptReason,
          website,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string; error?: string };

      if (!response.ok) {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Unable to send your enquiry right now. Please try WhatsApp below.',
        });
        return;
      }

      setSubmitStatus({
        type: 'success',
        message:
          data.message ||
          'Thank you. Your consultation enquiry has been sent to our advisory team.',
      });
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setBusinessType('');
      setTurnover('');
      setSoftware('');
      setPromptReason('');
      setWebsite('');
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error while sending your enquiry. Please try again or reach us on WhatsApp.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleWhatsAppPrep = () => {
    const text = encodeURIComponent(
      `Hello TGM Accounting & Auditing,\n\nI would like to schedule a 20-min consultation.\n\nName / Organization: ${contactName || 'Business Owner'}\nEmail: ${contactEmail || 'Not specified'}\nPhone: ${contactPhone || 'Not specified'}\nIndustry & Countries: ${businessType || 'SME'}\nApprox Turnover / Entities: ${turnover || 'Not specified'}\nAccounting Software: ${software || 'Not specified'}\nPrimary Objective: ${promptReason || 'Finance Review / Audit Readiness'}`
    );
    window.open(`${SITE_CONFIG.wa}?text=${text}`, '_blank', 'noopener,noreferrer');
    setSubmitStatus({
      type: 'whatsapp',
      message: 'Opening WhatsApp with your consultation details...',
    });
  };

  return (
    <form
      onSubmit={handleEmailSubmit}
      className={compact ? 'concierge-enquiry-form' : undefined}
      style={{
        marginTop: compact ? '0' : '32px',
        borderTop: compact ? 'none' : '1px solid var(--border)',
        paddingTop: compact ? '0' : '24px',
        display: 'grid',
        gap: compact ? '10px' : '14px',
        position: 'relative',
      }}
    >
      {heading && (
        <p
          style={{
            fontSize: compact ? '13px' : '14px',
            fontWeight: 700,
            color: 'var(--forest-dark)',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          {heading}
        </p>
      )}

      {/* Honeypot anti-spam field */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor={compact ? 'concierge-contact-website' : 'contact-website'}>Website</label>
        <input
          id={compact ? 'concierge-contact-website' : 'contact-website'}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          required
          placeholder="Your Name / Organization *"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: compact ? '1fr' : '1fr 1fr',
          gap: compact ? '10px' : '12px',
        }}
      >
        <input
          type="email"
          required
          placeholder="Email Address *"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Phone / WhatsApp (Optional)"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: compact ? '8px' : '12px',
        }}
      >
        <input
          type="text"
          placeholder="Turnover / Entities"
          value={turnover}
          onChange={(e) => setTurnover(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Accounting Software"
          value={software}
          onChange={(e) => setSoftware(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Industry & Countries (e.g. Trading, UAE & Tanzania)"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <textarea
          rows={compact ? 2 : 3}
          required
          placeholder="What prompted you to get in touch? *"
          value={promptReason}
          onChange={(e) => setPromptReason(e.target.value)}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>
      <div style={{ display: 'grid', gap: compact ? '8px' : '10px', marginTop: compact ? '2px' : '6px' }}>
        <button
          type="submit"
          disabled={isSending}
          className="btn btn-gold"
          style={{
            width: '100%',
            minHeight: compact ? '40px' : '48px',
            padding: compact ? '10px 16px' : undefined,
            fontSize: compact ? '13.5px' : undefined,
            cursor: isSending ? 'wait' : 'pointer',
            opacity: isSending ? 0.78 : 1,
          }}
        >
          {isSending ? 'Sending Enquiry...' : 'Send Email Enquiry'}
        </button>
        <button
          type="button"
          onClick={handleWhatsAppPrep}
          className="btn btn-line-forest"
          style={{
            width: '100%',
            minHeight: compact ? '40px' : '48px',
            padding: compact ? '10px 16px' : undefined,
            fontSize: compact ? '13px' : undefined,
            cursor: 'pointer',
          }}
        >
          Or Send Briefing via WhatsApp
        </button>
      </div>
      {submitStatus && (
        <p
          role="status"
          style={{
            margin: '4px 0 0',
            padding: compact ? '10px 12px' : '12px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: compact ? '12.5px' : '13.5px',
            lineHeight: '19px',
            fontWeight: 600,
            backgroundColor:
              submitStatus.type === 'error'
                ? 'rgba(153, 27, 27, 0.08)'
                : 'rgba(23, 74, 54, 0.08)',
            border:
              submitStatus.type === 'error'
                ? '1px solid rgba(153, 27, 27, 0.28)'
                : '1px solid rgba(23, 74, 54, 0.25)',
            color: submitStatus.type === 'error' ? '#8B1E1E' : 'var(--forest)',
          }}
        >
          {submitStatus.message}
        </p>
      )}
    </form>
  );
};
