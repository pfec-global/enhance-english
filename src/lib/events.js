import { getEvent as getBuiltInEvent } from "@/data/events";
import { getRegistrationPage } from "@/data/examRegistration";
import { getEvent, getExamRegistration } from "@/lib/api";

// Shared by an event's details page (app/events/[slug]/page.js) and the thank-you page
// (app/thank-you/page.js), which shows the event someone just registered for.

// The event with this slug, or null if there is none. When the admin cannot be reached,
// the events of data/events.js are used instead.
export async function findEvent(slug) {
  const event = await getEvent(slug);
  if (event === undefined) return getBuiltInEvent(slug) ?? null;
  return event;
}

// Whether the event day has gone by (Bangladesh time). The built-in events have no event_date and never end.
export function hasEnded(event) {
  if (!event.event_date) return false;
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Dhaka",
  }); // "2026-10-19"
  return event.event_date < today;
}

// The exam the event is about, for its student results and sign-up form: PTE for PTE events, IELTS for the rest
export function examOf(event) {
  return /\bPTE\b/i.test(event.title) ? "pte" : "ielts";
}

// The exam registration page whose sign-up form is shown beside the event: the admin's, or the
// built-in one when the admin cannot be reached or has not published it.
export async function findRegistrationPage(exam) {
  return (await getExamRegistration(exam)) ?? getRegistrationPage(exam);
}

// Where the event's sign-up form leads once it is sent: the thank-you page, with this event
export const thankYouHref = (event) =>
  `/thank-you?event=${encodeURIComponent(event.slug)}`;
