import React from 'react';
import { Reveal } from './Reveal';

export default function About({ data }) {
  return (
    <section id="about" className="bg-white">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-text">
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 style={{ marginTop: 14 }}>{data.title}</h2>
            <div className="divider" />
            {data.paragraphs.map((p, i) => (
              <p key={i} className="lead" style={i > 0 ? { marginTop: 18 } : {}}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={200} className="about-image">
            <img src={data.image} alt={data.title} />
          </Reveal>
        </div>
        <Reveal className="stats">
          {data.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
