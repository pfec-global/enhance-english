// The billing form of the checkout (components/CheckoutView.jsx).
import { offices } from "@/data/contact";

// The country code picker beside the contact number
export const countryCodes = [
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", name: "United States / Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
];

// Countries and their provinces/states. A country without a list gets a text box instead.
// `flag` is the country's ISO code: its picture is public/image/flags/<flag>.svg
// (from flagcdn.com); "Other" has none.
export const countries = [
  {
    name: "Bangladesh",
    flag: "bd",
    states: ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"],
  },
  {
    name: "India",
    flag: "in",
    states: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
      "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
      "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
      "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
      "Uttar Pradesh", "Uttarakhand", "West Bengal",
    ],
  },
  {
    name: "Nepal",
    flag: "np",
    states: ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"],
  },
  { name: "United Kingdom", flag: "gb", states: ["England", "Scotland", "Wales", "Northern Ireland"] },
  { name: "Sri Lanka", flag: "lk" },
  { name: "Pakistan", flag: "pk" },
  { name: "United Arab Emirates", flag: "ae" },
  { name: "United States", flag: "us" },
  { name: "Canada", flag: "ca" },
  { name: "Australia", flag: "au" },
  { name: "Other" },
];

// "Nearest Enhance English Center": the coaching centres of the Contact Us page,
// each { id, name, address: [lines], phone }. The form sends the chosen one's name.
export const centers = offices;
