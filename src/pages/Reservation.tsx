import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { Users, Phone, Mail } from "lucide-react";

const Reservation = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen page-enter">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold text-center mb-8 gradient-text">Rezerwacja</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
            Zarezerwuj swój pobyt w domkach letniskowych Biały Szafir już dziś!
          </p>
          
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Reservation Engine */}
            <div className="w-full">
              <Card className="feature-card border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">System rezerwacji online</CardTitle>
                  <CardDescription>
                    Sprawdź dostępność i zarezerwuj swój pobyt w kilku krokach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <iframe 
                    id="ra-reservation-form-v2-751544ca6f8eba6df4c409e0ed8e5fe4" 
                    style={{
                      width: '100%', 
                      height: '100px', 
                      border: 'none', 
                      padding: 0,
                      borderRadius: '12px'
                    }} 
                    src="https://roomadmin.pl/widget/reservation-v2/start?fh=3f055f5738d635391c4937700ced3d1e9d603395&style=%7B%22color_accent%22%3A%22%230088cc%22%2C%22color_bg%22%3A%22%23FFFFFF%22%2C%22color_panel_header%22%3A%22%23FFFFFF%22%2C%22color_panel_body%22%3A%22%23FFFFFF%22%2C%22rounded_corners%22%3A%223%22%7D&filter=%7B%22room_type_id_in%22%3A%5B%223%22%5D%7D&lang=pl"
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Two columns below */}
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
                    <p className="text-xl font-mono text-primary">+48 123 456 789</p>
                    <p className="text-sm text-muted-foreground">Dostępni codziennie 8:00 - 20:00</p>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Napisz do nas
                    </h3>
                    <p className="text-lg text-primary">info@szafirrusinowo.pl</p>
                    <p className="text-sm text-muted-foreground">Odpowiadamy w ciągu 24h</p>
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
                      <h4 className="font-semibold text-sm">Minimalne wynajęcie</h4>
                      <p className="text-muted-foreground">3 doby</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Zadatek</h4>
                      <p className="text-muted-foreground">30% wartości</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Anulowanie</h4>
                      <p className="text-muted-foreground">Bezpłatne do 14 dni</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">Przyjazd z psem</h4>
                      <p className="text-muted-foreground">+20zł/dobę</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          try {
            (function () {
              var iframe = window.document.getElementById('ra-reservation-form-v2-751544ca6f8eba6df4c409e0ed8e5fe4');
              function raMessageReceiver(event) {
                if (iframe) {
                  if (!event.data.sender || "reservation-form-751544ca6f8eba6df4c409e0ed8e5fe4" !== event.data.sender) {
                    return;
                  }
                  if (event.data.height) {
                    iframe.style.height = (event.data.height + 10) + "px";
                  }
                  if (event.data.event && event.data.event.name === "widget.scrollup.requested") {
                    try {
                      iframe.scrollIntoView({behavior: "smooth", block: "start"});
                    } catch (e) { }
                  }
                  if (event.data.event && event.data.event.name === "reservation.submit.success") {
                    console.log("reservation.submit.success", event.data.event.data.reservation);
                    var moneyTotal = event.data.event.data.reservation.moneyTotal;
                    var id = event.data.event.data.reservation.id;
                    window.gtag||(console.log("no gtag -- trying fallback "),window.dataLayer=window.dataLayer||[],window.gtag=function(){dataLayer.push(arguments)},Array.from(document.scripts).forEach(function(a){if(a.src.startsWith("https://www.googletagmanager.com/gtag/js")||a.src.startsWith("http://www.googletagmanager.com/gtag/js")){var g=new URL(a.src).searchParams.get("id");console.log("gtag found: "+g),gtag("js",new Date),gtag("config",g)}}));
                    gtag("event", "purchase", { transaction_id: id, value: moneyTotal / 100, currency: "PLN" });
                    console.log("purchase event sent")
                  }
                  if (event.data.event && event.data.event.name === "reservation.variant-search.start") {
                  }
                  if (event.data.event && event.data.event.name) {
                    console.log(event.data.event.name, event.data.event);
                  }
                }
              }
              window.addEventListener("message", raMessageReceiver, false);
              function setup() {
                try {
                  iframe.contentWindow.postMessage({ 
                    location: window.location.toString(), 
                    setup: { 
                      autoHeight: true, 
                      senderName: "reservation-form-751544ca6f8eba6df4c409e0ed8e5fe4" 
                    } 
                  }, "*");
                } catch (e) { }
              }
              setInterval(setup, 1000);
              iframe.addEventListener("load", setup);
            })();
          } catch (e) {
            console.error(e);
          }
        `
      }} />
    </div>
  );
};

export default Reservation;