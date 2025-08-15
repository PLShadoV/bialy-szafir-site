import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import Map from "@/components/Map";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import heroCoastal from "@/assets/hero-coastal.jpg";

const Contact = () => {
  useScrollToTop();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Sending form data:', formData);
      
      const response = await fetch('https://kmolgjwixpwiigwfayxz.supabase.co/functions/v1/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (response.ok && result.success) {
        setShowSuccessDialog(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
        toast({
          title: "Sukces!",
          description: "Wiadomość została wysłana pomyślnie.",
        });
      } else {
        throw new Error(result.error || 'Wystąpił błąd podczas wysyłania');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Błąd",
        description: error instanceof Error ? error.message : "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };
  
  return (
    <div className="min-h-screen page-enter">
      <Header />
      <PageHero 
        title="Kontakt"
        description="Masz pytania? Chętnie pomożemy Ci zaplanować idealny wypoczynek w Rusinowie"
        backgroundImage={heroCoastal}
      />
      <main className="py-16">
        <div className="container mx-auto px-4">

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="feature-card text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Telefon</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href="tel:+48797392903" 
                      className="text-lg font-mono text-primary hover:text-primary/80 transition-colors"
                    >
                      +48 797 392 903
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      Dostępni codziennie 8:00 - 20:00
                    </p>
                  </CardContent>
                </Card>

                <Card className="feature-card text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-2">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>E-mail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href="mailto:info@szafirrusinowo.pl" 
                      className="text-lg text-primary hover:text-primary/80 transition-colors"
                    >
                      info@szafirrusinowo.pl
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      Odpowiadamy w ciągu 24h
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle>Adres</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg">
                    <p className="font-semibold">Biały Szafir</p>
                    <p>ul. Sosnowa 19</p>
                    <p>76-107 Rusinowo</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="feature-card">
              <CardHeader>
                <CardTitle>Napisz do nas</CardTitle>
                <CardDescription>
                  Wyślij nam wiadomość, a skontaktujemy się z Tobą jak najszybciej
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Imię i nazwisko</Label>
                      <Input 
                        type="text" 
                        id="name" 
                        placeholder="Jan Kowalski"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input 
                        type="tel" 
                        id="phone" 
                        placeholder="+48 123 456 789"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      placeholder="jan@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Temat</Label>
                    <Input 
                      type="text" 
                      id="subject" 
                      placeholder="Pytanie o rezerwację"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Wiadomość</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Twoja wiadomość..."
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full glow-effect"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Map at the end */}
          <div className="max-w-6xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Nasza lokalizacja</h2>
            <div className="feature-card p-6">
              <Map />
            </div>
          </div>
        </div>
      </main>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-primary">
              ✓ Wiadomość wysłana!
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Zamknij
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;