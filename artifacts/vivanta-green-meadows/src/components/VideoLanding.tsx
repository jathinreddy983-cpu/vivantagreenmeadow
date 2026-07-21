import { motion } from 'framer-motion';

export default function VideoLanding() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        src="https://res.cloudinary.com/az8sjisv/video/upload/v1784639276/Create_an_ultra_photorealistic_-_Trim_vedio_xwc3dy.mp4"
      />
      
      {/* Dark overlay gradient for better text readability and cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Subtle intro text (optional but good UX) */}
      <div className="relative z-10 text-center flex flex-col items-center pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-500 mb-6 drop-shadow-md">
            Welcome To
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-widest uppercase drop-shadow-xl" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}>
            Vivanta
          </h1>
          <p className="font-sans text-xs md:text-sm uppercase tracking-[0.6em] text-white/80 mt-4">
            Green Meadows
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer"
        onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Explore the Estate</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}