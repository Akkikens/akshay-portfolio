import React, { useEffect } from "react";
import "../styles/globals.css";
import Script from "next/script";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { SoundProvider } from "../components/Shared/SoundSystem/SoundSystem";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // GA pageviews on client-side route changes (script itself is injected via
  // next/script below — nothing loads when GA_TRACKING_ID is unset).
  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      window.gtag?.("config", GA_TRACKING_ID, { page_path: url });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SoundProvider>
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Component {...pageProps} />
        <Analytics />
    </SoundProvider>
  );
}

export default MyApp;
