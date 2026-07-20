import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Logo Component
function Logo({ size = 42 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5 group">
      {/* Building SVG */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="38" width="18" height="40" rx="1" fill="#1b4332" />
        <rect x="14" y="42" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="21" y="42" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="14" y="52" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="21" y="52" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="14" y="62" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="21" y="62" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="36" y="24" width="28" height="54" rx="1" fill="#2d6b4f" />
        <line x1="50" y1="24" x2="50" y2="16" stroke="#2d6b4f" strokeWidth="2" strokeLinecap="round" />
        <rect x="39" y="30" width="8" height="7" rx="0.5" fill="#c3dcbe" />
        <rect x="53" y="30" width="8" height="7" rx="0.5" fill="#c3dcbe" />
        <rect x="39" y="42" width="8" height="7" rx="0.5" fill="#c3dcbe" />
        <rect x="53" y="42" width="8" height="7" rx="0.5" fill="#c3dcbe" />
        <rect x="39" y="54" width="8" height="7" rx="0.5" fill="#c3dcbe" />
        <rect x="53" y="54" width="8" height="7" rx="0.5" fill="#c3dcbe" />
        <rect x="70" y="44" width="18" height="34" rx="1" fill="#1b4332" />
        <rect x="72" y="48" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="79" y="48" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="72" y="58" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <rect x="79" y="58" width="5" height="5" rx="0.5" fill="#a8d5b5" />
        <line x1="10" y1="78" x2="90" y2="78" stroke="#2d6b4f" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 88 20 C 94 14 100 18 96 26 C 92 32 84 30 88 20 Z" fill="#4a9b6f" />
        <path d="M 88 20 C 92 22 94 26 92 28" stroke="#2d6b4f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="font-serif font-bold uppercase tracking-[0.18em] text-[1.05em]" style={{ color: '#113222' }}>
          VIVANTA
        </span>
        <span className="font-sans text-[0.52em] uppercase tracking-[0.32em] mt-0.5" style={{ color: '#2d6b4f' }}>
          Green Meadows
        </span>
      </div>
    </div>
  );
}

const estateItems = [
  { size: '30 x 40 Plots', count: '40 Units Available' },
  { size: '30 x 45 Plots', count: '33 Units Available' },
  { size: 'Commercial', count: '3 Units Only' },
  { size: 'Odd Sites', count: '19 Units Available' },
];

const certItems = [
  { label: 'BMRDA Approved', desc: 'STRR framework aligned development structure' },
  { label: 'RERA Registered', desc: '100% legal transparency and safe investment guidelines' },
];

const connectItems = [
  { name: "Old Madras Road (NH-75)", time: "5 Mins", desc: "Fast lane access to Bengaluru CBD" },
  { name: "Whitefield / ITPL Hub", time: "20 Mins", desc: "Proximity to top tech parks & job zones" },
  { name: "Kempegowda Int'l Airport", time: "35 Mins", desc: "Seamless bypass drive via STRR route" },
  { name: "KR Puram Railway Gateway", time: "20 Mins", desc: "Immediate access to railway transits" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <div
          className={`mx-auto w-full px-6 py-4 rounded-full transition-all duration-500 flex items-center justify-between border ${
            scrolled
              ? 'bg-bentley-green-50/90 backdrop-blur-md border-forest-900/10 shadow-luxury-lg'
              : 'bg-white/10 backdrop-blur-md border-white/20 shadow-lg'
          }`}
        >
          {/* Logo */}
          <a href="#" aria-label="Vivanta Green Meadows – Home" onMouseEnter={() => setActiveDropdown(null)}>
            <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.3 }} className={`transition-all duration-500 ${!scrolled ? 'brightness-0 invert opacity-90' : ''}`}>
              <Logo size={42} />
            </motion.div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {/* The Estate */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('estate')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors focus:outline-none flex items-center gap-1 cursor-pointer ${scrolled ? 'text-forest-900 hover:text-gold-600' : 'text-white hover:text-white/80'}`}>
                The Estate <span className="text-[8px] opacity-60">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === 'estate' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(600px,90vw)] p-6 lg:p-8 glass-light squircle-lg border border-forest-900/10 shadow-luxury-lg z-50 grid grid-cols-12 gap-6 lg:gap-8 text-left"
                  >
                    <div className="col-span-7 space-y-4">
                      <h4 className="font-serif text-sm font-bold text-gold-600 border-b border-stone-200 pb-2">
                        The Estate & Layout Specs
                      </h4>
                      <p className="font-sans text-xs text-stone-600 leading-relaxed">
                        Discover carefully planned BMRDA-STRR approved residential spaces.
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        {estateItems.map(item => (
                          <div key={item.size} className="space-y-1">
                            <span className="font-serif text-xs font-bold text-forest-900 block">{item.size}</span>
                            <span className="font-sans text-[10px] text-stone-500 block">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-5 bg-white/60 p-4 rounded-xl border border-forest-900/10 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="font-sans text-[9px] font-bold tracking-widest text-gold-600 uppercase block">
                          Certifications
                        </span>
                        {certItems.map(c => (
                          <div key={c.label} className="space-y-0.5">
                            <span className="font-serif text-xs font-semibold text-forest-900 block">{c.label}</span>
                            <span className="font-sans text-[10px] text-stone-500 block leading-normal">{c.desc}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#master-plan" className="font-sans text-[10px] tracking-wider uppercase text-gold-600 hover:text-gold-700 transition-colors pt-4 block">
                        View Map →
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Connectivity */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('connectivity')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors focus:outline-none flex items-center gap-1 cursor-pointer ${scrolled ? 'text-forest-900 hover:text-gold-600' : 'text-white hover:text-white/80'}`}>
                Connectivity <span className="text-[8px] opacity-60">▼</span>
              </button>
              <AnimatePresence>
                {activeDropdown === 'connectivity' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[450px] p-6 glass-light squircle-lg border border-forest-900/10 shadow-luxury-lg z-50 text-left space-y-4"
                  >
                    <h4 className="font-serif text-sm font-bold text-gold-600 border-b border-stone-200 pb-2">
                      Commute & Connectivity Hub
                    </h4>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed">
                      Nestled strategically along the rapid development corridor.
                    </p>
                    <div className="space-y-3 pt-2">
                      {connectItems.map(item => (
                        <div key={item.name} className="flex justify-between items-center gap-4 py-1.5 border-b border-stone-200 last:border-0">
                          <div>
                            <span className="font-serif text-xs font-bold text-forest-900 block">{item.name}</span>
                            <span className="font-sans text-[10px] text-stone-500 block">{item.desc}</span>
                          </div>
                          <span className="font-sans text-[10px] font-bold text-gold-600 shrink-0">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#amenities" className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors py-2 block ${scrolled ? 'text-forest-900 hover:text-gold-600' : 'text-white hover:text-white/80'}`}>
              Amenities
            </a>
            <a href="#contact" className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors py-2 block ${scrolled ? 'text-forest-900 hover:text-gold-600' : 'text-white hover:text-white/80'}`}>
              Contact
            </a>
            <a
              href="#contact"
              className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-2.5 rounded-full bg-forest-900 text-white hover:bg-forest-800 transition-all duration-300 shadow-luxury-sm hover:scale-[1.02]"
            >
              Book Site Visit
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 focus:outline-none transition-colors ${scrolled ? 'text-forest-900 hover:text-gold-600' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Drawer"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`w-full h-[1.5px] bg-current transition-all duration-350 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-full h-[1.5px] bg-current transition-all duration-350 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-[1.5px] bg-current transition-all duration-350 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-y-0 right-0 w-[min(320px,90vw)] bg-bentley-green-50/95 backdrop-blur-lg border-l border-forest-900/10 z-50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl md:hidden"
          >
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-stone-200 pb-4">
                <Logo size={34} />
                <button onClick={() => setMobileOpen(false)} className="text-stone-600 hover:text-forest-950 text-xs uppercase tracking-widest">
                  Close
                </button>
              </div>
              <nav className="flex flex-col space-y-4">
                {['Layout Plan', 'Amenities', 'Connectivity', 'Contact'].map((item, i) => (
                  <a
                    key={item}
                    href={`#${['master-plan', 'amenities', 'connectivity', 'contact'][i]}`}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-xs uppercase tracking-[0.2em] text-forest-900 hover:text-gold-600 py-2 block border-b border-stone-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-stone-950 font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 block shadow-lg"
            >
              Book Site Visit
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
