import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import Map from "@/components/Map";

const Contact = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen page-enter">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-8 gradient-text">Kontakt</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
            Masz pytania? Chętnie pomożemy Ci zaplanować idealny wypoczynek.
          </p>

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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Imię i nazwisko</Label>
                    <Input type="text" id="name" placeholder="Jan Kowalski" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input type="tel" id="phone" placeholder="+48 123 456 789" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="jan@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="subject">Temat</Label>
                  <Input type="text" id="subject" placeholder="Pytanie o rezerwację" />
                </div>
                
                <div>
                  <Label htmlFor="message">Wiadomość</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Twoja wiadomość..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full glow-effect">
                  Wyślij wiadomość
                </Button>
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
    </div>
  );
};

export default Contact;