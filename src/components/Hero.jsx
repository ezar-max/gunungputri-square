import React from 'react';
import { Reveal, useParallax } from './Reveal';
import { waUrl } from '../utils/helpers';

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Hero({ data, contact }) {
  const parallaxRef = useParallax(0.35);

  return (
    <section className="hero hero-v1" id="hero">
      <div className="hero-image">
        <div ref={parallaxRef} style={{ width: '100%', height: '100%' }}>
          <img
            src={data.image}
            alt={data.title}
            style={{ width: '100%', height: '120%', objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <Reveal delay={100}>
          <span className="eyebrow">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={200} as="h1" style={{ marginTop: 18 }}>
          {data.title}
        </Reveal>
        <Reveal delay={350}>
          <p className="hero-sub">{data.subtitle}</p>
        </Reveal>
        <Reveal delay={500}>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={`#${data.primaryCta.target}`}>
              {data.primaryCta.label}
              <ArrowRight />
            </a>
            <a
              className="btn btn-ghost"
              href={waUrl(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.secondaryCta.label}
            </a>
          </div>
        </Reveal>
      </div>
      <div className="scroll-hint">Scroll</div>
    </section>
  );
}
