import { useContext, useEffect, useState, useRef, Suspense } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import AppContext from "../components/AppContextFolder/AppContext";
import ScreenSizeDetector from "../components/CustomComponents/ScreenSizeDetector";

// Import non-lazy components
import Maintenance from "../components/Home/Maintenance/Maintenance";
import ThisCantBeReached from "../components/Home/ThisSiteCantBeReached/ThisCantBeReached";
import Startup from "../components/Header/StartupLogo/Startup";
import React from "react";

// Lazy-load components to improve initial loading speed
const Header = React.lazy(() => import("../components/Header/Header"));
const MyName = React.lazy(() => import("../components/Home/MyName/MyName"));
const SocialMediaArround = React.lazy(
  () => import("../components/Home/SocialMediaArround/SocialMediaArround")
);
const AboutMe = React.lazy(() => import("../components/Home/AboutMe/AboutMe"));
const WhereIHaveWorked = React.lazy(
  () => import("../components/Home/WhereIHaveWorked/WhereIHaveWorked")
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
const Footer = React.lazy(() => import("../components/Footer/Footer"));

export default function Home() {
  const [ShowElement, setShowElement] = useState(false);
  const [ShowThisCantBeReached, setShowThisCantBeReached] = useState(true);
  const [ShowMe, setShowMe] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isBlackListed, setIsBlackListed] = useState(false);

  const context = useContext(AppContext);
  const aboutRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

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
          const userData = await userResponse.json();
          setUserData(userData);
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
    clearInterval(context.sharedState.userdata.timerCookieRef.current);
    if (typeof window !== "undefined") {
      window.removeEventListener(
        "resize",
        context.sharedState.userdata.windowSizeTracker.current
      );
      window.removeEventListener(
        "mousemove",
        context.sharedState.userdata.mousePositionTracker.current,
        false
      );
      window.removeEventListener(
        "resize",
        context.sharedState.typing.eventInputLostFocus
      );
      document.removeEventListener(
        "keydown",
        context.sharedState.typing.keyboardEvent
      );
    }

    setTimeout(() => setShowElement(true), 4000); // Delayed to 4 seconds
    setTimeout(() => setShowThisCantBeReached(false), 4500); // Extended to 5 seconds
    setTimeout(() => {
      setShowElement(false);
      setShowMe(true);
      context.sharedState.finishedLoading = true;
      context.setSharedState(context.sharedState);
    }, 5000); // Delayed to 8 seconds for full load
  }, [context, context.sharedState]);

  useEffect(() => {
    Aos.init({ duration: 1500, once: true });
  }, []);

  console.log("Website is rendering...");
  const meta = {
    title: "Akshay Kalapgar - Full Stack Developer",
    description: `I am a Full Stack Developer with over 3 years of experience in developing software solutions and building applications using technologies like Next.js, TypeScript, AWS, and more. Let's connect to discuss how I can contribute to your projects.`,
    image: "/Portfolio-portrait-3.jpg",
    type: "website",
  };
  const isProd = process.env.NODE_ENV === "production";

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://anaflous.com`} />
        <link rel="canonical" href={`https://anaflous.com`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Akshay Kalapgar" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@akshaykalapgar" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>

      {!isBlackListed ? (
        <div className="relative snap-mandatory min-h-screen bg-AAprimary w-full ">
          {context.sharedState
            .finishedLoading ? null : ShowThisCantBeReached ? (
            <ThisCantBeReached />
          ) : null}
          {context.sharedState.finishedLoading ? null : ShowElement ? (
            <Startup />
          ) : null}

          <Suspense fallback={<div>Loading...</div>}>
            <Header
              finishedLoading={context.sharedState.finishedLoading}
              sectionsRef={homeRef}
            />
            <MyName finishedLoading={context.sharedState.finishedLoading} />
            <SocialMediaArround
              finishedLoading={context.sharedState.finishedLoading}
            />
            {context.sharedState.finishedLoading ? (
              <AboutMe ref={aboutRef} />
            ) : null}
            {context.sharedState.finishedLoading ? <WhereIHaveWorked /> : null}
            {context.sharedState.finishedLoading ? <Certifications /> : null}
            {context.sharedState.finishedLoading ? <SomethingIveBuilt /> : null}
            {context.sharedState.finishedLoading ? <GetInTouch /> : null}
            {context.sharedState.finishedLoading ? (
              <Footer
                githubUrl={"https://github.com/Akkikens/akshay-portfolio"}
                hideSocialsInDesktop={true}
              />
            ) : null}
            {!isProd && <ScreenSizeDetector />}
          </Suspense>
        </div>
      ) : (
        <Maintenance />
      )}
    </>
  );
}
