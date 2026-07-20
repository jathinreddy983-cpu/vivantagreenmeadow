import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <section className="py-24 md:py-32 bg-gradient-to-b from-[#e8f5e4] via-[#f0f8ef] to-[#f7fbf6] relative border-t border-[#c3dcbe]/40">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Content & Timeline */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold-500"></div>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-forest-700">Investment Potential</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl text-forest-900 mb-6">
              Hoskote — Where Smart Capital Meets Exponential ROI
            </h2>

            <p className="text-forest-700/80 leading-relaxed text-sm md:text-base mb-8">
              Hoskote stands as the high-appreciation gateway of Bengaluru East. Meticulous road infrastructure planning, Metro link proximity, and STRR alignments make early investments highly lucrative.
            </p>

            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500 px-4 py-2 mb-12">
              <span className="text-gold-600 font-bold text-xl">+25%</span>
              <span className="text-xs uppercase tracking-widest text-forest-900">Est. CAGR</span>
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
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] bg-white/60 backdrop-blur-md p-4 border border-white/50 shadow-luxury-sm hover:shadow-luxury-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gold-600">{item.year}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 bg-[#e8f5e4] px-2 py-0.5">{item.price}</span>
                    </div>
                    <h4 className="font-serif text-lg text-forest-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Chart */}
          <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 border border-[#c3dcbe]/50 shadow-xl">
            <div className="mb-8">
              <h3 className="font-serif text-2xl text-forest-900 mb-2">Property Appreciation Trend</h3>
              <p className="text-xs text-stone-500 uppercase tracking-widest">Hoskote vs City Average (₹/sq.ft)</p>
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

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-forest-700"></div> Hoskote Growth</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-stone-400"></div> Saturated Areas</div>
            </div>
            <p className="text-[10px] text-stone-400 text-center mt-4 italic">* Prices represent average base cost per sq.ft and are indicative.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
