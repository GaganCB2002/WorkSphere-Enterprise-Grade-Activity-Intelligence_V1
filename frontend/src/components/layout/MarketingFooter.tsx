import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin, Zap } from 'lucide-react'
import { useContact } from './ContactContext'

export function MarketingFooter() {
  const navigate = useNavigate()
  const { openContact } = useContact()

  const links = {
    product: [
      { name: 'Capabilities', path: '/product' },
      { name: 'Analytics', path: '/features/performance' },
      { name: 'Security', path: '/security' }
    ],
    company: [
      { name: 'Features', path: '/features' },
      { name: 'Solutions', path: '/solutions' },
      { name: 'Resources', path: '/resources' }
    ],
    legal: [
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' },
      { name: 'Security', path: '/security' }
    ]
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-outline dark:border-white/5 pt-20 pb-10 px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative h-10 w-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                {/* Outer Glowing Aura */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0052CC] to-[#008DA6] rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-700 opacity-50 blur-md"></div>
                
                {/* Base Diamond */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0065FF] to-[#0052CC] rounded-xl rotate-45 group-hover:rotate-180 transition-all duration-700 shadow-lg border border-white/20"></div>
                
                {/* Inner Floating Square */}
                <div className="absolute inset-1.5 bg-gradient-to-tr from-white to-[#F4F5F7] rounded-lg -rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-inner overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                   <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0052CC] to-[#008DA6] text-lg leading-none italic z-10 drop-shadow-sm">W</span>
                </div>
              </div>
              <span className="text-xl font-display font-black tracking-tighter uppercase text-[#172B4D] dark:text-white transition-colors ml-1">Work<span className="text-[#0052CC]">Sphere</span></span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#5E6C84] hover:text-[#0052CC] transition-colors cursor-pointer group">
                <Mail size={16} className="group-hover:text-[#0052CC]" />
                <span className="text-[11px] font-black uppercase tracking-widest">contact@worksphere.io</span>
              </div>
              <div className="flex items-center gap-3 text-[#5E6C84] hover:text-[#0052CC] transition-colors cursor-pointer group">
                <Phone size={16} className="group-hover:text-[#0052CC]" />
                <span className="text-[11px] font-black uppercase tracking-widest">+1 (888) 555-WORK</span>
              </div>
              <div className="flex items-center gap-3 text-[#5E6C84] hover:text-[#0052CC] transition-colors cursor-pointer group">
                <MapPin size={16} className="group-hover:text-[#0052CC]" />
                <span className="text-[11px] font-black uppercase tracking-widest">Global HQ • Silicon Valley</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Ecosystem</h4>
            <ul className="space-y-4">
              {links.product.map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => navigate(link.path)}
                    className="text-[11px] font-black uppercase tracking-widest text-[#A0AEC0] hover:text-brand transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Platform</h4>
            <ul className="space-y-4">
              {links.company.map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => navigate(link.path)}
                    className="text-[11px] font-black uppercase tracking-widest text-[#A0AEC0] hover:text-brand transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={openContact}
                  className="text-[11px] font-black uppercase tracking-widest text-pastel-blue hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Governance</h4>
            <ul className="space-y-4">
              {links.legal.map(link => (
                <li key={link.name}>
                  <button 
                    onClick={() => navigate(link.path)}
                    className="text-[11px] font-black uppercase tracking-widest text-[#A0AEC0] hover:text-brand transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-outline dark:border-white/5 gap-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">
            © 2026 WorkSphere Enterprise • All Rights Reserved
          </p>
          <div className="flex gap-8">
            <motion.div whileHover={{ y: -2 }} className="h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
