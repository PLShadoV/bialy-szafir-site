import { Button } from "@/components/ui/button";
import { Tv, Wifi, ChefHat, Snowflake, Shirt, UtensilsCrossed, Flame, WifiIcon } from "lucide-react";

const Equipment = () => {
  const equipment = [
    { icon: <Tv className="h-6 w-6" />, name: "TV + satelita" },
    { icon: <WifiIcon className="h-6 w-6" />, name: "Światłowód" },
    { icon: <ChefHat className="h-6 w-6" />, name: "Kuchnia (płyta indukcja, ekspres, czajnik, lodówka z zamrażalnikiem)" },
    { icon: <Snowflake className="h-6 w-6" />, name: "Klimatyzacja" },
    { icon: <Shirt className="h-6 w-6" />, name: "Pralka" },
    { icon: <UtensilsCrossed className="h-6 w-6" />, name: "Zmywarka" },
    { icon: <Flame className="h-6 w-6" />, name: "Grill" },
    { icon: <Wifi className="h-6 w-6" />, name: "Bezpłatne Wi-Fi na terenie ośrodka" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Wyposażenie domków letniskowych
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Wszystko czego potrzebujesz na komfortowy wypoczynek nad morzem
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Każdy domek jest w pełni wyposażony i przygotowany na pobyt do 5 osób. 
            Nowoczesne udogodnienia zapewniają komfort porównywalny z domowym.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {equipment.map((item, index) => (
            <div key={index} className="feature-card rounded-lg p-6 text-center">
              <div className="flex justify-center mb-3 text-primary">
                {item.icon}
              </div>
              <p className="text-sm text-foreground font-medium">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            <a href="#galeria">Zobacz galerię</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Equipment;