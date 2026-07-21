import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const amenities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Grand Entrance Arch',
    desc: 'Premium architectural gateway with manned access control and green pathways.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '24/7 Smart Security',
    desc: 'CCTV surveillance, guarded boom barriers, and round-the-clock patrol.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Jogging & Walking Track',
    desc: 'Scenic paved walking tracks wrapping around the entire estate perimeter.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Landscaped Gardens',
    desc: 'Lush theme parks, avenue plantations, and pristine seating alcoves.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <path d="M3 6l9-4 9 4v12l-9 4-9-4V6z" />
      </svg>
    ),
    title: 'Overhead Water Tank',
    desc: 'Continuous clean water supply linked directly to every single villa plot.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Rainwater Harvesting',
    desc: 'Eco-friendly recharge pits and drainage systems to replenish groundwater.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      </svg>
    ),
    title: 'Solar Street Lights',
    desc: 'Underground power cabling, solar street lights, and transformer stations.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.2" strokeLinecap="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
    title: 'Children Play Area',
    desc: 'Dedicated kids play park with modern safe slides, swings, and rubberized flooring.',
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="relative py-16 sm:py-20 lg:py-28 text-stone-900 overflow-hidden border-t border-forest-900/5"
    >
      {/* Decorative Leaves */}
      <Leaf strokeWidth={0.5} className="absolute -top-20 -right-20 w-[600px] h-[600px] text-forest-900/[0.02] -rotate-12 pointer-events-none" />
      <Leaf strokeWidth={0.5} className="absolute top-1/2 -left-40 w-[500px] h-[500px] text-forest-900/[0.02] rotate-45 pointer-events-none" />

      {/* Blobs */}
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-0 w-[30vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(17,50,34,0.05) 0%, transparent 70%)' }} />
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(45,107,79,0.05) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20 text-left">
          <FadeIn delay={0.1}>
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-plum-brand">
              Premium Lifestyle
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-forest-900">
              World-Class Amenities for{' '}
              <span className="italic font-normal text-plum-brand">Modern Living</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 font-sans text-sm md:text-base text-stone-650 leading-relaxed max-w-2xl">
              Every detail is meticulously planned to offer you the perfect blend of natural tranquility and
              urban utility, creating an unparalleled villa lifestyle.
            </p>
          </FadeIn>
        </div>

        {/* Grid of 8 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {amenities.map((item, idx) => (
            <FadeIn key={item.title} delay={0.05 + idx * 0.06}>
              <div className="relative group p-5 sm:p-6 glass-panel border-t-[3px] border-t-vibrant-green squircle-lg flex flex-col gap-4 z-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.03] hover:border-t-plum-brand hover:z-20 h-full">
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-forest-50 text-plum-brand">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg text-forest-900 mb-2">{item.title}</h4>
                  <p className="font-sans text-xs sm:text-sm text-stone-550 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
