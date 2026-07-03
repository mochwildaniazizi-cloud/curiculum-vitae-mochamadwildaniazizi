'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TimelineSection.module.css';

type TimelineEntry = {
  period: string;
  role: string;
  org: string;
  desc: string;
};

const experience: TimelineEntry[] = [
  {
    period: '2024 — Sekarang',
    role: 'Full Stack Web Developer',
    org: 'Tech Synergy Indonesia',
    desc: 'Mengembangkan aplikasi web korporat berbasis Node.js dan React. Meningkatkan kecepatan rendering halaman utama 35% dan mendesain database PostgreSQL yang teroptimasi untuk volume transaksi tinggi.',
  },
  {
    period: '2022 — 2024',
    role: 'Front End Developer',
    org: 'Nusantara Digital Agency',
    desc: 'Membangun antarmuka dinamis untuk platform e-commerce klien menggunakan HTML, CSS modern, dan Vue.js. Berkolaborasi erat dengan tim UI/UX untuk mewujudkan konsep desain ke kode.',
  },
  {
    period: '2021 — 2022',
    role: 'Freelance Web Developer',
    org: 'Independen',
    desc: 'Menangani proyek website UMKM dan startup lokal — mulai dari desain landing page, integrasi API pembayaran, hingga optimasi SEO teknikal.',
  },
];

const education: TimelineEntry[] = [
  {
    period: '2018 — 2022',
    role: 'S1 — Teknik Informatika',
    org: 'Universitas Brawijaya',
    desc: 'Lulus IPK 3.75/4.00. Fokus pada Rekayasa Perangkat Lunak dan Web Development. Aktif sebagai asisten dosen di laboratorium pemrograman komputer.',
  },
  {
    period: '2015 — 2018',
    role: 'Rekayasa Perangkat Lunak (RPL)',
    org: 'SMK Negeri 4 Malang',
    desc: 'Mempelajari dasar pemrograman web (HTML, CSS, PHP), algoritma, pemodelan data SQL, dan pemrograman berorientasi objek dengan Java.',
  },
];

function TimelineList({ items }: { items: TimelineEntry[] }) {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.marker}>
            <span className={styles.dot} />
          </div>
          <div className={`glass-panel ${styles.card}`}>
            <span className={styles.period}>{item.period}</span>
            <h4 className={styles.role}>{item.role}</h4>
            <h5 className={`${styles.org} text-accent`}>{item.org}</h5>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TimelineSection() {
  const [active, setActive] = useState<'experience' | 'education'>('experience');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('active'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className={`scroll-reveal ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">Riwayat Perjalanan</h2>

        <div className={styles.switcher}>
          <button
            className={`${styles.switchBtn} ${active === 'experience' ? styles.switchActive : ''}`}
            onClick={() => setActive('experience')}
          >
            💼 Pengalaman Kerja
          </button>
          <button
            className={`${styles.switchBtn} ${active === 'education' ? styles.switchActive : ''}`}
            onClick={() => setActive('education')}
          >
            🎓 Pendidikan
          </button>
        </div>

        <div className={styles.timelineWrapper}>
          {active === 'experience' ? (
            <TimelineList key="experience" items={experience} />
          ) : (
            <TimelineList key="education" items={education} />
          )}
        </div>
      </div>
    </section>
  );
}
