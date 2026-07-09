import SmoothScroll from "@/components/site/SmoothScroll";
import Preloader from "@/components/site/Preloader";
import CursorGlow from "@/components/site/CursorGlow";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Process />
        <BeforeAfter />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
