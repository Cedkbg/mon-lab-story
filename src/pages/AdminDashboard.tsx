import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  LogOut, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  Eye,
  Trash2,
  RefreshCw,
  MessageSquare,
  Users,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { User, Session } from '@supabase/supabase-js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  phone: string | null;
  company: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      } else {
        setTimeout(() => {
          checkAdminRole(session.user.id);
          fetchContacts();
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      } else {
        checkAdminRole(session.user.id);
        fetchContacts();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      toast({
        title: "Accès restreint",
        description: "Vous n'avez pas les droits d'administrateur. Contactez l'administrateur.",
        variant: "destructive"
      });
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les contacts",
        variant: "destructive"
      });
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const updateContactStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Statut mis à jour"
      });
      fetchContacts();
    }
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le contact",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Succès",
        description: "Contact supprimé"
      });
      setSelectedContact(null);
      fetchContacts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-primary/20 text-primary border-primary/30"><Clock className="h-3 w-3 mr-1" />Nouveau</Badge>;
      case 'read':
        return <Badge className="bg-accent/20 text-accent border-accent/30"><Eye className="h-3 w-3 mr-1" />Lu</Badge>;
      case 'replied':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Répondu</Badge>;
      case 'archived':
        return <Badge className="bg-muted text-muted-foreground border-muted"><XCircle className="h-3 w-3 mr-1" />Archivé</Badge>;
      default:
        return <Badge variant="outline">{status || 'new'}</Badge>;
    }
  };

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length
  };

  if (!isAdmin && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="bg-card-gradient shadow-card border-border/30 max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Accès Refusé</CardTitle>
            <CardDescription>
              Vous n'avez pas les droits d'administrateur pour accéder à cette page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au portfolio
            </Button>
            <Button variant="outline" onClick={handleLogout} className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Dashboard Admin</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={fetchContacts}
                className="border-primary/50 hover:bg-primary/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Messages', value: stats.total, icon: MessageSquare, color: 'primary' },
            { label: 'Nouveaux', value: stats.new, icon: Clock, color: 'primary' },
            { label: 'Lus', value: stats.read, icon: Eye, color: 'accent' },
            { label: 'Répondus', value: stats.replied, icon: CheckCircle, color: 'green-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card-gradient shadow-card border-border/30 hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contacts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card-gradient shadow-card border-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Messages de Contact
              </CardTitle>
              <CardDescription>
                Gérez les messages reçus via le formulaire de contact
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <motion.div
                    className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun message pour le moment</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/30">
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Sujet</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact, index) => (
                        <motion.tr
                          key={contact.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-border/30 hover:bg-muted/5 transition-colors cursor-pointer"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                          <TableCell className="text-muted-foreground max-w-[200px] truncate">
                            {contact.subject || 'Sans sujet'}
                          </TableCell>
                          <TableCell>{getStatusBadge(contact.status)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(contact.created_at).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedContact(contact);
                              }}
                              className="hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Contact Detail Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="bg-card-gradient border-border/30 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gradient">Détails du message</DialogTitle>
            <DialogDescription>
              Message reçu le {selectedContact && new Date(selectedContact.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" /> Nom
                  </p>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </p>
                  <a href={`mailto:${selectedContact.email}`} className="font-medium text-primary hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                {selectedContact.phone && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Téléphone
                    </p>
                    <p className="font-medium">{selectedContact.phone}</p>
                  </div>
                )}
                {selectedContact.company && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building className="h-4 w-4" /> Entreprise
                    </p>
                    <p className="font-medium">{selectedContact.company}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sujet</p>
                <p className="font-medium">{selectedContact.subject || 'Sans sujet'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Message</p>
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <p className="text-sm text-muted-foreground mr-2">Statut :</p>
                {['new', 'read', 'replied', 'archived'].map((status) => (
                  <Button
                    key={status}
                    variant={selectedContact.status === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateContactStatus(selectedContact.id, status)}
                    className={selectedContact.status === status ? 'bg-accent-gradient' : ''}
                  >
                    {status === 'new' && 'Nouveau'}
                    {status === 'read' && 'Lu'}
                    {status === 'replied' && 'Répondu'}
                    {status === 'archived' && 'Archivé'}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-border/30">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteContact(selectedContact.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
                <Button
                  asChild
                  className="bg-accent-gradient shadow-glow"
                >
                  <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Votre message'}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Répondre par email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;