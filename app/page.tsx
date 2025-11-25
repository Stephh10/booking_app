import Navigation from "@/components/Navigation";
import MainNotification from "@/components/hero/MainNotification";
import Hero from "@/components/hero/Hero";
import Footer from "@/components/Footer";
import { AccordionMain } from "@/components/LandingPage/AccordionMain";
export default function Home() {
  return (
    <>
      <MainNotification />
      <Navigation />
      <main className="lp-container">
        <Hero />
        <AccordionMain />
      </main>
      <Footer />
    </>
  );
}
