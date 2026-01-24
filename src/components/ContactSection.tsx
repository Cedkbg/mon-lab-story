import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(255, "Email trop long"),
  subject: z.string().trim().min(1, "Le sujet est requis").max(200, "Sujet trop long"),
  message: z.string().trim().min(1, "Le message est requis").max(2000, "Message trop long")
});

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'cedkbg07@gmail.com',
      href: 'mailto:cedkbg07@gmail.com'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+243 821 126-963',
      href: 'tel:+243821126963'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'RDC, Kinshasa',
      href: '#'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject,
          message: result.data.message
        });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Message envoyé! ✨",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
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
              Contactez-moi
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discutons de votre prochain projet. Je suis disponible pour des opportunités freelance et des collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gradient">Informations</h3>
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-card-gradient shadow-card hover:shadow-glow transition-all duration-500 border-border/30 group hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-accent-gradient p-3 rounded-xl shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <info.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{info.title}</h4>
                        <a 
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="w-3 h-3 bg-primary rounded-full mr-3 animate-pulse" />
                <span className="text-primary font-medium">Disponible pour de nouveaux projets</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card-gradient shadow-card border-border/30 overflow-hidden">
              <CardHeader className="border-b border-border/30">
                <CardTitle className="text-2xl text-gradient">Envoyez-moi un message</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Input
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        className={`bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300 h-12 ${errors.name ? 'border-destructive' : ''}`}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Input
                        name="email"
                        type="email"
                        placeholder="Votre email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300 h-12 ${errors.email ? 'border-destructive' : ''}`}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      name="subject"
                      placeholder="Sujet du message"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300 h-12 ${errors.subject ? 'border-destructive' : ''}`}
                    />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      placeholder="Décrivez votre projet ou votre demande..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300 resize-none ${errors.message ? 'border-destructive' : ''}`}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || isSuccess}
                    className="w-full bg-accent-gradient shadow-glow hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-14 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Message envoyé!
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
