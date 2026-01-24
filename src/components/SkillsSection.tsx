import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Langages de Programmation',
      icon: '💻',
      skills: [
        { name: 'JavaScript/TypeScript', level: 95 },
        { name: 'Python', level: 88 },
        { name: 'Java', level: 82 },
        { name: 'C#', level: 75 }
      ]
    },
    {
      title: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React/Next.js', level: 92 },
        { name: 'Vue.js', level: 85 },
        { name: 'CSS/Tailwind', level: 90 },
        { name: 'HTML5', level: 95 }
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Django/FastAPI', level: 85 },
        { name: 'Spring Boot', level: 78 },
        { name: 'Express.js', level: 88 }
      ]
    },
    {
      title: 'Base de Données',
      icon: '🗄️',
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 82 },
        { name: 'Redis', level: 75 },
        { name: 'MySQL', level: 85 }
      ]
    }
  ];

  const tools = [
    { name: 'Git', category: 'vcs' },
    { name: 'Docker', category: 'devops' },
    { name: 'Kubernetes', category: 'devops' },
    { name: 'AWS', category: 'cloud' },
    { name: 'Azure', category: 'cloud' },
    { name: 'Jenkins', category: 'devops' },
    { name: 'Jest', category: 'testing' },
    { name: 'Cypress', category: 'testing' },
    { name: 'Figma', category: 'design' },
    { name: 'Postman', category: 'tools' },
    { name: 'VS Code', category: 'tools' },
    { name: 'Linux', category: 'os' }
  ];

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
              Compétences Techniques
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Technologies et outils que je maîtrise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 border-border/30 hover:border-primary/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-gradient">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm font-semibold text-primary">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute inset-y-0 left-0 bg-accent-gradient rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card-gradient shadow-card border-border/30">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-gradient">Outils & Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge 
                      variant="outline"
                      className="bg-primary/5 border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 px-4 py-2 text-sm cursor-default"
                    >
                      {tool.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
