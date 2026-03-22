/**
 * Google Ads — tag global (gtag.js)
 * @see https://support.google.com/google-ads/answer/7548399
 *
 * Opcional: defina NEXT_PUBLIC_GOOGLE_ADS_ID no .env (ex.: AW-18032676359)
 */
import Script from "next/script";

const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "AW-18032676359";

export function GoogleAdsTag() {
  if (!GOOGLE_ADS_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  );
}
