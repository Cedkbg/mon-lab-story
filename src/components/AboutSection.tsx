import { Card, CardContent } from '@/components/ui/card';
import { Code, Lightbulb, Users, Zap } from 'lucide-react';

const AboutSection = () => {
  const qualities = [
    {
      icon: Code,
      title: 'Code de qualité',
      description: 'Développement de solutions robustes et maintenables avec les meilleures pratiques.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Toujours à la recherche de nouvelles technologies et approches créatives.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Excellent travail en équipe et communication efficace avec les parties prenantes.'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimisation des applications pour une expérience utilisateur exceptionnelle.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              À propos de moi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ingénieur logiciel passionné avec plusieurs années d'expérience dans le développement 
            d'applications web et mobiles. Je m'efforce constamment d'apprendre et d'adopter 
            les dernières technologies pour créer des solutions innovantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualities.map((quality, index) => (
            <Card key={index} className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <quality.icon className="h-12 w-12 mx-auto text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{quality.title}</h3>
                <p className="text-sm text-muted-foreground">{quality.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-card-gradient shadow-card border-border/50 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Mon parcours</h3>
              <p className="text-muted-foreground leading-relaxed">
                Diplômé en génie logiciel, j'ai commencé ma carrière en me spécialisant dans 
                le développement full-stack. Au fil des années, j'ai acquis une expertise 
                approfondie dans diverses technologies et méthodologies de développement. 
                Mon objectif est de créer des applications qui apportent une réelle valeur 
                aux utilisateurs tout en respectant les contraintes techniques et business.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;