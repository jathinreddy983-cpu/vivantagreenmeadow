import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gardenImg from '@assets/generated_images/landscaped-gardens.jpg';

const stats = [
  { value: '95+', label: 'Premium Plots' },
  { value: '14+', label: 'Lifestyle Amenities' },
  { value: '25%', label: 'Annual Appreciation' },
  { value: '5 Mins', label: 'To Old Madras Road' },
];

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <p className="font-serif text-3xl sm:text-4xl text-plum-brand">{value}</p>
      <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 mt-1">{label}</p>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ background: 'linear-gradient(to bottom, #C3DCBE, #E2EFE0, #ffffff)' }}
    >
      {/* Subtle decorative blobs */}
      <div className="absolute top-20 right-0 w-[35vw] h-[35vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-32 left-0 w-[25vw] h-[25vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(17,50,34,0.06) 0%, transparent 70%)' }} />

      {/* Navbar spacer */}
      <div className="relative z-10 flex-grow pt-20 w-full">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          {/* Badges row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forest-900/20 text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-forest-800 bg-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block" />
              BMRDA STRR Approved
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-forest-900/20 text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-forest-800 bg-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 inline-block" />
              'A' &amp; 'E' Khata Sites
            </span>
            <span className="text-[9px] font-sans font-bold tracking-[0.25em] uppercase text-forest-700">
              BMRDA-STRR Approved • RERA Registered
            </span>
          </motion.div>

          {/* Grid: left content + right image card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs lg:text-sm font-sans tracking-[0.4em] uppercase text-forest-800 font-semibold"
              >
                Welcome to Bengaluru East's Premium Address
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-plum-brand select-none"
              >
                &ldquo; A Premium Address for{' '}
                <span className="italic font-normal">Elevated Living</span>&rdquo;
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="max-w-xl font-sans text-sm sm:text-base text-stone-700 tracking-wide leading-relaxed"
              >
                Luxury Villa Plots thoughtfully designed for discerning families and smart investors.
                Nestled along the high-appreciation, rapidly developing{' '}
                <span className="text-plum-brand font-semibold underline decoration-gold-500/60 decoration-2">
                  Hoskote - Whitefield Corridor
                </span>
                .
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-row gap-4 w-full sm:w-auto"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 squircle-lg bg-forest-900 hover:bg-forest-800 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-luxury-md hover:scale-[1.02]"
                >
                  Book Visit
                </a>
                <button
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 squircle-lg border border-forest-800/20 hover:border-forest-800/80 bg-white/60 hover:bg-white/95 text-forest-900 font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                  onClick={() => alert('Story Video Coming Soon!')}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-plum-brand">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Story
                </button>
              </motion.div>
            </div>

            {/* Right: Image card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
              >
                <div className="relative group p-3 bg-white/75 backdrop-blur-md border border-forest-900/10 squircle-lg shadow-luxury-lg overflow-hidden transition-all duration-500 hover:shadow-luxury-xl">
                  <div className="relative overflow-hidden squircle-md aspect-square bg-forest-50">
                    <img
                      src={gardenImg}
                      alt="Luxury Landscape"
                      className="w-full h-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="mt-4 text-center pb-2">
                    <h3 className="font-serif text-2xl text-plum-brand tracking-wide drop-shadow-sm select-none">
                      Green address in{' '}
                      <span className="italic text-forest-800">city limits</span>
                    </h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 sm:mt-16 md:mt-24 w-full border-t border-forest-900/10 pt-8 sm:pt-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, i) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Scroll to Explore */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col items-center gap-2 mt-12 text-forest-700/60 hover:text-forest-900 transition-colors cursor-pointer"
            onClick={() => document.getElementById('heritage')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="font-sans text-[10px] uppercase tracking-widest">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
