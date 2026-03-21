// pages/links.tsx — layout estilo DigiCard (referência: cartão digital estreito, portrait)
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { FiGlobe, FiMessageCircle, FiStar, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const BRAND = {
  name: "Pereira de Sousa Advogados",
  legalName: "Pereira de Sousa Advogados",
  domain: "https://pereiradesousa.adv.br",
  pageUrl: "https://pereiradesousa.adv.br/links",
  phoneDisplay: "(91) 98628-4970",
  phoneE164: "+5591986284970",
  whatsappNumber: "5591986284970",
  /** E-mail institucional — ajuste se necessário */
  email: "contato@pereiradesousa.adv.br",
  addressLine:
    "Av. Roberto Camelier, 1642, sala 03, CEP 66033-683 — Condor, Belém/PA",
  instagram: "https://www.instagram.com/pereiradesousaescritorio",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Av.+Roberto+Camelier%2C+1642%2C+Bel%C3%A9m+-+PA%2C+66033-683",
  logo: "https://res.cloudinary.com/dfh7fwtec/image/upload/v1768800952/dresses/yaiptstgtqs7a0brs9mh.jpg",
  ogImage:
    "https://res.cloudinary.com/dfh7fwtec/image/upload/v1768800952/dresses/yaiptstgtqs7a0brs9mh.jpg",
};

function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
}

export default function LinksPage() {
  const title = "Pereira de Sousa Advogados | Links oficiais";
  const description =
    "Fale com o escritório Pereira de Sousa Advogados. Atendimento via WhatsApp, acesso ao site e redes sociais. Atuação em diversas áreas do Direito, com orientação técnica e humanizada.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: BRAND.legalName,
    url: BRAND.domain,
    image: BRAND.ogImage,
    telephone: BRAND.phoneE164,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Roberto Camelier, 1642, sala 03",
      addressLocality: "Belém",
      addressRegion: "PA",
      postalCode: "66033-683",
      addressCountry: "BR",
    },
    sameAs: BRAND.instagram ? [BRAND.instagram] : [],
  };

  const primaryCta = buildWhatsAppLink(
    "Olá! Gostaria de falar com um advogado do escritório Pereira de Sousa. Pode me orientar, por favor?"
  );

  const areasCta = buildWhatsAppLink(
    "Olá! Quero saber qual área de atuação é a ideal para o meu caso e quais documentos preciso separar."
  );

  const atendimentoCta = buildWhatsAppLink(
    "Olá! Quero agendar um atendimento (presencial/online). Quais horários disponíveis?"
  );

  const linkButtons = [
    {
      label: "WhatsApp — atendimento",
      href: primaryCta,
      icon: <FaWhatsapp className="text-xl" />,
      highlight: true,
    },
    {
      label: "Agendar atendimento",
      href: atendimentoCta,
      icon: <FiMessageCircle className="text-lg" />,
      highlight: false,
    },
    {
      label: "Qual área atende meu caso?",
      href: areasCta,
      icon: <FiMessageCircle className="text-lg" />,
      highlight: false,
    },
    {
      label: "Site oficial",
      href: BRAND.domain,
      icon: <FiGlobe className="text-lg" />,
      highlight: false,
    },
    {
      label: "Instagram",
      href: BRAND.instagram,
      icon: <FaInstagram className="text-lg" />,
      highlight: false,
    },
    {
      label: "Como chegar (Maps)",
      href: BRAND.googleMaps,
      icon: <FiMapPin className="text-lg" />,
      highlight: false,
    },
    {
      label: "Avaliações no Google",
      href: `https://www.google.com/search?q=${encodeURIComponent(
        "Pereira de Sousa Advogados Belém avaliações"
      )}`,
      icon: <FiStar className="text-lg" />,
      highlight: false,
    },
  ];

  /** Ícones circulares no topo (mesmo padrão de DigiCard em PDF) */
  const quickIcons = [
    {
      href: primaryCta,
      label: "WhatsApp",
      icon: <FaWhatsapp className="text-xl text-white" />,
      bg: "bg-[#25D366]",
    },
    {
      href: `tel:${BRAND.phoneE164.replace(/\s/g, "")}`,
      label: "Ligar",
      icon: <FiPhone className="text-xl text-white" />,
      bg: "bg-zinc-700",
    },
    {
      href: BRAND.instagram,
      label: "Instagram",
      icon: <FaInstagram className="text-xl text-white" />,
      bg: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
    },
    {
      href: `mailto:${BRAND.email}`,
      label: "E-mail",
      icon: <FiMail className="text-xl text-white" />,
      bg: "bg-zinc-600",
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={`${BRAND.domain}/links`} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${BRAND.domain}/links`} />
        <meta property="og:image" content={BRAND.ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={BRAND.ogImage} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      {/* Fundo escuro + cartão estreito (~proporção do PDF 259×475 pt) */}
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <Analytics />

        <main className="w-full max-w-[300px] flex flex-col items-center">
          {/* Faixa superior + foto circular (estilo DigiCard) */}
          <div className="relative w-full rounded-t-[2rem] overflow-hidden bg-gradient-to-b from-amber-950/50 via-zinc-900 to-zinc-950 pt-10 pb-14 px-6 shadow-xl border border-white/10 border-b-0">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 0%, rgba(254,198,85,0.25), transparent 55%)",
              }}
            />

            <div className="relative flex flex-col items-center">
              <div className="relative h-[112px] w-[112px] rounded-full border-4 border-[#fec655]/60 shadow-lg overflow-hidden bg-black">
                <Image
                  src={BRAND.logo}
                  alt={`Logo ${BRAND.name}`}
                  fill
                  className="object-contain p-1.5"
                  sizes="112px"
                  priority
                />
              </div>

              <h1
                className="mt-5 text-center text-[1.35rem] leading-tight font-bold tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {BRAND.name}
              </h1>
              <p className="mt-2 text-center text-[13px] text-zinc-300/90 leading-snug px-1">
                Atendimento jurídico com orientação técnica e humanizada
              </p>
            </div>
          </div>

          {/* Ícones circulares sobrepostos à faixa (como no PDF) */}
          <div className="relative z-10 -mt-7 flex flex-wrap justify-center gap-3 px-2 mb-6">
            {quickIcons.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bg} shadow-lg ring-2 ring-black/40 hover:scale-105 active:scale-95 transition-transform`}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Lista de botões largos */}
          <div className="w-full space-y-2.5 pb-6">
            {linkButtons.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={[
                  "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-semibold shadow-md transition hover:brightness-110 border",
                  item.highlight
                    ? "bg-[#fec655] text-black border-[#fec655]"
                    : "bg-white/5 text-white border-white/15 hover:bg-white/10",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    item.highlight ? "bg-black/10 text-black" : "bg-white/10",
                  ].join(" ")}
                >
                  {item.icon}
                </span>
                <span className="flex-1 leading-tight">{item.label}</span>
                <span className="text-white/40 text-lg">›</span>
              </a>
            ))}
          </div>

          {/* Endereço compacto */}
          <p className="text-center text-[11px] text-zinc-500 leading-relaxed px-2 max-w-[280px]">
            {BRAND.addressLine}
          </p>

          <footer className="mt-6 text-center text-[10px] text-zinc-600 max-w-[260px]">
            © {new Date().getFullYear()} {BRAND.legalName}. Todos os direitos reservados.
          </footer>

          <p className="mt-3 text-[10px] text-zinc-600 text-center max-w-[280px]">
            <strong className="text-zinc-500">Atenção:</strong> esta página é informativa e não substitui uma consulta
            individualizada.
          </p>
        </main>
      </div>
    </>
  );
}
