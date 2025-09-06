import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Ingénieur Logiciel Senior',
      company: 'Atlentech Dynamics.',
      location: 'Kinshasa',
      period: '2025 - Présent',
      description: 'Développement et maintenance d\'applications web complexes utilisant React, Node.js et PostgreSQL. Leadership technique d\'une équipe de 12 développeurs.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL','C++']
    },
    {
      title: 'Développeur Full-Stack',
      company: 'Kadea-academy',
      location: 'Kinshasa ',
      period: '2024 - 2025',
      description: 'Conception et développement d\'une plateforme SaaS de gestion de projets. Implémentation d\'APIs RESTful et d\'interfaces utilisateur modernes.',
      technologies: ['Adonis.js', 'Python', 'Django', 'MongoDB']
    },
    {
      title: 'Développeur Junior',
      company: 'kadea-boost',
      location: 'kinshasa',
      period: '2022 - 2023',
      description: 'Développement de sites web responsifs et d\'applications mobiles. Collaboration étroite avec les équipes design et marketing.',
      technologies: ['HTML/CSS', 'JavaScript','MySQL', 'React Native', 'Git']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Expérience Professionnelle
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Mon parcours professionnel dans le développement logiciel
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {exp.period}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <span>{exp.company}</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;