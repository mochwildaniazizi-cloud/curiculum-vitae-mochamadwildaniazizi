'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProjectsSection.module.css';

type Project = {
  id: string;
  tag: string;
  title: string;
  short: string;
  desc: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  patternClass: string;
  symbol: string;
};

const projects: Project[] = [
  {
    id: 'p1',
    tag: 'Full Stack',
    title: 'E-Commerce CraftyMart',
    short: 'Toko online modern yang cepat dengan dashboard manajemen inventaris lengkap.',
    desc: 'Platform e-commerce berperforma tinggi dibangun dengan Next.js di sisi front-end dan Node.js + Express di back-end. Menampilkan sistem keranjang belanja real-time, integrasi payment gateway Midtrans, dashboard admin dengan grafik penjualan, serta manajemen stok yang teroptimasi.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Midtrans API', 'Redis', 'Tailwind CSS'],
    demoUrl: '#',
    githubUrl: '#',
    patternClass: 'pattern1',
    symbol: '<E-Comm/>',
  },
  {
    id: 'p2',
    tag: 'Frontend',
    title: 'TaskFlow Kanban Board',
    short: 'Aplikasi manajemen tugas interaktif dengan fitur drag & drop dan analitik.',
    desc: 'Aplikasi produktivitas berbasis React dengan fitur drag & drop menggunakan @dnd-kit, multiple workspace, label & prioritas tugas, serta dashboard analitik yang menampilkan tren penyelesaian tugas harian dan mingguan. Data tersimpan di localStorage dengan sinkronisasi Firebase opsional.',
    tech: ['React', 'TypeScript', '@dnd-kit', 'Firebase', 'Recharts', 'CSS Modules'],
    demoUrl: '#',
    githubUrl: '#',
    patternClass: 'pattern2',
    symbol: '#TaskFlow',
  },
  {
    id: 'p3',
    tag: 'Backend',
    title: 'SaaS Subscription Engine',
    short: 'Sistem manajemen mikroservis berlangganan berkecepatan tinggi berbasis REST API.',
    desc: 'REST API berarsitektur mikroservis untuk manajemen paket berlangganan SaaS. Mencakup autentikasi JWT + OAuth2, manajemen tier subscription, pemrosesan pembayaran berulang otomatis, webhook handler, dan rate limiting berbasis Redis. Dokumentasi Swagger tersedia lengkap.',
    tech: ['Node.js', 'Fastify', 'PostgreSQL', 'Redis', 'Stripe API', 'Docker', 'Swagger'],
    demoUrl: '#',
    githubUrl: '#',
    patternClass: 'pattern3',
    symbol: '{ API-Core }',
  },
];

const ArrowIcon = () => (
  <svg className="btn-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" x2="19" y1="12" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
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

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = openProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openProject]);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenProject(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <section id="projects" ref={sectionRef} className={`scroll-reveal ${styles.section}`}>
        <div className="container">
          <h2 className="section-title">Proyek Unggulan</h2>

          <div className={styles.grid}>
            {projects.map((project) => (
              <div key={project.id} className={`glass-panel ${styles.card}`}>
                {/* Visual banner */}
                <div className={styles.imgWrapper}>
                  <div className={`${styles.patternBg} ${styles[project.patternClass]}`}>
                    <span className={styles.symbol}>{project.symbol}</span>
                  </div>
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <span className={styles.tag}>{project.tag}</span>
                  <h4 className={styles.title}>{project.title}</h4>
                  <p className={styles.short}>{project.short}</p>
                  <button
                    className="btn-text"
                    onClick={() => setOpenProject(project)}
                    aria-label={`Lihat detail ${project.title}`}
                  >
                    Detail Proyek <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {openProject && (
        <div
          className={`${styles.modalOverlay} ${styles.modalOpen}`}
          onClick={(e) => { if (e.target === e.currentTarget) setOpenProject(null); }}
          role="dialog"
          aria-modal="true"
          aria-label={openProject.title}
        >
          <div className={`glass-panel ${styles.modalCard}`}>
            <button
              className={styles.closeBtn}
              onClick={() => setOpenProject(null)}
              aria-label="Tutup modal"
            >
              &times;
            </button>

            <div className={styles.modalContent}>
              <span className={styles.modalTag}>{openProject.tag}</span>
              <h3 className={styles.modalTitle}>{openProject.title}</h3>

              <div className={styles.modalBody}>
                {/* Visual */}
                <div className={`${styles.modalVisual} ${styles[openProject.patternClass]}`}>
                  <span className={styles.symbol}>{openProject.symbol}</span>
                </div>

                {/* Details */}
                <div className={styles.modalRight}>
                  <h4 className={styles.modalSubheading}>Deskripsi</h4>
                  <p className={styles.modalDesc}>{openProject.desc}</p>

                  <h4 className={styles.modalSubheading}>Teknologi</h4>
                  <div className={styles.techList}>
                    {openProject.tech.map((t) => (
                      <span key={t} className={styles.techBadge}>{t}</span>
                    ))}
                  </div>

                  <div className={styles.modalActions}>
                    <a href={openProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      🚀 Lihat Demo
                    </a>
                    <a href={openProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      📦 Kode Sumber
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
