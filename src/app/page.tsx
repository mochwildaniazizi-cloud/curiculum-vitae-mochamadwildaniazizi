import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Header from './components/Header';
import Footer from './components/Footer';
// Client wrapper that handles dynamic import with ssr:false (not allowed in Server Components)
import ParticleCanvasWrapper from './components/ParticleCanvasWrapper';

export default function HomePage() {
  return (
    <>
      {/* Fixed interactive particle background (client-side only) */}
      <ParticleCanvasWrapper />

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
