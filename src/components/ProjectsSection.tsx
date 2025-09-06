import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Plateforme E-commerce',
      description: 'Application complète de commerce électronique avec gestion des commandes, paiements sécurisés et tableau de bord administrateur.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Application de Gestion de Projets',
      description: 'Outil collaboratif pour la gestion de projets avec suivi du temps, assignation de tâches et reporting avancé.',
      technologies: ['Vue.js', 'Django', 'MongoDB'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'API de Géolocalisation',
      description: 'Service REST API pour la géolocalisation avec intégration de cartes interactives et recherche avancée.',
      technologies: ['Python', 'Django', 'Redis', 'Kubernetes'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord temps réel pour l\'analyse de données avec graphiques interactifs et exportation de rapports.',
      technologies: ['React', 'D3.js', 'Express', 'InfluxDB', 'WebSocket'],
      image: '/api/placeholder/400/250',
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Projets Réalisés
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Une sélection de mes projets les plus significatifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`bg-card-gradient shadow-card hover:shadow-glow transition-all duration-300 border-border/50 ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <CardHeader className="p-0">
                <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Image du projet</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {project.featured && (
                    <Badge className="bg-hero-gradient text-primary-foreground">
                      Vedette
                    </Badge>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-hero-gradient shadow-glow hover:shadow-xl"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Voir le projet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;