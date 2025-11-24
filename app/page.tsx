import Navigation from "@/components/Navigation";
import MainNotification from "@/components/hero/MainNotification";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <MainNotification />
      <Navigation />
      <main className="lp-container">
        <Hero />
      </main>
    </>
  );
}
