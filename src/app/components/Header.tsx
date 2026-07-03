'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { href: '#home', label: 'Beranda' },
  { href: '#about', label: 'Tentang' },
  { href: '#timeline', label: 'Riwayat' },
  { href: '#skills', label: 'Keahlian' },
  { href: '#projects', label: 'Proyek' },
  { href: '#contact', label: 'Kontak' },
];

const accents = [
  { id: 'indigo', color: '#6366f1' },
  { id: 'emerald', color: '#10b981' },
  { id: 'rose', color: '#f43f5e' },
  { id: 'amber', color: '#f59e0b' },
];

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [accent, setAccent] = useState('indigo');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accentMenuOpen, setAccentMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Restore from localStorage
  useEffect(() => {
    const savedTheme = (localStorage.getItem('cv-theme') as 'dark' | 'light') || 'dark';
    const savedAccent = localStorage.getItem('cv-accent') || 'indigo';
    setTheme(savedTheme);
    setAccent(savedAccent);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-accent', savedAccent);
  }, []);

  // Scroll listener — header shadow + active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cv-theme', next);
  }, [theme]);

  const changeAccent = useCallback((id: string) => {
    setAccent(id);
    document.documentElement.setAttribute('data-accent', id);
    localStorage.setItem('cv-accent', id);
    setAccentMenuOpen(false);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const currentAccentColor = accents.find((a) => a.id === accent)?.color || '#6366f1';

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, '#home')}>
          <span className={styles.logoDot} />
          MWA.dev
        </a>

        {/* Nav */}
        <nav className={`${styles.nav} ${mobileOpen ? styles.open : ''}`} id="nav-menu">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Theme Toggle */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Ubah tema"
            title={theme === 'dark' ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-8.49-8.49 1.42 1.42M18.36 5.64l1.42 1.42M2 12h2M20 12h2M5.64 18.36l1.42-1.42M17.66 17.66l1.41 1.41"/></svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>

          {/* Accent Color Picker */}
          <div className={styles.accentDropdown}>
            <button
              className="icon-btn"
              onClick={() => setAccentMenuOpen((o) => !o)}
              aria-label="Pilih warna aksen"
              title="Ganti warna tema"
            >
              <span
                className={styles.colorDot}
                style={{ background: currentAccentColor, boxShadow: `0 0 8px ${currentAccentColor}` }}
              />
            </button>
            <div className={`${styles.accentMenu} ${accentMenuOpen ? styles.show : ''}`}>
              {accents.map((a) => (
                <button
                  key={a.id}
                  className={`${styles.accentOption} ${accent === a.id ? styles.accentActive : ''}`}
                  style={{ background: a.color }}
                  onClick={() => changeAccent(a.id)}
                  aria-label={`Tema ${a.id}`}
                  title={a.id}
                />
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`icon-btn ${styles.mobileBtn}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
