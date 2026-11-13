import { Card, CardContent } from "@/components/ui/card";
import pricingData from "@/seo/pricing.json";
import PageContent from "@/seo/PageContent";
import seoRoutes from "@/seo/routes.json";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Star, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBeach from "@/assets/hero-beach.jpg";

const Pricing = () => {
  useScrollToTop();
  const navigate = useNavigate();
  


  return (
    <div className="min-h-screen page-enter font-quicksand">
      <Header />
      <PageHero 
        title={seoRoutes.find((route) => route.path === "/cennik")!.h1}
        description={seoRoutes.find((route) => route.path === "/cennik")!.paragraphs[0]}
        backgroundImage={heroBeach}
      />
      <main className="py-16 bg-cozy-beige">
        <div className="container mx-auto px-4">
          
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-4">Cennik domków na 2026 rok</h2>
            <p className="text-center text-muted-foreground mb-10">Zł za domek za dobę, maksymalnie 6 osób. Minimalny pobyt: 3 doby.</p>
            <div className="hidden md:block feature-card overflow-x-auto mb-12">
              <table className="w-full text-left">
                <caption className="text-left text-muted-foreground mb-4">Stawki za domek za dobę w 2026 roku</caption>
                <thead><tr><th scope="col" className="p-3">Termin</th><th scope="col" className="p-3">Cena</th><th scope="col" className="p-3">Dostępność</th></tr></thead>
                <tbody>{pricingData.map(item => <tr className="border-t" key={item.period}><th scope="row" className="p-3 font-medium">{item.period}</th><td className="p-3">{item.price} zł</td><td className="p-3"><Button asChild><a href="/rezerwacja">Sprawdź termin</a></Button></td></tr>)}</tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:hidden gap-8 mb-12">
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
                      <p className="text-sm text-muted-foreground mt-1">za domek za dobę</p>
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                      <Users className="w-4 h-4 mr-1" />
                      Do 6 osób
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
            
          </div>
        </div>
        <PageContent path="/cennik" />
      </main>
      <FloatingActions />
    </div>
  );
};

export default Pricing;
