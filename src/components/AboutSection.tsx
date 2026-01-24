import { Card, CardContent } from '@/components/ui/card';
import { Code, Lightbulb, Users, Zap, Award, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const qualities = [
    {
      icon: Code,
      title: 'Code de qualité',
      description: 'Solutions robustes et maintenables avec les meilleures pratiques.',
      color: 'from-primary to-primary/60'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Recherche constante de nouvelles technologies et approches créatives.',
      color: 'from-accent to-accent/60'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travail en équipe et communication efficace.',
      color: 'from-primary to-accent'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimisation pour une expérience utilisateur exceptionnelle.',
      color: 'from-accent to-primary'
    }
  ];

  const stats = [
    { value: '5+', label: 'Années d\'expérience', icon: Award },
    { value: '50+', label: 'Projets réalisés', icon: Code },
    { value: '30+', label: 'Clients satisfaits', icon: Users },
    { value: '∞', label: 'Tasses de café', icon: Coffee }
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
              À propos de moi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Je suis <span className="text-primary font-semibold">Ced Kabongo</span> "Le JEUNE IR", ingénieur en génie logiciel passionné 
            avec une expertise dans le développement d'applications web et mobiles. Je m'efforce constamment 
            d'apprendre et d'adopter les dernières technologies pour créer des solutions innovantes.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-card-gradient border-border/30 hover:border-primary/50 transition-all duration-500 group">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Qualities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {qualities.map((quality, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 border-border/30 hover:border-primary/50 group h-full">
                <CardContent className="p-6 text-center">
                  <motion.div 
                    className={`mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br ${quality.color} shadow-glow`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <quality.icon className="h-8 w-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{quality.title}</h3>
                  <p className="text-sm text-muted-foreground">{quality.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Journey Card */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card-gradient shadow-card border-border/30 max-w-4xl mx-auto overflow-hidden relative">
            <div className="absolute inset-0 bg-accent-gradient opacity-5" />
            <CardContent className="p-8 md:p-12 relative">
              <h3 className="text-3xl font-bold mb-6 text-gradient">Mon parcours</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Diplômé en génie logiciel, j'ai commencé ma carrière en me spécialisant dans 
                le développement full-stack. Au fil des années, j'ai acquis une expertise 
                approfondie dans diverses technologies et méthodologies de développement. 
                Mon objectif est de créer des applications qui apportent une <span className="text-primary font-semibold">réelle valeur 
                aux utilisateurs</span> tout en respectant les contraintes techniques et business.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
