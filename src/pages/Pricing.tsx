import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Star, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBeach from "@/assets/hero-beach.jpg";

const Pricing = () => {
  useScrollToTop();
  const navigate = useNavigate();
  
  const pricingData = [
    { period: "11.04 - 31.05", price: "300", season: "Wiosna", popular: false },
    { period: "Majówka 29.04-03.05", price: "350", season: "Wiosna", popular: false },
    { period: "01.06 - 13.06", price: "350", season: "Początek lata", popular: false },
    { period: "14.06 - 04.07", price: "400", season: "Czerwiec", popular: false },
    { period: "05.07 - 11.07", price: "570", season: "Lipiec", popular: true },
    { period: "12.07 - 15.08", price: "650", season: "Sezon letni", popular: true },
    { period: "16.08 - 31.08", price: "520", season: "Sierpień", popular: false },
    { period: "01.09 - 19.10", price: "300", season: "Jesień", popular: false },
  ];

  return (
    <div className="min-h-screen page-enter font-quicksand">
      <Header />
      <PageHero 
        title="Cennik"
        description="Sprawdź nasze konkurencyjne ceny za noclegi w domkach letniskowych Biały Szafir w Rusinowie"
        backgroundImage={heroBeach}
      />
      <main className="py-16 bg-cozy-beige">
        <div className="container mx-auto px-4">
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {pricingData.map((item, index) => (
                <Card key={index} className={`pricing-card relative ${item.popular ? 'ring-2 ring-primary' : ''}`}>
                  {item.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Najpopularniejszy
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">{item.season}</h3>
                    <div className="flex items-center justify-center mb-4">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-lg font-semibold">{item.period}</span>
                    </div>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary">{item.price}</span>
                      <span className="text-lg text-muted-foreground">zł</span>
                      <p className="text-sm text-muted-foreground mt-1">za dobę</p>
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                      <Users className="w-4 h-4 mr-1" />
                      Do 5 osób
                    </div>
                    <Button 
                      onClick={() => navigate('/rezerwacja')}
                      className="w-full glow-effect"
                      variant={item.popular ? "default" : "outline"}
                    >
                      Zarezerwuj
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Warunki rezerwacji
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Minimalny pobyt</h4>
                      <p className="text-muted-foreground">2 doby</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Zameldowanie</h4>
                      <p className="text-muted-foreground">od 15:00</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Wymeldowanie</h4>
                      <p className="text-muted-foreground">do 10:00</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Zwierzęta</h4>
                      <p className="text-muted-foreground">15zł za dobę</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    W cenie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Pościel i ręczniki",
                      "WiFi",
                      "Miejsce parkingowe",
                      "Korzystanie z grilla",
                      "Sprzątanie końcowe",
                      "Dostęp do plaży"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <FloatingActions />
    </div>
  );
};

export default Pricing;