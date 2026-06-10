import React, { useState } from "react";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";
import Reveal from "../../Shared/Motion/Reveal";

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Jonathan Fisher",
      role: "Software Engineer at UMass Chan Medical School",
      content: "As the main UI developer on the project, Akshay undertook a very comprehensive overhaul of one of our resources, Factorbook, and modernized it using Next.js and MUI. He completed the redesign of Factorbook fully from the ground up, and was responsible for all parts of the frontend of the application. Very impressive and complex project. He was a team player and was always very receptive to feedback and looking for ways to improve the site and his own skills."
    },
    {
      name: "Nisha Indapure",
      role: "Lead Software Engineer",
      content: "Having worked with Akshay for 2 years, I must say he is an excellent professional. He helped me understand the company's project management process. I am impressed by his work ethics, communication skills, coding skills, exceptional problem-solving skills. He truly has the skills to interact with business clients. He easily adjusts to any given situation or business dynamics. But what makes him stand out is his willingness to help others. I am glad to have worked with him and have no hesitation recommending him to potential employers."
    },
    {
      name: "Leon Wöhrl",
      role: "Tech Lead | Lead Software Engineer @ Capgemini",
      content: "Great colleague who is very open minded when it comes to both personal and professional development in the software engineering industry. Akshay is always going above and beyond, ready to tackle new and difficult tasks, and ready to take responsibility. Very fast onboarding to the team, great attention to detail and a critical eye to improve things make him a great addition to any team!"
    },
    {
      name: "Amey Waghmode",
      role: "Data Scientist @Children's Mercy | CS Grad at NC State University",
      content: "I studied with Akshay at the University of Mumbai, and he was always someone you could count on—smart, focused, and a great team player. He's technically strong and quick to pick up new concepts, and I'm confident he'll be a great asset wherever he works next."
    }
  ];

  return (
    <div
      id="TestimonialsSection"
      className="flex flex-col w-full py-20 sm:py-28 px-5 sm:px-16 md:px-16 lg:px-24 2xl:px-72 border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-1/4 left-1/4 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={55} />
      <ParallaxBlob className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={-40} />

      <SectionHeader
        index="06"
        eyebrow="Testimonials"
        title="What People Say"
        className="relative mb-14"
      />

      {/* Testimonials Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Reveal key={index} index={index}>
          <div
            className={`group h-full p-7 sm:p-8 rounded-2xl border backdrop-blur-sm transition-colors duration-200 cursor-pointer ${
              activeTestimonial === index
                ? "border-AAsecondary/50 bg-AAsecondary/[0.06]"
                : "border-white/[0.08] bg-white/[0.03] hover:border-AAsecondary/30 hover:bg-white/[0.05]"
            }`}
            onClick={() => setActiveTestimonial(index)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-AAsecondary to-AAaccent rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-AAtext font-bold text-lg mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-AAsecondary text-sm mb-4 font-medium">
                  {testimonial.role}
                </p>
                <p className="text-AAtext text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          </div>
          </Reveal>
        ))}
      </div>

      {/* Stats Section */}
      <div className="relative mt-16 rounded-2xl p-8 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "100K+", label: "Users Scaled" },
            { value: "99.9%", label: "Production Uptime" },
            { value: "1,180+", label: "Open-Source Commits" },
            { value: "500+", label: "Tests Written" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="font-mono text-3xl md:text-4xl font-bold bg-gradient-to-r from-AAsecondary to-AAaccent bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-AAsubtext text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
