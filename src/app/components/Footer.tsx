import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.text}>
          &copy; {year}{' '}
          <span className="text-gradient" style={{ fontWeight: 700 }}>
            Mochamad Wildani Azizi
          </span>
          {' '}— Dibuat dengan penuh dedikasi & keahlian. ✨
        </p>
        <a href="#home" className={styles.backTop} aria-label="Kembali ke atas" title="Kembali ke atas">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
