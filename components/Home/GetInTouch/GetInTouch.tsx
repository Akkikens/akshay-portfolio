import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArrowIcon from "../../Icons/ArrowIcon";

export default function GetInTouch() {
  const [isAndroidWebView, setIsAndroidWebView] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    // Check for Android WebView by inspecting the user agent
    if (/android/i.test(userAgent) && /wv/.test(userAgent)) {
      setIsAndroidWebView(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="GetInTouchSection"
      data-aos="fade-up"
      className="flex flex-col space-y-12 w-full py-24 px-4 sm:px-16 md:px-16 lg:px-24 2xl:px-72 items-center bg-gradient-to-br from-AAprimary to-MobileNavBarColor border-t border-AAborder relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Title: What's Next? */}
      <motion.div 
        className="relative flex flex-row items-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ArrowIcon className="flex-none h-5 md:h-6 w-5 md:w-5 text-AAsecondary" />
        <div className="flex flex-row space-x-2 items-center">
          <span className="text-AAsecondary font-semibold text-sm sm:text-base">
            07.
          </span>
          <span className="font-semibold text-AAsecondary text-base">
            What&apos;s Next?
          </span>
        </div>
      </motion.div>

      {/* Get In Touch */}
      <motion.div 
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-AAtext text-4xl sm:text-5xl font-bold tracking-wider">
          Get In Touch
        </h2>
        <p className="text-AAtext text-lg leading-relaxed text-center px-6 sm:px-16 md:px-0 md:w-[600px]">
          I'm always open to new opportunities, collaborations, or just a friendly
          chat! Whether you have a question or just want to say hi, I'll try my
          best to get back to you!
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-AAhover to-MobileNavBarColor rounded-2xl p-8 border border-AAborder backdrop-blur-sm shadow-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-AAtext mb-3">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-AAprimary/50 border border-AAborder rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-AAtext mb-3">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-AAprimary/50 border border-AAborder rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-AAtext mb-3">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-AAprimary/50 border border-AAborder rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext transition-all duration-300"
              placeholder="What's this about?"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-AAtext mb-3">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-AAprimary/50 border border-AAborder rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext resize-none transition-all duration-300"
              placeholder="Tell me about your project or just say hello!"
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-AAsecondary to-AAaccent text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-AAsecondary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </motion.button>
          
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-AAsuccess text-center font-medium"
            >
              Thanks! I'll get back to you soon.
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center font-medium"
            >
              Something went wrong. Please try again.
            </motion.div>
          )}
        </form>
      </motion.div>

      {/* Alternative Contact */}
      <motion.div 
        className="relative pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {isAndroidWebView ? (
          <button className="font-mono text-sm text-AAsecondary border-AAsecondary px-8 py-4 border-2 rounded-xl bg-AAsecondary/10 backdrop-blur-sm outline-none focus:outline-none focus:ring-2 focus:ring-AAsecondary/50">
            akshaykalapgar23@gmail.com
          </button>
        ) : (
          <a
            href="mailto:akshaykalapgar23@gmail.com"
            target={"_blank"}
            rel="noreferrer"
          >
            <motion.button 
              className="font-mono text-sm text-AAsecondary border-AAsecondary px-8 py-4 border-2 rounded-xl hover:bg-AAsecondary/10 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-AAsecondary/20 outline-none focus:outline-none focus:ring-2 focus:ring-AAsecondary/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Or Email Directly
            </motion.button>
          </a>
        )}
      </motion.div>
    </div>
  );
}
