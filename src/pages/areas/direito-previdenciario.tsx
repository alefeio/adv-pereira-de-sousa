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
import WhatsAppButton2 from 'components/WhatsAppButton2';
import Footer2 from 'components/Footer2';

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

  const title = 'Advogado Previdenciário em Belém | Dr. Alan Sousa — Pereira de Sousa Advogados';
  const description =
    'Dr. Alan Sousa atua em Direito Previdenciário (RGPS/INSS e RPPS), com demandas no BELÉMPREV e IGEPPS, planejamento previdenciário, aposentadorias, auxílio-doença, BPC/LOAS, pensão por morte, salário-maternidade, revisões, recursos e ações judiciais em Belém/PA.';

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
      q: 'Vocês atuam no RGPS (INSS) e no RPPS?',
      a: 'Sim. Atuamos tanto em demandas do Regime Geral (RGPS/INSS) quanto em demandas ligadas a Regimes Próprios (RPPS), conforme a legislação aplicável e a realidade funcional de cada segurado.',
    },
    {
      q: 'Vocês atuam em demandas do BELÉMPREV e do IGEPPS?',
      a: 'Sim. Acompanhamos e orientamos demandas previdenciárias em RPPS, incluindo casos relacionados ao BELÉMPREV e ao IGEPPS, com análise técnica individualizada e acompanhamento especializado.',
    },
    {
      q: 'Quando devo fazer planejamento previdenciário?',
      a: 'Quando você quer identificar a melhor regra, estimar valores, organizar documentos e definir o momento ideal para requerer o benefício, evitando indeferimentos e perdas financeiras.',
    },
    {
      q: 'O que fazer se meu benefício foi negado?',
      a: 'A estratégia depende do motivo do indeferimento. É possível revisar documentos e provas, cumprir exigências, apresentar recurso administrativo e, em situações apropriadas, ingressar com ação judicial.',
    },
    {
      q: 'Quais benefícios vocês atendem?',
      a: 'Atuamos com aposentadorias, planejamento previdenciário, auxílio por incapacidade temporária (auxílio-doença), BPC/LOAS (idoso e pessoa com deficiência), salário-maternidade, pensão por morte, revisões e demais demandas previdenciárias, conforme o caso.',
    },
    {
      q: 'Quais documentos normalmente são necessários?',
      a: 'Em geral: documentos pessoais, comprovantes de contribuições e vínculos (CNIS/CTPS), documentos funcionais (em RPPS), PPP/LTCAT (tempo especial), laudos e exames (incapacidade) e demais registros específicos do benefício.',
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
    name: 'Direito Previdenciário — Dr. Alan Sousa | Pereira de Sousa Advogados',
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

        {/* ✅ LOGOMARCA / MENU */}
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
                <strong>Atuação em Direito Previdenciário</strong> com foco na defesa dos seus direitos junto ao{' '}
                <strong>INSS</strong> (RGPS), com atendimento especializado e acompanhamento completo em todas as etapas
                do seu benefício — do requerimento administrativo à atuação judicial, quando necessário.
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
                <h2>Atuação em Direito Previdenciário junto ao INSS</h2>
                <p>
                  Atuação dedicada em <strong>Direito Previdenciário</strong> junto ao <strong>INSS</strong>, com
                  atendimento humanizado e especializado para solicitar, revisar, restabelecer e acompanhar benefícios
                  previdenciários em todas as etapas.
                </p>
                <p>
                  Se você precisa <strong>solicitar</strong>, <strong>revisar</strong> ou <strong>restabelecer</strong> um
                  benefício, conte com orientação jurídica segura e objetiva, com estratégia e documentação adequada para
                  reduzir riscos de indeferimento e acelerar o melhor caminho para o seu caso.
                </p>

                <div className="not-prose my-8 rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-7">
                  <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                    Precisa de ajuda com benefício do INSS?
                  </h3>
                  <p className="text-gray-700 mb-5">
                    Fale agora pelo WhatsApp e receba orientação inicial sobre documentos, requisitos e estratégia.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl transition text-center flex-1"
                    >
                      Falar no WhatsApp
                    </a>
                    <a
                      href="#como-funciona"
                      className="bg-black/5 text-gray-900 font-semibold px-8 py-4 rounded-2xl hover:bg-black/10 transition text-center flex-1"
                    >
                      Ver como funciona
                    </a>
                  </div>
                </div>

                <h2 id="especialista">Dr. Alan Sousa – Advogado Previdenciário</h2>
                <p>
                  Advogado com atuação dedicada ao <strong>Direito Previdenciário</strong>, na defesa dos direitos de
                  segurados do <strong>Regime Geral de Previdência Social (RGPS)</strong> e do{' '}
                  <strong>Regime Próprio de Previdência Social (RPPS)</strong>, incluindo demandas relacionadas ao{' '}
                  <strong>IGEPPS</strong> e ao <strong>BELÉMPREV</strong>, com análise técnica individualizada e
                  acompanhamento especializado em cada caso.
                </p>
                <p>
                  Atualmente é <strong>pós-graduando em Direito Previdenciário</strong> pela{' '}
                  <strong>Faculdade Brasília</strong> e pelo <strong>ePREV</strong>, realizando duas especializações na
                  área, com aprofundamento teórico e prático voltado à legislação previdenciária, à análise estratégica
                  de casos e à aplicação atualizada da jurisprudência.
                </p>
                <p>
                  Possui atuação tanto na <strong>esfera administrativa</strong> quanto <strong>judicial</strong>, com
                  dedicação aos serviços de aposentadorias, planejamento previdenciário, auxílio por incapacidade
                  temporária (auxílio-doença), <strong>Benefício de Prestação Continuada – BPC/LOAS</strong> para pessoa
                  com deficiência e idoso, salário-maternidade, pensão por morte, revisões de benefícios, entre outras
                  demandas previdenciárias.
                </p>
                <p>
                  Seu trabalho é pautado na <strong>ética</strong>, na <strong>transparência</strong> e na{' '}
                  <strong>orientação clara</strong> ao cliente, buscando medidas jurídicas fundamentadas e adequadas à
                  realidade de cada situação.
                </p>

                <h2>Atuação no RPPS (Regime Próprio)</h2>
                <p>
                  O <strong>RPPS</strong> é o regime previdenciário aplicável a <strong>servidores públicos efetivos</strong>,
                  instituído por cada ente federativo. Atuamos com orientação e acompanhamento em demandas previdenciárias
                  relacionadas ao RPPS, incluindo casos envolvendo o <strong>BELÉMPREV</strong> e o <strong>IGEPPS</strong>,
                  além de outros regimes próprios conforme a legislação aplicável.
                </p>
                <ul>
                  <li>Requerimentos e acompanhamento administrativo;</li>
                  <li>Análises técnicas e revisões de benefício/aposentadoria;</li>
                  <li>Atuação judicial quando necessário, conforme a estratégia do caso.</li>
                </ul>

                <h2>Atuação no RGPS (INSS)</h2>
                <p>
                  O <strong>RGPS</strong> é administrado pelo <strong>INSS</strong> e se aplica, em regra, aos trabalhadores da
                  iniciativa privada, contribuintes individuais, facultativos e demais segurados previstos em lei. Nessa área,
                  atuamos de forma administrativa e judicial para garantir o acesso e a manutenção de benefícios.
                </p>

                <h2>Principais serviços em Direito Previdenciário</h2>

                <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="md:col-span-2">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Aposentadorias:</strong> por idade, por tempo de contribuição e regras de transição, com análise
                          de requisitos, documentos e melhor estratégia.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Planejamento previdenciário:</strong> simulações, análise do histórico contributivo/funcional e
                          organização estratégica para requerer no momento certo.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Auxílio-acidente:</strong> orientação sobre requisitos, documentação e medidas cabíveis para
                          concessão ou restabelecimento.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Auxílio por incapacidade temporária (auxílio-doença):</strong> orientação documental e atuação em
                          requerimentos, recursos e medidas judiciais quando necessário.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>BPC/LOAS:</strong> Benefício de Prestação Continuada para <strong>pessoa com deficiência</strong> e{' '}
                          <strong>idoso</strong>, com análise de requisitos, provas e acompanhamento do procedimento.
                          <div className="mt-2 text-sm text-gray-600">
                            <div>
                              <strong>Para idosos:</strong> 65 anos ou mais.
                            </div>
                            <div>
                              <strong>Para pessoas com deficiência:</strong> avaliação de impedimentos e provas necessárias.
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Salário-maternidade:</strong> suporte completo na análise de requisitos e condução do pedido.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Seguro-defeso:</strong> análise de requisitos e acompanhamento do pedido, conforme o caso.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Pensão por morte:</strong> análise documental, orientação e acompanhamento em todas as etapas.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Revisões de benefícios:</strong> avaliação de cálculos, regras aplicáveis e medidas cabíveis.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-green-600 font-bold text-xl">→</span>
                        <div>
                          <strong>Recursos e ações judiciais:</strong> atuação estratégica na esfera administrativa e judicial.
                        </div>
                      </li>
                    </ul>

                    <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm">
                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                        Atuação do requerimento à ação judicial
                      </h3>
                      <p className="text-gray-700 mb-5">
                        Atuamos desde o <strong>requerimento administrativo no INSS</strong> até a <strong>atuação judicial</strong>,
                        buscando sempre o melhor resultado e garantindo que você receba corretamente o benefício a que tem direito,
                        com segurança e respaldo legal.
                      </p>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 transition"
                      >
                        Falar com especialista no WhatsApp
                      </a>
                    </div>
                  </div>

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
                          Atuação previdenciária com análise técnica individualizada, transparência e acompanhamento especializado.
                        </figcaption>
                      </div>
                    </figure>
                  </div>
                </div>

                <h2 id="como-funciona">Como funciona o atendimento</h2>
                <p>
                  O atendimento é conduzido com foco em clareza, estratégia e documentação adequada. Em linhas gerais, seguimos:
                </p>
                <ol>
                  <li>
                    <strong>Entendimento do objetivo:</strong> identificar o benefício ou a demanda e o melhor caminho (RGPS/RPPS).
                  </li>
                  <li>
                    <strong>Análise técnica individualizada:</strong> histórico contributivo/funcional, provas e riscos.
                  </li>
                  <li>
                    <strong>Estratégia e documentação:</strong> orientação clara do que reunir e como fortalecer o caso.
                  </li>
                  <li>
                    <strong>Atuação administrativa e/ou judicial:</strong> requerimentos, recursos e ações, conforme necessário.
                  </li>
                </ol>

                <h2>Perguntas frequentes</h2>
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

        <Footer2 menuData={menu} />
        <WhatsAppButton2 />
      </div>
    </>
  );
}
