export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 border-t border-forest-900/5 glass-panel text-forest-900">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <a href="#" className="flex flex-col items-start mb-6 inline-block">
              <span className="font-serif font-bold uppercase tracking-[0.18em] text-forest-900 text-xl">
                VIVANTA
              </span>
              <span className="font-sans text-[0.45em] uppercase tracking-[0.32em] text-plum-brand">
                Green Meadows
              </span>
            </a>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              An exclusive, BMRDA-STRR approved gated layout of 95 premium villa plots nestled along the rapidly evolving Hoskote-Whitefield corridor.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-plum-brand mb-6 font-bold">Navigations</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-stone-600 hover:text-forest-900 text-sm transition-colors uppercase tracking-wider text-[11px]">The Estate</a></li>
              <li><a href="#master-plan" className="text-stone-600 hover:text-forest-900 text-sm transition-colors uppercase tracking-wider text-[11px]">Master Plan</a></li>
              <li><a href="#amenities" className="text-stone-600 hover:text-forest-900 text-sm transition-colors uppercase tracking-wider text-[11px]">Amenities</a></li>
              <li><a href="#connectivity" className="text-stone-600 hover:text-forest-900 text-sm transition-colors uppercase tracking-wider text-[11px]">Connectivity</a></li>
              <li><a href="#gallery" className="text-stone-600 hover:text-forest-900 text-sm transition-colors uppercase tracking-wider text-[11px]">Gallery</a></li>
              <li><a href="#location" className="text-stone-600 hover:text-plum-brand text-sm transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1.5">📍 Location</a></li>

            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-plum-brand mb-6 font-bold">Legal Approvals</h4>
            <ul className="space-y-3">
              <li className="text-stone-600 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-plum-brand rounded-full"></div> BMRDA STRR Approved
              </li>
              <li className="text-stone-600 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-plum-brand rounded-full"></div> RERA Registered
              </li>
              <li className="text-stone-600 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-plum-brand rounded-full"></div> 'A' & 'E' Khata Sites
              </li>
              <li className="text-stone-600 text-[11px] uppercase tracking-wider flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-plum-brand rounded-full"></div> Clear Titles & Loans
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-plum-brand mb-6 font-bold">Subscribe to the Estate Journal</h4>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Receive updates on infrastructure milestones, plot availability, and corridor development news.
            </p>
            <form className="flex mb-8 shadow-sm">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/50 backdrop-blur-md border border-forest-900/20 px-4 py-2 w-full text-sm text-forest-900 focus:outline-none focus:border-plum-brand placeholder-stone-400"
              />
              <button className="bg-plum-brand text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#6c1c38] transition-colors">
                Join
              </button>
            </form>
            
            <div className="space-y-1">
              <a href="mailto:sales@vivantagreenmeadows.com" className="block text-stone-600 hover:text-forest-900 text-sm transition-colors">sales@vivantagreenmeadows.com</a>
              <a href="tel:+919900012345" className="block text-stone-600 hover:text-forest-900 text-sm transition-colors">+91 99000 12345</a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-forest-900/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-stone-500 text-xs">
            © 2026 Vivanta Green Meadows. All Rights Reserved. Designed for Elevated Living.
          </p>
          <p className="text-stone-400 text-[10px] italic">
            *Disclaimer: Artistic renders and site markers are for representation purposes only.
          </p>
        </div>

      </div>
    </footer>
  );
}
