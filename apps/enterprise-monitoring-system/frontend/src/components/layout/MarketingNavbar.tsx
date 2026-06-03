import { motion } from 'framer-motion'
import { Hexagon, MessageSquare, Sun, Moon } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useContact } from './ContactContext'
import { useTheme } from './ThemeContext'

export function MarketingNavbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { openContact } = useContact()
  const { isDark, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Product', path: '#product' },
    { name: 'Know About', path: '#about' },
    { name: 'Services', path: '#services' },
    { name: 'Infrastructure', path: '#infrastructure' },
    { name: 'Specs', path: '#features' },
  ]

  const handleNavClick = (path: string) => {
    if (path.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + path);
      } else {
        const id = path.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl py-4 border-outline dark:border-white/10 shadow-lg dark:shadow-none' 
          : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="relative h-12 w-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 cursor-pointer">
            {/* Outer Glowing Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0052CC] to-[#008DA6] rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-700 opacity-50 blur-md"></div>
            
            {/* Base Diamond */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0065FF] to-[#0052CC] rounded-xl rotate-45 group-hover:rotate-180 transition-all duration-700 shadow-lg border border-white/20"></div>
            
            {/* Inner Floating Square */}
            <div className="absolute inset-2 bg-gradient-to-tr from-white to-[#F4F5F7] rounded-lg -rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-inner overflow-hidden">
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
               <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0052CC] to-[#008DA6] text-xl leading-none italic z-10 drop-shadow-sm">N</span>
            </div>
          </div>
          <span className="text-2xl font-display font-black tracking-tighter uppercase text-[#172B4D] dark:text-white transition-colors ml-2">Nexus<span className="text-[#0052CC]">HR</span></span>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.3em]">
          {navItems.map((item, i) => (
            <motion.button 
              key={item.name} 
              onClick={() => handleNavClick(item.path)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`transition-colors relative group cursor-pointer ${location.hash === item.path ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-[#A0AEC0] hover:text-slate-900 dark:hover:text-white'}`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-brand transition-all duration-300 ${location.hash === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </motion.button>
          ))}
          
          <motion.button 
            onClick={openContact}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 dark:text-[#A0AEC0] hover:text-slate-900 dark:hover:text-white transition-colors relative group flex items-center gap-2 cursor-pointer"
          >
            Contact
            <span className="absolute -bottom-2 left-0 h-0.5 bg-pastel-blue w-0 group-hover:w-full transition-all duration-300" />
          </motion.button>
        </div>

        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm dark:shadow-none cursor-pointer"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button 
            onClick={() => navigate('/login')}
            className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-[#A0AEC0] hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-brand dark:hover:bg-brand hover:text-white transition-all duration-500 shadow-xl shadow-slate-200 dark:shadow-white/5 cursor-pointer"
          >
            Explore Now
          </button>
        </div>
      </div>
    </nav>
  )
}
