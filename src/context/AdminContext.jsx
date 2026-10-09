import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ADMIN_EMAIL = 'official.gunungputrisquare@gmail.com';
const ADMIN_PASSWORD = 'GPMarketing257';
const ADMIN_STORAGE_KEY = 'gp-admin-authed';

const AdminContext = createContext({
  isAdmin: false,
  setAdmin: () => {},
});

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  const setAdmin = (val) => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, val ? '1' : '0');
    } catch {}
    setIsAdmin(val);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useIsAdmin() {
  const { isAdmin } = useContext(AdminContext);
  return isAdmin;
}

export function AdminLoginGate() {
  const { isAdmin, setAdmin } = useContext(AdminContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [forgot, setForgot] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    const email = (emailRef.current && emailRef.current.value) || '';
    const password = (passRef.current && passRef.current.value) || '';
    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      setAdmin(true);
      setOpen(false);
      setError('');
    } else {
      setError('Email atau password salah.');
    }
  }

  function sendForgotEmail() {
    const subject = encodeURIComponent('Reset Password Admin — Gunung Putri Apartment');
    const body = encodeURIComponent(
      `Halo,\n\nIni pengingat password admin website Gunung Putri Apartment:\n\nEmail: ${ADMIN_EMAIL}\nPassword: ${ADMIN_PASSWORD}\n\nSegera ganti kalau perlu, dan simpan baik-baik.\n`
    );
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`;
  }

  if (isAdmin) {
    return (
      <button
        type="button"
        className="admin-gate-link"
        onClick={() => setAdmin(false)}
      >
        Logout Admin
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="admin-gate-link"
        onClick={() => setOpen(true)}
      >
        Login Admin
      </button>
      {open && (
        <div
          className="admin-modal-overlay"
          onClick={() => {
            setOpen(false);
            setForgot(false);
            setError('');
          }}
        >
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => {
                setOpen(false);
                setForgot(false);
              }}
              aria-label="Tutup"
            >
              ×
            </button>
            {!forgot ? (
              <>
                <h3>Login Admin</h3>
                <form onSubmit={submit} className="admin-login-form">
                  <label>
                    Email
                    <input type="email" ref={emailRef} defaultValue="" required autoFocus />
                  </label>
                  <label>
                    Password
                    <input type="password" ref={passRef} defaultValue="" required />
                  </label>
                  {error && <div className="admin-login-error">{error}</div>}
                  <button type="submit" className="btn btn-primary">
                    Masuk
                  </button>
                  <button
                    type="button"
                    className="admin-forgot-link"
                    onClick={() => {
                      setForgot(true);
                      setError('');
                    }}
                  >
                    Lupa Password?
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3>Lupa Password</h3>
                <p className="admin-forgot-text">
                  Kami akan membuka aplikasi email kamu dengan pengingat password terkirim ke{' '}
                  {ADMIN_EMAIL}.
                </p>
                <button type="button" className="btn btn-primary" onClick={sendForgotEmail}>
                  Kirim Pengingat ke Email
                </button>
                <button
                  type="button"
                  className="admin-forgot-link"
                  onClick={() => setForgot(false)}
                >
                  ← Kembali ke login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
