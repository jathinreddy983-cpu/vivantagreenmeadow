export default function Footer() {
  return (
    <footer className="bg-[#0a1f12] text-white pt-20 pb-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <a href="#" className="flex flex-col items-start mb-6 inline-block">
              <span className="font-serif font-bold uppercase tracking-[0.18em] text-white text-xl">
                VIVANTA
              </span>
              <span className="font-sans text-[0.45em] uppercase tracking-[0.32em] text-gold-500">
                Green Meadows
              </span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              An exclusive, BMRDA-STRR approved gated layout of 95 premium villa plots nestled along the rapidly evolving Hoskote-Whitefield corridor.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-500 mb-6 font-bold">Navigations</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-white/70 hover:text-white text-sm transition-colors uppercase tracking-wider text-[11px]">The Estate</a></li>
              <li><a href="#master-plan" className="text-white/70 hover:text-white text-sm transition-colors uppercase tracking-wider text-[11px]">Master Plan</a></li>
              <li><a href="#amenities" className="text-white/70 hover:text-white text-sm transition-colors uppercase tracking-wider text-[11px]">Amenities</a></li>
              <li><a href="#connectivity" className="text-white/70 hover:text-white text-sm transition-colors uppercase tracking-wider text-[11px]">Connectivity</a></li>
              <li><a href="#gallery" className="text-white/70 hover:text-white text-sm transition-colors uppercase tracking-wider text-[11px]">Gallery</a></li>
              <li><a href="#location" className="text-white/70 hover:text-gold-500 text-sm transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1.5">📍 Location</a></li>

            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-500 mb-6 font-bold">Legal Approvals</h4>
            <ul className="space-y-3">
              <li className="text-white/70 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> BMRDA STRR Approved
              </li>
              <li className="text-white/70 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> RERA Registered
              </li>
              <li className="text-white/70 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> 'A' & 'E' Khata Sites
              </li>
              <li className="text-white/70 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div> Clear Titles & Loans
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-500 mb-6 font-bold">Subscribe to the Estate Journal</h4>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Receive updates on infrastructure milestones, plot availability, and corridor development news.
            </p>
            <form className="flex mb-8">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/20 px-4 py-2 w-full text-sm text-white focus:outline-none focus:border-gold-500 placeholder-white/30"
              />
              <button className="bg-gold-500 text-forest-900 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-gold-600 transition-colors">
                Join
              </button>
            </form>
            
            <div className="space-y-1">
              <a href="mailto:sales@vivantagreenmeadows.com" className="block text-white/70 hover:text-white text-sm transition-colors">sales@vivantagreenmeadows.com</a>
              <a href="tel:+919900012345" className="block text-white/70 hover:text-white text-sm transition-colors">+91 99000 12345</a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/40 text-xs">
            © 2026 Vivanta Green Meadows. All Rights Reserved. Designed for Elevated Living.
          </p>
          <p className="text-white/30 text-[10px] italic">
            *Disclaimer: Artistic renders and site markers are for representation purposes only.
          </p>
        </div>

      </div>
    </footer>
  );
}
