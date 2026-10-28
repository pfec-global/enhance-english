// Events: the cards on the home page and the events page (app/events/page.js),
// and one details page per event (app/events/[slug]/page.js).
// Images live in public/image/events.
// TODO: placeholder events — replace with the real ones.

// Shown on every details page under the event's own text
const venueNote =
  "Seats are limited, so please register early. You will get a confirmation call from our team before the event.";

export const events = [
  {
    id: 1,
    slug: "ielts-grammar-workshop",
    title: "IELTS Grammar Workshop",
    type: "Free Workshop",
    date: "31 Jan 2029",
    event_date: "2029-01-31",
    time: "11 AM - 12 PM",
    location: "Enhance English Office - Chattogram",
    image: "/image/events/event_1.png",
    summary:
      "Fix the grammar mistakes that cost you marks in IELTS Writing and Speaking, with live practice and feedback from our trainers.",
    about: [
      "Grammar accounts for a quarter of your IELTS Writing and Speaking score. In this one-hour workshop our trainers walk you through the grammar examiners look for, and the common mistakes that hold students back at Band 6.",
      venueNote,
    ],
    highlights: [
      "Complex sentences that lift your Grammatical Range score",
      "The 10 most common grammar mistakes in IELTS Writing",
      "Live correction of sample answers",
      "Free study sheet to take home",
    ],
  },
  {
    id: 2,
    slug: "ielts-speaking-masterclass",
    title: "IELTS Speaking Masterclass",
    type: "Free Masterclass",
    date: "7 Feb 2029",
    event_date: "2029-02-07",
    time: "4 PM - 5:30 PM",
    location: "Enhance English Office - Dhaka",
    image: "/image/events/event_2.png",
    summary:
      "Practise all three parts of the IELTS Speaking test and learn how to answer with confidence, fluency and the right vocabulary.",
    about: [
      "Speaking is where many students lose easy marks through nerves. This masterclass takes you through Parts 1, 2 and 3 of the test, with mock questions and tips on fluency, pronunciation and vocabulary.",
      venueNote,
    ],
    highlights: [
      "How the Speaking test is marked",
      "A simple plan for the Part 2 cue card",
      "Practice with a partner and trainer feedback",
      "Ways to stay calm on test day",
    ],
  },
  {
    id: 3,
    slug: "pte-mock-test-day",
    title: "PTE Mock Test Day",
    type: "Free Mock Test",
    date: "14 Feb 2029",
    event_date: "2029-02-14",
    time: "10 AM - 1 PM",
    location: "Enhance English Office - Chattogram",
    image: "/image/events/event_3.png",
    summary:
      "Sit a full PTE Academic mock test in real exam conditions, then get your score and a study plan from our trainers.",
    about: [
      "The best way to know where you stand is a full mock test. Take a computer-based PTE Academic mock in our venue, then sit down with a trainer to go through your results.",
      venueNote,
    ],
    highlights: [
      "Full-length, computer-based PTE Academic mock test",
      "Score report for every skill",
      "One-to-one result review with a trainer",
      "Personal study plan for your target score",
    ],
  },
  {
    id: 4,
    slug: "spoken-english-club-meetup",
    title: "Spoken English Club Meetup",
    type: "Free Club Session",
    date: "21 Feb 2029",
    event_date: "2029-02-21",
    time: "5 PM - 6 PM",
    location: "Enhance English Office - Dhaka",
    image: "/image/events/event_1.png", // TODO: replace with event_4.png
    summary:
      "Build confidence in everyday English through fun speaking activities, games and debates with other learners.",
    about: [
      "Our Spoken English Club is a relaxed place to practise speaking. Join group activities, tongue twisters, vocabulary games and short debates, guided by our trainers.",
      venueNote,
    ],
    highlights: [
      "Group speaking activities for every level",
      "Vocabulary and pronunciation games",
      "Short, friendly debates",
      "Meet other learners and make friends",
    ],
  },
].map((event) => ({ ...event, href: `/events/${event.slug}` }));

// The events grouped by month for the timeline on /events, in the shape the admin's
// /event-months sends: [{ month: "2029-01", label: "Jan", year: 2029, events: [...] }].
export const eventMonths = Object.values(
  events.reduce((groups, event) => {
    const month = event.event_date.slice(0, 7);

    if (!groups[month]) {
      groups[month] = [];
    }

    groups[month].push(event);
    return groups;
  }, {})
).map((monthEvents) => {
  const date = new Date(`${monthEvents[0].event_date}T00:00:00Z`);
  return {
    month: monthEvents[0].event_date.slice(0, 7),
    label: date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }),
    year: date.getUTCFullYear(),
    events: monthEvents,
  };
});

export function getEvent(slug) {
  return events.find((event) => event.slug === slug);
}
