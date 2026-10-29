"use client";

import Link from "next/link";
import { CartIcon, CheckIcon } from "@/components/icons";
import { showToast } from "@/components/Toaster";
import { addToCart, useCart } from "@/lib/cart";

const styles = {
  // Round icon button on a course card (components/CourseCard.jsx).
  // relative z-10: it stays clickable above the card's full-card link.
  round: {
    base: "relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-brand-orange transition-colors",
    add: "cursor-pointer text-brand-orange hover:bg-brand-orange hover:text-white",
    added: "bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange",
  },
  // "Add to Cart" next to "Buy Course" on a course page (components/CoursePricing.jsx)
  wide: {
    base: "flex items-center gap-3 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors",
    add: "cursor-pointer bg-white/60 hover:bg-brand-orange hover:text-white",
    added: "bg-white/60 text-brand-orange hover:bg-brand-orange hover:text-white",
  },
};

// Adds `course` to the cart, with a message in the top right corner
// (components/Toaster.jsx); once it is there, it shows a tick and opens the cart.
// `course` is a cart item: href, title, price and optionally actualPrice, image,
// duration, classes, text (see lib/cart.js). `variant` is "round" or "wide".
export default function AddToCartButton({ course, variant = "round" }) {
  const inCart = useCart().some((item) => item.href === course.href);
  const style = styles[variant];
  const wide = variant === "wide";

  if (inCart) {
    return (
      <Link
        href="/cart"
        aria-label={`${course.title} is in your cart. Go to the cart`}
        title="In your cart"
        className={`${style.base} ${style.added}`}
      >
        {wide && "Added – View Cart"}
        <CheckIcon className="size-5" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(course);
        showToast({
          title: "Added to cart",
          text: course.title,
          link: { href: "/cart", label: "View Cart" },
        });
      }}
      aria-label={`Add ${course.title} to cart`}
      title="Add to cart"
      className={`${style.base} ${style.add}`}
    >
      {wide && "Add to Cart"}
      <CartIcon className="size-5" />
    </button>
  );
}
