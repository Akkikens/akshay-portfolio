import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../../Shared/Motion/SectionHeader";
import ParallaxBlob from "../../Shared/Motion/ParallaxBlob";
import Reveal from "../../Shared/Motion/Reveal";

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
      className="flex flex-col space-y-10 w-full py-20 sm:py-28 px-5 sm:px-16 md:px-16 lg:px-24 2xl:px-72 items-center border-t border-white/[0.06] relative overflow-hidden"
    >
      {/* Ambient accents with parallax drift */}
      <ParallaxBlob className="absolute top-0 right-0 w-96 h-96 bg-AAsecondary/5 rounded-full blur-3xl" range={55} />
      <ParallaxBlob className="absolute bottom-0 left-0 w-96 h-96 bg-AAaccent/5 rounded-full blur-3xl" range={-40} />

      <SectionHeader
        index="07"
        eyebrow="What's Next"
        title="Get In Touch"
        align="center"
        className="relative"
      />

      <Reveal className="relative">
        <p className="text-AAsubtext text-lg leading-relaxed text-center px-6 sm:px-16 md:px-0 md:w-[600px]">
          I&apos;m open to AI platform, backend, full-stack, and forward-deployed AI
          engineering roles — or a conversation about agent tooling, MCP servers, and
          shipping production AI. Reach out and I&apos;ll get back to you quickly.
        </p>
      </Reveal>

      {/* Contact Form */}
      <Reveal className="relative w-full max-w-2xl">
      <div className="rounded-2xl p-7 sm:p-8 border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
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
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext/60 transition-colors duration-200"
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
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext/60 transition-colors duration-200"
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
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext/60 transition-colors duration-200"
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
              className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.10] rounded-xl focus:border-AAsecondary focus:outline-none text-AAtext placeholder-AAsubtext/60 resize-none transition-colors duration-200"
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
      </div>
      </Reveal>

      {/* Alternative Contact */}
      <Reveal className="relative pt-4" delay={0.1}>
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
      </Reveal>
    </div>
  );
}
