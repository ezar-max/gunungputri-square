import React from 'react';
import { Reveal } from './Reveal';

export default function Testimonials({ data }) {
  return (
    <section id="testimonials" className="bg-white">
      <div className="container">
        <Reveal className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
        </Reveal>
        <div className="testi-grid">
          {data.items.map((t, i) => (
            <Reveal key={i} delay={i * 120} className="testi-card">
              <div className="testi-quote-mark">"</div>
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-person">
                <div className="testi-avatar">
                  <img src={t.photo} alt={t.name} loading="lazy" />
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
