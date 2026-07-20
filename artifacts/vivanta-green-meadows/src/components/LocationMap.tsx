import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Landmark proximity data ────────────────────────────────────────────────
const LANDMARKS = [
  { icon: '🛣️', label: 'Old Madras Road (NH 75)',     distance: '5 min',  color: '#d4af37' },
  { icon: '🏫', label: 'MVJ College of Engineering',   distance: '2 min',  color: '#4ade80' },
  { icon: '🏥', label: 'Sri Sathya Sai Hospital',      distance: '8 min',  color: '#f87171' },
  { icon: '✈️', label: 'Kempegowda Int. Airport',      distance: '45 min', color: '#60a5fa' },
  { icon: '🏙️', label: 'Whitefield Tech Hub',          distance: '20 min', color: '#a78bfa' },
  { icon: '🚉', label: 'Hoskote Town Centre',          distance: '10 min', color: '#fb923c' },
];

// ─── Stat counter ────────────────────────────────────────────────────────────
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, to);
      setVal(start);
      if (start >= to) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function LocationMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'map' | 'satellite'>('map');

  // Google Maps embed URL (place ID for Vivanta Green Meadows, Hoskote)
  const MAPS_EMBED =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.208982398!2d77.80215!3d13.07254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0f00526dc981%3A0x6774a5d06b4accf1!2sVIVANTA%20GREEN%20MEADOWS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  const MAPS_LINK = 'https://maps.app.goo.gl/RNc4SmM8NaYrD278A';
  const DIRECTIONS_LINK = 'https://www.google.com/maps/dir/?api=1&destination=13.07254,77.80215&destination_place_id=0x3bae0f00526dc981:0x6774a5d06b4accf1';

  return (
    <section
      id="location"
      ref={sectionRef}
      style={{ background: 'linear-gradient(to bottom, #0a1f12, #081a0f)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative top border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />

      {/* Background radial glows */}
      <div style={{ position: 'absolute', top: '20%', left: '-15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,85,34,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56, textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.6)' }} />
            <span style={{ color: 'rgba(212,175,55,0.85)', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase' }}>Find Us</span>
            <div style={{ height: 1, width: 40, background: 'rgba(212,175,55,0.6)' }} />
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 48px)', color: '#ffffff', fontWeight: 400, marginBottom: 12 }}>
            Strategically Located,<br />
            <span style={{ color: 'rgba(212,175,55,0.9)', fontStyle: 'italic' }}>Effortlessly Connected</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'sans-serif', fontSize: 14, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Vivanta Green Meadows sits at the epicentre of Bengaluru East's fastest-growing corridor — minutes from major highways, institutions, and lifestyle hubs.
          </p>
        </motion.div>

        {/* Proximity stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 40 }}
        >
          {[
            { value: 5, suffix: ' min', label: 'to NH-75' },
            { value: 20, suffix: ' min', label: 'to Whitefield' },
            { value: 45, suffix: ' min', label: 'to Airport' },
            { value: 95, suffix: '+', label: 'Premium Plots' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{ textAlign: 'center', padding: '20px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: 8 }}
            >
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: 'rgba(212,175,55,0.9)', marginBottom: 4, fontWeight: 400 }}>
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main grid: map + info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>

          {/* Map container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
          >
            {/* Map type toggle */}
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 0, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)' }}>
              {(['map', 'satellite'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '6px 14px',
                    fontSize: 10,
                    fontFamily: 'sans-serif',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'all 0.3s',
                    background: activeTab === tab ? 'rgba(212,175,55,0.9)' : 'rgba(0,0,0,0.55)',
                    color: activeTab === tab ? '#000' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Pin badge */}
            <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 6, backdropFilter: 'blur(8px)' }}>
              <span style={{ fontSize: 14 }}>📍</span>
              <div>
                <p style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1 }}>VIVANTA GREEN MEADOWS</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.08em', marginTop: 2 }}>Hoskote, Bengaluru East</p>
              </div>
            </div>

            {/* Loading shimmer */}
            {!mapLoaded && (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0d2b18, #142e1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', border: '2px solid rgba(212,175,55,0.3)', borderTopColor: 'rgba(212,175,55,0.9)', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.2em' }}>LOADING MAP</p>
                </div>
              </div>
            )}

            {/* Google Maps iframe */}
            <iframe
              title="Vivanta Green Meadows Location"
              src={activeTab === 'satellite'
                ? MAPS_EMBED.replace('!5e0', '!5e1')
                : MAPS_EMBED}
              width="100%"
              height="480"
              style={{ border: 0, display: 'block', filter: 'hue-rotate(0deg) saturate(1.1) brightness(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
            />

            {/* Bottom gradient fade */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: 'linear-gradient(to top, rgba(10,31,18,0.5), transparent)', pointerEvents: 'none' }} />
          </motion.div>

          {/* Info card + landmarks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Address card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.18)', borderRadius: 10, padding: '24px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 16 }}>📍</span>
                </div>
                <div>
                  <p style={{ color: 'rgba(212,175,55,0.9)', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Project Address</p>
                  <p style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: 15, marginTop: 2 }}>Vivanta Green Meadows</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: 13, lineHeight: 1.7, borderLeft: '2px solid rgba(212,175,55,0.3)', paddingLeft: 12 }}>
                Near MVJ Medical College, Kodihalli,<br />
                Hoskote, Bengaluru Rural<br />
                Karnataka — 562114
              </p>
              <div style={{ marginTop: 16, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {['BMRDA STRR', 'RERA Reg.', 'A & E Khata'].map(b => (
                  <span key={b} style={{ padding: '3px 8px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 4, color: 'rgba(212,175,55,0.8)', fontSize: 9, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{b}</span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, minWidth: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 20px', background: 'rgba(212,175,55,0.9)', color: '#000', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 6, transition: 'all 0.25s', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(212,175,55,1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(212,175,55,0.9)')}
              >
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'currentColor' }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                View on Maps
              </a>
              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, minWidth: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 20px', background: 'transparent', color: 'rgba(212,175,55,0.85)', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 6, border: '1px solid rgba(212,175,55,0.4)', transition: 'all 0.25s', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(212,175,55,0.1)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: 'currentColor' }}>
                  <path d="M21.71 11.29l-9-9a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 011-1h5V7.5l3.5 3.5-3.5 3.5z" />
                </svg>
                Get Directions
              </a>
            </div>

            {/* Share Location */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'Vivanta Green Meadows', url: 'https://maps.app.goo.gl/RNc4SmM8NaYrD278A' });
                } else {
                  navigator.clipboard.writeText('https://maps.app.goo.gl/RNc4SmM8NaYrD278A');
                  alert('Map link copied!');
                }
              }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 20px', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            >
              <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: 'currentColor' }}>
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
              </svg>
              Share Location
            </button>

            {/* Nearby Landmarks */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '20px' }}>
              <p style={{ color: 'rgba(212,175,55,0.75)', fontFamily: 'sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 14 }}>Nearby Landmarks</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {LANDMARKS.map((lm, i) => (
                  <motion.div
                    key={lm.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{lm.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif', fontSize: 12, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lm.label}</p>
                      <p style={{ color: lm.color, fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, marginTop: 2 }}>{lm.distance}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Plus code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          style={{ marginTop: 40, textAlign: 'center' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.15em' }}>
            Plus Code: <span style={{ color: 'rgba(255,255,255,0.45)' }}>2RC2+GVM</span> · Kodihalli, Hoskote, Karnataka
          </p>
        </motion.div>
      </div>

      {/* Decorative bottom border */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      {/* Spin keyframe injection */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
