import React from "react";

export default function MissionSection() {
  return (
    <section className="relative bg-black py-24 md:py-32 z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-24">

        {/* MISSÃO + VISÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

          {/* Missão */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fec655] mb-8">
              Missão
            </h3>

            <div className="space-y-6 max-w-xl">
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Exercer a advocacia de forma ética, humanizada e responsável,
                oferecendo um atendimento personalizado, acessível e acolhedor,
                comprometido com a defesa dos direitos, das garantias fundamentais
                e da dignidade da pessoa humana.
              </p>

              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Atuar com excelência técnica e sensibilidade social nas diversas
                áreas do Direito, buscando respostas jurídicas seguras, justas e
                adequadas à realidade de cada cliente.
              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fec655] mb-8">
              Visão
            </h3>

            <div className="space-y-6 max-w-xl">
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Construir uma advocacia que cresça de forma sólida, responsável
                e humana, acompanhando as transformações da sociedade e do
                Direito, sem perder de vista o valor central de cada pessoa.
              </p>

              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Projetar o futuro a partir de uma atuação personalizada,
                juridicamente fundamentada e alinhada às normas legais e éticas
                da advocacia.
              </p>
            </div>
          </div>

        </div>

        {/* VALORES */}
        <div className="flex flex-col items-start md:items-center text-left md:text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#fec655] mb-14">
            Valores
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl w-full">
            {[
              {
                title: "Ética e Responsabilidade Profissional",
                desc: "Atuação pautada pelo respeito às normas legais e princípios éticos da profissão.",
              },
              {
                title: "Atendimento Humanizado",
                desc: "Escuta ativa e atendimento individualizado, respeitando a realidade de cada cliente.",
              },
              {
                title: "Rigor Técnico",
                desc: "Compromisso com estudo contínuo e aplicação responsável do Direito.",
              },
              {
                title: "Transparência e Clareza",
                desc: "Comunicação objetiva, honesta e acessível.",
              },
              {
                title: "Justiça Social",
                desc: "Proteção dos direitos e da dignidade da pessoa humana.",
              },
              {
                title: "Organização",
                desc: "Planejamento e método como base da eficiência jurídica.",
              },
              {
                title: "Confiança e Parceria",
                desc: "Relações construídas com respeito e cooperação.",
              },
              {
                title: "Evolução Contínua",
                desc: "Aprimoramento técnico e institucional permanente.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left list-none"
              >
                <span className="block text-[#fec655] font-semibold text-base mb-2">
                  {item.title}
                </span>
                <span className="block text-gray-300 text-base leading-relaxed">
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
