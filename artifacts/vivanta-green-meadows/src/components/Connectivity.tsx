import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Line, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
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

function TransitMap3D() {
  const routes = useMemo(() => {
    const origin = mapHubs.find(h => h.primary)!;
    const ox = origin.x - 50;
    const oy = origin.y - 50;
    
    return mapHubs.filter(h => !h.primary).map(h => {
      const hx = h.x - 50;
      const hy = h.y - 50;
      // Define points for a curved line or a direct dashed line
      return {
        points: [[ox, 0.5, oy], [hx, 0.5, hy]] as [number, number, number][],
        color: h.label.includes('Metro') ? '#2d6b4f' : '#c5a880',
        dashed: true
      };
    });
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 15]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      
      {/* 3D Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f4faf4" />
      </mesh>
      
      {/* Grid overlay for aesthetic */}
      <gridHelper args={[100, 20, '#2d6b4f', '#2d6b4f']} position={[0, 0.05, 0]} material-opacity={0.08} material-transparent />

      {/* Routes */}
      {routes.map((r, i) => (
        <Line key={`route-${i}`} points={r.points} color={r.color} lineWidth={2.5} dashed dashScale={20} dashSize={1} dashOffset={-i * 0.5} />
      ))}

      {/* Map Hubs */}
      {mapHubs.map((hub, i) => {
        const x = hub.x - 50;
        const z = hub.y - 50;
        const isPrimary = hub.primary;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, isPrimary ? 1.5 : 0.75, 0]} castShadow>
              {isPrimary ? (
                <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
              ) : (
                <sphereGeometry args={[1.2, 32, 32]} />
              )}
              <meshStandardMaterial color={isPrimary ? '#2d6b4f' : '#c5a880'} metalness={0.2} roughness={0.5} />
            </mesh>
            
            {/* Label */}
            <Html position={[0, isPrimary ? 4 : 2.5, 0]} center zIndexRange={[100, 0]}>
              <div className="bg-white/95 px-2 py-1 rounded shadow-lg text-forest-900 border border-stone-200 whitespace-nowrap text-[10px] font-bold font-sans select-none pointer-events-none">
                {hub.label}
              </div>
            </Html>
          </group>
        );
      })}
      
      {/* Restrict camera angles */}
      <OrbitControls 
        makeDefault
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.15} 
        minPolarAngle={Math.PI / 4} 
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </>
  );
}

export default function Connectivity() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section
      id="connectivity"
      className="relative py-16 sm:py-20 lg:py-28 text-forest-900 overflow-hidden border-t border-forest-900/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20 text-center mx-auto">
          <FadeIn delay={0.1}>
            <span className="text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase text-plum-brand">
              Proximity Highlights
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-forest-900">
              A Symphony of<br className="hidden sm:block" />{' '}
              <span className="italic font-normal text-plum-brand">Great Connectivity</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-6 font-sans text-base md:text-lg lg:text-xl text-stone-650 leading-relaxed max-w-2xl mx-auto">
              Perfectly positioned between the tranquil beauty of nature and the vibrant utility hubs of East Bengaluru.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Tabs */}
          <div>
            {/* Tab buttons */}
            <div className="flex flex-wrap gap-3 mb-8 border-b border-stone-200 pb-5">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs md:text-sm font-sans uppercase tracking-wider font-bold px-5 py-2.5 squircle-sm transition-all ${
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
                    className="flex items-center justify-between gap-4 p-5 sm:p-6 glass-panel border-t-[3px] border-t-vibrant-green squircle-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-t-plum-brand"
                  >
                    <div>
                      <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-forest-900 block leading-tight">{item.name}</span>
                      <span className="font-sans text-xs md:text-sm text-stone-600 block mt-1.5">{item.desc}</span>
                    </div>
                    <span className="font-sans text-sm md:text-base font-bold text-gold-600 shrink-0 bg-gold-500/10 px-3 py-1.5 squircle-sm whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Map */}
          <FadeIn delay={0.3}>
            <div className="relative p-6 sm:p-8 rounded-3xl glass-panel shadow-luxury-md overflow-hidden aspect-[4/3] flex flex-col justify-between">
              <div className="text-xs md:text-sm font-sans font-bold tracking-[0.25em] uppercase text-gold-600 mb-4">
                Transit Corridor Maps
              </div>
              {/* 3D WebGL Canvas Map */}
              <div className="relative flex-grow my-4 rounded-xl overflow-hidden glass-light flex flex-col justify-center items-center w-full shadow-inner border border-stone-200/50 cursor-grab active:cursor-grabbing">
                <Canvas shadows camera={{ position: [0, 45, 55], fov: 40 }} className="w-full h-full min-h-[250px]">
                  <TransitMap3D />
                </Canvas>
              </div>
              <p className="text-[10px] font-sans text-stone-400 text-center mt-2">
                Drag to explore the 3D map • Hover over cards for details
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
