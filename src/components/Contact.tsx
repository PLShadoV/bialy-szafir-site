import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="kontakt" className="py-20 section-bg">
      <div className="container mx-auto px-4">
        {/* Location section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Jak nas znaleźć
          </h2>
          <h3 className="text-2xl font-semibold mb-4 text-primary">
            Biały Szafir - Domki letniskowe w Rusinowie
          </h3>
          <p className="text-xl text-muted-foreground">
            ul. Sosnowa 19, 76-107 Rusinowo
          </p>
        </div>

        {/* Contact section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Skontaktuj się z nami
            </h2>
            <p className="text-lg text-muted-foreground">
              Masz pytania? Chętnie pomożemy!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="feature-card rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                E-mail
              </h3>
              <a 
                href="mailto:info@szafirrusinowo.pl" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                info@szafirrusinowo.pl
              </a>
            </div>

            {/* Phone */}
            <div className="feature-card rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Telefon
              </h3>
              <a 
                href="tel:+48797392903" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                +48 797 392 903
              </a>
            </div>

            {/* Address */}
            <div className="feature-card rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Adres
              </h3>
              <div className="text-muted-foreground">
                <p>ul. Sosnowa 19</p>
                <p>76-107 Rusinowo</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              <a href="#rezerwacja">Zadaj pytanie</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;