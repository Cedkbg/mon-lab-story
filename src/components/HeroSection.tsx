import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImage from '@/assets/profile-image.jpg';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(165_80%_50%_/_0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Profile Image with enhanced glow - professional spacing */}
          <motion.div 
            className="mb-12 relative inline-block"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <div className="absolute -inset-4 bg-accent-gradient rounded-full blur-2xl opacity-40 animate-pulse-glow" />
            <div className="relative p-1.5 rounded-full bg-gradient-to-br from-primary via-accent to-primary">
              <div className="p-1 rounded-full bg-background">
                <img 
                  src={profileImage} 
                  alt="Cédric Kabongo - Ingénieur Logiciel" 
                  className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full mx-auto shadow-image-glow object-cover relative z-10"
                />
              </div>
            </div>
            <div className="absolute -inset-2 rounded-full bg-accent-gradient opacity-20 animate-gradient-shift blur-sm" style={{ backgroundSize: '200% 200%' }} />
          </motion.div>
          
          {/* Name with typing effect style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-4">
              Bonjour, je suis
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-gradient">
                Cédric Kabongo
              </span>
            </h1>
          </motion.div>
          
          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-accent-gradient text-primary-foreground font-semibold text-lg shadow-glow">
              <span className="w-3 h-3 bg-primary-foreground rounded-full mr-3 animate-pulse" />
              Ingénieur Logiciel Senior
            </span>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Passionné par le développement d'applications <span className="text-primary font-semibold">innovantes</span> et <span className="text-accent font-semibold">performantes</span>. 
            Spécialisé dans les technologies modernes et l'architecture logicielle.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="bg-accent-gradient shadow-glow hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
              onClick={() => scrollToSection('projects')}
            >
              Voir mes projets
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
              onClick={() => scrollToSection('contact')}
            >
              Me contacter
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-accent/50 hover:bg-accent/10 hover:border-accent hover:scale-105 transition-all duration-300 text-lg px-8 py-6"
            >
              <Download className="h-5 w-5 mr-2" />
              Télécharger CV
            </Button>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:cedkbg07@gmail.com', label: 'Email' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:text-primary hover:bg-primary/10 transition-all duration-300 h-14 w-14"
                >
                  <social.icon className="h-7 w-7" />
                </Button>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => scrollToSection('about')}
          className="hover:text-primary hover:bg-primary/10 transition-all duration-300"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
