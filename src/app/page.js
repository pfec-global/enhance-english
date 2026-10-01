import Awards from "@/components/Awards";
import CustomCourse from "@/components/CustomCourse";
import Hero from "@/components/Hero";
import LanguageCourses from "@/components/LanguageCourses";
import ProgramSection from "@/components/ProgramSection";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import UpcomingEvents from "@/components/UpcomingEvents";
import WhyChooseUs from "@/components/WhyChooseUs";
import { ieltsProgram, pteProgram } from "@/data/programs";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <UpcomingEvents />
      <Testimonials />
      <ProgramSection program={ieltsProgram} />
      <ProgramSection program={pteProgram} />
      <LanguageCourses />
      <CustomCourse />
      <Awards />
      <WhyChooseUs />
    </>
  );
}
