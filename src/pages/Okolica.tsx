import PageContent from "@/seo/PageContent";
import seoRoutes from "@/seo/routes.json";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FloatingActions from "@/components/FloatingActions";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import heroCoastal from "@/assets/hero-coastal.jpg";

const Okolica = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen page-enter font-quicksand">
      <Header />
      <PageHero
        title={seoRoutes.find((route) => route.path === "/okolica")!.h1}
        description={seoRoutes.find((route) => route.path === "/okolica")!.paragraphs[0]}
        backgroundImage={heroCoastal}
      />
      <main className="py-16 bg-cozy-cream">
        <PageContent path="/okolica" />
      </main>
      <FloatingActions />
    </div>
  );
};

export default Okolica;
