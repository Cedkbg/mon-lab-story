import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import project images
import projectEcommerce from '@/assets/project-ecommerce.jpg';
import projectManagement from '@/assets/project-management.jpg';
import projectGeolocation from '@/assets/project-geolocation.jpg';
import projectAnalytics from '@/assets/project-analytics.jpg';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Plateforme E-commerce',
      description: 'Application complète de commerce électronique avec gestion des commandes, paiements sécurisés et tableau de bord administrateur.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      color: 'from-primary to-accent',
      image: projectEcommerce,
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Application de Gestion de Projets',
      description: 'Outil collaboratif pour la gestion de projets avec suivi du temps, assignation de tâches et reporting avancé.',
      technologies: ['Vue.js', 'Django', 'MongoDB'],
      color: 'from-accent to-primary',
      image: projectManagement,
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'API de Géolocalisation',
      description: 'Service REST API pour la géolocalisation avec intégration de cartes interactives et recherche avancée.',
      technologies: ['Python', 'Django', 'Redis', 'Kubernetes'],
      color: 'from-primary/80 to-accent/80',
      image: projectGeolocation,
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord temps réel pour l\'analyse de données avec graphiques interactifs et exportation de rapports.',
      technologies: ['React', 'D3.js', 'Express', 'InfluxDB', 'WebSocket'],
      color: 'from-accent/80 to-primary/80',
      image: projectAnalytics,
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-24 bg-muted/10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
              Projets Réalisés
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Une sélection de mes projets les plus significatifs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Card className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 border-border/30 hover:border-primary/50 h-full overflow-hidden">
                <CardHeader className="p-0">
                  {/* Project image header */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-30`} />
                    
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-background/90 text-primary shadow-lg">
                          <Star className="h-3 w-3 mr-1 fill-primary" />
                          Vedette
                        </Badge>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button size="icon" variant="outline" className="bg-background/50 backdrop-blur-sm">
                          <Github className="h-5 w-5" />
                        </Button>
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button size="icon" className="bg-accent-gradient shadow-glow">
                          <ArrowUpRight className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: techIndex * 0.05 }}
                      >
                        <Badge 
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/30"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all flex-1"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-accent-gradient shadow-glow hover:shadow-xl hover:scale-105 transition-all flex-1"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Voir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
