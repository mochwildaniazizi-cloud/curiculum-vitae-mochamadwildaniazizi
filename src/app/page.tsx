import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import Footer from './components/Footer';

// ParticleCanvas is purely visual — load it without SSR to avoid hydration mismatch
const ParticleCanvas = dynamic(() => import('./components/ParticleCanvas'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      {/* Fixed interactive particle background */}
      <ParticleCanvas />

      {/* Sticky glassmorphism header */}
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
