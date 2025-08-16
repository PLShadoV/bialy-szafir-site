import { useState } from "react";
import { Phone, Mail, MapPin, Calendar, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FloatingActions = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const actions = [
    {
      icon: Phone,
      label: "Telefon",
      action: () => window.open("tel:+48504201117"),
      bgColor: "bg-cozy-sage hover:bg-cozy-sage/80"
    },
    {
      icon: Mail,
      label: "Kontakt",
      action: () => navigate("/kontakt"),
      bgColor: "bg-cozy-blue hover:bg-cozy-blue/80"
    },
    {
      icon: MapPin,
      label: "Mapa",
      action: () => {
        const mapSection = document.getElementById("kontakt");
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate("/kontakt");
        }
      },
      bgColor: "bg-cozy-peach hover:bg-cozy-peach/80"
    },
    {
      icon: Calendar,
      label: "Rezerwacja",
      action: () => navigate("/rezerwacja"),
      bgColor: "bg-cozy-warm hover:bg-cozy-warm/80"
    }
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center space-y-3">
      {/* Action buttons */}
      <div className={`flex flex-col items-center space-y-3 transition-all duration-500 ease-in-out ${
        isExpanded 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              onClick={action.action}
              size="icon"
              className={`w-12 h-12 rounded-full shadow-lg text-white hover:scale-110 transition-all duration-300 ${action.bgColor}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}
      </div>

      {/* Toggle button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="icon"
        className="w-14 h-14 rounded-full bg-cozy-accent hover:bg-cozy-accent/80 shadow-xl text-white hover:scale-110 transition-all duration-300"
      >
        {isExpanded ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <ChevronUp className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default FloatingActions;