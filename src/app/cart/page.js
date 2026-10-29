import Image from "next/image";
import CartView from "@/components/CartView";

export const metadata = {
  title: "Shopping Cart | Enhance English",
  description: "The courses you have added to your cart.",
  robots: { index: false, follow: false },
};

// The courses added with the cart buttons on the course cards (lib/cart.js),
// with the total, a coupon box and "Proceed to Checkout".
export default function CartPage() {
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
            My Profile
          </p>
          <h1 className="mt-3 text-3xl font-bold text-brand-orange sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base">
            All the products that you have added to your cart for purchasing will
            get displayed here.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container py-10 lg:py-14">
          <CartView />
        </div>
      </section>
    </>
  );
}
