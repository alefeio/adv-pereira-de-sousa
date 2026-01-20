import { useRouter } from "next/router";
import React from "react";

export default function Hero() {
  const router = useRouter();

  const handleClick = (pg: string) => {
    router.push(pg);
  };

  return (
    <section className="bg-black py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">

          {/* Imagem */}
          <div className="block flex-1 relative w-full md:max-w-xl overflow-hidden rounded-3xl transition-transform duration-500 ease-in-out transform hover:scale-102 order-first md:order-none">
            <img
              src="/images/daniel2.jpg"
              alt="Ambiente jurídico profissional do escritório Pereira de Sousa"
              className="w-full h-auto object-cover max-h-96 md:max-h-full"
            />
          </div>

          {/* Texto institucional */}
          <div className="flex-1 flex flex-col items-start text-left gap-5">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-extrabold text-[#ba9a71] leading-tight max-w-4xl">
              Advocacia ética, técnica e comprometida com pessoas
            </h2>

            <p className="text-white text-lg max-w-xl md:max-w-none">
              A <strong>Pereira de Sousa – Advocacia</strong> atua com responsabilidade, organização e rigor técnico,
              oferecendo soluções jurídicas seguras, claras e alinhadas à realidade de cada cliente.
            </p>

            <p className="text-white text-lg max-w-xl md:max-w-none">
              O escritório adota uma atuação humanizada e personalizada, pautada na escuta ativa,
              na transparência e no respeito às particularidades de cada demanda.
            </p>

            <p className="text-white text-lg max-w-xl md:max-w-none">
              Nosso compromisso é com a ética profissional, a qualidade jurídica e a defesa dos direitos,
              sempre orientados pela justiça e pela dignidade da pessoa humana.
            </p>

            {/* Botão opcional */}
            {/*
            <div className="mt-6 w-fit">
              <button
                onClick={() => handleClick("/sobre")}
                className="inline-block bg-[#ba9a71] text-[#0c1a26] font-bold py-3 px-8 rounded-full shadow-lg hover:bg-[#a6885f] transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
              >
                Conheça o escritório
              </button>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
