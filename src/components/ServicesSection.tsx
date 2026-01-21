import React from "react";
import {
  HiOutlineScale,
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import {
  BsPeople,
  BsBank,
  BsBriefcase,
  BsLaptop,
  BsHeartPulse,
  BsPersonCheck,
  BsTree,
} from "react-icons/bs";

const services = [
  {
    title: "Direito Empresarial",
    description:
      "Assessoria jurídica completa a empresários e sociedades empresárias, com atuação estratégica em contratos, reorganizações societárias, cobranças e orientação preventiva.",
    icon: BsBriefcase,
  },
  {
    title: "Direito do Trabalho",
    description:
      "Atuação na defesa de trabalhadores e empregadores, com foco em prevenção de conflitos, segurança jurídica, reclamatórias trabalhistas e assessoria empresarial contínua.",
    icon: BsPeople,
  },
  {
    title: "Direito Civil",
    description:
      "Atuação em demandas cíveis em geral, incluindo contratos, cobranças, execuções, responsabilidade civil e resolução de conflitos patrimoniais.",
    icon: HiOutlineDocumentText,
  },
  {
    title: "Direito de Família e Sucessões",
    description:
      "Atendimento humanizado e técnico em divórcios, pensão alimentícia, guarda, inventários, partilhas e planejamento sucessório.",
    icon: BsPersonCheck,
  },
  {
    title: "Direito Penal",
    description:
      "Defesa técnica e estratégica desde a fase policial até o processo judicial, com atuação ética, sigilosa e comprometida com a ampla defesa.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Direito Agrário",
    description:
      "Assessoria jurídica ao produtor rural, com atuação em regularização fundiária, contratos agrários e conflitos possessórios.",
    icon: BsTree,
  },
  {
    title: "Direito Previdenciário",
    description:
      "Atuação administrativa e judicial em benefícios previdenciários, aposentadorias, pensões, auxílios, revisões e planejamento previdenciário.",
    icon: BsBank,
  },
  {
    title: "Direito do Consumidor",
    description:
      "Defesa dos direitos do consumidor em cobranças indevidas, contratos abusivos, negativação irregular e conflitos com instituições financeiras e prestadores de serviços.",
    icon: HiOutlineScale,
  },
  {
    title: "Direito Digital",
    description:
      "Atuação jurídica no ambiente digital, com foco em LGPD, remoção de conteúdos, vazamento de dados, fraudes digitais e proteção da reputação online.",
    icon: BsLaptop,
  },
  {
    title: "Direito Bancário",
    description:
      "Atuação na revisão de contratos bancários, financiamentos, juros abusivos, renegociação de dívidas e defesa em execuções.",
    icon: HiOutlineOfficeBuilding,
  },
  {
    title: "Direito da Saúde",
    description:
      "Atuação na defesa do direito à saúde, com demandas envolvendo planos de saúde, fornecimento de medicamentos e tratamentos médicos.",
    icon: BsHeartPulse,
  },
  {
    title: "Direito das Pessoas com TEA",
    description:
      "Atuação comprometida com a proteção dos direitos das pessoas com Transtorno do Espectro Autista, assegurando acesso à saúde, educação e benefícios assistenciais.",
    icon: BsPersonCheck,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative z-20 bg-black/80 py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  flex flex-col md:flex-row
                  items-center md:items-start
                  gap-6
                  text-center md:text-left
                "
              >
                {/* Ícone */}
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-[#ca9a45]/40 text-[#ca9a45] text-3xl">
                  <Icon />
                </div>

                {/* Texto */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#ca9a45] leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
