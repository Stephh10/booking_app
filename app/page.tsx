import Navigation from "@/components/Navigation";
import MainNotification from "@/components/hero/MainNotification";

export default function Home() {
  return (
    <>
      <MainNotification />
      <Navigation />
      <main>
        <h2>Hello World</h2>
      </main>
    </>
  );
}
