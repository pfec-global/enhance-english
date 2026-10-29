import { useSyncExternalStore } from "react";

// The shopping cart: the courses added with the cart button on a course card
// (components/AddToCartButton.jsx), counted in the header and listed on /cart,
// and the coupon applied to it there or on /checkout.
// Kept in the browser (localStorage), so it stays after a reload and is the same
// in every tab. Each item is a course card's details, keyed by its `href`.
//
// TODO: once students have accounts in the admin, save the cart there too, so it
// follows the student to other devices.

// A value saved in localStorage under `key`, with React subscribers.
// `fallback` is used when nothing (or something broken) is saved.
function storedValue(key, fallback, isValid) {
  const listeners = new Set();
  // The last value read, so the same object is returned until it changes
  let cache = { raw: null, value: fallback };

  function read() {
    let raw = null;
    try {
      raw = localStorage.getItem(key);
    } catch {
      // Storage blocked (e.g. some private windows): nothing is saved
    }
    if (raw !== cache.raw) {
      let value = fallback;
      try {
        value = raw ? JSON.parse(raw) : fallback;
      } catch {
        // A broken value is dropped
      }
      cache = { raw, value: isValid(value) ? value : fallback };
    }
    return cache.value;
  }

  function write(value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Not saved, but the page still shows the change until it is reloaded
      cache = { raw: null, value };
    }
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.add(listener);
    // Another tab changed it
    const onStorage = (event) => event.key === key && listener();
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  // The value; `fallback` while the page is built on the server
  const use = () => useSyncExternalStore(subscribe, read, () => fallback);

  return { read, write, use };
}

const empty = [];
const cart = storedValue("ee-cart", empty, Array.isArray);
// Today's date in Bangladesh, e.g. "2026-10-29": the admin's coupons start and end by it
const todayInBangladesh = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

// { code, percent, expiresOn } or null. A coupon whose last day has passed is dropped
// (and so is one saved before coupons came from the admin, which has no expiresOn).
const coupon = storedValue(
  "ee-coupon",
  null,
  (value) =>
    value === null ||
    (typeof value?.percent === "number" && typeof value.expiresOn === "string" && value.expiresOn >= todayInBangladesh()),
);
// The order last sent to the payment gateway (see saveLastOrder), or null
const lastOrder = storedValue("ee-last-order", null, (value) => value === null || typeof value?.id === "string");

// The items in the cart; empty while the page is built on the server
export const useCart = cart.use;

// `course` in the shape of the course cards (data/programs.js or the admin)
export function addToCart(course) {
  const items = cart.read();
  if (items.some((item) => item.href === course.href)) return;
  const { href, title, duration, classes, price, actualPrice, image, text } = course;
  cart.write([...items, { href, title, duration, classes, price, actualPrice, image, text }]);
}

export const removeFromCart = (href) =>
  cart.write(cart.read().filter((item) => item.href !== href));

// Empties the cart, and drops its coupon
export function clearCart() {
  cart.write(empty);
  coupon.write(null);
}

// "7,000" -> 7000 (prices come as text with commas)
export const toAmount = (price) => Number(String(price ?? "").replace(/[^\d.]/g, "")) || 0;

// 7000 -> "7,000"
export const formatAmount = (amount) => Math.round(amount).toLocaleString("en-US");

// The coupon applied to the cart ({ code, percent, expiresOn }), or null
export const useCoupon = coupon.use;

// Checks `code` with the admin (app/api/coupons/check/route.js) and applies it.
// Throws an Error whose message says why it cannot be used, e.g. "This coupon expired on…".
// The admin checks the coupon again when the order is paid for.
export async function applyCoupon(code) {
  let response;
  try {
    response = await fetch("/api/coupons/check", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim() }),
    });
  } catch {
    throw new Error("We could not reach the server. Please check your connection and try again.");
  }

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      json.errors?.code?.[0] ||
        json.message ||
        (response.status === 429
          ? "Too many tries. Please wait a minute and try again."
          : "Something went wrong. Please try again."),
    );
  }

  const { code: checkedCode, percentage, expiresOn } = json.data;
  coupon.write({ code: checkedCode, percent: percentage, expiresOn });
}

export const removeCoupon = () => coupon.write(null);

// The order being paid for, kept while the student is on the payment gateway, so the
// payment success page (app/payment-success/page.js) can show it when they come back:
// { id, items: [course titles], amount, invoiceUrl }.
// TODO: once the admin can be asked for an order by its id, show that instead.
export const saveLastOrder = (order) => lastOrder.write(order);
export const useLastOrder = lastOrder.use;

// The cart's prices: `total` (what the courses cost now), `actual` (before their
// own discounts), `savedPercent` (between the two) and `final` (after the coupon)
export function cartTotals(items, applied) {
  const total = items.reduce((sum, item) => sum + toAmount(item.price), 0);
  const actual = items.reduce((sum, item) => sum + toAmount(item.actualPrice || item.price), 0);
  return {
    total,
    actual,
    savedPercent: actual > total ? Math.round(((actual - total) / actual) * 100) : 0,
    final: applied ? total - (total * applied.percent) / 100 : total,
  };
}
