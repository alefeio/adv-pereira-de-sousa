/**
 * Google Ads — tag global (gtag.js), carregada em _app.tsx.
 *
 * Não coloque este snippet só na página de campanha: o tráfego precisa da tag
 * já ativa ao abrir a URL (ex.: /areas/direito-previdenciario). Uma única
 * instalação global + um gtag('config') por conta/contêiner AW é o padrão.
 *
 * @see https://support.google.com/google-ads/answer/7548399
 *
 * Opcional no .env: NEXT_PUBLIC_GOOGLE_ADS_IDS=AW-111,AW-222 (separados por vírgula)
 */
import Script from "next/script";

const DEFAULT_GOOGLE_ADS_IDS = ["AW-18032676359", "AW-18048116303"];

function parseIds(): string[] {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_ADS_IDS?.trim();
  if (raw) {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return DEFAULT_GOOGLE_ADS_IDS;
}

export function GoogleAdsTag() {
  const ids = parseIds();
  if (ids.length === 0) {
    return null;
  }

  const primaryId = ids[0];
  const configLines = ids
    .map((id) => `          gtag('config', '${id}');`)
    .join("\n");

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
${configLines}
        `}
      </Script>
    </>
  );
}
