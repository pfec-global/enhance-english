import { Coiny, Montserrat, Titan_One } from "next/font/google";
import Header from "@/components/Header";
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
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${titanOne.variable} ${coiny.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions add their own attributes to <html>/<body> */}
      <body
        className="flex min-h-full flex-col bg-white font-sans text-ink"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
