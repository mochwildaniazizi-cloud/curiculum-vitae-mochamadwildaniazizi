'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AboutSection.module.css';

interface StatItem { label: string; target: number; suffix: string }

const stats: StatItem[] = [
  { label: 'Tahun Pengalaman', target: 3, suffix: '+' },
  { label: 'Proyek Selesai', target: 15, suffix: '+' },
  { label: 'Komitmen', target: 100, suffix: '%' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={`${styles.statNumber} text-gradient`}>
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('active'); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={`scroll-reveal ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">Tentang Saya</h2>

        <div className={styles.grid}>
          {/* Text */}
          <div className={styles.textBlock}>
            <h3>Membangun Solusi Digital Melalui Kode</h3>
            <p>
              Saya adalah pengembang web lulusan Teknik Informatika yang berdedikasi untuk
              menciptakan fungsionalitas di balik desain visual yang menakjubkan. Dengan fondasi
              kuat di front-end maupun back-end, saya menikmati tantangan memecahkan masalah
              kompleks dan mengubahnya menjadi aplikasi yang ramah pengguna.
            </p>
            <p>
              Fokus utama saya adalah membangun aplikasi web modular dengan arsitektur bersih,
              sambil terus mengeksplorasi teknologi modern demi performa website yang optimal.
            </p>

            {/* Tech tags */}
            <div className={styles.techTags}>
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'].map((t) => (
                <span key={t} className={styles.techTag}>{t}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={`glass-panel ${styles.statCard}`}>
                <AnimatedCounter target={s.target} suffix={s.suffix} />
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
