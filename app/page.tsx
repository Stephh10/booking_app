import Navigation from "@/components/Navigation";
import MainNotification from "@/components/hero/MainNotification";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/Footer";
import { AccordionMain } from "@/components/LandingPage/AccordionMain";
import About from "@/components/LandingPage/About";
import Contact from "@/components/LandingPage/Contact";
import Message from "@/components/LandingPage/Message";

export default function Home() {
  return (
    <>
      <MainNotification />
      <Navigation />
      <main className="lp-container">
        <Hero />
        <About />
        <Contact />
        <AccordionMain />
        <Message />
      </main>
      <Footer />
    </>
  );
}
