import Hero from "@/components/features/hero/Hero";
import About from "@/components/features/about/About";
import Experience from "@/components/features/experience/Experience";
import Skills from "@/components/features/skills/CodeSkills";
import Projects from "@/components/features/projects/Projects";
import Achievements from "@/components/features/achievements/Achievements";
import Contact from "@/components/features/contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </>
  );
}



