import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Phone, Mail } from "lucide-react";

const OurCenters = () => {
  const centers = [
    {
      name: "Biała Perła",
      description: "Nasz pierwszy ośrodek wypoczynkowy nad morzem",
      address: "ul. Morska 15, 76-107 Rusinowo",
      phone: "+48 123 456 789",
      email: "info@bialaperlusinowo.pl",
      website: "https://bialaperlusinowo.pl",
      features: ["Domki nad samym morzem", "Prywatna plaża", "Restauracja", "SPA"]
    },
    {
      name: "Biały Koral",
      description: "Drugi z naszych ośrodków w malowniczej lokalizacji",
      address: "ul. Sosnowa 10, 76-107 Rusinowo", 
      phone: "+48 123 456 790",
      email: "info@bialykoralrusinowo.pl",
      website: "https://bialykoralrusinowo.pl",
      features: ["Domki w lesie", "Blisko plaży", "Rowery do wypożyczenia", "Plac zabaw"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Nasze Ośrodki</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Oprócz Białego Szafiru oferujemy także pobyt w naszych innych ośrodkach wypoczynkowych w Rusinowie.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {centers.map((center, index) => (
              <Card key={index} className="feature-card">
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">{center.name}</CardTitle>
                  <CardDescription className="text-base">{center.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{center.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>{center.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{center.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Udogodnienia:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {center.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <a href={center.website} target="_blank" rel="noopener noreferrer">
                      Odwiedź stronę <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurCenters;