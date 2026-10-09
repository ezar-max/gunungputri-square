import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { useIsAdmin } from '../context/AdminContext';
import { truncate } from '../utils/helpers';

const ARTICLES_LS_KEY = 'gp-articles-manual-v1';

function loadManualArticles() {
  try {
    const raw = localStorage.getItem(ARTICLES_LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveManualArticles(list) {
  try {
    localStorage.setItem(ARTICLES_LS_KEY, JSON.stringify(list));
  } catch {}
}

function IconEditPencil() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

export default function Articles({ data }) {
  const isAdmin = useIsAdmin();
  const [manualItems, setManualItems] = useState(() => loadManualArticles());
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', excerpt: '', url: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [openArticle, setOpenArticle] = useState(null);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const ARTICLE_LIMIT = 6;

  const filteredManual = manualItems.filter(
    (it) =>
      !data.portalItems.some(
        (p) => (p.title || '').trim().toLowerCase() === (it.title || '').trim().toLowerCase()
      )
  );

  const totalArticles = filteredManual.length + data.portalItems.length;
  const manualLimit = showAllArticles
    ? filteredManual.length
    : Math.min(filteredManual.length, ARTICLE_LIMIT);
  const portalLimit = showAllArticles
    ? data.portalItems.length
    : Math.max(0, ARTICLE_LIMIT - manualLimit);

  useEffect(() => {
    saveManualArticles(manualItems);
  }, [manualItems]);

  function resetForm() {
    setForm({ title: '', date: '', excerpt: '', url: '', image: '' });
    setEditingId(null);
  }

  function openNew() {
    resetForm();
    setShowForm(true);
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      date: item.date || '',
      excerpt: item.excerpt || '',
      url: item.url || '',
      image: item.image || '',
    });
    setEditingId(item._id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    resetForm();
  }

  function submitForm(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editingId) {
      setManualItems((prev) =>
        prev.map((it) => (it._id === editingId ? { ...it, ...form } : it))
      );
    } else {
      const _id = 'm' + Date.now();
      const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setManualItems((prev) => [{ _id, ...form, date: form.date || today }, ...prev]);
    }
    closeForm();
  }

  function removeItem(id) {
    if (!window.confirm('Hapus artikel ini?')) return;
    setManualItems((prev) => prev.filter((it) => it._id !== id));
  }

  return (
    <section id="articles" className="bg-grey">
      <div className="container">
        <Reveal className="sec-head gallery-head">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2>{data.title}</h2>
            <p className="lead">{data.subtitle}</p>
          </div>
          {isAdmin && (
            <div className="gallery-edit-controls">
              <button
                type="button"
                className={`btn-edit-toggle ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode((v) => !v)}
              >
                <IconEditPencil />
                {editMode ? 'Selesai Kelola Artikel' : 'Kelola Artikel'}
              </button>
              {editMode && (
                <button type="button" className="btn-edit-reset" onClick={openNew}>
                  + Tambah Artikel
                </button>
              )}
            </div>
          )}
        </Reveal>

        <div className="articles-grid">
          {filteredManual.slice(0, manualLimit).map((it, i) => (
            <Reveal key={it._id} delay={(i % 3) * 80} className="article-card">
              {isAdmin && editMode && (
                <div className="article-card-controls">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEdit(it);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(it._id);
                    }}
                  >
                    Hapus
                  </button>
                </div>
              )}
              {it.image && (
                <div className="article-image">
                  <img src={it.image} alt={it.title} loading="lazy" />
                </div>
              )}
              <div
                className="article-card-body"
                onClick={() => setOpenArticle(it)}
                role="button"
                tabIndex={0}
              >
                <span className="article-badge article-badge-own">Update Kami</span>
                {it.date && <div className="article-date">{it.date}</div>}
                <h3 className="article-title">{it.title}</h3>
                {it.excerpt && <p className="article-excerpt">{truncate(it.excerpt)}</p>}
                <span className="article-link">Baca selengkapnya →</span>
              </div>
            </Reveal>
          ))}

          {data.portalItems.slice(0, portalLimit).map((it, i) => (
            <Reveal
              key={`p${i}`}
              delay={((manualItems.length + i) % 3) * 80}
              className="article-card"
            >
              {it.image && (
                <div className="article-image">
                  <img src={it.image} alt={it.title} loading="lazy" />
                </div>
              )}
              <div
                className={it.url ? '' : 'article-card-body'}
                onClick={it.url ? undefined : () => setOpenArticle(it)}
                role={it.url ? undefined : 'button'}
                tabIndex={it.url ? undefined : 0}
              >
                <span className="article-badge">{it.source}</span>
                <div className="article-date">{it.date}</div>
                <h3 className="article-title">{it.title}</h3>
                <p className="article-excerpt">{truncate(it.excerpt)}</p>
                {it.url ? (
                  <a
                    className="article-link"
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Baca di {it.source} ↗
                  </a>
                ) : (
                  <span className="article-link">Baca selengkapnya →</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {totalArticles > ARTICLE_LIMIT && (
          <div className="articles-more">
            <button
              type="button"
              className="btn-articles-more"
              onClick={() => setShowAllArticles((v) => !v)}
            >
              {showAllArticles
                ? 'Tampilkan lebih sedikit'
                : `Lihat artikel lainnya (${totalArticles - ARTICLE_LIMIT})`}
            </button>
          </div>
        )}
      </div>

      {openArticle && (
        <div className="article-detail-page">
          <div className="article-detail-inner">
            <button
              type="button"
              className="article-detail-back"
              onClick={() => setOpenArticle(null)}
            >
              ← Kembali ke Artikel
            </button>
            {openArticle.image && (
              <div className="article-detail-image">
                <img src={openArticle.image} alt={openArticle.title} />
              </div>
            )}
            <span className="article-badge article-badge-own">Update Kami</span>
            {openArticle.date && <div className="article-date">{openArticle.date}</div>}
            <h1 className="article-detail-title">{openArticle.title}</h1>
            <div className="article-detail-content">
              {String(openArticle.excerpt || '')
                .split(/\n+/)
                .map((p, i) => p.trim() && <p key={i}>{p}</p>)}
            </div>
            {openArticle.url && (
              <a
                className="article-link"
                href={openArticle.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tautan terkait →
              </a>
            )}
          </div>
        </div>
      )}

      {showForm && (
        <div className="article-form-overlay" onClick={closeForm}>
          <form
            className="article-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitForm}
          >
            <h3>{editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3>
            <label>
              Judul
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Judul artikel"
                required
              />
            </label>
            <label>
              Tanggal
              <input
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                placeholder="mis. 14 Juli 2026"
              />
            </label>
            <label>
              Foto (opsional)
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
                  reader.readAsDataURL(file);
                }}
              />
              {form.image && (
                <div className="article-form-photo-preview">
                  <img src={form.image} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: '' }))}
                  >
                    Hapus foto
                  </button>
                </div>
              )}
            </label>
            <label>
              Ringkasan / Isi
              <textarea
                rows={5}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="Tuliskan isi atau ringkasan artikel di sini..."
              />
            </label>
            <label>
              Link (opsional)
              <input
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://..."
              />
            </label>
            <div className="article-form-actions">
              <button type="button" className="btn btn-ghost" onClick={closeForm}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
