import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Activities from "@/components/Activities";
import Equipment from "@/components/Equipment";
import Contact from "@/components/Contact";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Index = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Activities />
        <Equipment />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
