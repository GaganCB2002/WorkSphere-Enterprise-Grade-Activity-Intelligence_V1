import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, BarChart3, Monitor, Camera, Timer, Bell, Play, CheckCircle2, Users, Star, Globe, Cpu, Lock, ChevronDown, Mail, MessageSquare, Terminal, Activity, Award, Server } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { MarketingNavbar } from '../components/layout/MarketingNavbar'
import { MarketingFooter } from '../components/layout/MarketingFooter'

export function LandingPage() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY, scrollYProgress } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0B10] text-[#172B4D] dark:text-slate-100 overflow-x-hidden scroll-smooth transition-colors duration-500">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-pastel-blue to-mint z-[200] origin-left" style={{ scaleX: scrollYProgress }} />

      <MarketingNavbar />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-xs font-semibold tracking-widest text-brand mb-8 shadow-sm">
              <Star className="h-3 w-3 fill-brand" />
              Enterprise Activity Intelligence
            </div>
            <h1 className="text-5xl lg:text-7xl font-headline font-bold tracking-tight leading-[1.1] mb-8 text-[#172B4D] dark:text-white">
              Performance <br />
              <span className="text-brand">Redefined.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Monitor, analyze, and optimize your workforce with precision tools designed for the modern enterprise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/login')}
                className="px-10 py-4 bg-brand text-white rounded-lg font-semibold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate('/login')}
                className="px-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 text-[#172B4D] dark:text-white shadow-sm hover:shadow-md cursor-pointer"
              >
                <Play className="h-4 w-4" />
                View Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-white dark:from-slate-950/60 dark:via-slate-950/80 dark:to-slate-950 z-10" />
          <div className="absolute inset-0 bg-[url('/crystal-hero-bg.png')] bg-cover bg-center opacity-100 dark:opacity-0 transition-opacity z-0" />
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-0 dark:opacity-30 transition-opacity z-0"
          />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 animate-pulse">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 text-slate-400 animate-bounce" />
        </div>
      </section>

      <section className="py-6 bg-white dark:bg-[#0A0B10] border-b border-slate-200 dark:border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
            {[
              { icon: ShieldCheck, text: "SOC 2 Type II Certified" },
              { icon: Lock, text: "End-to-End Encryption" },
              { icon: Award, text: "Enterprise Verified" },
              { icon: CheckCircle2, text: "GDPR Compliant" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-[#172B4D] dark:text-white">
                <badge.icon className="h-4 w-4 text-brand" />
                <span className="text-xs font-bold tracking-wide uppercase">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="product" className="py-24 bg-slate-50 dark:bg-[#05060A] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-3 rounded-2xl shadow-lg overflow-hidden">
                <img src="/hero_mockup.png" alt="Product Preview" className="w-full rounded-xl" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand mb-6">
                <Monitor className="h-4 w-4" />
                <span className="text-xs font-bold tracking-widest uppercase">Platform Overview</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-[#172B4D] dark:text-white mb-4">All-in-One Command Center</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                A unified interface that consolidates telemetry, analytics, workforce management, and compliance into a single, intuitive dashboard.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Real-time Data", desc: "Process events with sub-second latency directly in your browser." },
                  { title: "Dark Mode", desc: "Reduce eye strain during extended monitoring sessions." },
                  { title: "Unified View", desc: "Combine all your monitoring tools into one workspace." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-0.5 h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-brand" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#172B4D] dark:text-white">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand mb-6">
                <Award className="h-4 w-4" />
                <span className="text-xs font-bold tracking-widest uppercase">About Us</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-[#172B4D] dark:text-white mb-4">Who We Are</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                WorkSphere is an enterprise intelligence platform built to bridge the gap between organizational efficiency and technological innovation. We help leadership teams gain clarity into their operations with data-driven insights.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                Our mission is to transform workforce telemetry into actionable business intelligence.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-headline font-black text-brand mb-1">100%</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#172B4D] dark:text-white">Data Control</div>
                </div>
                <div>
                  <div className="text-2xl font-headline font-black text-brand mb-1">24/7</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#172B4D] dark:text-white">Active Monitoring</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand to-cyan-500 rounded-2xl rotate-3 opacity-20 blur-2xl" />
              <img src="/corporate_headquarters.png" alt="WorkSphere Headquarters" className="w-full h-[400px] object-cover rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl relative z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-slate-50 dark:bg-[#05060A] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest text-brand mb-4 uppercase">Our Offerings</p>
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-[#172B4D] dark:text-white mb-4">Enterprise Services</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm">Comprehensive solutions to manage, analyze, and secure your workforce.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: 'Activity Telemetry', desc: 'Real-time tracking of application usage, idle times, and productivity metrics.' },
              { icon: Cpu, title: 'AI Analytics', desc: 'Machine learning that detects burnout, anomalies, and productivity patterns.' },
              { icon: ShieldCheck, title: 'Compliance Automation', desc: 'Automated reporting for SOC 2, HIPAA, and GDPR compliance.' },
              { icon: Lock, title: 'Access Control', desc: 'Role-based permissions with biometric and multi-factor authentication.' },
              { icon: MessageSquare, title: 'Team Collaboration', desc: 'Encrypted messaging and file sharing built into the platform.' },
              { icon: Globe, title: 'Global Tracking', desc: 'Geo-fencing and location services for distributed teams.' },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 82, 204, 0.08)" }}
                className="group relative p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl hover:border-brand/50 transition-all duration-300 shadow-sm"
              >
                <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand transition-colors duration-300">
                  <service.icon className="h-5 w-5 text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-[#172B4D] dark:text-white mb-2">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand/5 border-y border-brand/10">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "99.99%", label: "Uptime", sub: "Enterprise reliability" },
            { value: "< 12ms", label: "Latency", sub: "Real-time data processing" },
            { value: "50M+", label: "Events/Day", sub: "Behavioral data points" },
            { value: "100%", label: "Coverage", sub: "Full workforce visibility" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-sm"
            >
              <div className="text-3xl lg:text-4xl font-headline font-bold text-brand mb-1">{stat.value}</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-[#172B4D] dark:text-white mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest text-brand mb-4 uppercase">Platform Capabilities</p>
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-[#172B4D] dark:text-white mb-4">Built for the Enterprise</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm">Everything you need to manage your workforce in one platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BarChart3, title: "Analytics", desc: "Deep insights into productivity and performance trends." },
              { icon: Camera, title: "Attendance", desc: "Facial recognition and GPS-verified check-ins." },
              { icon: Timer, title: "Time Tracking", desc: "Automated time logging with idle detection." },
              { icon: Bell, title: "Alerts", desc: "Real-time notifications for key events and anomalies." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0, 82, 204, 0.08)" }}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl hover:border-brand/50 transition-all cursor-pointer shadow-sm"
              >
                <div className="h-10 w-10 rounded-lg bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand transition-colors">
                  <f.icon className="h-5 w-5 text-brand group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-[#172B4D] dark:text-white mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-slate-50 dark:bg-[#05060A] border-t border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-headline font-bold tracking-tight mb-6 text-[#172B4D] dark:text-white">
              Ready to get started?
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto">
              Sign in to your account or explore the platform with demo credentials.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="px-12 py-4 bg-brand text-white rounded-lg font-semibold text-sm shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
