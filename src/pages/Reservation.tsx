import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Users, Phone, Mail } from "lucide-react";
import heroForest from "@/assets/hero-forest.jpg";

const IFRAME_ID =
  "ra-reservation-form-v2-751544ca6f8eba6df4c409e0ed8e5fe4";
const SENDER_NAME =
  "reservation-form-751544ca6f8eba6df4c409e0ed8e5fe4";

const Reservation = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen page-enter font-quicksand">
      <Header />

      <PageHero
        title="Rezerwacja"
        description="Zarezerwuj swój pobyt w domkach letniskowych Biały Szafir już dziś!"
        backgroundImage={heroForest}
      />

      <main className="py-16 bg-cozy-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* ✅ ROOMADMIN – CLEAN WRAPPER */}
            <div className="w-full">
              <div className="bg-white rounded-xl border border-primary/20 p-4 md:p-6">
                <h2 className="text-2xl font-semibold text-center mb-4">
                  System rezerwacji online
                </h2>
                <p className="text-center text-muted-foreground mb-6">
                  Sprawdź dostępność i zarezerwuj swój pobyt w kilku krokach
                </p>

                <iframe
                  id={IFRAME_ID}
                  title="Rezerwacja – widget RoomAdmin"
                  src="https://roomadmin.pl/widget/reservation-v2/start?fh=3f055f5738d635391c4937700ced3d1e9d603395&style=%7B%22color_accent%22%3A%22%230088cc%22%2C%22color_bg%22%3A%22%23FFFFFF%22%2C%22color_panel_header%22%3A%22%23FFFFFF%22%2C%22color_panel_body%22%3A%22%23FFFFFF%22%2C%22rounded_corners%22%3A%223%22%7D&filter=%7B%22room_type_id_in%22%3A%5B%223%22%5D%7D&lang=pl"
                  style={{
                    width: "100%",
                    minHeight: "320px",
                    border: "none",
                  }}
                  scrolling="no"
                />
              </div>
            </div>

            {/* INFO SECTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Phone className="h-6 w-6 text-primary" />
                    Kontakt bezpośredni
                  </CardTitle>
                  <CardDescription>
                    Potrzebujesz pomocy? Skontaktuj się z nami bezpośrednio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Zadzwoń do nas
                    </h3>
                    <p className="text-xl font-mono text-primary">
                      +48 504 201 117
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Dostępni codziennie 8:00 - 20:00
                    </p>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Napisz do nas
                    </h3>
                    <p className="text-lg text-primary">
                      info@szafirrusinowo.pl
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Odpowiadamy w ciągu 24h
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Users className="h-6 w-6 text-primary" />
                    Informacje o rezerwacji
                  </CardTitle>
                  <CardDescription>
                    Ważne informacje dotyczące rezerwacji i pobytu
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">
                        Minimalny czas wynajmu
                      </h4>
                      <p className="text-muted-foreground">3 doby</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Zadatek</h4>
                      <p className="text-muted-foreground">
                        20% kwoty rezerwacji
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">
                        Przyjazd z psem
                      </h4>
                      <p className="text-muted-foreground">15zł / doba</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* ✅ ROOMADMIN AUTOHEIGHT + ANALYTICS */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var iframe = document.getElementById("${IFRAME_ID}");
              function raMessageReceiver(event) {
                if (!event.data || event.data.sender !== "${SENDER_NAME}") return;

                if (event.data.height && iframe) {
                  iframe.style.height = (event.data.height + 10) + "px";
                }

                if (event.data.event?.name === "widget.scrollup.requested") {
                  iframe.scrollIntoView({ behavior: "smooth", block: "start" });
                }

                if (event.data.event?.name === "reservation.submit.success") {
                  var r = event.data.event.data.reservation;
                  if (window.gtag) {
                    gtag("event", "purchase", {
                      transaction_id: r.id,
                      value: r.moneyTotal / 100,
                      currency: "PLN"
                    });
                  }
                }
              }

              window.addEventListener("message", raMessageReceiver);

              function setup() {
                try {
                  iframe.contentWindow.postMessage({
                    location: window.location.toString(),
                    setup: {
                      autoHeight: true,
                      senderName: "${SENDER_NAME}"
                    }
                  }, "*");
                } catch {}
              }

              setInterval(setup, 1000);
              iframe.addEventListener("load", setup);
            })();
          `,
        }}
      />

      <FloatingActions />
    </div>
  );
};

export default Reservation;
