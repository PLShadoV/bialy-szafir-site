import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Users, Phone, Mail } from "lucide-react";

const Reservation = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Rezerwacja</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Zarezerwuj swój pobyt w domkach letniskowych Biały Szafir już dziś!
          </p>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="feature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Formularz rezerwacji
                </CardTitle>
                <CardDescription>
                  Wypełnij formularz, a my skontaktujemy się z Tobą w celu potwierdzenia rezerwacji
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkin">Data przyjazdu</Label>
                    <Input type="date" id="checkin" />
                  </div>
                  <div>
                    <Label htmlFor="checkout">Data wyjazdu</Label>
                    <Input type="date" id="checkout" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="guests">Liczba osób</Label>
                  <Input type="number" id="guests" min="1" max="5" defaultValue="2" />
                </div>
                
                <div>
                  <Label htmlFor="name">Imię i nazwisko</Label>
                  <Input type="text" id="name" placeholder="Jan Kowalski" />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="jan@example.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input type="tel" id="phone" placeholder="+48 123 456 789" />
                </div>
                
                <div>
                  <Label htmlFor="message">Dodatkowe informacje</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Czy planujesz przyjazd z psem? Masz jakieś specjalne życzenia?"
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button className="w-full glow-effect">
                  Wyślij zapytanie o rezerwację
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Kontakt bezpośredni
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Zadzwoń do nas:</h3>
                    <p className="text-lg font-mono">+48 123 456 789</p>
                    <p className="text-sm text-muted-foreground">Dostępni codziennie 8:00 - 20:00</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Napisz do nas:</h3>
                    <p className="text-lg">info@szafirrusinowo.pl</p>
                    <p className="text-sm text-muted-foreground">Odpowiadamy w ciągu 24h</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Informacje o rezerwacji
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <h4 className="font-semibold">Minimalne wynajęcie:</h4>
                    <p className="text-muted-foreground">3 doby</p>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-semibold">Zadatek:</h4>
                    <p className="text-muted-foreground">30% wartości rezerwacji</p>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-semibold">Anulowanie:</h4>
                    <p className="text-muted-foreground">Bezpłatne do 14 dni przed przyjazdem</p>
                  </div>
                  
                  <div className="text-sm">
                    <h4 className="font-semibold">Przyjazd z psem:</h4>
                    <p className="text-muted-foreground">Dodatkowa opłata 20zł/dobę</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reservation;