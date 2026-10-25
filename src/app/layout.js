import { Coiny, Montserrat, Titan_One } from "next/font/google";
import CustomCourseModal from "@/components/CustomCourseModal";
import DemoClassModal from "@/components/DemoClassModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { registrationPages } from "@/data/examRegistration";
import { navLinksWithCourses } from "@/data/navLinks";
import {
  getCourses,
  getExamRegistrations,
  getProgramExams,
} from "@/lib/api";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
});

const coiny = Coiny({
  variable: "--coiny",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Enhance English | IELTS & PTE Coaching",
  description:
    "Join Enhance English's coaching classes or language clubs and build confidence in English for study, work, and life.",
  // Kept out of search results for now; set index: true when the site goes live
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }) {
  // The IELTS, PTE and Learn English dropdowns list the admin's courses,
  // and the Exam Registration dropdown its exam registration pages
  const [courses, registrations, exams] = await Promise.all([
    getCourses(),
    getExamRegistrations(),
    getProgramExams(),
  ]);
  const links = navLinksWithCourses(courses, registrations, exams);
  // The pop-up sign-up forms use the exam registration pages' test modes and dates
  const formPages = registrations?.length ? registrations : registrationPages;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${titanOne.variable} ${coiny.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions add their own attributes to <html>/<body> */}
      <body
        className="flex min-h-full flex-col bg-white font-sans text-ink"
        suppressHydrationWarning
      >
        <Header links={links} />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Opens from every "Book Free Demo Class" button (any link to /book-demo) */}
        <DemoClassModal pages={formPages} />
        {/* Opens from the "Make my Own Course" button (any link to /custom-course) */}
        <CustomCourseModal pages={formPages} />
      </body>
    </html>
  );
}
