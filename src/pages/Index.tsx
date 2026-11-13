import PageContent from "@/seo/PageContent";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import FloatingActions from "@/components/FloatingActions";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const Index = () => {
  useScrollToTop();
  
  return (
    <div className="min-h-screen font-quicksand">
      <Header />
      <main>
        <Hero />
        <PageContent path="/" />
        <Contact />
      </main>
      <FloatingActions />
    </div>
  );
};

export default Index;
