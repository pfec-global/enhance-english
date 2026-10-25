// /llms.txt: a short Markdown guide to the site for AI agents and LLMs (https://llmstxt.org).
// Built once at build time, so it answers instantly and never waits on the admin.
// Links are absolute when NEXT_PUBLIC_SITE_URL is set, relative otherwise.
export const dynamic = "force-static";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
const link = (label, path, about) => `- [${label}](${site}${path})${about ? `: ${about}` : ""}`;

const content = `# Enhance English

> IELTS and PTE exam coaching, mock tests, exam registration and practical English courses in Bangladesh, with coaching centres in Dhanmondi, Banani and Chattogram.

## Exam coaching

${link("IELTS courses", "/ielts", "foundation, essential, online, crash and weekend IELTS courses")}
${link("What is IELTS?", "/ielts/what-is-ielts", "test types, format and scoring")}
${link("PTE courses", "/pte", "PTE Academic coaching courses")}
${link("What is PTE?", "/pte/what-is-pte", "test format and scoring")}
${link("Exam registration", "/exam-registration", "register for an IELTS or PTE exam, with test dates")}

## English courses

${link("Learn English", "/learn-english", "spoken English, presentation, writing and grammar courses")}
${link("Make my own course", "/custom-course", "build a course around your own goals")}
${link("Book a free demo class", "/book-demo")}

## About

${link("About us", "/about")}
${link("Contact us", "/contact", "coaching centre addresses and phone numbers")}
${link("Upcoming events", "/events")}
${link("Blog", "/blogs", "IELTS, PTE and English learning articles")}
`;

export function GET() {
  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
