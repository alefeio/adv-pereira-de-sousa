import ContactForm from "./ContactForm";

interface BannerItem {
  id: string;
  url: string;
  title?: string;
}

const STATIC_SLIDES: BannerItem[] = [
  {
    id: "static-contato",
    url: "/images/bg-contato1.jpg",
    title: "Fale Conosco",
  },
];

export default function Contato() {
  const slide = STATIC_SLIDES[0];

  return (
    <div className="relative w-full bg-black" id="inicio">
      
      {/* Background */}
      <div className="absolute inset-0 z-10">
        <img
          src={slide.url}
          alt={slide.title || "Banner Contato"}
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-20 flex flex-col items-center pt-40 pb-32">
        
        {/* Título */}
        <div className="container max-w-4xl mx-auto text-center px-6 mb-16">
          {slide.title && (
            <h1 className="font-sans text-3xl md:text-5xl font-extrabold text-[#ca9a45] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-tight">
              {slide.title}
            </h1>
          )}
        </div>

        {/* Formulário */}
        <div className="w-full px-6">
          <ContactForm />
        </div>

      </div>
    </div>
  );
}
