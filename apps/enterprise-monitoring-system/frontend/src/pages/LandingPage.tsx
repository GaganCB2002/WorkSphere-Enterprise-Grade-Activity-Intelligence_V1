import React from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  Activity,
  Award,
  Server
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { MarketingNavbar } from '../components/layout/MarketingNavbar'
import { MarketingFooter } from '../components/layout/MarketingFooter'

export function LandingPage() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef(null)
  const [expandedServiceIndex, setExpandedServiceIndex] = useState<number | null>(null)
  
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
    <div 
      className="min-h-screen bg-white dark:bg-[#0A0B10] text-[#172B4D] dark:text-white dark:text-slate-100 selection:bg-[#E6F0FF] dark:selection:bg-[#0052CC]/30 overflow-x-hidden font-sans scroll-smooth transition-colors duration-500 relative"
    >
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
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#E6F0FF] border border-[#0065FF]/20 text-[11px] font-semibold tracking-widest text-[#0052CC] mb-10 shadow-sm">
              <Star className="h-3 w-3 fill-[#0052CC]" />
              The Pinnacle of Workforce Engineering
            </div>
            <h1 className="text-6xl lg:text-8xl font-display font-bold tracking-tight leading-[1.1] mb-10 text-[#172B4D] dark:text-white dark:text-white">
              Performance <br />
              <span className="text-[#0052CC]">Redefined.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
              Precision-engineered tools for the modern enterprise. Monitor, analyze, and optimize your global talent with surgical accuracy.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0, 82, 204, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="px-12 py-5 bg-[#0052CC] text-white rounded-md font-semibold text-sm shadow-md hover:bg-[#0065FF] transition-all group flex items-center justify-center cursor-pointer"
              >
                Start Your Journey
                <ArrowRight className="inline-block ml-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.01, backgroundColor: '#F4F5F7' }}
                onClick={() => navigate('/login')}
                className="px-12 py-5 bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/5 rounded-md font-semibold text-sm transition-all flex items-center gap-3 text-[#172B4D] dark:text-white shadow-sm hover:shadow-md cursor-pointer group"
              >
                <Play className="h-4 w-4 fill-[#172B4D]" />
                Experience Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white dark:from-slate-950/60 dark:via-slate-950/80 dark:to-slate-950 z-10 transition-colors duration-500" />
          
          {/* Light Mode Crystal Background */}
          <div className="absolute inset-0 bg-[url('/crystal-hero-bg.png')] bg-cover bg-center opacity-100 dark:opacity-0 transition-opacity duration-500 z-0" />

          {/* Dark Mode Background */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-0 dark:opacity-30 transition-opacity duration-500 z-0" 
          />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-500 animate-pulse">Scroll</span>
        </div>
      </section>

      {/* Trust & Verification Bar */}
      <section className="py-8 bg-white dark:bg-[#0A0B10] border-b border-[#DFE1E6] dark:border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            {[
              { icon: ShieldCheck, text: "SOC 2 Type II Certified" },
              { icon: Lock, text: "End-to-End Encryption" },
              { icon: Award, text: "Verified Enterprise Provider" },
              { icon: CheckCircle2, text: "GDPR Compliant" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 text-[#172B4D] dark:text-white">
                <badge.icon className="h-5 w-5 text-[#0052CC]" />
                <span className="text-sm font-bold tracking-wide uppercase">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section id="product" className="py-32 bg-[#F4F5F7] dark:bg-[#05060A] relative overflow-hidden border-t border-[#DFE1E6] dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side: Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              className="relative bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/5 p-4 rounded-2xl shadow-premium overflow-hidden group order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 z-10" />
              <motion.img 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.5 }}
                src="/hero_mockup.png" 
                alt="Product Preview" 
                className="w-full rounded-[32px] transition-transform duration-[2000ms]"
              />
              
              {/* Feature Tags */}
              <div className="absolute top-12 left-12 z-20 space-y-4 hidden sm:block">
                {['Real-time Telemetry', 'AI Behavioral Analysis', 'Predictive Attrition'].map((tag, i) => (
                  <motion.div 
                    key={tag}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: 0.2 }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 100 }}
                    className="px-6 py-3 bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/5 rounded-md flex items-center gap-3 shadow-md"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#36B37E] animate-pulse" />
                    <span className="text-[11px] font-semibold text-[#172B4D] dark:text-white">{tag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Text & Details */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.15 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F0FF] dark:bg-[#0052CC]/10 text-[#0052CC] mb-8">
                <Monitor className="h-4 w-4" />
                <span className="text-[11px] font-bold tracking-widest uppercase">Next-Gen UX</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#172B4D] dark:text-white mb-6">The Interface of Tomorrow</h2>
              <p className="text-[#5E6C84] dark:text-slate-400 text-lg leading-relaxed mb-10">
                A visual masterpiece designed for maximum cognitive efficiency and aesthetic pleasure. Every pixel is engineered to deliver critical telemetry data instantaneously, allowing your leadership to make split-second decisions without fatigue.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Real-time Processing", desc: "Process millions of events with sub-millisecond latency seamlessly in your browser." },
                  { title: "Adaptive Dark Mode", desc: "Intelligent color palettes that reduce optical strain during late-night monitoring sessions." },
                  { title: "Unified Workflows", desc: "Consolidate your disparate monitoring tools into a single, beautiful environment." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <div className="mt-1 h-10 w-10 rounded-xl bg-[#E6F0FF] dark:bg-[#0052CC]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-[#0052CC]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#172B4D] dark:text-white mb-1.5">{item.title}</h4>
                      <p className="text-sm text-[#5E6C84] dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-[#DFE1E6] dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E6F0FF] dark:bg-[#0052CC]/10 text-[#0052CC] mb-8">
                <Award className="h-4 w-4" />
                <span className="text-[11px] font-bold tracking-widest uppercase">Verified Organization</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#172B4D] dark:text-white mb-6">Who We Are</h2>
              <p className="text-lg text-[#5E6C84] dark:text-slate-400 leading-relaxed mb-6">
                NexusHR is a globally verified enterprise intelligence provider, dedicated to bridging the gap between organizational efficiency and technological innovation. Founded by industry veterans, we engineer systems that empower leadership with absolute clarity.
              </p>
              <p className="text-lg text-[#5E6C84] dark:text-slate-400 leading-relaxed mb-10">
                Our mission is to redefine workforce telemetry. We don't just monitor activities; we analyze behaviors, predict attrition, and secure your digital perimeter with military-grade precision. 
              </p>
              
              <div className="flex gap-10">
                <div>
                  <div className="text-3xl font-display font-black text-[#0052CC] mb-1">100%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#172B4D] dark:text-white">Data Sovereignty</div>
                </div>
                <div>
                  <div className="text-3xl font-display font-black text-[#0052CC] mb-1">24/7</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#172B4D] dark:text-white">Active Defense</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0052CC] to-[#008DA6] rounded-3xl rotate-3 opacity-20 blur-2xl"></div>
              <img 
                src="/corporate_headquarters.png" 
                alt="NexusHR Headquarters" 
                className="w-full h-[500px] object-cover rounded-3xl border border-[#DFE1E6] dark:border-white/10 shadow-2xl relative z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-32 bg-[#F4F5F7] dark:bg-[#05060A] relative overflow-hidden border-t border-[#DFE1E6] dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-widest text-[#0052CC] mb-6 uppercase">Our Offerings</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#172B4D] dark:text-white mb-6">Verified Enterprise Services</h2>
            <p className="text-[#5E6C84] dark:text-slate-400 max-w-2xl mx-auto text-base">Comprehensive solutions designed to protect, analyze, and optimize your global workforce.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Activity, title: 'Activity Telemetry', desc: 'Real-time tracking of application usage, idle times, and productivity metrics.', details: 'Dive deep into user engagement with second-by-second activity logs. Our telemetry engine captures keystroke dynamics, application switching patterns, and idle threshold breaches to provide a comprehensive view of workforce productivity without compromising endpoint performance.' },
              { icon: Cpu, title: 'AI Behavioral Analysis', desc: 'Machine learning algorithms that detect burnout, anomalous behavior, and insider threats.', details: 'Deploy proprietary neural networks that establish baseline behavior profiles for every user. Automatically flag deviations that indicate potential data exfiltration, compromised credentials, or high burnout risk factors before they impact your bottom line.' },
              { icon: ShieldCheck, title: 'Compliance Automation', desc: 'Automated reporting for SOC 2, HIPAA, and GDPR compliance audits.', details: 'Transform weeks of compliance auditing into a one-click operation. Our platform continuously maps your security controls to major regulatory frameworks, generating auditor-ready evidence and identifying control gaps in real-time.' },
              { icon: Lock, title: 'Zero-Trust Security', desc: 'Biometric verification and continuous authentication to secure enterprise endpoints.', details: 'Implement a true zero-trust architecture that goes beyond initial login. We use continuous behavioral biometric authentication—analyzing typing speed, mouse movements, and working hours—to silently verify identity throughout the session.' },
              { icon: MessageSquare, title: 'Unified Collaboration', desc: 'Integrated, encrypted communication hubs for seamless team operations.', details: 'Replace fragmented third-party tools with our military-grade encrypted communication suite. Features include ephemeral messaging, secure file transfer protocols, and AI-summarized video conferencing tailored for highly regulated industries.' },
              { icon: Globe, title: 'Global Asset Tracking', desc: 'Geo-fencing and location services to manage distributed remote hardware.', details: 'Maintain absolute visibility over your global hardware fleet. Set up dynamic geo-fences that automatically lock devices or wipe sensitive data if a corporate laptop leaves an authorized operational zone.' }
            ].map((service, i) => {
              const isExpanded = expandedServiceIndex === i;
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onMouseEnter={() => setExpandedServiceIndex(i)}
                onMouseLeave={() => setExpandedServiceIndex(null)}
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 12px 24px rgba(0, 82, 204, 0.1)" }}
                className={`group relative p-8 bg-white dark:bg-slate-900 border ${isExpanded ? 'border-[#0052CC] ring-2 ring-[#0052CC]/20' : 'border-[#DFE1E6] dark:border-white/5'} rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0052CC] transition-all duration-300 overflow-hidden cursor-pointer shadow-sm`}
              >
                {/* Slicing Sheen Animation */}
                <div className="absolute top-0 -left-[100%] w-[50%] h-full z-0 block transform -skew-x-[25deg] bg-gradient-to-r from-transparent via-[#0052CC]/10 dark:via-white/10 to-transparent group-hover:left-[200%] transition-all duration-700 ease-out" />
                
                <div className={`h-12 w-12 rounded-lg ${isExpanded ? 'bg-[#0052CC]' : 'bg-[#E6F0FF] dark:bg-[#0052CC]/10'} group-hover:bg-[#0052CC] dark:group-hover:bg-[#0052CC] flex items-center justify-center mb-6 transition-colors duration-300 relative z-10`}>
                  <service.icon className={`h-6 w-6 ${isExpanded ? 'text-white' : 'text-[#0052CC]'} group-hover:text-white transition-colors duration-300`} />
                </div>
                <h3 className="text-xl font-bold text-[#172B4D] dark:text-white mb-3 relative z-10">{service.title}</h3>
                <p className="text-[#5E6C84] dark:text-slate-400 text-sm leading-relaxed relative z-10">{service.desc}</p>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="pt-4 border-t border-[#DFE1E6] dark:border-white/10">
                        <p className="text-[#5E6C84] dark:text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                          {service.details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )})}
          </div>
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
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 8px 16px rgba(9, 30, 66, 0.08), 0 0 1px rgba(9, 30, 66, 0.31)" }}
                className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/5 transition-all duration-300 group shadow-sm cursor-pointer"
              >
                <motion.div 
                  className="text-4xl lg:text-5xl font-display font-bold text-[#0052CC] mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#172B4D] dark:text-white mb-1 group-hover:text-[#0052CC] transition-colors">{stat.label}</div>
                <div className="text-[11px] text-[#5E6C84] dark:text-slate-400">{stat.sub}</div>
              </motion.div>
          ))}
        </div>
        <motion.div 
          style={{ y: bgY2 }}
          className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-mint/5 pointer-events-none" 
        />
      </section>

      {/* Global Server Infrastructure */}
      <section id="infrastructure" className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-[#DFE1E6] dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-widest text-[#0052CC] mb-6 uppercase">Global Infrastructure</p>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-[#172B4D] dark:text-white mb-6">Our Data Centers</h2>
            <p className="text-[#5E6C84] dark:text-slate-400 max-w-2xl mx-auto text-base">Powered by state-of-the-art server arrays across 14 global regions. We ensure zero downtime, military-grade encryption, and sub-millisecond telemetry processing.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#0052CC]/10 dark:bg-brand/20 rounded-[32px] blur-3xl -z-10" />
              <img 
                src="/server_infrastructure.png" 
                alt="Global Server Infrastructure" 
                className="w-full h-[400px] object-cover rounded-[32px] border border-[#DFE1E6] dark:border-white/10 shadow-2xl relative z-10"
              />
              
              {/* Region Overlay */}
              <div className="absolute bottom-6 right-6 z-20 flex gap-4">
                <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-mint animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">US-East-1 Active</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <h3 className="text-3xl font-display font-bold text-[#172B4D] dark:text-white mb-8">Uncompromising Performance.</h3>
              
              <div className="space-y-8">
                {[
                  { icon: Globe, title: "14 Global Edge Nodes", desc: "Our distributed architecture ensures your telemetry data never has to travel far, resulting in instantaneous UI updates." },
                  { icon: Server, title: "Bare Metal Dominance", desc: "We run exclusively on proprietary bare-metal servers designed for extreme IOPS and memory bandwidth." },
                  { icon: Lock, title: "Quantum-Resistant Encryption", desc: "Data is encrypted both in transit and at rest using algorithms that anticipate future threat vectors." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="h-12 w-12 rounded-full bg-[#E6F0FF] dark:bg-white/5 flex items-center justify-center shrink-0 shadow-sm border border-transparent dark:border-white/10">
                      <item.icon className="h-5 w-5 text-[#0052CC] dark:text-brand" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#172B4D] dark:text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-[#5E6C84] dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
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
              <p className="text-[11px] font-bold tracking-widest text-[#0052CC] mb-6 uppercase">Engineering Specs</p>
              <h2 className="text-5xl font-display font-bold text-[#172B4D] dark:text-white">Built for Precision.</h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="text-lg text-[#5E6C84] dark:text-slate-400 leading-relaxed"
            >
              Every pixel, every data point, and every interaction has been meticulously engineered to provide the ultimate management experience.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryFeatures.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02, boxShadow: "0 12px 24px rgba(0, 82, 204, 0.1)" }}
                onClick={() => navigate(f.path)}
                className="group relative p-8 bg-white dark:bg-slate-900 border border-[#DFE1E6] dark:border-white/5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0052CC] transition-all duration-300 overflow-hidden cursor-pointer shadow-sm"
              >
                {/* Slicing Sheen Animation */}
                <div className="absolute top-0 -left-[100%] w-[50%] h-full z-0 block transform -skew-x-[25deg] bg-gradient-to-r from-transparent via-[#0052CC]/10 dark:via-white/10 to-transparent group-hover:left-[200%] transition-all duration-700 ease-out" />
                
                <div className={`h-12 w-12 rounded-md bg-[#E6F0FF] group-hover:bg-[#0052CC] flex items-center justify-center mb-6 transition-colors duration-300 relative z-10`}>
                  <f.icon className="h-6 w-6 text-[#0052CC] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-[#172B4D] dark:text-white relative z-10">{f.title}</h3>
                <p className="text-[#5E6C84] dark:text-slate-400 text-sm leading-relaxed relative z-10">{f.description}</p>
                <motion.div 
                  className="mt-6 flex items-center gap-2 text-[12px] font-semibold text-[#0052CC] group-hover:underline relative z-10"
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
                 whileHover={{ y: -12, scale: 1.04, boxShadow: "0 12px 24px rgba(0, 82, 204, 0.1)" }}
                 onClick={() => navigate(item.path)}
                 className="group relative glass-panel border-outline dark:border-white/5 bg-white dark:bg-slate-900/40 p-8 rounded-[40px] hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-[#0052CC] transition-all duration-500 overflow-hidden cursor-pointer shadow-lg"
               >
                  {/* Slicing Sheen Animation */}
                  <div className="absolute top-0 -left-[100%] w-[50%] h-full z-0 block transform -skew-x-[25deg] bg-gradient-to-r from-transparent via-[#0052CC]/10 dark:via-white/10 to-transparent group-hover:left-[200%] transition-all duration-700 ease-out" />
                  
                  <div className={`h-14 w-14 rounded-2xl ${item.color.split(' ')[0]} group-hover:bg-[#0052CC] flex items-center justify-center mb-6 transition-colors duration-300 relative z-10`}>
                    <item.icon className={`h-6 w-6 ${item.color.split(' ')[1]} group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h4 className="text-xl font-bold mb-4 uppercase italic text-slate-900 dark:text-white relative z-10">{item.title}</h4>
                  <p className="text-slate-600 dark:text-[#A0AEC0] text-sm leading-relaxed relative z-10">{item.text}</p>
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
                   whileHover={{ scale: 1.03, y: -4, boxShadow: "0 12px 24px rgba(0, 82, 204, 0.1)" }}
                   className="group relative p-8 bg-slate-50 dark:bg-slate-900/40 border border-outline dark:border-white/5 rounded-[32px] hover:bg-white dark:hover:bg-slate-800 hover:border-[#0052CC] transition-all duration-300 overflow-hidden cursor-pointer shadow-md"
                 >
                    {/* Slicing Sheen Animation */}
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full z-0 block transform -skew-x-[25deg] bg-gradient-to-r from-transparent via-[#0052CC]/10 dark:via-white/10 to-transparent group-hover:left-[200%] transition-all duration-700 ease-out" />
                    
                    <div className="relative z-10">
                      <res.icon className="h-5 w-5 text-brand group-hover:text-[#0052CC] mb-6 transition-colors duration-300" />
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-2.5 text-slate-950 dark:text-white">{res.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{res.text}</p>
                    </div>
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="px-16 py-6 bg-[#0052CC] text-white rounded-md font-bold text-sm tracking-wide shadow-md hover:bg-[#0065FF] transition-all duration-300 cursor-pointer"
            >
              START FREE TRIAL
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
