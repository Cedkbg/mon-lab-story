import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <motion.footer 
        className="py-8 bg-card border-t border-border/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-gradient font-semibold">Cédric Kabongo</span>. 
            Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Construit avec ❤️ en utilisant React & Tailwind CSS
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Portfolio;
