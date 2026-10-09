import React, { useState } from 'react';
import { Reveal } from './Reveal';
import { waUrl } from '../utils/helpers';

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.5 1.34 5.02L2 22l5.13-1.32A9.93 9.93 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.4 14.27c-.23.65-1.34 1.25-1.86 1.31-.5.06-1.14.08-1.84-.12-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.23.56.78 1.93.85 2.07.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.31.37-.44.5-.14.14-.29.29-.13.57.16.29.71 1.17 1.52 1.89.99.88 1.83 1.16 2.1 1.3.27.14.43.12.59-.07.16-.19.7-.81.89-1.09.19-.29.36-.24.62-.15.26.09 1.64.77 1.92.91.28.14.46.21.53.33.05.12.05.71-.18 1.36z" fill="currentColor" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contact({ data, contact }) {
  const [form, setForm] = useState({ name: '', phone: '', interest: '', message: '' });
  const [sent, setSent] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const msg = [
      'Halo Gunung Putri, saya tertarik dengan apartemen.',
      '',
      `Nama   : ${form.name || '-'}`,
      `Telp   : ${form.phone || '-'}`,
      `Minat  : ${form.interest || '-'}`,
      `Pesan  : ${form.message || '-'}`,
    ].join('\n');
    window.open(waUrl(contact.whatsapp, msg), '_blank', 'noopener');
    setSent(true);
  }

  return (
    <section id="contact" className="bg-blue">
      <div className="container">
        <div className="contact-grid">
          <Reveal>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 style={{ marginTop: 14 }}>{data.title}</h2>
            <div className="divider" />
            <p className="lead" style={{ maxWidth: 480 }}>
              {data.subtitle}
            </p>

            <div className="contact-info-list">
              <div className="contact-row">
                <div className="contact-icon">
                  <IconWhatsApp />
                </div>
                <div>
                  <div className="contact-label">WhatsApp</div>
                  <div className="contact-value">
                    <a
                      href={waUrl(contact.whatsapp, contact.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +{contact.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">
                  <IconPhone />
                </div>
                <div>
                  <div className="contact-label">Telepon</div>
                  <div className="contact-value">
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">
                  <IconMail />
                </div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">
                  <IconPin />
                </div>
                <div>
                  <div className="contact-label">Alamat</div>
                  <div className="contact-value">{contact.address}</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form className="form" onSubmit={submit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="contact-name">Nama lengkap</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-phone">No. WhatsApp</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="08xx-xxxx-xxxx"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-interest">Minat unit</label>
                <select
                  id="contact-interest"
                  name="interest"
                  value={form.interest}
                  onChange={(e) => update('interest', e.target.value)}
                >
                  <option value="">Pilih tipe unit</option>
                  <option>Studio Tipe 21 (Pinus)</option>
                  <option>Studio Tipe 24 (Pinus)</option>
                  <option>1 BR Tipe 20 (Palem)</option>
                  <option>1 BR Tipe 21 (Palem)</option>
                  <option>1 BR Tipe 22 (Palem)</option>
                  <option>1 BR Tipe 24 (Palem)</option>
                  <option>2 BR Tipe 45 (Palem)</option>
                  <option>2 BR Tipe 51 (Palem)</option>
                  <option>Sewa / Rental</option>
                  <option>Komersial</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="contact-message">Pesan</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tulis pertanyaan Anda…"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                {sent ? 'Terkirim — buka WhatsApp' : 'Kirim via WhatsApp'} <ArrowRight />
              </button>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 4 }}>
                Form ini akan membuka WhatsApp dengan pesan terisi otomatis. Tidak ada data yang disimpan.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
