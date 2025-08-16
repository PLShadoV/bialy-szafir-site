import { Wifi, Users, ChefHat } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Wifi className="h-8 w-8 text-primary" />,
      title: "Szybki internet WiFi",
      description: "Bezpłatne Wi-Fi na terenie całego ośrodka z szybkim światłowodem"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Sześcioosobowe domki",
      description: "Komfortowe domki dla maksymalnie 6 osób z pełnym wyposażeniem"
    },
    {
      icon: <ChefHat className="h-8 w-8 text-primary" />,
      title: "Wyposażony aneks kuchenny",
      description: "Pełna kuchnia z lodówką, zmywarką, płytą indukcyjną i ekspresem"
    }
  ];

  return (
    <section className="py-20 bg-white font-quicksand">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-cozy-charcoal">Nasze domki</h2>
          <p className="text-lg text-cozy-charcoal/80 max-w-2xl mx-auto">
            Komfortowe domki w cichym miejscu przy lesie, około 600 metrów od morza. 
            Idealny standard dla waszego wypoczynku.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-cozy-beige rounded-lg p-8 text-center shadow-md">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cozy-charcoal">
                {feature.title}
              </h3>
              <p className="text-cozy-charcoal/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;