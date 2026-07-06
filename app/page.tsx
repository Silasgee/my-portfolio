import SmoothScroll from "@/components/site/SmoothScroll";
import Preloader from "@/components/site/Preloader";
import CursorGlow from "@/components/site/CursorGlow";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Hero from "@/components/sections/Hero";
import Courses from "@/components/sections/Courses";
import WhyApex from "@/components/sections/WhyApex";
import Journey from "@/components/sections/Journey";
import Testimonials from "@/components/sections/Testimonials";
import Stats from "@/components/sections/Stats";
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
        <Courses />
        <WhyApex />
        <Journey />
        <Testimonials />
        <Stats />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
