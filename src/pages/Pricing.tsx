import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const pricingData = [
    { period: "12.04 - 31.05", price: "300" },
    { period: "01.06 - 15.06", price: "350" },
    { period: "16.06 - 06.07", price: "400" },
    { period: "07.07 - 12.07", price: "570" },
    { period: "07.07 - 17.08", price: "650" },
    { period: "18.08 - 31.08", price: "520" },
    { period: "01.09 - 19.10", price: "350" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Cennik</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Sprawdź nasze konkurencyjne ceny za noclegi w domkach letniskowych Biały Szafir w Rusinowie.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pricingData.map((item, index) => (
                <Card key={index} className="feature-card text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.period}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {item.price}zł
                    </div>
                    <p className="text-sm text-muted-foreground">za dobę</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Informacje dodatkowe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Warunki rezerwacji:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Minimalne wynajęcie: 3 doby</li>
                    <li>• Zameldowanie: od 15:00</li>
                    <li>• Wymeldowanie: do 11:00</li>
                    <li>• Zwierzęta: mile widziane (dodatkowa opłata 20zł/dobę)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">W cenie:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pościel i ręczniki</li>
                    <li>• WiFi</li>
                    <li>• Miejsce parkingowe</li>
                    <li>• Korzystanie z grilla</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;