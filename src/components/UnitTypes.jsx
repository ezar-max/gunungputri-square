import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { slugify } from '../utils/helpers';

function FeatureIcon({ name }) {
  switch (name) {
    case 'bed':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
          <path d="M3 21v-3h18v3" />
          <path d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
        </svg>
      );
    case 'shower':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v2a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4" />
          <path d="M12 10v3" />
          <circle cx="12" cy="16" r="1" />
          <circle cx="9" cy="18" r="1" />
          <circle cx="15" cy="18" r="1" />
          <circle cx="11" cy="20" r="1" />
          <circle cx="14" cy="20" r="1" />
        </svg>
      );
    case 'kitchen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 12h18" />
          <circle cx="7" cy="7.5" r="1" />
          <circle cx="11" cy="7.5" r="1" />
          <path d="M14 16h6" />
          <path d="M7 16h2" />
        </svg>
      );
    case 'balcony':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V11h14v10" />
          <path d="M5 11l2-7h10l2 7" />
          <path d="M9 21v-5M12 21v-5M15 21v-5" />
        </svg>
      );
    default:
      return null;
  }
}

function IconZoom() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function FloorplanLightbox({ data, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  function onWheel(e) {
    e.preventDefault();
    setZoom((z) => Math.min(4, Math.max(1, z - e.deltaY * 0.0015)));
  }

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        type="button"
        className="lightbox-close"
        aria-label="Tutup"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <IconClose />
      </button>
      <div
        className="floorplan-lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
      >
        <img
          src={data.src}
          alt={`${data.name} ${data.size}`}
          draggable={false}
          style={{ transform: `scale(${zoom})`, cursor: 'zoom-in' }}
        />
        <div className="lightbox-caption">
          {data.name} — {data.size}
        </div>
      </div>
    </div>
  );
}

export default function UnitTypes({ data }) {
  const [active, setActive] = useState(0);
  const [highlightKey, setHighlightKey] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const tab = data.tabs[active];

  useEffect(() => {
    function onGoto(e) {
      const { tower, name, size } = e.detail || {};
      const tIdx = data.tabs.findIndex((t) => t.tower === tower);
      if (tIdx === -1) return;
      setActive(tIdx);
      const key = `${slugify(name)}-${slugify(size)}`;
      setHighlightKey(key);
      setTimeout(() => {
        const el = document.getElementById(`unit-${data.tabs[tIdx].id}-${key}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => setHighlightKey(null), 1800);
      }, 250);
    }
    window.addEventListener('gp:goto-unit', onGoto);
    return () => window.removeEventListener('gp:goto-unit', onGoto);
  }, [data.tabs]);

  return (
    <section id="unit-types" className="bg-white">
      <div className="container">
        <Reveal className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          <p className="lead">{data.subtitle}</p>
        </Reveal>

        <Reveal>
          <div className="tabs" role="tablist">
            {data.tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === i}
                className={`tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="tab-label">{t.label}</span>
                <span className="tab-meta">{t.units.length} tipe unit</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal key={tab.id} className="tab-intro">
          <span className="eyebrow">{tab.tower}</span>
          <p className="lead" style={{ marginTop: 8, maxWidth: 720 }}>
            {tab.description}
          </p>
        </Reveal>

        <div className="units-grid" key={`${tab.id}-grid`}>
          {tab.units.map((u, i) => {
            const key = `${slugify(u.name)}-${slugify(u.size)}`;
            return (
              <Reveal
                key={`${tab.id}-${i}`}
                delay={(i % 3) * 100}
                id={`unit-${tab.id}-${key}`}
                className={`unit-detail-card ${highlightKey === key ? 'highlight' : ''}`}
              >
                <div
                  className="unit-floorplan unit-floorplan-clickable"
                  onClick={() => setLightbox({ src: u.floorplan, name: u.name, size: u.size })}
                >
                  <img src={u.floorplan} alt={`${u.name} ${u.size}`} loading="lazy" />
                  <div className="unit-floorplan-zoom-hint">
                    <IconZoom />
                  </div>
                </div>
                <div className="unit-detail-body">
                  <div className="unit-detail-head">
                    <h3 className="unit-detail-name">{u.name}</h3>
                    <span className="unit-detail-size">{u.size}</span>
                  </div>
                  <div className="unit-features">
                    {u.features.map((f, k) => (
                      <div className="feature-chip" key={k}>
                        <FeatureIcon name={f.icon} />
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {lightbox && <FloorplanLightbox data={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
