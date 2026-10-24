import Image from "next/image";
import Link from "next/link";
import CoachingCenters from "@/components/CoachingCenters";
import FeatureCard from "@/components/FeatureCard";
import {
  ArrowRightIcon,
  HeartHandshakeIcon,
  SproutIcon,
  TelescopeIcon,
} from "@/components/icons";
import Partners from "@/components/Partners";
import PearsonPartner from "@/components/PearsonPartner";
import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import TeamSection from "@/components/TeamSection";
import { reasons } from "@/data/whyChooseUs";
import { getTeamMembers } from "@/lib/api";

export const metadata = {
  title: "About Us | Enhance English",
  description:
    "Enhance English helps students prepare for IELTS and PTE and improve their English. A proud subsidiary of PFEC Global, giving students access to 550+ institutions across 7+ destinations.",
};

const values = [
  {
    id: "mission",
    icon: SproutIcon,
    title: "Mission",
    text: "To empower individuals to reach their full potential through personalized, high-quality English language instruction.",
  },
  {
    id: "vision",
    icon: TelescopeIcon,
    title: "Vision",
    text: "To transform lives by creating an innovative, supportive learning environment where students master English and thrive globally.",
  },
  {
    id: "commitment",
    icon: HeartHandshakeIcon,
    title: "Commitment",
    text: "To provide comprehensive courses that empower students with the skills and confidence to excel globally.",
  },
];

// Desktop: the "why choose" cards zigzag along the ribbon, three on top and two below
// between them, each tilted a little. `id` is the reason's id in data/whyChooseUs.js.
const zigzag = [
  { id: 1, place: "lg:col-start-1 lg:row-start-1 lg:rotate-2" },
  { id: 3, place: "lg:col-start-3 lg:row-start-1 lg:-rotate-1" },
  { id: 5, place: "lg:col-start-5 lg:row-start-1 lg:-rotate-3" },
  { id: 2, place: "lg:col-start-2 lg:row-start-2 lg:-rotate-3" },
  { id: 4, place: "lg:col-start-4 lg:row-start-2 lg:rotate-3" },
];

// About Us: the hero with the students, Mission / Vision / Commitment,
// "Why Choose Our Test Preparation Programs?" along an orange ribbon, then the numbers,
// the team, the Pearson partnership, the coaching centres and the partner logos.
// The team comes from the admin, or data/team.js when the admin cannot be reached.
export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      <section className="bg-linear-to-b from-[#fdf7e4] to-[#f9f9f9]">
        {/*
          phones, tablets: text, then the students
          desktop:         text on the left, the students on the right
        */}
        <div className="site-container grid items-center gap-10 pt-12 lg:grid-cols-2 lg:gap-14 lg:pt-16">
          <div>
            <h1 className="animate-slide-in text-[clamp(1.75rem,8vw,2.25rem)] leading-[1.3] font-light motion-reduce:animate-none sm:text-4xl lg:text-[1.875rem] xl:text-[2.25rem] 2xl:text-[2.75rem]">
              {/* From tablets up each line stays whole, as in the design */}
              Empowering{" "}
              <span className="inline-block -rotate-2 bg-brand-orange px-[0.2em] font-display leading-tight text-white shadow-[0.2rem_0.2rem_0_var(--color-brand-yellow)]">
                Students
              </span>
              <span className="block sm:whitespace-nowrap">
                to Access{" "}
                <span className="font-coiny text-brand-blue">
                  Global Opportunities
                </span>
              </span>
              <span className="block sm:whitespace-nowrap">
                through{" "}
                <span className="font-coiny text-brand-orange">
                  Better English Skills
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl animate-slide-in [animation-delay:100ms] motion-reduce:animate-none">
              Enhance English was founded to help students prepare for exams
              like IELTS, PTE and also improve their English Proficiency.
            </p>
            <p className="mt-4 max-w-xl animate-slide-in [animation-delay:150ms] motion-reduce:animate-none">
              We are a proud subsidiary of PFEC Global. Thus, We can help
              students gain access to 550+ Institutions across 7+ Destinations.
            </p>
            <Link
              href="/book-demo"
              className="mt-7 inline-flex animate-slide-in items-center gap-2 border border-brand-orange bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white transition-colors [animation-delay:200ms] hover:bg-transparent hover:text-brand-orange motion-reduce:animate-none"
            >
              Book Free Demo Class
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>

          {/* The students in their shapes are one image */}
          <Image
            src="/image/about-us-hero.png"
            alt="Smiling Enhance English students holding books and folders"
            width={1297}
            height={636}
            preload
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="h-auto w-full animate-pop-in [animation-delay:200ms] motion-reduce:animate-none"
          />
        </div>

        {/* Mission / Vision / Commitment: side by side from tablets up */}
        <div className="site-container py-12 lg:py-16">
          <Reveal>
            <ul className="grid gap-8 border border-black/20 bg-white p-6 shadow-[0.4rem_0.4rem_0_var(--color-brand-yellow)] sm:p-8 md:grid-cols-3 md:gap-10">
              {values.map(({ id, icon: ValueIcon, title, text }) => (
                <li key={id}>
                  <ValueIcon className="size-7" strokeWidth={1.5} />
                  <h2 className="mt-3 text-lg font-semibold text-brand-orange">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm">{text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="why-choose-programs"
        className="relative overflow-hidden bg-surface"
      >
        {/* Doodle background, turned grey and faded (same as components/CourseCovered.jsx) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[url(/image/ielts_bg.png)] bg-size-[max(100%,75rem)_auto] bg-top opacity-50 grayscale"
        />

        <div className="site-container relative pt-12 lg:pt-16">
          <h2
            id="why-choose-programs"
            className="text-center text-2xl font-bold sm:text-3xl"
          >
            <span className="font-coiny font-normal text-brand-orange">
              Why Choose
            </span>{" "}
            Our Test Preparation Programs?
          </h2>
        </div>

        <div className="relative pt-8 pb-14 lg:pt-12 lg:pb-20">
          {/* The ribbon the cards sit along (desktop only) */}
          <Image
            src="/image/orrenge-rebon.png"
            alt=""
            width={2880}
            height={631}
            sizes="100vw"
            className="pointer-events-none absolute top-1/2 left-0 hidden w-full -translate-y-1/2 select-none lg:block"
          />

          {/* 1 card per row on phones, 2 on tablets, the zigzag on desktop */}
          <div className="site-container relative">
            <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-8">
              {zigzag.map(({ id, place }, index) => (
                <li key={id} className={`lg:col-span-2 ${place}`}>
                  <Reveal delay={index * 100} className="grid h-full">
                    <FeatureCard
                      feature={reasons.find((reason) => reason.id === id)}
                      compact
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Reveal>
        <Stats className="bg-brand-yellow" />
      </Reveal>
      {/* No published team members in the admin: the section is left out */}
      {(!team || team.length > 0) && <TeamSection team={team} />}
      <Reveal>
        <PearsonPartner />
      </Reveal>
      <CoachingCenters />
      <Reveal>
        <Partners />
      </Reveal>
    </>
  );
}
