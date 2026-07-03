'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroSection.module.css';

const typingWords = [
  'Full-Stack Developer',
  'React Enthusiast',
  'UI/UX Craftsman',
  'Problem Solver',
];

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Typing effect
  useEffect(() => {
    const currentWord = typingWords[wordIdx];
    const speed = isDeleting ? 50 : charIdx === currentWord.length ? 1800 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIdx < currentWord.length) {
        setDisplayText(currentWord.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!isDeleting && charIdx === currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIdx > 0) {
        setDisplayText(currentWord.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setIsDeleting(false);
        setWordIdx((w) => (w + 1) % typingWords.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx]);

  // 3D card tilt
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxTilt = 14;
      const tiltX = (dy / (rect.height / 2)) * maxTilt;
      const tiltY = -(dx / (rect.width / 2)) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.04, 1.04, 1.04)`;

      // Glow follows mouse
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.background = `radial-gradient(600px circle at ${px}% ${py}%, rgba(var(--accent-rgb), var(--card-glow-opacity)), transparent 40%)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glow.style.background = '';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const smoothScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.container}`}>
        {/* Left Content */}
        <div className={styles.content}>
          <span className="badge greeting-badge">Halo, Selamat Datang! 👋</span>

          <h1 className={styles.title}>
            Saya{' '}
            <span className="text-gradient">Wildani Azizi</span>
          </h1>

          <h2 className={styles.subtitle}>
            Saya seorang{' '}
            <span className="text-accent" aria-live="polite">{displayText}</span>
            <span className={styles.cursor} aria-hidden="true">|</span>
          </h2>

          <p className={styles.desc}>
            Web Developer yang berfokus menciptakan aplikasi web interaktif, responsif,
            dan berperforma tinggi — memberikan pengalaman pengguna yang luar biasa.
          </p>

          <div className={styles.actions}>
            <button className="btn btn-primary" onClick={() => smoothScrollTo('projects')}>
              Lihat Proyek Saya
            </button>
            <button className="btn btn-outline" onClick={() => smoothScrollTo('contact')}>
              Hubungi Saya
            </button>
          </div>
        </div>

        {/* Right — 3D Profile Card */}
        <div className={styles.cardContainer}>
          <div className={styles.tiltCard} ref={cardRef}>
            <div className={styles.cardGlow} ref={glowRef} />
            <div className={styles.cardInner}>
              {/* SVG Avatar */}
              <div className={styles.avatarWrapper}>
                <svg viewBox="0 0 100 100" className={styles.avatarSvg} xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                    <clipPath id="avatarClip">
                      <circle cx="50" cy="50" r="46" />
                    </clipPath>
                  </defs>
                  <circle cx="50" cy="50" r="48" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="8 4" />
                  <g clipPath="url(#avatarClip)">
                    <rect width="100" height="100" fill="var(--bg-glass-heavy)" />
                    <ellipse cx="50" cy="35" rx="16" ry="18" fill="url(#avatarGrad)" opacity="0.9"/>
                    <path d="M10,90 Q30,60 50,58 Q70,60 90,90" fill="url(#avatarGrad)" opacity="0.85"/>
                    <text x="18" y="50" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="8" fontWeight="bold">&lt;/&gt;</text>
                    <text x="66" y="50" fill="rgba(255,255,255,0.25)" fontFamily="monospace" fontSize="8" fontWeight="bold">{ }</text>
                  </g>
                </svg>
              </div>

              <h3 className={styles.cardName}>Mochamad Wildani Azizi</h3>
              <p className={styles.cardTitle}>Full-Stack Web Developer</p>

              <div className={styles.cardDivider} />

              <div className={styles.cardDetails}>
                <div className={styles.detailItem}>
                  <svg className={styles.detailIcon} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Malang, Indonesia</span>
                </div>
                <div className={styles.detailItem}>
                  <svg className={styles.detailIcon} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>wildaniazizi@gmail.com</span>
                </div>
              </div>

              <div className={styles.cardSocials}>
                {[
                  { href: 'https://github.com', label: 'GitHub', icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
                  { href: 'https://linkedin.com', label: 'LinkedIn', icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
                  { href: 'https://instagram.com', label: 'Instagram', icon: <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={styles.socialLink}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <button className={styles.mouse} onClick={() => smoothScrollTo('about')} aria-label="Scroll ke bawah">
          <span className={styles.wheel} />
        </button>
      </div>
    </section>
  );
}
