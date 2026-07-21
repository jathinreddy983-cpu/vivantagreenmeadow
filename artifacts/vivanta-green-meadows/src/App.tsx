import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import VideoLanding from './components/VideoLanding';
import Hero from './components/Hero';
import HeritageVision from './components/HeritagVision';
import MasterPlan from './components/MasterPlan';
import Amenities from './components/Amenities';
import Connectivity from './components/Connectivity';
import Investment from './components/Investment';
import Gallery from './components/Gallery';
import LocationMap from './components/LocationMap';
import Contact from './components/Contact';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-full font-sans text-bentley-green-900 selection:bg-gold-500 selection:text-white transition-colors duration-300 relative z-0">
      <Preloader />
      
      {/* 4K Cinematic Background Layers */}
      <div className="fixed inset-0 -z-10 bg-[#FAF9F6] overflow-hidden pointer-events-none">
        {/* Volumetric light leaks (heavily blurred orbs) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/10 mix-blend-multiply blur-[140px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-forest-900/5 mix-blend-multiply blur-[160px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gold-500/10 mix-blend-multiply blur-[120px]"></div>
      </div>
      <div className="film-grain"></div>

      <Navbar />
      <main className="relative z-10">
        <VideoLanding />
        <Hero />
        <HeritageVision />
        <MasterPlan />
        <Amenities />
        <Connectivity />
        <Investment />
        <Gallery />
        <LocationMap />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#C3DCBE' }}>
      <div className="text-center">
        <h1 className="text-4xl font-serif text-forest-900 mb-4">404</h1>
        <p className="text-forest-700 uppercase tracking-widest text-sm">Page not found</p>
        <a href="/" className="mt-8 inline-block border border-forest-900 px-6 py-3 text-xs uppercase tracking-widest text-forest-900 hover:bg-forest-900 hover:text-white transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
