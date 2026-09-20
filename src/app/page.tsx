import { Hero } from "@/components/sections/Hero";
import { Programs } from "@/components/sections/Programs";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="top">
      <Hero />

      <Programs />

      <Contact />
    </main>
  );
}
