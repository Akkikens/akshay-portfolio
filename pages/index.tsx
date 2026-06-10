// pages/index.tsx
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import AppContext from "../components/AppContextFolder/AppContext";
import ScreenSizeDetector from "../components/CustomComponents/ScreenSizeDetector";
import Maintenance from "../components/Home/Maintenance/Maintenance";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { useLenis } from "../hooks/useLenis";

// Code-split content. next/dynamic (not React.lazy) — in the pages router,
// React.lazy + Suspense renders fallback/content inconsistently between server
// and client, which throws hydration "text content does not match" errors.
const Header = dynamic(() => import("../components/Header/Header"));
const MyName = dynamic(() => import("../components/Home/MyName/MyName"));
const SocialMediaArround = dynamic(
  () => import("../components/Home/SocialMediaArround/SocialMediaArround")
);
const AboutMe = dynamic(() => import("../components/Home/AboutMe/AboutMe"));
const WhereIHaveWorked = dynamic(
  () => import("../components/Home/WhereIHaveWorked/WhereIHaveWorked")
);
const SomethingIveContributed = dynamic(
  () => import("../components/Home/SomethingIveContributed/SomethingIveContributed")
);
const SomethingIveBuilt = dynamic(
  () => import("../components/Home/SomethingIveBuilt/SomethingIveBuilt")
);
const Certifications = dynamic(
  () => import("../components/Home/Certifications/Certifications")
);
const GetInTouch = dynamic(
  () => import("../components/Home/GetInTouch/GetInTouch")
);
const Testimonials = dynamic(
  () => import("../components/Home/Testimonials/Testimonials")
);

const Footer = dynamic(() => import("../components/Footer/Footer"));
const ChaosOverlay = dynamic(
  () => import("../components/Shared/ChaosOverlay/ChaosOverlay"),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import("../components/Shared/ScrollProgress/ScrollProgress"),
  { ssr: false }
);
const WebVitalsMonitor = dynamic(
  () => import("../components/Shared/WebVitals/WebVitalsMonitor"),
  { ssr: false }
);

export default function Home() {
  const context = useContext(AppContext);
  
  // Inertia smooth scrolling (Lenis) + lenis-aware anchor clicks.
  // useLenis no-ops entirely under prefers-reduced-motion.
  useLenis();
  useSmoothScroll();

  // --- Blacklist logic ---
  const [userData, setUserData] = useState<any>(null);
  const [isBlackListed, setIsBlackListed] = useState(false);

  const IsBlackListEmpty = !process.env.NEXT_PUBLIC_BLACKLIST_COUNTRIES;
  const blacklistedCountries = process.env.NEXT_PUBLIC_BLACKLIST_COUNTRIES
    ? process.env.NEXT_PUBLIC_BLACKLIST_COUNTRIES.split(",")
    : [];

  useEffect(() => {
    const fetchData = async () => {
      if (!IsBlackListEmpty) {
        try {
          const ipResponse = await fetch("https://api.ipify.org/?format=json");
          const ipData = await ipResponse.json();
          const userResponse = await fetch(`/api/userInfoByIP/${ipData.ip}`);
          const data = await userResponse.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching location and IP data:", error);
        }
      }
    };
    fetchData();
  }, [IsBlackListEmpty]);

  useEffect(() => {
    if (userData && blacklistedCountries.includes(userData.country)) {
      setIsBlackListed(true);
    }
  }, [userData, blacklistedCountries]);

  useEffect(() => {
    // Set finished loading immediately - no intro animations
    context.setSharedState((prev) => ({ ...prev, finishedLoading: true }));

    // Safeguard against stuck overflow state (viewport is the scroller now)
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Clean up old listeners from your sharedState hooks ---
  useEffect(() => {
    const { sharedState } = context;
    const timer = sharedState?.userdata?.timerCookieRef?.current;
    const winTracker = sharedState?.userdata?.windowSizeTracker?.current;
    const mouseTracker = sharedState?.userdata?.mousePositionTracker?.current;
    const blurEvt = sharedState?.typing?.eventInputLostFocus;
    const keyEvt = sharedState?.typing?.keyboardEvent;

    if (timer) clearInterval(timer as any);
    if (typeof window !== "undefined") {
      if (winTracker) window.removeEventListener("resize", winTracker);
      if (mouseTracker) window.removeEventListener("mousemove", mouseTracker, false);
      if (blurEvt) window.removeEventListener("resize", blurEvt);
      if (keyEvt) document.removeEventListener("keydown", keyEvt);
    }
  }, [context]);


  // --- Meta ---
  const meta = {
    title: "Akshay Kalapgar — Forward-Deployed AI & Full-Stack Platform Engineer",
    description:
      "Full-stack & platform engineer with 4+ years building scalable, real-time, production AI systems across healthcare, e-commerce, and edtech. I build AI agent harnesses, MCP servers, and the platform, observability, and infra that ships them — Next.js, TypeScript, Python, Node.js, Kubernetes, Terraform, AWS/GCP.",
    image: "/Portfolio-portrait-4.jpg",
    type: "website",
  };
  const isProd = process.env.NODE_ENV === "production";

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta name="keywords" content="AI Platform Engineer, Forward-Deployed Engineer, Full Stack Engineer, Backend Engineer, AI Agents, MCP Servers, Claude Code, LLM Tooling, Multi-Agent Systems, Distributed Systems, Observability, Datadog, OpenTelemetry, Kubernetes, Helm, Terraform, AWS, GCP, Next.js, TypeScript, Python, Node.js, PostgreSQL, CI/CD" />
        <meta name="author" content="Akshay Kalapgar" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://akshaykalapgar.com" />
        <link rel="canonical" href="https://akshaykalapgar.com" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Akshay Kalapgar Portfolio" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@akshaykalapgar" />
        <meta name="twitter:creator" content="@akshaykalapgar" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="theme-color" content="#0a0e1a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      {!isBlackListed ? (
        <div className="relative min-h-screen w-full bg-AAprimary">
          <ScrollProgress />
          <Header finishedLoading={true} sectionsRef={null} />
          <MyName finishedLoading={true} />
          <SocialMediaArround finishedLoading={true} />
          <AboutMe />
          <WhereIHaveWorked />
          <Certifications />
          <SomethingIveContributed />
          <SomethingIveBuilt />
          <Testimonials />
          <GetInTouch />
          <Footer
            githubUrl={"https://github.com/Akkikens/akshay-portfolio"}
            hideSocialsInDesktop={true}
          />
          <ChaosOverlay />
          <WebVitalsMonitor />
          {!isProd && <ScreenSizeDetector />}
        </div>
      ) : (
        <Maintenance />
      )}
    </>
  );
}
