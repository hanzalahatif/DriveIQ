import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import AIAdvisor from '@/components/AIAdvisor';
import Comparison from '@/components/Comparison';
import TrendingVehicles from '@/components/TrendingVehicles';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
import Admin from '@/components/Admin';

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const isAdmin = route.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-bg text-text overflow-x-hidden">
        <Navbar />
        <Admin />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <AIAdvisor />
        <Comparison />
        <TrendingVehicles />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
