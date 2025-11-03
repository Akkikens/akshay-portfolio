import React from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";
import ClimbTogether from "./Descriptions/ClimbTogether";
import UMassChanMedicalSchool from "./Descriptions/UMassChanMedicalSchool";
import Capgemini from "./Descriptions/Capgemini";
import Tag8 from "./Descriptions/tag8";
import KPMG from "./Descriptions/KPMG";

export default function WhereIHaveWorked() {
  const GetDescription = () => {
    switch (DescriptionJob) {
      case "Climb Together":
        return <ClimbTogether />;
      case "UMass Chan Medical School":
        return <UMassChanMedicalSchool />;
      case "Capgemini":
        return <Capgemini />;
      case "tag8":
        return <Tag8 />;
      case "KPMG":
        return <KPMG />;
    }
  };

  const [DescriptionJob, setDescriptionJob] = React.useState("Climb Together");

  return (
    <div 
      id="WhereIhaveWorkedSection"
      data-aos="fade-up" 
      className="flex flex-col items-center justify-center py-24 space-y-12 bg-gradient-to-br from-AAprimary to-MobileNavBarColor border-t border-AAborder relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" />
      {/* Title */}
      <section className="relative flex flex-row items-center">
        <div className="flex flex-row items-center">
          <ArrowIcon className="flex-none h-4 md:h-6 w-4 md:w-5 text-AAsecondary" />
          <span className="text-AAsecondary font-semibold text-sm sm:text-xl"> 02.</span>
        </div>
        <span className="text-AAtext font-bold tracking-wider text-lg md:text-2xl px-3">
          Where I&apos;ve Worked
        </span>
        <div className="bg-AAborder h-[1px] w-16 sm:w-44 md:w-80" />
      </section>

      {/* Content */}
      <section className="relative flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0 justify-center items-center md:items-start max-w-6xl w-full">
        <CompaniesBar setDescriptionJob={setDescriptionJob} />
        <div className="flex-1 max-w-2xl">
          {GetDescription()}
        </div>
      </section>
    </div>
  );
}

const CompaniesBar = (props: { setDescriptionJob: (s: string) => void }) => {
  const [barPosition, setBarPosition] = React.useState(-53);
  const [barAbovePosition, setBarAbovePosition] = React.useState(1);
  const [companyNameBackgroundColorGreen, setCompanyNameBackgroundColorGreen] =
    React.useState<boolean[]>([true, false, false, false, false, false]);

  const CompanyButton = (props: any) => (
    <button
      onClick={() => {
        setBarPosition(props.BarPosition);
        setBarAbovePosition(props.BarAvobePosition);
        props.setDescriptionJob(props.DescriptionJob);
        setCompanyNameBackgroundColorGreen(props.CompanyNameBackgroundColorGreen);
      }}
      className={`flex-none sm:text-sm text-xs text-center md:text-left font-medium py-3 md:pl-6 md:px-4 md:w-48 w-36 duration-300 transition-all rounded-xl backdrop-blur-sm
        ${
          companyNameBackgroundColorGreen[
            props.ButtonOrderOfcompanyNameBackgroundColorGreen
          ]
            ? "bg-gradient-to-r from-AAsecondary/20 to-AAaccent/20 text-AAsecondary border border-AAsecondary/50 shadow-lg shadow-AAsecondary/20"
            : "text-AAsubtext hover:text-AAtext hover:bg-AAhover border border-AAborder hover:border-AAsecondary/50"
        }`}
    >
      {props.CompanyName}
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row w-screen lg:w-auto overflow-auto scrollbar-hide md:overflow-hidden pb-4 md:pb-0 justify-start sm:justify-center items-start sm:items-center">
      {/* Left bar */}
      <div className="hidden md:block bg-AAborder relative h-0.5 w-34 md:h-[420px] translate-y-1 md:w-1 rounded-full md:order-1 order-2">
        <motion.div
          animate={{ y: barPosition }}
          className="absolute w-10 h-0.5 md:w-1 md:h-16 rounded-full bg-gradient-to-b from-AAsecondary to-AAaccent shadow-lg shadow-AAsecondary/50"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:order-2 order-1 space-y-1 pl-8 md:pl-0">
        <div className="flex flex-row md:flex-col">
          <CompanyButton
            ButtonOrderOfcompanyNameBackgroundColorGreen={0}
            CompanyName="Climb Together"
            BarPosition={-53}
            BarAvobePosition={1}
            DescriptionJob="Climb Together"
            CompanyNameBackgroundColorGreen={[true, false, false, false, false, false]}
            setDescriptionJob={props.setDescriptionJob}
          />
          <CompanyButton
            ButtonOrderOfcompanyNameBackgroundColorGreen={1}
            CompanyName="UMass Chan Medical School"
            BarPosition={-10}
            BarAvobePosition={129}
            DescriptionJob="UMass Chan Medical School"
            CompanyNameBackgroundColorGreen={[false, true, false, false, false, false]}
            setDescriptionJob={props.setDescriptionJob}
          />
          <CompanyButton
            ButtonOrderOfcompanyNameBackgroundColorGreen={2}
            CompanyName="Capgemini"
            BarPosition={40}
            BarAvobePosition={257}
            DescriptionJob="Capgemini"
            CompanyNameBackgroundColorGreen={[false, false, true, false, false, false]}
            setDescriptionJob={props.setDescriptionJob}
          />
          <CompanyButton
            ButtonOrderOfcompanyNameBackgroundColorGreen={3}
            CompanyName="tag8"
            BarPosition={83}
            BarAvobePosition={385}
            DescriptionJob="tag8"
            CompanyNameBackgroundColorGreen={[false, false, false, true, false, false]}
            setDescriptionJob={props.setDescriptionJob}
          />
          <CompanyButton
            ButtonOrderOfcompanyNameBackgroundColorGreen={4}
            CompanyName="KPMG"
            BarPosition={126}
            BarAvobePosition={513}
            DescriptionJob="KPMG"
            CompanyNameBackgroundColorGreen={[false, false, false, false, true, false]}
            setDescriptionJob={props.setDescriptionJob}
          />
        </div>

        {/* Mobile underline */}
        <div className="block md:hidden h-1 rounded-full bg-AAborder">
          <motion.div 
            animate={{ x: barAbovePosition }} 
            className="w-[144px] h-1 rounded-full bg-gradient-to-r from-AAsecondary to-AAaccent shadow-lg shadow-AAsecondary/50" 
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
};