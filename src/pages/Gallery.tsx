import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Star, MapPin, Users, Wifi, Car, Utensils } from "lucide-react";

const Gallery = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen page-enter">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-8 gradient-text">Galeria</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
            Zobacz nasze piękne domki letniskowe w malowniczym otoczeniu Rusinowa nad Bałtykiem.
          </p>
          
          {/* Hero section with main images */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Zdjęcia domków</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="feature-card rounded-xl overflow-hidden group">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative overflow-hidden">
                    <span className="text-muted-foreground text-lg font-medium">Domek {item}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Larger featured image */}
            <div className="mt-6">
              <div className="feature-card rounded-xl overflow-hidden group">
                <div className="aspect-[21/9] bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative overflow-hidden">
                  <span className="text-muted-foreground text-2xl font-medium">Widok panoramiczny</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Features section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Nasze domki</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Oferujemy komfortowe domki z pełnym wyposażeniem i dostępem do plaży w pięknej okolicy Rusinowa.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Wifi className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Szybki internet WiFi</CardTitle>
                  <CardDescription>
                    Bezpłatny dostęp do szybkiego internetu we wszystkich domkach
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Car className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Parking prywatny</CardTitle>
                  <CardDescription>
                    Każdy domek posiada własne miejsce parkingowe
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="feature-card text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Utensils className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle>Wyposażona kuchnia</CardTitle>
                  <CardDescription>
                    Pełne wyposażenie kuchenne do przygotowywania posiłków
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Promotional videos section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Filmy promocyjne</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="feature-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative">
                  <span className="text-muted-foreground text-lg font-medium">Film promocyjny 1</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Prezentacja domków</h3>
                  <p className="text-sm text-muted-foreground">Sprawdź nasze piękne domki</p>
                </div>
              </div>
              
              <div className="feature-card rounded-xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center relative">
                  <span className="text-muted-foreground text-lg font-medium">Film promocyjny 2</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Okolica i atrakcje</h3>
                  <p className="text-sm text-muted-foreground">Odkryj piękno Rusinowa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;