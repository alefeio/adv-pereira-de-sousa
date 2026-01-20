import React from "react";

export default function SobreSection() {
  return (
    <section className="bg-black/70 py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-white text-xl leading-relaxed space-y-8 mb-10">
          <p>
            A <span className="font-extrabold">Pereira de Sousa - Advocacia</span> atua com foco em uma advocacia ética,
            responsável e humanizada, comprometida com a defesa dos direitos, das garantias fundamentais e da dignidade
            da pessoa humana.
          </p>

          <p>
            O escritório desenvolve sua atuação com base em rigor técnico, organização e constante aprimoramento,
            buscando oferecer respostas jurídicas seguras, claras e adequadas à realidade de cada cliente, sempre com
            atenção às normas legais e éticas da profissão.
          </p>

          <p>
            Nosso atendimento é personalizado e acessível, pautado na escuta ativa, na transparência e na construção de
            relações de confiança. Cada caso é analisado de forma cuidadosa, considerando o contexto, as necessidades e
            as particularidades de quem confia sua demanda ao escritório.
          </p>
        </div>
      </div>
    </section>
  );
}
