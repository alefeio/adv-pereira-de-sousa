// pages/areas/direito-previdenciario.tsx

import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { MenuAlan as MenuComponent } from 'components/MenuAlan';
import Footer from 'components/Footer';
import WhatsAppButton from 'components/WhatsAppButton';
import { MenuData, LinkItem } from '../../types/index';
import { Analytics } from '@vercel/analytics/next';

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
        logoUrl: rawMenu.logoUrl || '/images/logo-alan.jpg',
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
   * ✅ REGRA:
   * - HERO (comum a todas as áreas): imagem de atendimento (mesma para todos)
   * - Imagem específica da área: entra no meio do texto
   */
  const heroImage = '/images/alan-direito.jpg';
  const areaImage = '/images/areas/direito-previdenciario.jpg';

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

        {/* ✅ LOGOMARCA / MENU (como antes) */}
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

              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-4 rounded-2xl transition text-center text-lg"
                >
                  🎯 Agendar Análise Gratuita
                </a>
                <a
                  href="#especialista"
                  className="bg-white/10 text-white font-semibold px-7 py-4 rounded-2xl hover:bg-white/15 transition text-center"
                >
                  Ver especialista
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEÚDO */}
        <main className="relative z-10">
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 md:py-16">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12">
              {/* ✅ H2 mais destacados (mantido) */}
              <article
                className="
                  prose
                  prose-base
                  md:prose-lg
                  max-w-none
                  text-gray-800
                  leading-relaxed

                  prose-h2:text-3xl
                  md:prose-h2:text-4xl
                  prose-h2:font-extrabold
                  prose-h2:text-gray-900
                  prose-h2:tracking-tight
                  prose-h2:mt-10
                  prose-h2:mb-4
                "
              >
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

                <h2 id="especialista">Seu especialista em Direito Previdenciário</h2>
                <p>
                  O <strong>Dr. Alan Sousa</strong> é o profissional do escritório designado especificamente para atuação
                  em <strong>Direito Previdenciário</strong>. Com experiência técnica, responsável e estratégica, ele atua
                  com acompanhamento e representação junto aos <strong>Regimes Próprios de Previdência Social (RPPS)</strong>{' '}
                  e ao <strong>Regime Geral de Previdência Social (RGPS)</strong>, nas esferas{' '}
                  <strong>Municipal, Estadual e Federal</strong>.
                </p>

                <div className="not-prose my-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Dr. Alan Sousa</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Especialista em Direito Previdenciário, com dedicação exclusiva para atender demandas de
                        planejamento previdenciário, concessão e revisão de benefícios, aposentadorias e ações judiciais
                        junto ao INSS e aos Regimes Próprios. Atendimento técnico, humanizado e focado em estratégia para
                        seu caso.
                      </p>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition"
                      >
                        ➜ Falar direto com Dr. Alan no WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

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

                <h2>Principais serviços em Direito Previdenciário</h2>

                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="md:col-span-2">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Planejamento previdenciário:</strong> estudo do CNIS e dos vínculos, simulações, análise de
                          regras e orientações para o melhor momento e forma de requerer.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Aposentadorias:</strong> concessão, revisão e restabelecimento (por idade, regras de transição,
                          especial, incapacidade permanente e demais hipóteses conforme o caso).
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Benefícios por incapacidade:</strong> auxílio por incapacidade temporária e aposentadoria por
                          incapacidade permanente, com apoio na organização de laudos e documentação médica.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Pensão por morte:</strong> análise de requisitos, documentos necessários e acompanhamento do pedido.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>BPC/LOAS:</strong> orientação completa, protocolo, recursos e acompanhamento.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Reconhecimento e averbação de tempo:</strong> vínculos, contribuições, atividade rural e tempo especial.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Recursos administrativos:</strong> revisão de indeferimento, cumprimento de exigências e estratégia recursal.
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* ✅ areaImage sem cortar (mantido) */}
                  <div className="md:col-span-1">
                    <figure className="not-prose sticky top-20">
                      <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 shadow-lg bg-gray-50">
                        <div className="relative w-full aspect-[4/5]">
                          <Image
                            src={areaImage}
                            alt="Direito Previdenciário: orientação técnica em benefícios previdenciários"
                            fill
                            className="object-contain p-3"
                            sizes="(max-width: 768px) 100vw, 340px"
                            onError={(e: any) => {
                              if (e?.currentTarget) e.currentTarget.src = '/images/blog-default-cover.jpg';
                            }}
                          />
                        </div>

                        <figcaption className="px-5 py-4 text-sm text-gray-600 bg-white border-t border-gray-200">
                          Atendimento previdenciário com foco em estratégia, documentação e resultado.
                        </figcaption>
                      </div>
                    </figure>
                  </div>
                </div>

                <h2 id="como-funciona">Como funciona o atendimento em Direito Previdenciário</h2>
                <p>
                  O atendimento em Direito Previdenciário segue um processo estruturado e bem definido, garantindo que cada
                  etapa seja cumprida com precisão e estratégia.
                </p>

                <h2>Perguntas frequentes sobre Direito Previdenciário</h2>
                <div className="not-prose space-y-3">
                  {faq.map((item) => (
                    <details key={item.q} className="rounded-2xl border border-gray-200 p-5">
                      <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                      <p className="mt-2 text-gray-700">{item.a}</p>
                    </details>
                  ))}
                </div>

                <div className="not-prose mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl transition text-center flex-1"
                  >
                    Agendar Análise Gratuita
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
