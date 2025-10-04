import React, { useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";

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
      className="flex flex-col bg-AAprimary w-full py-32 px-4 sm:px-16 md:px-16 lg:px-24 2xl:px-72"
    >
      {/* Section Title */}
      <div data-aos="fade-up" className="flex flex-row items-center space-x-4 mb-16">
        <ArrowIcon className="h-5 md:h-6 w-5 md:w-5 text-AAsecondary" />
        <span className="text-AAsecondary font-sans text-sm sm:text-xl">
          05.
        </span>
        <h2 className="font-bold tracking-wider text-gray-200 text-lg md:text-2xl">
          What People Say
        </h2>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 rounded-lg border ${
              activeTestimonial === index
                ? "border-AAsecondary bg-AAsecondary/10"
                : "border-gray-600 bg-gray-800/50"
            } hover:border-AAsecondary/50 transition-all duration-300 cursor-pointer`}
            onClick={() => setActiveTestimonial(index)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-AAsecondary/20 rounded-full flex items-center justify-center">
                  <span className="text-AAsecondary font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {testimonial.name}
                </h3>
                <p className="text-AAsecondary text-sm mb-3">
                  {testimonial.role}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-AAsecondary mb-2">100K+</div>
          <div className="text-gray-400 text-sm">Users Scaled</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-AAsecondary mb-2">99.9%</div>
          <div className="text-gray-400 text-sm">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-AAsecondary mb-2">50%</div>
          <div className="text-gray-400 text-sm">Performance Improvement</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-AAsecondary mb-2">400%</div>
          <div className="text-gray-400 text-sm">Engagement Boost</div>
        </div>
      </div>
    </div>
  );
}
