import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import profileImage from '@/assets/profile-image.jpg';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-hero-gradient">
      <div className="container mx-auto px-6 text-center">
        <div className="animate-in fade-in-0 duration-1000">
          <div className="mb-8">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-6 shadow-glow ring-4 ring-primary/20"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Ingénieur Logiciel
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Passionné par le développement d'applications innovantes et performantes. 
            Spécialisé dans les technologies modernes et l'architecture logicielle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-hero-gradient shadow-glow hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection('projects')}
            >
              Voir mes projets
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 hover:bg-primary/10"
              onClick={() => scrollToSection('contact')}
            >
              Me contacter
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16">
            <Button variant="ghost" size="icon" className="hover:text-primary hover:shadow-glow">
              <Github className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary hover:shadow-glow">
              <Linkedin className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary hover:shadow-glow">
              <Mail className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => scrollToSection('about')}
          className="hover:text-primary"
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;