import React, { useState, useEffect, useRef } from 'react';
import { waUrl } from '../utils/helpers';

const PROMO_SEEN_KEY = 'gp-promo-banner-seen-v1';

export default function PromoBanner({ data, contact }) {
  const slides = (data && data.slides) || [];
  const enabled = data && data.enabled && slides.length > 0;

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let alreadySeen = false;
    try {
      alreadySeen = data.showEverySession
        ? false
        : localStorage.getItem(PROMO_SEEN_KEY) === '1';
    } catch {}
    if (alreadySeen) return;
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, [enabled, data]);

  useEffect(() => {
    if (!open || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [open, slides.length]);

  function close() {
    setOpen(false);
    try {
      if (!data.showEverySession) localStorage.setItem(PROMO_SEEN_KEY, '1');
    } catch {}
  }

  function go(delta) {
    if (timerRef.current) clearInterval(timerRef.current);
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!enabled || !open) return null;

  return (
    <div className="promo-overlay" onClick={close}>
      <div className="promo-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="promo-close"
          aria-label="Tutup"
          onClick={close}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <a
          className="promo-image-link"
          href={waUrl(contact.whatsapp, 'Halo, saya ingin menanyakan promo Gunung Putri Apartment.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="promo-slide"
              style={{ display: i === index ? 'block' : 'none' }}
            >
              <img
                src={s.image}
                alt={`Promo banner ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ))}
        </a>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="promo-nav promo-prev"
              aria-label="Sebelumnya"
              onClick={() => go(-1)}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              className="promo-nav promo-next"
              aria-label="Selanjutnya"
              onClick={() => go(1)}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="promo-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`promo-dot ${i === index ? 'active' : ''}`}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIndex(i);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
