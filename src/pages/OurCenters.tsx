import PageContent from "@/seo/PageContent";
import seoRoutes from "@/seo/routes.json";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import heroNature from "@/assets/hero-nature.jpg";

const OurCenters = () => {
  useScrollToTop();
  

  return (
    <div className="min-h-screen page-enter font-quicksand">
      <Header />
      <PageHero 
        title={seoRoutes.find((route) => route.path === "/nasze-osrodki")!.h1}
        description={seoRoutes.find((route) => route.path === "/nasze-osrodki")!.paragraphs[0]}
        backgroundImage={heroNature}
      />
      <main className="py-16 bg-cozy-cream">
        <PageContent path="/nasze-osrodki" />
      </main>
      <FloatingActions />
    </div>
  );
};

export default OurCenters;
