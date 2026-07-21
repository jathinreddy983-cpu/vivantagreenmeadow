import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf } from 'lucide-react';

const data = [
  { year: '2021', Hoskote: 2500, Saturated: 6000 },
  { year: '2022', Hoskote: 3000, Saturated: 6200 },
  { year: '2023', Hoskote: 3800, Saturated: 6400 },
  { year: '2024', Hoskote: 4200, Saturated: 6500 },
  { year: '2025', Hoskote: 4800, Saturated: 6700 },
  { year: '2026+', Hoskote: 6000, Saturated: 6900 },
];

const timeline = [
  {
    year: "2021",
    title: "STRR Corridor Announced",
    price: "₹2,500 / sq.ft",
    desc: "Infrastructure planning begins for the 280km Satellite Town Ring Road bypass."
  },
  {
    year: "2023",
    title: "Whitefield Metro Extension",
    price: "₹3,800 / sq.ft",
    desc: "Connectivity to Kadugodi/ITPL triggers initial surge in Hoskote residential demand."
  },
  {
    year: "2025",
    title: "STRR Phase 1 Completion",
    price: "₹4,800 / sq.ft",
    desc: "Commercial transit lanes open, lowering Kempegowda Airport travel times to 30 mins."
  },
  {
    year: "2026+",
    title: "High-Speed Rail Transit",
    price: "₹6,000+ / sq.ft (Proj.)",
    desc: "Planned Chennai-Bangalore High-Speed Rail corridor hub near Hoskote."
  }
];

export default function Investment() {
  return (
    <section className="py-24 md:py-32 relative border-t border-[#c3dcbe]/40 overflow-hidden">
      {/* Decorative Leaves */}
      <Leaf strokeWidth={0.5} className="absolute top-10 -left-20 w-[400px] h-[400px] text-forest-900/[0.02] rotate-[30deg] pointer-events-none" />
      <Leaf strokeWidth={0.5} className="absolute -bottom-20 -right-20 w-[500px] h-[500px] text-forest-900/[0.02] -rotate-[15deg] pointer-events-none" />

      {/* Blobs */}
      <motion.div 
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(45,107,79,0.04) 0%, transparent 70%)' }} />
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-10 w-[30vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(17,50,34,0.04) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Content & Timeline */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold-500"></div>
              <span className="text-xs md:text-sm font-sans font-bold tracking-[0.2em] uppercase text-forest-700">Investment Potential</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight text-forest-900 mb-6">
              Hoskote — Where Smart Capital Meets Exponential ROI
            </h2>

            <p className="font-sans text-base md:text-lg lg:text-xl text-forest-700/90 leading-relaxed mb-8">
              Hoskote stands as the high-appreciation gateway of Bengaluru East. Meticulous road infrastructure planning, Metro link proximity, and STRR alignments make early investments highly lucrative.
            </p>

            <div className="inline-flex items-center gap-3 bg-gold-500/10 border border-gold-500 px-5 py-3 mb-12">
              <span className="text-gold-600 font-bold text-2xl md:text-3xl">+25%</span>
              <span className="text-xs md:text-sm uppercase tracking-widest font-semibold text-forest-900">Est. CAGR</span>
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#a3d1a6] before:to-transparent">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Marker */}
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gold-500 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] glass-panel p-4 border-t-[3px] border-t-vibrant-green rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] hover:border-t-plum-brand z-10 hover:z-20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm md:text-base font-bold text-gold-600">{item.year}</span>
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-forest-700 bg-[#e8f5e4] px-2 py-1 rounded-sm">{item.price}</span>
                    </div>
                    <h4 className="font-serif text-xl md:text-2xl text-forest-900 mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Chart */}
          <div className="glass-panel rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="mb-8">
              <h3 className="font-serif text-3xl sm:text-4xl text-forest-900 mb-3 leading-tight">Property Appreciation Trend</h3>
              <p className="text-xs md:text-sm text-stone-500 uppercase tracking-widest font-semibold">Hoskote vs City Average (₹/sq.ft)</p>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorHoskote" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2d6b4f" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2d6b4f" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a8a29e" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#a8a29e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c3dcbe" />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#78716c', fontSize: 12 }}
                    domain={[1000, 8000]}
                    ticks={[2000, 4000, 6000, 8000]}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#113222', borderColor: '#113222', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Saturated"
                    stroke="#a8a29e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSat)"
                    name="Saturated Areas"
                  />
                  <Area
                    type="monotone"
                    dataKey="Hoskote"
                    stroke="#2d6b4f"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorHoskote)"
                    name="Hoskote"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-stone-600">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-forest-700"></div> Hoskote Growth</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-stone-400"></div> Saturated Areas</div>
            </div>
            <p className="text-[10px] md:text-xs text-stone-500 text-center mt-5 italic">* Prices represent average base cost per sq.ft and are indicative.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
