// pages/index.tsx
import React, { useContext, useEffect, useState, Suspense } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";

import AppContext from "../components/AppContextFolder/AppContext";
import ScreenSizeDetector from "../components/CustomComponents/ScreenSizeDetector";
import Maintenance from "../components/Home/Maintenance/Maintenance";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

// Lazy content
const Header = React.lazy(() => import("../components/Header/Header"));
const MyName = React.lazy(() => import("../components/Home/MyName/MyName"));
const SocialMediaArround = React.lazy(
  () => import("../components/Home/SocialMediaArround/SocialMediaArround")
);
const AboutMe = React.lazy(() => import("../components/Home/AboutMe/AboutMe"));
const WhereIHaveWorked = React.lazy(
  () => import("../components/Home/WhereIHaveWorked/WhereIHaveWorked")
);
const SomethingIveContributed = React.lazy(
  () => import("../components/Home/SomethingIveContributed/SomethingIveContributed")
);
const SomethingIveBuilt = React.lazy(
  () => import("../components/Home/SomethingIveBuilt/SomethingIveBuilt")
);
const Certifications = React.lazy(
  () => import("../components/Home/Certifications/Certifications")
);
const GetInTouch = React.lazy(
  () => import("../components/Home/GetInTouch/GetInTouch")
);
const Testimonials = React.lazy(
  () => import("../components/Home/Testimonials/Testimonials")
);

const Footer = React.lazy(() => import("../components/Footer/Footer"));

export default function Home() {
  const context = useContext(AppContext);
  
  // Apple-like smooth scrolling
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

  // --- AOS ---
  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
  }, []);

  // --- Meta ---
  const meta = {
    title: "Akshay Kalapgar - AI Full Stack Engineer",
    description:
      "AI/ML Full Stack Engineer with 4+ years building scalable SaaS platforms, AI chatbots with LangChain & Hugging Face, and cloud-native applications. Specialized in Next.js, TypeScript, Python, PyTorch, TensorFlow. Available for high-impact roles.",
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
        <meta name="keywords" content="AI Engineer, Full Stack Developer, LangChain, Hugging Face, OpenAI, PyTorch, TensorFlow, Next.js, TypeScript, Python, Machine Learning, SaaS, Cloud, AWS, Azure, React, Node.js, MLOps, Chatbot Development, Genomic Data, Healthcare AI" />
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
        <meta name="theme-color" content="#0a192f" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      {!isBlackListed ? (
        <div className="relative min-h-screen w-full bg-AAprimary snap-mandatory">
          <Suspense fallback={<div className="p-8 text-gray-400">Loading…</div>}>
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
            {!isProd && <ScreenSizeDetector />}
          </Suspense>
        </div>
      ) : (
        <Maintenance />
      )}
    </>
  );
}
