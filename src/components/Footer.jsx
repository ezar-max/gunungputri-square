import React from 'react';
import { AdminLoginGate } from '../context/AdminContext';
import { waUrl } from '../utils/helpers';

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.22.41a3.7 3.7 0 0 1 1.37.89c.42.42.68.82.89 1.37.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22a3.7 3.7 0 0 1-.89 1.37c-.42.42-.82.68-1.37.89-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.37-.89 3.7 3.7 0 0 1-.89-1.37c-.16-.42-.36-1.05-.41-2.22C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.21-.55.47-.95.89-1.37s.82-.68 1.37-.89c.42-.16 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.51 0-4.74.06-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83s-.62.76-.83 1.27c-.15.39-.33.97-.38 2.04C2.68 8.49 2.67 8.85 2.67 12s0 3.51.07 4.74c.05 1.07.23 1.65.38 2.04.21.51.44.88.83 1.27s.76.62 1.27.83c.39.15.97.33 2.04.38 1.23.06 1.59.07 4.74.07s3.51 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.21.88-.44 1.27-.83s.62-.76.83-1.27c.15-.39.33-.97.38-2.04.06-1.23.07-1.59.07-4.74s0-3.51-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 0 0-.83-1.27 3.4 3.4 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.23-.06-1.59-.07-4.74-.07zm0 3.07a4.93 4.93 0 1 1 0 9.86 4.93 4.93 0 0 1 0-9.86zm0 1.8a3.13 3.13 0 1 0 0 6.26 3.13 3.13 0 0 0 0-6.26zM18 6.65a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v6.98A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.5 1.34 5.02L2 22l5.13-1.32A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.4 14.27c-.23.65-1.34 1.25-1.86 1.31-.5.06-1.14.08-1.84-.12-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.23.56.78 1.93.85 2.07.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.37-.44.5-.14.14-.29.29-.13.57.16.29.71 1.17 1.52 1.89.99.88 1.83 1.16 2.1 1.3.27.14.43.12.59-.07.16-.19.7-.81.89-1.09.19-.29.36-.24.62-.15.26.09 1.64.77 1.92.91.28.14.46.21.53.33.05.12.05.71-.18 1.36z" />
    </svg>
  );
}

export default function Footer({ data, brand, contact }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">{brand.fullName}</div>
            <p className="footer-desc">{data.description}</p>
          </div>
          {data.columns.map((col, i) => (
            <div className="footer-col" key={i}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <div>{data.legal}</div>
          <div className="footer-socials">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <IconFacebook />
            </a>
            <a
              href={waUrl(contact.whatsapp, contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <IconWhatsApp />
            </a>
          </div>
        </div>
        <p className="footer-disclaimer">{data.disclaimer}</p>
        <div className="footer-admin-row">
          <AdminLoginGate />
        </div>
      </div>
    </footer>
  );
}
