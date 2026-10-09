import React from 'react';
import { Reveal } from './Reveal';

export default function Location({ data }) {
  return (
    <section id="location" className="bg-white">
      <div className="container">
        <Reveal className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          <p className="lead">{data.subtitle}</p>
        </Reveal>

        <div className="location-grid">
          <Reveal className="map-frame">
            <iframe
              src={data.mapEmbed}
              title="Lokasi Gunung Putri Apartment"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>

          <Reveal delay={150}>
            <h4 style={{ color: 'var(--c-blue)', marginBottom: 4 }}>Alamat</h4>
            <p style={{ color: 'var(--c-ink-soft)', marginBottom: 8 }}>{data.address}</p>
            <div className="nearby-list" style={{ marginTop: 32 }}>
              {data.nearby.map((row, i) => (
                <div className="nearby-row" key={i}>
                  <div className="nearby-cat">{row.category}</div>
                  <div className="nearby-items">
                    {row.items.map((it, j) => (
                      <span key={j}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
