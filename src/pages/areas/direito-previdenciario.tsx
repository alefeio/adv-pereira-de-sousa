// pages/areas/direito-previdenciario.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Menu as MenuComponent } from 'components/Menu';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';
import { FaCheckCircle, FaRegClock, FaFileAlt, FaBalanceScale } from 'react-icons/fa';

const prisma =
  (globalThis as any).prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prisma;
}

interface AreaPageProps {
  menu: MenuData | null;
}

export const getServerSideProps: GetServerSideProps<AreaPageProps> = async () => {
  try {
    const menus = await prisma.menu.findMany();
    const rawMenu = menus[0] ?? null;

    let formattedMenu: MenuData | null = null;

    if (rawMenu && Array.isArray(rawMenu.links)) {
      const links: LinkItem[] = rawMenu.links.map((link: any) => ({
        id: link.id,
        text: link.text,
        url: link.url,
      }));

      formattedMenu = {
        logoUrl: rawMenu.logoUrl || '/images/logo.png',
        links,
      };
    }

    return { props: { menu: formattedMenu } };
  } catch (error) {
    console.error('[AREA PREVIDENCIARIO ERROR]', error);
    return { props: { menu: null } };
  } finally {
    await prisma.$disconnect();
  }
};

export default function DireitoPrevidenciarioPage({ menu }: AreaPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const canonicalUrl = `${baseUrl}/areas/direito-previdenciario`;

  const title = 'Direito Previdenciário em Belém | Pereira de Sousa Advogados';
  const description =
    'Atuação completa em Direito Previdenciário: planejamento previdenciário, aposentadorias, benefícios por incapacidade, BPC/LOAS, pensão por morte, revisões e recursos no INSS e na Justiça.';

  /**
   * ✅ NOVA REGRA:
   * - HERO (comum a todas as áreas): imagem de atendimento (mesma para todos)
   * - Imagem específica da área: entra no meio do texto
   */
  const heroImage = '/images/alan-direito.jpg'; // comum a todas as páginas de áreas
  const areaImage = '/images/areas/direito-previdenciario.jpg'; // varia por serviço

  const whatsappLink =
    'https://wa.me/5591983957965?text=Olá!%20Quero%20falar%20sobre%20um%20caso%20de%20Direito%20Previdenciário.';

  const faq = [
    {
      q: 'Quando devo fazer planejamento previdenciário?',
      a: 'Quando você quer entender qual regra se aplica ao seu caso, estimar valores, organizar documentos e escolher o melhor momento para requerer o benefício, evitando indeferimentos e perdas financeiras.',
    },
    {
      q: 'O que fazer se meu benefício foi negado pelo INSS?',
      a: 'É possível analisar o motivo do indeferimento, revisar documentos e exames, cumprir exigências e apresentar recurso administrativo. Em alguns casos, também é cabível ação judicial, conforme a estratégia do caso.',
    },
    {
      q: 'Quais aposentadorias vocês atendem?',
      a: 'Atuamos com concessão, revisão e restabelecimento de aposentadorias (por idade, por tempo de contribuição/regras de transição, especial, incapacidade permanente, entre outras possibilidades conforme o histórico contributivo).',
    },
    {
      q: 'Vocês atuam com BPC/LOAS?',
      a: 'Sim. O BPC/LOAS exige análise criteriosa de requisitos e documentação. Também atuamos em revisão, recursos e acompanhamento do processo.',
    },
    {
      q: 'Quais documentos normalmente são necessários?',
      a: 'Em geral: documentos pessoais, comprovantes de contribuição (CNIS), carteira de trabalho/contratos, PPP/LTCAT (se houver atividade especial), laudos/exames (em benefícios por incapacidade) e demais registros do vínculo e da atividade.',
    },
    // ✅ COMPLEMENTO (coerente com seu texto: RPPS/RGPS)
    {
      q: 'Vocês atuam no RPPS e no RGPS?',
      a: 'Sim. Atuamos tanto em demandas do Regime Geral (RGPS/INSS) quanto em demandas ligadas a Regimes Próprios (RPPS), conforme a legislação aplicável em cada ente federativo e a realidade funcional de cada segurado.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Direito Previdenciário — Pereira de Sousa Advogados',
    areaServed: 'Belém/PA e região',
    url: canonicalUrl,
    description,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Social */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${baseUrl}${heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Analytics />
        <MenuComponent menuData={menu} />

        {/* HERO (comum a todas as áreas) */}
        <section className="relative w-full h-[100vh] md:h-[600px] lg:h-[680px] overflow-hidden">
          <Image
            src={heroImage}
            alt="Atendimento jurídico em escritório"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/80" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 w-full text-left">
              <p className="text-sm md:text-base text-gray-200 mb-3">Área de atuação</p>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                Direito Previdenciário
              </h1>
              <p className="max-w-3xl text-gray-200 text-base md:text-lg">
                Acompanhamento técnico e humanizado em demandas previdenciárias, com análise do histórico contributivo,
                orientação completa e estratégia para requerimentos no INSS, recursos e ações judiciais quando necessário.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fec655] text-black font-semibold px-5 py-3 rounded-2xl hover:opacity-90 transition"
                >
                  Falar com um advogado no WhatsApp
                </a>
                <a
                  href="#como-funciona"
                  className="bg-white/10 text-white font-semibold px-5 py-3 rounded-2xl hover:bg-white/15 transition"
                >
                  Entenda como funciona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
              <article className="prose prose-base md:prose-lg max-w-none text-gray-800 leading-relaxed">
                <h2>O que é Direito Previdenciário</h2>
                <p>
                  O Direito Previdenciário trata das regras e procedimentos ligados aos benefícios e serviços do sistema
                  previdenciário, especialmente aqueles administrados pelo INSS. Na prática, envolve a análise do seu
                  histórico contributivo, a organização de documentos e a definição de estratégia para requerimentos,
                  revisões, recursos e, quando necessário, ações judiciais.
                </p>

                <h2>Como o escritório pode ajudar</h2>
                <p>
                  Atuamos com orientação completa — do planejamento até o acompanhamento do processo — priorizando uma
                  análise individualizada do caso, com linguagem clara e decisões estratégicas bem fundamentadas.
                </p>

                {/* ✅ BLOCO NOVO (do texto que você enviou): autoridade + RPPS/RGPS */}
                <h2>Atuação em Direito Previdenciário</h2>
                <p>
                  O <strong>Dr. Alan Sousa</strong> atua de forma <strong>técnica, responsável e estratégica</strong> no
                  Direito Previdenciário, com acompanhamento e representação junto aos{' '}
                  <strong>Regimes Próprios de Previdência Social (RPPS)</strong> e ao{' '}
                  <strong>Regime Geral de Previdência Social (RGPS)</strong>, nas esferas{' '}
                  <strong>Municipal, Estadual e Federal</strong>.
                </p>

                <h3>Regime Próprio de Previdência Social (RPPS)</h3>
                <p>
                  O <strong>Regime Próprio de Previdência Social (RPPS)</strong> é o regime previdenciário aplicável aos{' '}
                  <strong>servidores públicos efetivos</strong>, instituído por cada ente federativo. Nesse contexto, o
                  escritório atua em demandas previdenciárias relacionadas:
                </p>
                <ul>
                  <li>
                    À Previdência Social do Município de Belém (<strong>BELÉMPREV</strong>);
                  </li>
                  <li>
                    À Previdência Social do Estado do Pará, inclusive junto ao{' '}
                    <strong>IGPREV</strong> (Gestão Previdenciária do Estado do Pará);
                  </li>
                  <li>
                    Aos demais <strong>Regimes Próprios</strong> municipais e estaduais do Estado do Pará e de todo o
                    Brasil, conforme a legislação aplicável em cada ente federativo.
                  </li>
                </ul>
                <p>
                  A atuação envolve requerimentos administrativos, análises técnicas, revisões e acompanhamento de
                  processos previdenciários relacionados a benefícios e aposentadorias no âmbito do RPPS.
                </p>

                <h3>Regime Geral de Previdência Social (RGPS)</h3>
                <p>
                  O <strong>Regime Geral de Previdência Social (RGPS)</strong> é o regime administrado pelo{' '}
                  <strong>Instituto Nacional do Seguro Social (INSS)</strong>, destinado aos trabalhadores da iniciativa
                  privada, contribuintes individuais, facultativos e demais segurados previstos em lei.
                </p>
                <p>No âmbito do RGPS, o escritório presta assessoria e acompanhamento jurídico em matérias relacionadas a:</p>
                <ul>
                  <li>Concessão e revisão de benefícios;</li>
                  <li>
                    Aposentadorias, inclusive a <strong>aposentadoria especial</strong>, conforme a atividade exercida;
                  </li>
                  <li>Atuação administrativa e judicial em demandas previdenciárias federais.</li>
                </ul>

                <p>
                  Nossa atuação é pautada por uma condução <strong>técnica, ética e individualizada</strong>, observando
                  as normas específicas de cada regime previdenciário e a realidade funcional de cada segurado.
                </p>

                {/* ✅ IMAGEM ESPECÍFICA DA ÁREA (no meio do texto) */}
                <figure className="not-prose my-10">
                  <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={areaImage}
                        alt="Direito Previdenciário: imagem ilustrativa do serviço"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 900px"
                        onError={(e: any) => {
                          if (e?.currentTarget) e.currentTarget.src = '/images/blog-default-cover.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                    </div>

                    <figcaption className="px-5 py-4 text-sm text-gray-600 bg-white">
                      Orientação completa em Direito Previdenciário — do planejamento à concessão, revisão e acompanhamento
                      de benefícios.
                    </figcaption>
                  </div>
                </figure>

                <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaBalanceScale /> Estratégia e segurança
                    </div>
                    <p className="mt-2 text-gray-700">
                      Avaliamos regras aplicáveis, riscos e oportunidades para reduzir indeferimentos e retrabalho.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaFileAlt /> Organização documental
                    </div>
                    <p className="mt-2 text-gray-700">
                      Checklist e conferência de documentos para cumprir exigências do INSS e fortalecer o pedido.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaRegClock /> Acompanhamento do processo
                    </div>
                    <p className="mt-2 text-gray-700">
                      Monitoramento do andamento, orientações em exigências e suporte em cada etapa.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-5">
                    <div className="flex items-center gap-3 font-semibold text-gray-900">
                      <FaCheckCircle /> Atuação administrativa e judicial
                    </div>
                    <p className="mt-2 text-gray-700">
                      Requerimentos, recursos e, se necessário, medidas judiciais conforme a melhor estratégia do caso.
                    </p>
                  </div>
                </div>

                <h2>Principais serviços em Direito Previdenciário</h2>
                <ul>
                  <li>
                    <strong>Planejamento previdenciário:</strong> estudo do CNIS e dos vínculos, simulações, análise de
                    regras e orientações para o melhor momento e forma de requerer.
                  </li>
                  <li>
                    <strong>Aposentadorias:</strong> concessão, revisão e restabelecimento (por idade, regras de transição,
                    especial, incapacidade permanente e demais hipóteses conforme o caso).
                  </li>
                  <li>
                    <strong>Benefícios por incapacidade:</strong> auxílio por incapacidade temporária e aposentadoria por
                    incapacidade permanente, com apoio na organização de laudos e documentação.
                  </li>
                  <li>
                    <strong>Pensão por morte e benefícios correlatos:</strong> análise de requisitos, documentos e
                    acompanhamento do pedido.
                  </li>
                  <li>
                    <strong>BPC/LOAS:</strong> orientação completa, protocolo, recursos e acompanhamento.
                  </li>
                  <li>
                    <strong>Reconhecimento e averbação de tempo:</strong> vínculos, contribuições, atividade rural e tempo
                    especial (quando aplicável).
                  </li>
                  <li>
                    <strong>Recursos administrativos:</strong> revisão de indeferimento, cumprimento de exigências e
                    estratégia recursal.
                  </li>
                </ul>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <ol>
                  <li>
                    <strong>Triagem e entendimento do objetivo:</strong> qual benefício você busca e qual é sua realidade
                    atual.
                  </li>
                  <li>
                    <strong>Análise do histórico contributivo:</strong> conferência de vínculos e contribuições (ex.: CNIS),
                    identificação de inconsistências e oportunidades.
                  </li>
                  <li>
                    <strong>Checklist documental:</strong> orientações claras do que reunir para fortalecer o pedido.
                  </li>
                  <li>
                    <strong>Protocolo e acompanhamento:</strong> monitoramento de exigências e andamento.
                  </li>
                  <li>
                    <strong>Recurso ou judicialização (se necessário):</strong> medida escolhida conforme a melhor estratégia
                    do caso.
                  </li>
                </ol>

                <h2>Documentos comuns</h2>
                <p>
                  Para agilizar a análise, normalmente pedimos (quando aplicável): documentos pessoais, comprovantes de
                  residência, extratos/registro de contribuições (CNIS), carteira de trabalho, contratos, PPP/LTCAT (tempo
                  especial), laudos e exames médicos (incapacidade), certidões e documentos específicos do benefício.
                </p>

                <h2>Perguntas frequentes</h2>
                <div className="not-prose space-y-3">
                  {faq.map((item) => (
                    <details key={item.q} className="rounded-2xl border border-gray-200 p-5">
                      <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                      <p className="mt-2 text-gray-700">{item.a}</p>
                    </details>
                  ))}
                </div>

                <h2>Atendimento em Belém e região</h2>
                <p>
                  Atuamos em demandas previdenciárias com foco em orientação completa e estratégia. Se você precisa
                  requerer, revisar ou restabelecer benefício, conte com acompanhamento profissional do início ao fim.
                </p>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white font-semibold px-6 py-4 rounded-2xl hover:opacity-90 transition text-center"
                  >
                    Quero uma análise do meu caso
                  </a>
                  <a
                    href="/#fale"
                    className="bg-gray-100 text-gray-900 font-semibold px-6 py-4 rounded-2xl hover:bg-gray-200 transition text-center"
                  >
                    Ir para Fale Conosco
                  </a>
                </div>

                <p className="text-sm text-gray-600 mt-8">
                  <strong>Atenção:</strong> o conteúdo desta página tem caráter informativo e não substitui uma consulta
                  individualizada. Cada caso exige análise própria.
                </p>
              </article>
            </div>
          </section>
        </main>

        <Footer menuData={menu} />
        <WhatsAppButton />
      </div>
    </>
  );
}
