import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Langages de Programmation',
      skills: [
        { name: 'JavaScript/TypeScript', level: 95 },
        { name: 'Python', level: 88 },
        { name: 'Java', level: 82 },
        { name: 'C#', level: 75 }
      ]
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'React/Next.js', level: 92 },
        { name: 'Vue.js', level: 85 },
        { name: 'CSS/Tailwind', level: 90 },
        { name: 'HTML5', level: 95 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Django/FastAPI', level: 85 },
        { name: 'Spring Boot', level: 78 },
        { name: 'Express.js', level: 88 }
      ]
    },
    {
      title: 'Base de Données',
      skills: [
        { name: 'PostgreSQL', level: 88 },
        { name: 'MongoDB', level: 82 },
        { name: 'Redis', level: 75 },
        { name: 'MySQL', level: 85 }
      ]
    }
  ];

  const tools = [
    'Git', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Jenkins',
    'Jest', 'Cypress', 'Figma', 'Postman', 'VS Code', 'Linux'
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-text-gradient bg-clip-text text-transparent">
              Compétences Techniques
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Technologies et outils que je maîtrise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-300 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card-gradient shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="text-center">Outils & Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center">
              {tools.map((tool, index) => (
                <Badge 
                  key={index}
                  variant="outline"
                  className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SkillsSection;