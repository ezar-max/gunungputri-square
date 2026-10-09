import React, { useState, useEffect } from 'react';

export default function Navigation({ brand, links, contact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const ids = ['hero', ...links.map((l) => l.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-50% 0px -45% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [links]);

  return (
    <header className={`nav ${scrolled ? 'nav-bg' : ''}`}>
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" aria-label={brand.fullName}>
          <img src={brand.logo} alt={brand.fullName} />
        </a>
        <nav className="nav-links">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav-link ${active === l.id ? 'active' : ''}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primary nav-cta"
          href={`https://api.whatsapp.com/send?phone=${contact.whatsapp}&text=${encodeURIComponent(
            contact.whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: '10px 20px', fontSize: 13 }}
        >
          Hubungi Kami
        </a>
        <button
          className="nav-burger"
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 7h18" strokeLinecap="round" />
                <path d="M3 12h18" strokeLinecap="round" />
                <path d="M3 17h18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>
      <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setMobileOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
