/**
 * CinematicFilm.tsx
 * Award-winning premium cinematic promotional film experience for Vivanta Green Meadows.
 * 10 scenes · Ken Burns animation · Cinematic overlays · Particle dust motes · Brand logo end card
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Scene Images (via @assets alias → attached_assets) ─────────────────────
import scene1 from '@assets/generated_images/scene1-sunrise-aerial.jpg';
import scene2 from '@assets/generated_images/entrance-arch.jpg';
import scene2b from '@assets/generated_images/avenue-road.jpg';
import scene3 from '@assets/generated_images/scene3-plots-closeup.jpg';
import scene4 from '@assets/generated_images/scene4-amenities-clubhouse.jpg';
import scene4b from '@assets/generated_images/landscaped-gardens.jpg';
import scene5 from '@assets/generated_images/scene5-family-lifestyle.jpg';
import scene6 from '@assets/generated_images/scene6-location-highway.jpg';
import scene1b from '@assets/generated_images/drone-view.jpg';
import scene7 from '@assets/generated_images/scene7-sunset-masterplan.jpg';

// ─── Types ────────────────────────────────────────────────────────────────────
type KenBurnsType = 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right' | 'pan-up';

interface Scene {
  id: number;
  img: string;
  duration: number;
  label: string;
  sublabel: string;
  kenBurns: KenBurnsType;
  colorGrade: string;
  overlayOpacity: number;
}

// ─── Scene Data ───────────────────────────────────────────────────────────────
const SCENES: Scene[] = [
  { id: 1,  img: scene1,  duration: 7,  label: 'Where It All Begins',       sublabel: 'A new dawn over Vivanta Green Meadows',             kenBurns: 'zoom-in',   colorGrade: 'brightness(1.05) saturate(1.3) contrast(1.05)',  overlayOpacity: 0.28 },
  { id: 2,  img: scene2,  duration: 8,  label: 'Grand Entrance',             sublabel: 'Where luxury greets you at the gates',              kenBurns: 'pan-right', colorGrade: 'brightness(1.02) saturate(1.25) contrast(1.08)', overlayOpacity: 0.22 },
  { id: 3,  img: scene2b, duration: 7,  label: 'Planned for Perfection',     sublabel: 'Premium avenue roads & thoughtful infrastructure',  kenBurns: 'pan-left',  colorGrade: 'brightness(1.0) saturate(1.35) contrast(1.1)',   overlayOpacity: 0.25 },
  { id: 4,  img: scene3,  duration: 9,  label: 'Your Plot. Your Canvas.',    sublabel: 'Perfectly demarcated villa plots await',            kenBurns: 'zoom-out',  colorGrade: 'brightness(1.04) saturate(1.2) contrast(1.06)',  overlayOpacity: 0.20 },
  { id: 5,  img: scene4,  duration: 10, label: "Life's Finest Amenities",    sublabel: 'Clubhouse · Gardens · Play Areas · Walking Tracks', kenBurns: 'pan-up',    colorGrade: 'brightness(1.06) saturate(1.4) contrast(1.05)',  overlayOpacity: 0.18 },
  { id: 6,  img: scene4b, duration: 8,  label: 'Nature as Your Neighbour',   sublabel: 'Landscaped gardens · Open green spaces · Fresh air',kenBurns: 'zoom-in',   colorGrade: 'brightness(1.03) saturate(1.5) contrast(1.04)',  overlayOpacity: 0.15 },
  { id: 7,  img: scene5,  duration: 9,  label: 'A Life Well Lived',          sublabel: 'Families · Children · Professionals · Community',  kenBurns: 'pan-right', colorGrade: 'brightness(1.05) saturate(1.3) contrast(1.07)',  overlayOpacity: 0.22 },
  { id: 8,  img: scene6,  duration: 8,  label: 'Strategically Connected',    sublabel: 'Highways · Schools · Hospitals · Business Hubs',   kenBurns: 'zoom-out',  colorGrade: 'brightness(1.0) saturate(1.2) contrast(1.1)',    overlayOpacity: 0.30 },
  { id: 9,  img: scene1b, duration: 8,  label: 'The Bigger Picture',         sublabel: "Bengaluru East's most sought-after address",        kenBurns: 'pan-left',  colorGrade: 'brightness(1.04) saturate(1.35) contrast(1.06)', overlayOpacity: 0.25 },
  { id: 10, img: scene7,  duration: 10, label: 'The Grand Reveal',           sublabel: 'Vivanta Green Meadows — Hoskote · Bengaluru East',  kenBurns: 'zoom-out',  colorGrade: 'brightness(1.0) saturate(1.45) contrast(1.08)',  overlayOpacity: 0.32 },
];

const TOTAL_DURATION = SCENES.reduce((s, sc) => s + sc.duration, 0);

// ─── Ken Burns ────────────────────────────────────────────────────────────────
const KB: Record<KenBurnsType, { from: string; to: string }> = {
  'zoom-in':   { from: 'scale(1) translate(0,0)',      to: 'scale(1.12) translate(0,0)' },
  'zoom-out':  { from: 'scale(1.12) translate(0,0)',   to: 'scale(1) translate(0,0)' },
  'pan-left':  { from: 'scale(1.08) translate(3%,0)',  to: 'scale(1.08) translate(-3%,0)' },
  'pan-right': { from: 'scale(1.08) translate(-3%,0)', to: 'scale(1.08) translate(3%,0)' },
  'pan-up':    { from: 'scale(1.08) translate(0,2%)',  to: 'scale(1.08) translate(0,-2%)' },
};

// ─── Film Grain Canvas ────────────────────────────────────────────────────────
function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const draw = () => {
      const w = canvas.width || canvas.offsetWidth;
      const h = canvas.height || canvas.offsetHeight;
      if (w === 0 || h === 0) { animRef.current = requestAnimationFrame(draw); return; }
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const n = (Math.random() * 20) - 10;
        data[i] = 128 + n; data[i+1] = 128 + n; data[i+2] = 128 + n;
        data[i+3] = Math.random() * 10 + 3;
      }
      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(draw);
    };
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    draw();
    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 25, pointerEvents: 'none', opacity: 0.04, mixBlendMode: 'overlay' }}
    />
  );
}

// ─── Particle Dust Motes ──────────────────────────────────────────────────────
function DustParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    opacity: Math.random() * 0.4 + 0.08,
    dur: 16 + Math.random() * 14,
    delay: Math.random() * 8,
    dx: (Math.random() - 0.5) * 80,
    dy: -(Math.random() * 60 + 20),
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 22, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: `rgba(255,220,100,${p.opacity})`,
            filter: 'blur(0.4px)',
          }}
          animate={{ x: [0, p.dx], y: [0, p.dy], opacity: [p.opacity, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'linear', delay: p.delay }}
        />
      ))}
    </div>
  );
}

// ─── Lens Flare ───────────────────────────────────────────────────────────────
function LensFlare({ sceneId }: { sceneId: number }) {
  if (![1, 5, 9, 10].includes(sceneId)) return null;
  return (
    <motion.div
      style={{ position: 'absolute', top: '14%', right: '18%', zIndex: 28, pointerEvents: 'none' }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.8, 0.5, 0.9, 0], scale: [0.5, 1, 1.3, 1, 0.7] }}
      transition={{ duration: 3, times: [0, 0.2, 0.5, 0.8, 1] }}
    >
      <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,180,0.65) 0%, rgba(255,200,60,0.25) 40%, transparent 70%)', filter: 'blur(10px)' }} />
      <div style={{ position: 'absolute', top: '42%', left: -90, width: 220, height: 3, background: 'linear-gradient(90deg, transparent, rgba(255,220,100,0.5), transparent)', transform: 'rotate(-18deg)' }} />
    </motion.div>
  );
}

// ─── Scene Layer ──────────────────────────────────────────────────────────────
function SceneLayer({ scene, active }: { scene: Scene; active: boolean }) {
  const kb = KB[scene.kenBurns];
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={scene.id}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ position: 'absolute', inset: '-5%', width: '110%', height: '110%' }}
            initial={{ transform: kb.from }} animate={{ transform: kb.to }}
            transition={{ duration: scene.duration + 1.5, ease: 'linear' }}
          >
            <img src={scene.img} alt={scene.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: scene.colorGrade, display: 'block' }} draggable={false} />
          </motion.div>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,${scene.overlayOpacity * 0.5}) 0%, transparent 30%, transparent 65%, rgba(0,0,0,${scene.overlayOpacity}) 100%)` }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,200,80,0.04) 0%, transparent 50%, rgba(60,30,0,0.06) 100%)', pointerEvents: 'none' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── End Card ─────────────────────────────────────────────────────────────────
function EndCard({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="end-card"
          style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.55) 100%)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
            initial={{ scale: 0.78, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo circle */}
            <div style={{ width: 68, height: 68, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(212,175,55,0.85)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
              <svg viewBox="0 0 40 40" style={{ width: 36, height: 36 }}>
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="1" />
                <path d="M8 28 Q14 14 20 20 Q26 26 32 12" fill="none" stroke="rgba(212,175,55,0.95)" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M8 28 Q12 20 20 22 Q28 24 32 18" fill="rgba(34,85,34,0.45)" />
                <circle cx="20" cy="11" r="2.5" fill="rgba(212,175,55,0.95)" />
              </svg>
            </div>

            {/* Brand text */}
            <motion.div
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
            >
              <p style={{ color: 'rgba(212,175,55,0.95)', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.45em', textTransform: 'uppercase' }}>Vivanta</p>
              <p style={{ color: '#ffffff', fontFamily: 'Georgia, serif', fontSize: 28, letterSpacing: '0.04em', lineHeight: 1.2, marginTop: 2 }}>Green Meadows</p>
              <div style={{ marginTop: 10, height: 1, width: 100, margin: '10px auto 0', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)' }} />
              <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 11, letterSpacing: '0.1em', marginTop: 12 }}>Where Nature Meets Smart Living.</p>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 6 }}>Hoskote · Bengaluru East</p>
            </motion.div>
          </motion.div>

          {/* RERA badge */}
          <motion.p
            style={{ position: 'absolute', bottom: '13%', color: 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.9 }}
          >
            BMRDA-STRR Approved · RERA Registered
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Scene Caption ────────────────────────────────────────────────────────────
function SceneCaption({ scene, visible }: { scene: Scene; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={`cap-${scene.id}`}
          style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '0 24px', textAlign: 'center', pointerEvents: 'none' }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{ color: 'rgba(255,210,100,0.92)', fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase' }}>{scene.label}</span>
          <span style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 12 }}>{scene.sublabel}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, zIndex: 50, background: 'rgba(255,255,255,0.1)' }}>
      <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, rgba(212,175,55,0.6), rgba(212,175,55,0.95))', boxShadow: '0 0 6px rgba(212,175,55,0.6)', transition: 'width 0.1s linear' }} />
    </div>
  );
}

// ─── Scene Dots ───────────────────────────────────────────────────────────────
function SceneDots({ total, current, onJump }: { total: number; current: number; onJump: (i: number) => void }) {
  return (
    <div style={{ position: 'absolute', top: '10%', right: 14, zIndex: 40, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          style={{
            width: i === current ? 7 : 4,
            height: i === current ? 7 : 4,
            borderRadius: '50%',
            background: i === current ? 'rgba(212,175,55,0.95)' : 'rgba(255,255,255,0.28)',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.4s',
            boxShadow: i === current ? '0 0 6px rgba(212,175,55,0.7)' : 'none',
          }}
          aria-label={`Jump to scene ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ─── Play/Pause Flash ─────────────────────────────────────────────────────────
function PlayPauseFlash({ playing, visible }: { playing: boolean; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="flash"
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, pointerEvents: 'none' }}
          initial={{ opacity: 0.9, scale: 0.5 }} animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.65 }}
        >
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1.5px solid rgba(212,175,55,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {playing
              ? <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'white' }}><path d="M8 5v14l11-7z"/></svg>
              : <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: 'white' }}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            }
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Cinematic Letterbox + Vignette ──────────────────────────────────────────
function CinematicChrome() {
  return (
    <>
      {/* Letterbox bars */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6.5%', background: '#000', zIndex: 30, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6.5%', background: '#000', zIndex: 30, pointerEvents: 'none' }} />
      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,0.7) 100%)' }} />
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CinematicFilm() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [captionKey, setCaptionKey] = useState(0);
  const [flashVisible, setFlashVisible] = useState(false);
  const [flashPlaying, setFlashPlaying] = useState(true);

  const playingRef = useRef(true);
  const sceneStartRef = useRef(Date.now());
  const elapsedRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => { playingRef.current = playing; }, [playing]);

  const scene = SCENES[current];
  const isLast = current === SCENES.length - 1;

  const tick = useCallback(() => {
    if (playingRef.current) {
      const elapsed = elapsedRef.current + (Date.now() - sceneStartRef.current) / 1000;
      const sceneDur = SCENES[current].duration;
      const sp = Math.min(elapsed / sceneDur, 1);
      setProgress(sp);

      const before = SCENES.slice(0, current).reduce((s, sc) => s + sc.duration, 0);
      setGlobalProgress(Math.min((before + elapsed) / TOTAL_DURATION, 1));

      if (sp >= 1 && current < SCENES.length - 1) {
        elapsedRef.current = 0;
        sceneStartRef.current = Date.now();
        setCurrent((c) => c + 1);
        setProgress(0);
        setShowCaption(false);
        setCaptionKey((k) => k + 1);
        setTimeout(() => setShowCaption(true), 350);
      }
    }
    animRef.current = requestAnimationFrame(tick);
  }, [current]);

  useEffect(() => {
    sceneStartRef.current = Date.now();
    elapsedRef.current = 0;
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [tick]);

  const handleToggle = () => {
    if (playing) {
      elapsedRef.current += (Date.now() - sceneStartRef.current) / 1000;
    } else {
      sceneStartRef.current = Date.now();
    }
    const next = !playing;
    setPlaying(next);
    setFlashPlaying(next);
    setFlashVisible(true);
    setTimeout(() => setFlashVisible(false), 700);
  };

  const handleJump = (idx: number) => {
    setCurrent(idx);
    elapsedRef.current = 0;
    sceneStartRef.current = Date.now();
    setProgress(0);
    setShowCaption(false);
    setCaptionKey((k) => k + 1);
    setTimeout(() => setShowCaption(true), 350);
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden', cursor: 'pointer' }}
      onClick={handleToggle}
    >
      {/* Scene layers */}
      {SCENES.map((sc, i) => <SceneLayer key={sc.id} scene={sc} active={i === current} />)}

      {/* Cinematic chrome (letterbox + vignette) */}
      <CinematicChrome />

      {/* Film grain */}
      <FilmGrain />

      {/* Dust particles */}
      <DustParticles />

      {/* Lens flare */}
      <AnimatePresence><LensFlare sceneId={scene.id} /></AnimatePresence>

      {/* End card */}
      <EndCard visible={isLast && progress > 0.3} />

      {/* Caption */}
      {!isLast && <SceneCaption key={captionKey} scene={scene} visible={showCaption && progress < 0.88} />}

      {/* Progress bar */}
      <ProgressBar progress={globalProgress} />

      {/* Scene dots */}
      <SceneDots total={SCENES.length} current={current} onJump={(i) => { handleJump(i); }} />

      {/* Play/pause flash */}
      <PlayPauseFlash playing={flashPlaying} visible={flashVisible} />

      {/* 4K badge */}
      <div style={{ position: 'absolute', top: '10%', left: 14, zIndex: 40, pointerEvents: 'none' }}>
        <span style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase' }}>4K · Cinematic · 24fps</span>
      </div>

      {/* Pause indicator */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            style={{ position: 'absolute', top: '10%', right: 28, zIndex: 40, display: 'flex', alignItems: 'center', gap: 2, pointerEvents: 'none' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div style={{ width: 3, height: 13, borderRadius: 2, background: 'rgba(255,255,255,0.55)' }} />
            <div style={{ width: 3, height: 13, borderRadius: 2, background: 'rgba(255,255,255,0.55)' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
