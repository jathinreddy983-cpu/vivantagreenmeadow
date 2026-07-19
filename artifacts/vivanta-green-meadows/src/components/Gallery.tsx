import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import archImg from '@assets/generated_images/entrance-arch.jpg';
import avenueImg from '@assets/generated_images/avenue-road.jpg';
import gardenImg from '@assets/generated_images/landscaped-gardens.jpg';
import droneImg from '@assets/generated_images/drone-view.jpg';
import amenitiesImg from '@assets/generated_images/amenities-pavilion.jpg';

const items = [
  { img: archImg, title: 'Grand Arch', subtitle: 'Premium Gateway Entry' },
  { img: avenueImg, title: 'Avenue', subtitle: 'Lush Avenue Road Plantation' },
  { img: gardenImg, title: 'Gardens', subtitle: 'Landscape Theme Park' },
  { img: droneImg, title: 'Drone View', subtitle: 'Estate Overview' },
  { img: amenitiesImg, title: 'Clubhouse', subtitle: 'Luxury Amenities Pavilion' },
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

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-20 lg:py-24 text-forest-900 overflow-hidden border-t border-forest-900/5"
      style={{ background: 'linear-gradient(to bottom, #d8efd4, #e8f5e4, #f0f8ef)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <FadeIn delay={0.1}>
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-plum-brand">
                Visual Journey
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-forest-900">
                A Glimpse into{' '}
                <span className="italic font-normal text-plum-brand">Elevated Living</span>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.3}>
            <div className="flex gap-3">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-forest-900/20 flex items-center justify-center bg-white/60 hover:bg-white transition-colors text-forest-900"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-forest-900/20 flex items-center justify-center bg-white/60 hover:bg-white transition-colors text-forest-900"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 px-6 lg:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="relative shrink-0 p-4 bg-white/80 backdrop-blur-md border border-forest-900/10 squircle-lg shadow-luxury-md overflow-hidden w-[85vw] sm:w-[420px] flex flex-col"
          >
            <div className="relative overflow-hidden squircle-md aspect-video w-full">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-4 pb-1">
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold-600 mb-1">
                {item.title}
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-forest-900">{item.subtitle}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
