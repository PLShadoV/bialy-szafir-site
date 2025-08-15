import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Strona główna", href: "/" },
    { name: "Galeria", href: "/galeria" },
    { name: "Cennik", href: "/cennik" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  const centerLinks = [
    { name: "Biała Perła", href: "https://bialaperlusinowo.pl" },
    { name: "Biały Koral", href: "https://bialykoralrusinowo.pl" },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold gradient-text">Biały Szafir</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Nasze ośrodki
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {centerLinks.map((center) => (
                  <DropdownMenuItem key={center.name} asChild>
                    <a href={center.href} target="_blank" rel="noopener noreferrer">
                      {center.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="default" size="sm" className="glow-effect" asChild>
              <Link to="/rezerwacja">Rezerwacja</Link>
            </Button>
            <select className="text-sm border-none bg-transparent">
              <option>🇵🇱 PL</option>
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border mt-4">
                <p className="text-sm font-medium mb-2">Nasze ośrodki:</p>
                {centerLinks.map((center) => (
                  <a
                    key={center.name}
                    href={center.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors py-1 block pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {center.name}
                  </a>
                ))}
              </div>
              
              <div className="pt-4">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link to="/rezerwacja" onClick={() => setIsMenuOpen(false)}>
                    Rezerwacja
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;