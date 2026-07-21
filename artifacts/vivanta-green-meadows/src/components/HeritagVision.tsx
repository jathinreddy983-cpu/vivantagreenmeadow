import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const pillars = [
  {
    subtitle: 'Nature First',
    title: 'Preserved Ecosystems',
    desc: 'Over 30% of the layout is dedicated to green corridors, wildflower patches, and tree plantations — untouched and thriving.',
  },
  {
    subtitle: 'Smart Planning',
    title: 'Wide Internal Roads',
    desc: 'All internal roads are 30-ft wide, tar-topped, and tree-lined. Pedestrian pathways are separated for safe family walks.',
  },
  {
    subtitle: 'Investment Grade',
    title: 'BMRDA Compliance',
    desc: 'Every plot is individually BMRDA-STRR approved with A & E Khata titles — the highest standard for land ownership in Karnataka.',
  },
];

function FadeIn({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const initial = direction === 'up' ? { opacity: 0, y: 24 } : direction === 'left' ? { opacity: 0, x: -24 } : { opacity: 0, x: 24 };
  return (
    <motion.div ref={ref} initial={initial} animate={visible ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  );
}

export default function HeritageVision() {
  return (
    <section
      id="heritage"
      className="relative py-16 sm:py-20 lg:py-28 text-stone-900 overflow-hidden border-t border-forest-900/5"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(197,168,128,0.08) 0%, transparent 70%)' }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left */}
          <div className="space-y-8">
            <FadeIn delay={0.1}>
              <span className="text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase text-plum-brand">
                The Heritage &amp; Vision
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-forest-900">
                Where Smart Planning Meets<br className="hidden sm:block" />{' '}
                <span className="italic font-normal text-plum-brand">Nature's Sanctuary</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="font-sans text-base md:text-lg lg:text-xl text-stone-650 leading-relaxed max-w-2xl">
                Vivanta Green Meadows was conceived with a singular vision: to create a sanctuary where modern
                architectural freedom coexists with pristine natural beauty. Rather than forcing compact high-rises
                onto the landscape, we curated{' '}
                <span className="font-semibold text-plum-brand">95 premium villa plots</span>{' '}
                that act as canvas spaces for your legacy homes. Nestled on the high-appreciation corridor
                connecting Hoskote and Whitefield, this gated enclave is surrounded by local wildflowers,
                rich birdlife, and lush tree plantations.
              </p>
            </FadeIn>
          </div>

          {/* Right: Pull Quote */}
          <FadeIn delay={0.4} direction="right">
            <div className="relative p-8 sm:p-10 rounded-3xl glass-panel shadow-luxury-lg overflow-hidden">
              <div className="absolute top-0 left-8 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full border-2 border-gold-500 flex items-center justify-center bg-white">
                  <div className="w-3.5 h-3.5 rounded-full bg-gold-500" />
                </div>
              </div>
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-forest-900 italic leading-snug border-l-2 border-plum-brand pl-6 py-2">
                &ldquo;We don&rsquo;t build layouts; we preserve ecosystems so you can design your sanctuary
                within them.&rdquo;
              </blockquote>
            </div>
          </FadeIn>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <FadeIn key={pillar.title} delay={0.1 + idx * 0.1}>
              <div className="min-h-[180px] sm:min-h-[220px] p-5 sm:p-6 glass-panel border-t-[3px] border-t-vibrant-green rounded-2xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-2.5 hover:scale-[1.03] hover:border-t-plum-brand">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="text-xs font-sans font-bold tracking-widest text-gold-600 uppercase mb-4">
                      {pillar.subtitle}
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl text-forest-900 mb-4 leading-tight">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-stone-650 text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
