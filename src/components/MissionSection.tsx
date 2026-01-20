import React from "react";

export default function MissionSection() {
  return (
    <section className="bg-black py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-20">

        {/* MISSÃO + VISÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Missão */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-extrabold text-[#ba9a71] mb-6">
              Missão
            </h3>

            <div className="space-y-4 max-w-xl">
              <p className="text-gray-200 text-sm leading-relaxed">
                Exercer a advocacia de forma ética, humanizada e responsável,
                oferecendo um atendimento personalizado, acessível e acolhedor,
                comprometido com a defesa dos direitos, das garantias fundamentais
                e da dignidade da pessoa humana.
              </p>

              <p className="text-gray-200 text-sm leading-relaxed">
                Atuar com excelência técnica e sensibilidade social nas diversas
                áreas do Direito, buscando respostas jurídicas seguras, justas e
                adequadas à realidade de cada cliente.
              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-3xl font-extrabold text-[#ba9a71] mb-6">
              Visão
            </h3>

            <div className="space-y-4 max-w-xl">
              <p className="text-gray-200 text-sm leading-relaxed">
                Construir uma advocacia que cresça de forma sólida, responsável
                e humana, acompanhando as transformações da sociedade e do
                Direito, sem perder de vista o valor central de cada pessoa.
              </p>

              <p className="text-gray-200 text-sm leading-relaxed">
                Projetar o futuro a partir de uma atuação personalizada,
                juridicamente fundamentada e alinhada às normas legais e éticas
                da advocacia.
              </p>
            </div>
          </div>

        </div>

        {/* VALORES */}
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-extrabold text-[#ba9a71] mb-10">
            Valores
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 max-w-6xl list-none">
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
              <li key={i}>
                <span className="block text-[#ba9a71] font-semibold text-sm mb-1">
                  {item.title}
                </span>
                <span className="block text-gray-300 text-sm leading-relaxed">
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
