import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlanetGlobe } from './PlanetGlobe';

gsap.registerPlugin(ScrollTrigger);

type RegionKey = 'all' | 'uae' | 'africa' | 'india';

interface LocationPin {
  id: string;
  region: 'uae' | 'africa' | 'india';
  city: string;
  country: string;
  coords: { x: number; y: number };
  role: string;
  authority: string;
  desc: string;
  stat: string;
}

const PINS: LocationPin[] = [
  {
    id: 'dubai',
    region: 'uae',
    city: 'Dubai & Abu Dhabi',
    country: 'United Arab Emirates',
    coords: { x: 475, y: 160 },
    role: 'Corporate Headquarters & Freezone Substance',
    authority: 'Federal Tax Authority (FTA)',
    desc: 'Fractional CFO, 9% Corporate Tax advisory, Qualifying Free Zone Person (QFZP) compliance, and banking dossiers across all UAE corporate registries.',
    stat: '40+ Freezones & Mainland Hubs',
  },
  {
    id: 'tanzania',
    region: 'africa',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    coords: { x: 395, y: 275 },
    role: 'East African Commercial & Port Operations',
    authority: 'Tanzania Revenue Authority (TRA)',
    desc: 'Direct in-country group financial controller oversight, port clearing reconciliation, VAT audits, and cross-border import/export duty frameworks.',
    stat: 'In-Country Group Finance Controller',
  },
  {
    id: 'zambia',
    region: 'africa',
    city: 'Lusaka & Copperbelt',
    country: 'Zambia',
    coords: { x: 350, y: 325 },
    role: 'Central & Southern African Industrial Governance',
    authority: 'Zambia Revenue Authority (ZRA)',
    desc: 'Statutory compliance, mineral and trade logistics accounting, payroll governance, and multi-currency kwacha/USD cash-flow structuring.',
    stat: 'In-Country Finance Manager & Audits',
  },
  {
    id: 'mozambique',
    region: 'africa',
    city: 'Maputo & Beira',
    country: 'Mozambique',
    coords: { x: 370, y: 375 },
    role: 'Energy, Logistics & Maritime Corridors',
    authority: 'Autoridade Tributária de Moçambique (AT)',
    desc: 'Portuguese commercial code accounting, withholding tax mitigation, trade finance lines, and transit cargo cost accounting.',
    stat: 'SADC Cross-Border Customs Leadership',
  },
  {
    id: 'india',
    region: 'india',
    city: 'Gujarat & Mumbai',
    country: 'India',
    coords: { x: 580, y: 195 },
    role: 'Professional Foundation & Advisory Corridor',
    authority: 'Institute of Chartered Accountants of India (ICAI, 2008)',
    desc: 'Rooted in ICAI standards with extensive advisory on bilateral UAE–India trade flows, comprehensive transfer pricing, and manufacturing balance sheets.',
    stat: '16+ Years Chartered Qualification',
  },
];

const REGION_TABS: { key: RegionKey; label: string }[] = [
  { key: 'all', label: 'All Corridors' },
  { key: 'uae', label: 'UAE Hub' },
  { key: 'africa', label: 'East & Southern Africa' },
  { key: 'india', label: 'India Corridor' },
];

const STATS = [
  { value: '40+', label: 'UAE Freezones & Mainland Hubs', sub: 'Freezones and mainland registries across the UAE' },
  { value: '5+', label: 'Sovereign African Tax Jurisdictions', sub: 'TRA, ZRA, AT & regional desks' },
  { value: '16+', label: 'Years Chartered Rigor', sub: 'ICAI fellowship qualification since 2008' },
  { value: '100%', label: 'In-Country Regulatory Substance', sub: 'Direct hands-on governance & compliance' },
];

export const CorridorMapSection: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<RegionKey>('all');
  const [activePinId, setActivePinId] = useState<string>('dubai');
  const [hoveredRegion, setHoveredRegion] = useState<RegionKey | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);

  const activePin = PINS.find((p) => p.id === activePinId) || PINS[0];

  // Animate intelligence card content on pin/region change
  useEffect(() => {
    if (cardContentRef.current) {
      gsap.fromTo(
        cardContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [activePinId, activeRegion]);

  // GSAP ScrollTrigger cascading reveal animation for the 4 metrics cards
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.corridor-intel-panel',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.corridor-cockpit-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.corridor-metric-card',
        {
          opacity: 0,
          y: 44,
          scale: 0.93,
          filter: 'blur(3px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.corridor-metrics-row',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRegionSelect = (key: RegionKey) => {
    setActiveRegion(key);
    if (key === 'uae') setActivePinId('dubai');
    else if (key === 'africa') setActivePinId('tanzania');
    else if (key === 'india') setActivePinId('india');
  };

  const handlePinClick = (pinId: string, region: 'uae' | 'africa' | 'india') => {
    setActivePinId(pinId);
    setActiveRegion(region);
  };

  return (
    <section ref={sectionRef} id="corridors" className="sec-corridor-showcase">
      <div className="corridor-ambient-glow" aria-hidden="true" />

      <div className="wrap">
        {/* Editorial Section Header following strict hierarchy */}
        <div className="sec-head reveal-on-scroll">
          <h2 className="sec-heading on-dark">Operational Footprint</h2>
          <p className="sec-subheading on-dark">A Connected Tri-Continental Reach Across UAE, Africa &amp; India.</p>
          <p className="sec-body on-dark">
            Direct on-the-ground operating presence bridging Dubai headquarters and freezones with sovereign tax authorities across East and Southern Africa, anchored by premier Indian professional advisory qualifications.
          </p>
        </div>

        {/* Refined Luxury Region Tabs */}
        <div className="corridor-tab-bar" role="tablist" aria-label="Select operational corridor">
          {REGION_TABS.map((tab) => {
            const isActive = activeRegion === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`corridor-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleRegionSelect(tab.key)}
                onMouseEnter={() => setHoveredRegion(tab.key)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <span className="tab-indicator" aria-hidden="true" />
                <span className="tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Balanced Cockpit: Widescreen Animated Map + Single Refined Detail Card */}
        <div className="corridor-cockpit-grid">
          {/* Main 3D Planet Globe Viewport */}
          <div className="corridor-map-viewport">
            <PlanetGlobe
              activeRegion={activeRegion}
              activePinId={activePinId}
              onSelectPin={handlePinClick}
              hoveredRegion={hoveredRegion}
            />
          </div>

          {/* Single Refined Intelligence Card (Balanced Height, Zero Clutter) */}
          <div className="corridor-intel-panel">
            <div className="intel-panel-card">
              <div ref={cardContentRef} className="intel-panel-card-content">
                <div className="intel-card-badge">
                  <span className="badge-dot" />
                  <span>{activePin.stat}</span>
                </div>

                <h3 className="intel-card-title">{activePin.city}</h3>
                <p className="intel-card-country">{activePin.country}</p>

                <div className="intel-card-divider" />

                <div className="intel-field">
                  <span className="intel-label">Mandate / Scope</span>
                  <p className="intel-value font-medium">{activePin.role}</p>
                </div>

                <div className="intel-field">
                  <span className="intel-label">Governing Authority &amp; Standard</span>
                  <p className="intel-value gold-text">{activePin.authority}</p>
                </div>

                <div className="intel-field">
                  <span className="intel-label">Operational Deliverables</span>
                  <p className="intel-desc">{activePin.desc}</p>
                </div>

                <div className="intel-actions">
                  <Link to="/contact" className="btn btn-gold btn-full">
                    Engage {activePin.city} Advisory
                  </Link>
                  <Link to="/about" className="intel-secondary-link">
                    <span>Learn about our cross-border structure</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Sovereign Metrics Cards (Symmetrically Framed) */}
        <div className="corridor-metrics-row">
          {STATS.map((st, i) => (
            <div key={i} className="corridor-metric-card">
              <div className="metric-num">{st.value}</div>
              <h4 className="metric-label">{st.label}</h4>
              <p className="metric-sub">{st.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
