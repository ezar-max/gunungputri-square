import React from 'react';
import { Reveal } from './Reveal';

function goToUnitType(tower, name, size) {
  window.dispatchEvent(
    new CustomEvent('gp:goto-unit', { detail: { tower, name, size } })
  );
}

export default function Units({ data }) {
  return (
    <section className="bg-grey">
      <div className="container">
        <Reveal className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.title}</h2>
          <p className="lead">{data.subtitle}</p>
        </Reveal>

        {data.towers.map((t, i) => (
          <div className={`tower ${i % 2 === 1 ? 'flip' : ''}`} key={t.name}>
            <Reveal className="tower-image">
              <img src={t.image} alt={t.name} />
            </Reveal>
            <Reveal delay={150}>
              <h3 className="tower-name">{t.name}</h3>
              <div className="divider" />
              <p className="tower-desc">{t.description}</p>
              <div className="unit-list">
                {t.types.map((u, j) => (
                  <div
                    className="unit-card unit-card-link"
                    key={j}
                    role="button"
                    tabIndex={0}
                    onClick={() => goToUnitType(t.name, u.name, u.size)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        goToUnitType(t.name, u.name, u.size);
                      }
                    }}
                  >
                    <span className="unit-tag">{u.note}</span>
                    <div className="unit-name">{u.name}</div>
                    <div className="unit-size">{u.size}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
