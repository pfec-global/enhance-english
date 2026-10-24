// The Contact Us page (app/contact/page.js).

// "Reach out to us" lines beside the form.
// TODO: the design only has placeholder details — replace with the real email and phone.
export const contactDetails = {
  email: "support@.com",
  phone: "+01 (000) 265 458",
};

// The coaching centres, shown as cards beside the map (public/image/bangladesh_map.png,
// which has their pins drawn on it). `phone` is shown as written; the link dials it without spaces.
export const offices = [
  {
    id: 1,
    name: "Dhanmondi 27",
    address: [
      "Sima Blossom (Beside Rapa Plaza),",
      "H#3 (Level 2), Rd #27 Dhanmondi",
    ],
    phone: "+880 1958 66 56 18",
  },
  {
    id: 2,
    name: "Banani 11",
    address: ["Pizza Hut Building", "House #50, Level #9"],
    phone: "+880 1958 66 56 20",
  },
  {
    id: 3,
    name: "Chattogram",
    address: ["4th floor, Equity Centrium,", "O R Nizam Road, GEC Circle"],
    phone: "+880 1958 66 56 05",
  },
];

// Google Maps search for an office (opens the app on phones)
export function mapLink(office) {
  const query = `Enhance English ${office.name}, ${office.address.join(" ")}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

// Dials the number: "+880 1958 66 56 18" -> "tel:+8801958665618"
export function telLink(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
