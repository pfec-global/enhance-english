import Image from "next/image";
import CheckoutView from "@/components/CheckoutView";
import { countryCodes } from "@/data/checkout";
import { getStudent } from "@/lib/session";

export const metadata = {
  title: "Checkout | Enhance English",
  description: "Review your courses, fill in the billing details and make the payment.",
  robots: { index: false, follow: false },
};

// "+8801712345678" -> { countryCode: "+880", phone: "1712345678" }. A number saved
// without its country code (e.g. "01712345678") is kept whole, with the usual +880.
// One whose country code is not in the list is left for the student to type.
function splitPhone(phone = "") {
  if (!phone.startsWith("+")) return { phone };
  const match = countryCodes
    .map((option) => option.code)
    .sort((a, b) => b.length - a.length)
    .find((code) => phone.startsWith(code));
  return match ? { countryCode: match, phone: phone.slice(match.length) } : {};
}

// The billing fields filled in from the signed-in student's account, or null.
// The checkout still opens if the admin cannot be reached: the fields are just empty.
async function studentDetails() {
  const student = await getStudent().catch(() => null);
  if (!student) return null;
  const [firstName = "", ...rest] = (student.name ?? "").trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
    email: student.email ?? "",
    ...splitPhone(student.phone ?? ""),
  };
}

// After the cart (app/cart/page.js), or straight from a course's "Buy Course" button.
// A signed-in student finds their name, email and number already filled in.
export default async function CheckoutPage() {
  const student = await studentDetails();

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        {/* The wave across the background (same as the contact page) */}
        <Image
          src="/image/404/vector-1.png"
          alt=""
          width={2880}
          height={914}
          sizes="100vw"
          className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-60 select-none"
        />
        <div className="site-container relative py-10 text-center lg:py-14">
          <p className="inline-block bg-brand-orange px-2 py-1 text-xs font-semibold text-white">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold text-brand-orange sm:text-4xl">
            Checkout
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base">
            Review your products, fill the billing details and proceed to make the
            payment
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container py-10 lg:py-14">
          <CheckoutView student={student} />
        </div>
      </section>
    </>
  );
}
