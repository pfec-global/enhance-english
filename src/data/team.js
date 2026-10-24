// "Meet the Team behind Enhance English" (components/TeamSection.jsx), in the order shown.
// Photos live in public/image/team; they are cropped to a portrait, keeping the top (the face).
// `role` may have a line break (\n). `socials` are the profile links shown as icons:
// { network: "facebook" | "x" | "linkedin" | "instagram", label, url }.
// The site shows the admin's team instead (lib/api.js getTeamMembers); this list is
// only used when the admin cannot be reached.
export const team = [
  {
    id: 1,
    name: "Md. Shahidul Islam",
    role: "CEO and\nManaging Director",
    socials: [],
    photo: "/image/team/team4.jpg",
  },
  {
    id: 2,
    name: "Mosharraf Khan Yaafi",
    role: "Chief Growth Officer",
    socials: [],
    photo: "/image/team/team3.jpg",
  },
  {
    id: 3,
    name: "Mona Mahjabin Baishakhi",
    role: "Deputy General Manager",
    socials: [],
    photo: "/image/team/team5.png",
  },
  {
    id: 4,
    name: "Abdullah Ahmed",
    role: "Program Director\nIELTS and PTE Instructor",
    socials: [],
    photo: "/image/team/team2.png",
  },
  {
    id: 5,
    // TODO: the design cuts this name off after "Ashir Intes" — put in the full name.
    name: "Ashir Intes",
    role: "Course Coordinator",
    socials: [],
    photo: "/image/team/team1.png",
  },
];

// The two numbers beside the team
export const teamStats = [
  { id: 1, value: "10 Years", label: "Avg. Experience\nof our Trainers" },
  { id: 2, value: "5000+", label: "Students\nTrained" },
];
