import Awards from "@/components/Awards";
import CustomCourse from "@/components/CustomCourse";
import Hero from "@/components/Hero";
import LanguageCourses from "@/components/LanguageCourses";
import Partners from "@/components/Partners";
import ProgramSection from "@/components/ProgramSection";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import UpcomingEvents from "@/components/UpcomingEvents";
import WhyChooseUs from "@/components/WhyChooseUs";
import { ieltsProgram, pteProgram } from "@/data/programs";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Every section below the hero fades in and slides up as it scrolls into view */}
      <Reveal>
        <Stats />
      </Reveal>
      <Reveal>
        <UpcomingEvents />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <ProgramSection program={ieltsProgram} />
      </Reveal>
      <Reveal>
        <ProgramSection program={pteProgram} />
      </Reveal>
      <Reveal>
        <LanguageCourses />
      </Reveal>
      <Reveal>
        <CustomCourse />
      </Reveal>
      <Reveal>
        <Awards />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <Partners />
      </Reveal>
    </>
  );
}
