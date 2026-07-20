import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Arterial Connectivity', 'Metro & Rail', 'Airport Access'];

const connectData: Record<string, { name: string; time: string; desc: string }[]> = {
  'Arterial Connectivity': [
    { name: 'Old Madras Road (NH-75)', time: '5 Mins', desc: 'Fast lane access to Bengaluru CBD' },
    { name: 'Whitefield / ITPL Hub', time: '20 Mins', desc: 'Proximity to top tech parks & job zones' },
    { name: 'Electronic City', time: '45 Mins', desc: 'Major IT & manufacturing corridor south' },
    { name: 'Marathahalli Bridge', time: '25 Mins', desc: 'Outer Ring Road junction connectivity' },
  ],
  'Metro & Rail': [
    { name: 'Whitefield Metro Terminus', time: '20 Mins', desc: 'Purple line extension to Kadugodi/ITPL' },
    { name: 'KR Puram Railway Gateway', time: '20 Mins', desc: 'Immediate access to railway transits' },
    { name: 'Baiyappanahalli Metro', time: '30 Mins', desc: 'Red line terminus towards Bangalore City' },
    { name: 'Upcoming STRR Metro', time: 'Future', desc: 'Planned high-speed metro on the corridor' },
  ],
  'Airport Access': [
    { name: "Kempegowda Int'l Airport", time: '35 Mins', desc: 'Seamless bypass drive via STRR route' },
    { name: 'STRR Phase 1 Route', time: 'Operational', desc: '280 km ring road bypass fully planned' },
    { name: 'Aerospace SEZ', time: '25 Mins', desc: 'Growing aviation & aerospace zone nearby' },
    { name: 'Satellite Town Ring Road', time: 'Adjacent', desc: 'STRR alignment passes close to the site' },
  ],
};

const mapHubs = [
  { label: 'Green Meadows Site', x: 50, y: 50, primary: true },
  { label: 'Whitefield Tech Hub', x: 25, y: 30 },
  { label: "Kempegowda Int'l Airport", x: 20, y: 15 },
  { label: 'Metro Extension', x: 35, y: 42 },
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

export default function Connectivity() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section
      id="connectivity"
      className="relative py-16 sm:py-20 lg:py-28 text-forest-900 overflow-hidden border-t border-forest-900/5"
      style={{ background: 'linear-gradient(to bottom, #e8f5e4, #f0f8ef, #f7fbf6)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20 text-center mx-auto">
          <FadeIn delay={0.1}>
            <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-plum-brand">
              Proximity Highlights
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-forest-900">
              A Symphony of{' '}
              <span className="italic font-normal text-plum-brand">Great Connectivity</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 font-sans text-sm md:text-base text-stone-650 leading-relaxed">
              Perfectly positioned between the tranquil beauty of nature and the vibrant utility hubs of East Bengaluru.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Tabs */}
          <div>
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-stone-200 pb-4">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[10px] sm:text-xs font-sans uppercase tracking-wider font-bold px-4 py-2 squircle-sm transition-all ${
                    activeTab === tab
                      ? 'bg-forest-900 text-white shadow-luxury-sm'
                      : 'text-forest-700 hover:bg-white/80 border border-forest-900/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {connectData[activeTab].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-start justify-between gap-4 p-4 bg-bentley-green-50/90 backdrop-blur-md border border-forest-900/10 squircle-md shadow-luxury-sm hover:shadow-luxury-md transition-all"
                  >
                    <div>
                      <span className="font-serif text-sm sm:text-base font-bold text-forest-900 block">{item.name}</span>
                      <span className="font-sans text-xs text-stone-500 block mt-0.5">{item.desc}</span>
                    </div>
                    <span className="font-sans text-xs font-bold text-gold-600 shrink-0 bg-gold-500/10 px-2.5 py-1 squircle-sm whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Map */}
          <FadeIn delay={0.3}>
            <div className="relative p-6 sm:p-8 rounded-3xl bg-bentley-green-50/90 backdrop-blur-md border border-forest-900/10 shadow-luxury-md overflow-hidden aspect-[4/3] flex flex-col justify-between">
              <div className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-gold-600 mb-4">
                Transit Corridor Maps
              </div>
              {/* SVG Map */}
              <div className="relative flex-grow my-4 border border-stone-200/30 rounded-xl overflow-hidden bg-stone-50/50 p-4 flex flex-col justify-center">
                <style>{`@keyframes dash{to{stroke-dashoffset:-40px}}`}</style>
                <svg viewBox="0 0 100 80" className="w-full h-full" style={{ maxHeight: 220 }}>
                  {/* Dashed route lines */}
                  <line x1="50" y1="50" x2="25" y2="30" stroke="#c5a880" strokeWidth="0.8" strokeDasharray="4 2"
                    style={{ animation: 'dash 1.5s linear infinite' }} />
                  <line x1="50" y1="50" x2="20" y2="15" stroke="#c5a880" strokeWidth="0.8" strokeDasharray="4 2"
                    style={{ animation: 'dash 2s linear infinite' }} />
                  <line x1="50" y1="50" x2="35" y2="42" stroke="#2d6b4f" strokeWidth="0.8" strokeDasharray="3 2"
                    style={{ animation: 'dash 1.2s linear infinite' }} />
                  {mapHubs.map((hub, i) => (
                    <g key={i}>
                      <circle cx={hub.x} cy={hub.y} r={hub.primary ? 4 : 2.5}
                        fill={hub.primary ? '#2d6b4f' : '#c5a880'} opacity={0.9} />
                      {hub.primary && <circle cx={hub.x} cy={hub.y} r={7} fill="none" stroke="#2d6b4f" strokeWidth="0.8" opacity={0.3} />}
                      <text x={hub.x + (hub.x > 50 ? -2 : 6)} y={hub.y - 3.5}
                        fontSize="4" fill="#113222" fontFamily="Georgia, serif"
                        textAnchor={hub.x > 50 ? 'end' : 'start'}
                      >
                        {hub.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <p className="text-[10px] font-sans text-stone-400 text-center">
                Hover on travel cards or map hubs to visualize transit routes
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
