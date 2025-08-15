interface PageHeroProps {
  title: string;
  description: string;
  backgroundImage: string;
}

const PageHero = ({ title, description, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">{title}</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;