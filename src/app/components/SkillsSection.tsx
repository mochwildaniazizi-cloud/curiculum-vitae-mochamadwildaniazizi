'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SkillsSection.module.css';

type Category = 'all' | 'frontend' | 'backend' | 'tools';

const skills = [
  { name: 'HTML5 / CSS3 (Grid & Flexbox)', level: 95, category: 'frontend' as const },
  { name: 'JavaScript (ES6+)', level: 90, category: 'frontend' as const },
  { name: 'React / Next.js', level: 87, category: 'frontend' as const },
  { name: 'TypeScript', level: 82, category: 'frontend' as const },
  { name: 'Node.js (Express / Fastify)', level: 80, category: 'backend' as const },
  { name: 'PHP / Laravel', level: 75, category: 'backend' as const },
  { name: 'PostgreSQL / MySQL', level: 80, category: 'backend' as const },
  { name: 'MongoDB / Mongoose', level: 72, category: 'backend' as const },
  { name: 'Git & GitHub', level: 92, category: 'tools' as const },
  { name: 'RESTful APIs & GraphQL', level: 85, category: 'tools' as const },
  { name: 'Docker & CI/CD', level: 68, category: 'tools' as const },
  { name: 'Figma / UI Prototyping', level: 74, category: 'tools' as const },
];

const filters: { id: Category; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & DB' },
  { id: 'tools', label: 'Alat & Lainnya' },
];

export default function SkillsSection() {
  const [active, setActive] = useState<Category>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const filtered = skills.filter((s) => active === 'all' || s.category === active);

  // Scroll reveal for section
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

  // Animate bars when they enter viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    barsRef.current.forEach((bar, name) => {
      const skill = skills.find((s) => s.name === name);
      if (!skill) return;
      bar.style.width = '0%';
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            bar.style.width = `${skill.level}%`;
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(bar);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [active]);

  return (
    <section id="skills" ref={sectionRef} className={`scroll-reveal ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">Keahlian & Teknologi</h2>

        {/* Filter buttons */}
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.id}
              className={`${styles.filterBtn} ${active === f.id ? styles.filterActive : ''}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className={styles.grid}>
          {filtered.map((skill) => (
            <div key={skill.name} className={`glass-panel ${styles.card}`}>
              <div className={styles.cardHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPct}>{skill.level}%</span>
              </div>
              <div className={styles.progressBg}>
                <div
                  className={styles.progressBar}
                  ref={(el) => {
                    if (el) barsRef.current.set(skill.name, el);
                    else barsRef.current.delete(skill.name);
                  }}
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
