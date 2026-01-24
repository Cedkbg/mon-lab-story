import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Ingénieur Logiciel Senior',
      company: 'Atlentech Dynamics',
      location: 'Kinshasa',
      period: '2025 - Présent',
      description: 'Développement et maintenance d\'applications web complexes utilisant React, Node.js et PostgreSQL. Leadership technique d\'une équipe de 12 développeurs.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'C++'],
      current: true
    },
    {
      title: 'Développeur Full-Stack',
      company: 'Kadea Academy',
      location: 'Kinshasa',
      period: '2024 - 2025',
      description: 'Conception et développement d\'une plateforme SaaS de gestion de projets. Implémentation d\'APIs RESTful et d\'interfaces utilisateur modernes.',
      technologies: ['Adonis.js', 'Python', 'Django', 'MongoDB'],
      current: false
    },
    {
      title: 'Développeur Junior',
      company: 'Kadea Boost',
      location: 'Kinshasa',
      period: '2022 - 2023',
      description: 'Développement de sites web responsifs et d\'applications mobiles. Collaboration étroite avec les équipes design et marketing.',
      technologies: ['HTML/CSS', 'JavaScript', 'MySQL', 'React Native', 'Git'],
      current: false
    }
  ];

  return (
    <section id="experience" className="py-24 bg-muted/10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">
              Expérience Professionnelle
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Mon parcours professionnel dans le développement logiciel
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 hidden md:block">
                  <motion.div 
                    className={`w-5 h-5 rounded-full border-4 ${
                      exp.current 
                        ? 'bg-primary border-primary shadow-glow' 
                        : 'bg-background border-accent'
                    }`}
                    animate={exp.current ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <Card className="ml-0 md:ml-20 bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 border-border/30 hover:border-primary/50 group">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-accent-gradient shadow-glow group-hover:scale-110 transition-transform">
                          <Briefcase className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-foreground">{exp.title}</CardTitle>
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <span>{exp.company}</span>
                            {exp.current && (
                              <Badge className="bg-primary/20 text-primary text-xs">
                                Actuel
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          <Badge 
                            variant="secondary"
                            className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
