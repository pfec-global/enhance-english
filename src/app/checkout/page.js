import Image from "next/image";
import CheckoutView from "@/components/CheckoutView";

export const metadata = {
  title: "Checkout | Enhance English",
  description: "Review your courses, fill in the billing details and make the payment.",
  robots: { index: false, follow: false },
};

// After the cart (app/cart/page.js), or straight from a course's "Buy Course" button
export default function CheckoutPage() {
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
          <CheckoutView />
        </div>
      </section>
    </>
  );
}
