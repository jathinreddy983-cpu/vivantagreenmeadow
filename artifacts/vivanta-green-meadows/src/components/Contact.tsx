import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-gradient-to-b from-[#e8f5e4] via-[#f0f8ef] to-[#f7fbf6] relative border-t border-[#c3dcbe]/40">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gold-500"></div>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-forest-700">Begin Your Journey</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl text-forest-900 mb-6">
              Request a Private Site Viewing
            </h2>
            
            <p className="text-forest-700/80 leading-relaxed text-sm md:text-base mb-12">
              Connect with our relationship directors to schedule a private tour. We provide door-step luxury transport for families planning site viewings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="https://wa.me/919900012345" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 font-bold text-sm hover:bg-[#20bd5a] transition-colors">
                💬 WhatsApp
              </a>
              <a href="tel:+919900012345" className="flex items-center justify-center gap-2 bg-forest-900 text-white px-6 py-4 font-bold text-sm hover:bg-forest-700 transition-colors">
                📞 Call Sales
              </a>
              <a href="mailto:sales@vivantagreenmeadows.com" className="flex items-center justify-center gap-2 border border-forest-900 text-forest-900 px-6 py-4 font-bold text-sm hover:bg-forest-900 hover:text-white transition-colors">
                ✉️ Email Us
              </a>
            </div>

            <div className="p-6 bg-white border border-border shadow-sm">
              <h4 className="font-serif text-xl text-forest-900 mb-2">Corporate Office</h4>
              <p className="text-sm text-forest-700/70 leading-relaxed mb-4">
                Level 4, Prestige Tech Park, Whitefield,<br/>
                Bengaluru, Karnataka 560066
              </p>
              <h4 className="font-serif text-xl text-forest-900 mb-2">Site Address</h4>
              <p className="text-sm text-forest-700/70 leading-relaxed">
                Vivanta Green Meadows, Near MVJ Medical College,<br/>
                Hoskote, Bengaluru Rural 562114
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 md:p-10 shadow-xl border border-gray-100">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-3xl text-forest-900 mb-4">Thank You</h3>
                <p className="text-forest-700/80">
                  Your inquiry has been received. Our relationship director will contact you shortly to schedule your viewing.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-serif text-2xl text-forest-900 mb-6">Registration Form</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-forest-900 font-bold mb-2">Full Name *</label>
                    <input required type="text" className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gold-500 bg-gray-50/50" placeholder="John Doe" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-forest-900 font-bold mb-2">Phone Number *</label>
                      <input required type="tel" className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gold-500 bg-gray-50/50" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-forest-900 font-bold mb-2">Email Address *</label>
                      <input required type="email" className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gold-500 bg-gray-50/50" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-forest-900 font-bold mb-3">Plot Sizing Choice *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["30X40 Plot (40 Available)", "30X45 Plot (33 Available)", "Commercial Plot (3 Available)", "Odd Site (19 Available)"].map((choice, i) => (
                        <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 cursor-pointer hover:border-gold-500 transition-colors">
                          <input type="radio" name="plotChoice" value={choice} required className="text-gold-500 focus:ring-gold-500" />
                          <span className="text-sm text-forest-900">{choice}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-forest-900 font-bold mb-2">Additional Message</label>
                    <textarea rows={3} className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-gold-500 bg-gray-50/50" placeholder="Any specific requirements..."></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gold-500 text-white font-bold uppercase tracking-widest py-4 hover:bg-gold-600 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Query'}
                </button>
                <p className="text-[10px] text-center text-gray-500">By submitting, you agree to our privacy policy and terms of service.</p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
