"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { DownloadIcon, ReturnIcon } from "@/components/icons";
import { clearCart, formatAmount, useLastOrder } from "@/lib/cart";

const noSubscription = () => () => {};

const button =
  "inline-flex items-center gap-2 rounded-sm border border-brand-orange px-4 py-2.5 text-sm font-semibold transition-colors";

// Soft shapes behind the picture, two rows of four: "drop" shapes (round but for one
// corner) and circles. The picture stands over the middle two columns.
const shapes = [
  "rounded-full rounded-br-none bg-[#f2a596]",
  "rounded-full bg-[#dedcec]",
  "rounded-full rounded-bl-none bg-[#f2a596]",
  "rounded-full bg-[#dedcec]",
  "rounded-full bg-[#dedcec]",
  "rounded-full rounded-tr-none bg-[#7fd3ea]",
  "rounded-full bg-[#dedcec]",
  "rounded-full rounded-tl-none bg-[#7fd3ea]",
];

function Picture() {
  return (
    // pt: room for the picture, which is taller than the shapes behind
    <div className="relative mx-auto w-full max-w-xl animate-pop-in pt-[12%] [animation-delay:200ms] motion-reduce:animate-none">
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {shapes.map((shape, index) => (
          <div key={index} className={`aspect-square ${shape}`} />
        ))}
      </div>
      {/* TODO: the design has a cut-out statue here; replace with it once it is in public/image.
          Until then, the thank-you page's student (an arch with a see-through background). */}
      <div className="absolute inset-x-[22%] bottom-0">
        <Image
          src="/image/thank-you/hero-img.png"
          alt="Smiling Enhance English student"
          width={707}
          height={707}
          preload
          sizes="(min-width: 768px) 28vw, 56vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

// The order card: id, courses and the amount paid
function OrderCard({ order }) {
  return (
    <div className="mt-6 max-w-md animate-fade-up border border-black/15 bg-white p-5 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] [animation-delay:200ms] motion-reduce:animate-none">
      <p className="flex items-center gap-1.5 text-lg">
        Order ID: <span className="font-semibold text-brand-orange">{order.id}</span>
        <CopyButton text={order.id} label="order ID" />
      </p>
      {order.items?.length > 0 && (
        <ol className="mt-3 list-inside list-decimal space-y-1.5 text-sm">
          {order.items.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ol>
      )}
      {order.amount != null && (
        <p className="mt-4 flex items-center justify-between gap-4 bg-cream px-3 py-2 text-sm">
          <strong>Amount Paid</strong>
          <span>৳{formatAmount(order.amount)}</span>
        </p>
      )}
    </div>
  );
}

/*
  The payment success page (app/payment-success/page.js): "Yay! Purchase Successful!",
  the order (saved by the checkout before going to the gateway, lib/cart.js), "Download
  Invoice" and "Back to Homepage"; a picture in front of soft shapes on the right
  (below on phones). The cart is emptied, as its courses are now bought.
  `orderId` is the id the gateway sent back, if any.
*/
export default function PaymentSuccess({ orderId }) {
  const saved = useLastOrder();
  // The saved order only counts when it is the one the gateway sent back (or it sent none)
  const order = saved && (!orderId || saved.id === orderId) ? saved : null;
  // The saved order is only known in the browser; until then the card is left out
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);

  useEffect(() => {
    if (order) clearCart();
  }, [order]);

  const shownId = order?.id ?? orderId;

  return (
    <section className="relative overflow-hidden bg-surface">
      {/* The faint wave across the page (same as the contact page) */}
      <Image
        src="/image/404/vector-1.png"
        alt=""
        width={2880}
        height={914}
        sizes="100vw"
        className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-60 select-none"
      />

      <div className="site-container relative grid items-center gap-10 py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
        <div>
          <h1 className="animate-fade-up text-4xl leading-tight font-bold motion-reduce:animate-none lg:text-5xl">
            <span className="block text-brand-orange">Yay!</span>
            Purchase Successful!
          </h1>
          <p className="mt-4 max-w-md animate-fade-up text-sm [animation-delay:100ms] motion-reduce:animate-none sm:text-base">
            Thank you for choosing to purchase from Enhance English.{" "}
            {order
              ? "Here's your order details:"
              : "We have emailed your order details to you."}
          </p>

          {inBrowser && order ? (
            <OrderCard order={order} />
          ) : (
            shownId && (
              <p className="mt-4 flex items-center gap-1.5 text-lg">
                Order ID: <span className="font-semibold text-brand-orange">{shownId}</span>
                <CopyButton text={shownId} label="order ID" />
              </p>
            )
          )}

          <div className="mt-6 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms] motion-reduce:animate-none">
            {order?.invoiceUrl ? (
              <a
                href={order.invoiceUrl}
                download
                className={`${button} bg-brand-orange text-white hover:bg-transparent hover:text-brand-orange`}
              >
                Download Invoice
                <DownloadIcon className="size-4" />
              </a>
            ) : (
              // TODO: the invoice comes with the order from the admin; until then it is not ready
              <span
                aria-disabled="true"
                title="Your invoice will be emailed to you"
                className={`${button} cursor-not-allowed bg-brand-orange text-white opacity-60`}
              >
                Download Invoice
                <DownloadIcon className="size-4" />
              </span>
            )}
            <Link
              href="/"
              className={`${button} bg-white text-brand-orange hover:bg-brand-orange hover:text-white`}
            >
              Back to Homepage
              <ReturnIcon className="size-4" />
            </Link>
          </div>
        </div>

        <Picture />
      </div>
    </section>
  );
}
