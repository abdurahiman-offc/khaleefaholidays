import Image from "next/image";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Testimonials from "@/components/Testimonials";
import ExploreB2B from "@/components/ExploreB2B";

import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Global Truly Fixed Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/images/skyimg6.jpg" 
          alt="Sky Background" 
          fill 
          className="object-cover opacity-30" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF]/20 via-transparent to-white/40" />
      </div>

      <Hero />
      <Services />
      <Destinations />
      <ExploreB2B />
      <Testimonials />
      <AboutUs />
      <ContactUs />
      <Footer />
    </main>
  );
}
