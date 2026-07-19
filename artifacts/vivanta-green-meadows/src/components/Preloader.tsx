import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dots scattered like original
const DOTS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 5 + (i * 37 + i * i * 3) % 90,
  y: 5 + (i * 53 + i * 7) % 90,
  size: 2 + (i % 3),
  delay: (i * 0.3) % 2.5,
}));

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter from 0 to 100 over ~2.2 seconds
    const duration = 2200;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((step / steps) * 100));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsVisible(false), 300);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] overflow-hidden"
          style={{ backgroundColor: '#C3DCBE' }}
        >
          {/* Scattered dots */}
          {DOTS.map(dot => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: dot.size,
                height: dot.size,
                backgroundColor: '#2d6b4f',
                opacity: 0.25 + (dot.id % 4) * 0.1,
              }}
              animate={{ opacity: [0.15, 0.45, 0.15] }}
              transition={{
                duration: 2 + dot.delay,
                repeat: Infinity,
                delay: dot.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Logo */}
              <div className="flex flex-col leading-none items-center mb-8">
                <span
                  className="font-serif font-bold uppercase tracking-[0.18em] text-[2.2rem]"
                  style={{ color: '#113222' }}
                >
                  VIVANTA
                </span>
                <span
                  className="font-sans text-[0.78rem] uppercase tracking-[0.32em] mt-1"
                  style={{ color: '#2d6b4f' }}
                >
                  Green Meadows
                </span>
              </div>

              {/* Counter */}
              <motion.div
                className="font-serif text-5xl font-light tabular-nums"
                style={{ color: '#113222', letterSpacing: '0.05em' }}
              >
                {count} <span className="text-3xl" style={{ color: '#c5a880' }}>%</span>
              </motion.div>

              {/* Progress line */}
              <div
                className="mt-6 overflow-hidden"
                style={{ width: 120, height: 1, background: 'rgba(17,50,34,0.15)' }}
              >
                <motion.div
                  className="h-full"
                  style={{ background: '#c5a880' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${count}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
