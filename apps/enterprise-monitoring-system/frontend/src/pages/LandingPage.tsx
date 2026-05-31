import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Monitor, 
  Camera, 
  Timer, 
  Bell,
  Play,
  CheckCircle2,
  Users,
  Star,
  Globe,
  Cpu,
  Lock,
  ChevronDown,
  Mail,
  MessageSquare,
  Terminal,
  Activity
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { MarketingNavbar } from '../components/layout/MarketingNavbar'
import { MarketingFooter } from '../components/layout/MarketingFooter'

export function LandingPage() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef(null)
  
  const { scrollY, scrollYProgress } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.95])
  const y = useTransform(scrollY, [0, 400], [0, 100])
  const bgY1 = useTransform(scrollY, [0, 2000], [0, -200])
  const bgY2 = useTransform(scrollY, [0, 2000], [0, 200])
  const rotateOrb = useTransform(scrollY, [0, 4000], [0, 360])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const luxuryFeatures = [
    {
      title: "Precision Analytics",
      description: "Engineered for high-performance teams. Gain millisecond-level insights into your workflow velocity.",
      icon: Cpu,
      color: "text-brand",
      path: "/features/performance"
    },
    {
      title: "Secure Infrastructure",
      description: "Enterprise-grade encryption protecting your most sensitive intellectual property with military-grade protocols.",
      icon: ShieldCheck,
      color: "text-pastel-blue",
      path: "/features/enterprise-hr"
    },
    {
      title: "Global Connectivity",
      description: "Seamlessly synchronize your global workforce across time zones with our unified command center.",
      icon: Globe,
      color: "text-mint",
      path: "/features/collaboration"
    },
    {
      title: "AI-Driven Insights",
      description: "Predictive modeling and behavioral analysis to stay ahead of performance bottlenecks.",
      icon: Zap,
      color: "text-peach",
      path: "/features/performance"
    }
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand/30 overflow-x-hidden font-sans scroll-smooth transition-colors duration-500 relative">
      {/* Sticky Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-pastel-blue to-mint z-[200] origin-left"
        style={{ scaleX: scrollYProgress }} 
      />

      <MarketingNavbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-black uppercase tracking-[0.4em] text-brand mb-10 shadow-md shadow-brand/10 animate-pulse">
              <Star className="h-3 w-3 fill-brand" />
              The Pinnacle of Workforce Engineering
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-black tracking-tight leading-[0.9] uppercase mb-10 italic">
              Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-pastel-blue border-t border-b border-outline dark:border-white/10 px-4 py-2 my-4 inline-block italic">Redefined.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              Precision-engineered tools for the modern enterprise. Monitor, analyze, and optimize your global talent with surgical accuracy.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/login')}
                className="px-12 py-5 bg-brand text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand/20 hover:bg-brand/90 transition-all group btn-interactive cursor-pointer"
              >
                Start Your Journey
                <ArrowRight className="inline-block ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => navigate('/login')}
                className="px-12 py-5 bg-transparent border border-outline dark:border-white/20 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 dark:hover:bg-white/5 transition flex items-center gap-3 text-slate-900 dark:text-white btn-interactive cursor-pointer"
              >
                <Play className="h-4 w-4 fill-slate-900 dark:fill-white" />
                Experience Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background dark:from-slate-950/60 dark:via-slate-950/80 dark:to-slate-950 z-10" />
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-15 dark:opacity-30" 
          />
          {/* Animated Glows */}
          <motion.div style={{ rotate: rotateOrb }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[150px] animate-pulse" />
          <motion.div style={{ rotate: rotateOrb }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-mint/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 animate-pulse">Scroll</span>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product" className="py-32 bg-white dark:bg-slate-900/40 relative overflow-hidden border-t border-outline dark:border-white/5">
        <motion.div style={{ y: bgY1 }} className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.15 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="relative"
          >
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight uppercase mb-6 italic text-slate-900 dark:text-white">The Interface of Tomorrow</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">A visual masterpiece designed for maximum cognitive efficiency and aesthetic pleasure.</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              className="relative glass-panel border-outline/40 dark:border-white/5 bg-white/5 p-4 rounded-[40px] shadow-premium overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 z-10" />
              <motion.img 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.5 }}
                src="https://images.unsplash.com/photo-1551288049-bbbda5366a71?auto=format&fit=crop&q=80&w=2000" 
                alt="Product Preview" 
                className="w-full rounded-[32px] transition-transform duration-[2000ms]"
              />
              
              {/* Feature Tags */}
              <div className="absolute top-12 left-12 z-20 space-y-4">
                {['Real-time Telemetry', 'AI Behavioral Analysis', 'Predictive Attrition'].map((tag, i) => (
                  <motion.div 
                    key={tag}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 100 }}
                    className="px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-outline dark:border-white/10 rounded-2xl flex items-center gap-3 shadow-xl"
                  >
                    <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">{tag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Immersive Stats Banner */}
      <section className="py-20 bg-brand/5 border-y border-brand/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
          {[
            { value: "99.99%", label: "System Uptime", sub: "Carrier-grade reliability" },
            { value: "< 12ms", label: "Telemetry Latency", sub: "Ultra-low lag transmission" },
            { value: "50M+", label: "Events Analyzed", sub: "Daily behavioral data points" },
            { value: "100%", label: "Hardware Verified", sub: "Zero spoofing guaranteed" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-outline dark:border-white/5 hover:border-brand/45 transition-all group shadow-xl"
            >
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-brand to-pastel-blue mb-2 italic"
              >
                {stat.value}
              </motion.div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-1">{stat.label}</div>
              <div className="text-[10px] text-slate-500 font-medium">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          style={{ y: bgY2 }}
          className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-mint/5 pointer-events-none" 
        />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand mb-6">Engineering Specs</p>
              <h2 className="text-5xl font-display font-black tracking-tight uppercase italic text-slate-900 dark:text-white">Built for <br />Precision.</h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
            >
              Every pixel, every data point, and every interaction has been meticulously engineered to provide the ultimate management experience.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {luxuryFeatures.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => navigate(f.path)}
                className="group relative p-8 bg-white dark:bg-slate-900/40 border border-outline dark:border-white/5 rounded-[32px] hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-xl hover:border-brand/40"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <f.icon size={100} className="text-brand" />
                </div>
                <div className={`h-12 w-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition-transform duration-500`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-tight text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-slate-500 dark:text-[#A0AEC0] text-sm leading-relaxed font-medium">{f.description}</p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Learn More <ArrowRight className="h-3 w-3" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Modules Section */}
      <section id="solutions" className="py-32 bg-slate-50 dark:bg-slate-900/20 border-y border-outline dark:border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight uppercase mb-6 italic text-slate-900 dark:text-white">Unified Command Center</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base font-medium">One system. Every module. Total control over your enterprise communication and operations.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { title: 'Collaboration', icon: MessageSquare, text: 'Real-time chat and internal mail system integrated directly into your workflow.', color: 'bg-brand/10 text-brand', path: '/features/collaboration' },
               { title: 'Conferencing', icon: Monitor, text: 'Ultra-low latency video meetings with automated transcription and action items.', color: 'bg-pastel-blue/10 text-pastel-blue', path: '/features/collaboration' },
               { title: 'Security', icon: Lock, text: 'Advanced role-based access control with biometric and multi-factor authentication.', color: 'bg-mint/10 text-mint', path: '/features/enterprise-hr' },
             ].map((item, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 60, scale: 0.9 }}
                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
                 viewport={{ amount: 0.2 }}
                 transition={{ delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.3 }}
                 whileHover={{ y: -8, scale: 1.01 }}
                 onClick={() => navigate(item.path)}
                 className="glass-panel border-outline dark:border-white/5 bg-white dark:bg-slate-900/40 p-8 rounded-[40px] transition-all duration-500 group cursor-pointer shadow-lg"
               >
                  <div className={`h-14 w-14 rounded-2xl ${item.color.split(' ')[0]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-6 w-6 ${item.color.split(' ')[1]}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 uppercase italic text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-[#A0AEC0] text-sm leading-relaxed">{item.text}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Resources & FAQ */}
      <section id="resources" className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight uppercase mb-10 italic text-slate-900 dark:text-white">Knowledge Base.</h2>
              <div className="space-y-6">
                {[
                  { title: 'How does live monitoring impact privacy?', answer: 'We employ advanced anonymization protocols and behavioral focus to ensure compliance with global privacy regulations while maintaining transparency.' },
                  { title: 'Can I integrate with existing SSO?', answer: 'Yes, our enterprise grade allows for seamless SAML 2.0 and OIDC integration with Okta, Azure AD, and more.' },
                  { title: 'What is the deployment timeframe?', answer: 'Our cloud-native infrastructure allows for instant activation. On-premise deployments typically take 2-4 business days.' },
                ].map((faq, i) => (
                  <div key={i} className="group border-b border-outline dark:border-white/5 pb-6">
                    <button className="w-full flex items-center justify-between text-left">
                       <span className="text-base font-bold group-hover:text-brand transition-colors uppercase italic text-slate-900 dark:text-white">{faq.title}</span>
                       <ChevronDown className="h-4 w-4 text-slate-500 group-hover:rotate-180 transition-transform" />
                    </button>
                    <p className="mt-4 text-slate-500 text-sm font-medium leading-relaxed max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
               {[
                 { title: 'Documentation', icon: Terminal, text: 'Technical specifications for developers.' },
                 { title: 'API Reference', icon: Globe, text: 'Custom endpoint integration guides.' },
                 { title: 'Security Whitepaper', icon: Lock, text: 'Deep dive into our encryption standards.' },
                 { title: 'System Status', icon: Activity, text: 'Live infrastructure performance tracking.' },
               ].map((res, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, scale: 0.85, y: 40 }}
                   whileInView={{ opacity: 1, scale: 1, y: 0 }}
                   viewport={{ amount: 0.2 }}
                   transition={{ delay: i * 0.15, duration: 0.8, type: "spring", bounce: 0.3 }}
                   whileHover={{ scale: 1.03, y: -4 }}
                   className="p-8 bg-slate-50 dark:bg-slate-900/40 border border-outline dark:border-white/5 rounded-[32px] hover:border-brand/40 transition-all group cursor-pointer shadow-md"
                 >
                    <res.icon className="h-5 w-5 text-brand mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-2.5 text-slate-950 dark:text-white">{res.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{res.text}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 relative overflow-hidden border-t border-outline dark:border-white/5">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 60 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          >
            <h2 className="text-6xl lg:text-8xl font-display font-black tracking-tight uppercase italic mb-8 text-slate-900 dark:text-white">
              Join the <br />
              <span className="text-brand">Elite.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 font-medium max-w-2xl mx-auto">
              Experience the pinnacle of workforce intelligence. Engineered for leaders who demand perfection.
            </p>
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: '#7a6aeb' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className="px-16 py-6 bg-brand text-white rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-brand/20 transition-all duration-500 active:scale-95 cursor-pointer"
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
        
        {/* Decorative BG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[200px] -z-10" />
      </section>

      <MarketingFooter />
    </div>
  )
}
