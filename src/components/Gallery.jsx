import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { useIsAdmin } from '../context/AdminContext';

const GALLERY_LS_KEY = 'gp-gallery-overrides-v1';

function loadGalleryOverrides() {
  try {
    const raw = localStorage.getItem(GALLERY_LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveGalleryOverrides(list) {
  try {
    localStorage.setItem(GALLERY_LS_KEY, JSON.stringify(list));
  } catch {}
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function IconChevron({ dir = 'left' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

function IconEditPencil() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function IconDrag() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <circle cx="8" cy="6" r="1.5" />
      <circle cx="16" cy="6" r="1.5" />
      <circle cx="8" cy="12" r="1.5" />
      <circle cx="16" cy="12" r="1.5" />
      <circle cx="8" cy="18" r="1.5" />
      <circle cx="16" cy="18" r="1.5" />
    </svg>
  );
}

function IconSpan({ span }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {span === 'wide' && <rect x="3" y="7" width="18" height="10" rx="1.5" />}
      {span === 'tall' && <rect x="7" y="3" width="10" height="18" rx="1.5" />}
      {!span && <rect x="6" y="6" width="12" height="12" rx="1.5" />}
    </svg>
  );
}

export default function Gallery({ data }) {
  const baseItems = data.items.map((g, i) => ({ ...g, _key: `g${i}`, _origIdx: i }));
  const [items, setItems] = useState(() => {
    const saved = loadGalleryOverrides();
    if (saved && saved.length === baseItems.length) {
      return saved;
    }
    return baseItems;
  });

  const isAdmin = useIsAdmin();
  const [editMode, setEditMode] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [renamingIdx, setRenamingIdx] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    saveGalleryOverrides(items);
  }, [items]);

  function cycleSpan(idx) {
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== idx) return it;
        const next = it.span === 'wide' ? 'tall' : it.span === 'tall' ? '' : 'wide';
        return { ...it, span: next };
      })
    );
  }

  function renameCaption(idx, value) {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, caption: value } : it)));
  }

  function onDragStart(idx) {
    setDragIndex(idx);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onDrop(idx) {
    if (dragIndex === null || dragIndex === idx) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(idx, 0, moved);
      return next;
    });
    setDragIndex(null);
  }

  function resetLayout() {
    try {
      localStorage.removeItem(GALLERY_LS_KEY);
    } catch {}
    setItems(baseItems);
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    function onKey(e) {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % items.length);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, items.length]);

  return (
    <section id="gallery" className="bg-grey">
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
                {editMode ? 'Selesai Atur Galeri' : 'Atur Galeri'}
              </button>
              {editMode && (
                <button type="button" className="btn-edit-reset" onClick={resetLayout}>
                  Reset urutan
                </button>
              )}
            </div>
          )}
        </Reveal>

        {isAdmin && editMode && (
          <div className="gallery-edit-hint">
            Geser (drag) foto untuk urutan baru · klik ikon ukuran untuk ubah lebar/tinggi · klik keterangan untuk ganti nama
          </div>
        )}

        <div className="gallery-grid">
          {items.map((g, i) => (
            <Reveal
              key={g._key}
              delay={(i % 4) * 80}
              className={`gallery-item ${g.span === 'wide' ? 'wide' : ''} ${
                g.span === 'tall' ? 'tall' : ''
              } ${editMode ? 'editing' : ''}`}
              draggable={editMode}
              onDragStart={() => onDragStart(i)}
              onDragOver={onDragOver}
              onDrop={() => onDrop(i)}
              onClick={() => {
                if (!editMode) setLightboxIndex(i);
              }}
            >
              <img src={g.src} alt={g.caption || 'Foto Galeri'} loading="lazy" />

              {!editMode && <div className="gallery-caption">{g.caption}</div>}

              {editMode && (
                <div className="gallery-edit-overlay">
                  <div className="gallery-drag-handle" title="Geser untuk urutan ulang">
                    <IconDrag />
                  </div>
                  <button
                    type="button"
                    className="gallery-span-btn"
                    title="Ubah ukuran (normal / lebar / tinggi)"
                    onClick={(e) => {
                      e.stopPropagation();
                      cycleSpan(i);
                    }}
                  >
                    <IconSpan span={g.span} />
                    <span>
                      {g.span === 'wide' ? 'Lebar' : g.span === 'tall' ? 'Tinggi' : 'Normal'}
                    </span>
                  </button>
                  {renamingIdx === i ? (
                    <input
                      autoFocus
                      className="gallery-caption-input"
                      defaultValue={g.caption}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={(e) => {
                        renameCaption(i, e.target.value);
                        setRenamingIdx(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') e.target.blur();
                        if (e.key === 'Escape') setRenamingIdx(null);
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      className="gallery-caption-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenamingIdx(i);
                      }}
                    >
                      {g.caption || 'Beri keterangan…'}
                    </button>
                  )}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && items[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <button
            type="button"
            className="lightbox-close"
            aria-label="Tutup"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
          >
            <IconClose />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            aria-label="Foto sebelumnya"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + items.length) % items.length);
            }}
          >
            <IconChevron dir="left" />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            aria-label="Foto selanjutnya"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % items.length);
            }}
          >
            <IconChevron dir="right" />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={items[lightboxIndex].src} alt={items[lightboxIndex].caption} />
            <div className="lightbox-caption">{items[lightboxIndex].caption}</div>
          </div>
        </div>
      )}
    </section>
  );
}
