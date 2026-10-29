"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import CartSummary, { summaryButton } from "@/components/CartSummary";
import CenterSelect from "@/components/CenterSelect";
import PickerSelect from "@/components/PickerSelect";
import { CheckIcon, ChevronDownIcon, CreditCardIcon, GlobeIcon } from "@/components/icons";
import { centers, countries, countryCodes } from "@/data/checkout";
import { cartTotals, saveLastOrder, useCart, useCoupon } from "@/lib/cart";
import { startPayment } from "@/lib/checkout";
import useFieldErrors from "@/hooks/useFieldErrors";

const noSubscription = () => () => {};

const card =
  "border border-black/15 p-5 shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)] sm:p-6";
const label = "mb-1.5 block text-xs font-bold";
const field =
  "w-full rounded-lg border border-black/10 bg-[#f3f3f3] px-3 py-2.5 text-sm outline-none placeholder:text-ink/50 focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20 aria-invalid:border-brand-orange aria-invalid:bg-brand-orange/5";

// A labelled field with its message under it (`error`, from useFieldErrors)
function Field({ title, note, id, error, className = "", children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={label}>
        {title}
        {note && <span className="font-normal"> {note}</span>}
      </label>
      {children}
      {error}
    </div>
  );
}

// A select with the arrow drawn on top of it; `placeholder` is its empty first choice
function Select({ placeholder, options, ...props }) {
  return (
    <div className="relative">
      <select
        required
        className={`${field} cursor-pointer appearance-none pr-9 invalid:text-ink/50`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-orange" />
    </div>
  );
}

// A country's flag (public/image/flags), or a globe for "Other"
function Flag({ code }) {
  if (!code) {
    return (
      <span className="grid h-4 w-6 place-items-center text-ink/50">
        <GlobeIcon className="size-4" />
      </span>
    );
  }
  return (
    <Image
      src={`/image/flags/${code}.svg`}
      alt=""
      width={24}
      height={16}
      className="h-4 w-6 rounded-[3px] object-cover shadow-[0_0_0_1px_rgb(0_0_0/0.1)]"
    />
  );
}

const countryOptions = countries.map((option) => ({
  value: option.name,
  label: option.name,
  icon: <Flag code={option.flag} />,
}));

// "3 Items in the Cart" with their names and a link back to the cart
function CartItems({ items }) {
  return (
    <section className={`${card} bg-[#f1f3f7]`}>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold">
          {items.length} {items.length === 1 ? "Item" : "Items"} in the Cart
        </h2>
        <Link
          href="/cart"
          className="shrink-0 text-xs text-brand-orange underline underline-offset-2 hover:no-underline"
        >
          Make Changes
        </Link>
      </div>
      <ul className="mt-1.5 space-y-0.5 text-xs text-ink/75">
        {items.map((item) => (
          <li key={item.href}>{item.title}</li>
        ))}
      </ul>
    </section>
  );
}

// `fieldProps` and `errorFor` come from the checkout form's useFieldErrors
function BillingFields({ fieldProps, errorFor }) {
  const [country, setCountry] = useState("");
  const states = countries.find((option) => option.name === country)?.states;

  return (
    <div className="grid gap-4 pt-4 sm:grid-cols-6">
      <Field title="First Name" id="billing-first" error={errorFor("firstName")} className="sm:col-span-3">
        <input id="billing-first" {...fieldProps("firstName")} name="firstName" placeholder="First Name" autoComplete="given-name" required className={field} />
      </Field>
      <Field title="Last Name" id="billing-last" error={errorFor("lastName")} className="sm:col-span-3">
        <input id="billing-last" {...fieldProps("lastName")} name="lastName" placeholder="Last Name" autoComplete="family-name" required className={field} />
      </Field>

      {/* The country code and the number share the left half */}
      <div className="grid grid-cols-[7.5rem_1fr] gap-3 sm:col-span-3">
        <Field title="Country Code" id="billing-code">
          <Select
            id="billing-code"
            name="countryCode"
            defaultValue="+880"
            autoComplete="tel-country-code"
            placeholder="Code"
            options={countryCodes.map((option) => ({
              value: option.code,
              label: `${option.flag} ${option.code}`,
            }))}
          />
        </Field>
        <Field title="Contact Number" id="billing-phone" error={errorFor("phone")}>
          <input
            id="billing-phone"
            {...fieldProps("phone")}
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
            autoComplete="tel-national"
            pattern="[\d\s\-]{6,14}"
            title="Digits only, without the country code"
            required
            className={field}
          />
        </Field>
      </div>
      <Field title="Student's Email" id="billing-email" error={errorFor("email")} className="sm:col-span-3">
        <input id="billing-email" {...fieldProps("email")} name="email" type="email" placeholder="Enter the Student's Email ID" autoComplete="email" required className={field} />
      </Field>

      <Field title="Street Address" id="billing-street" error={errorFor("street")} className="sm:col-span-4">
        <input id="billing-street" {...fieldProps("street")} name="street" placeholder="Enter the Student's Street Address" autoComplete="street-address" required className={field} />
      </Field>
      <Field title="City" id="billing-city" error={errorFor("city")} className="sm:col-span-2">
        <input id="billing-city" {...fieldProps("city")} name="city" placeholder="Enter City Name" autoComplete="address-level2" required className={field} />
      </Field>

      <Field title="Country" id="billing-country" error={errorFor("country")} className="sm:col-span-2">
        <PickerSelect
          id="billing-country"
          name="country"
          value={country}
          onChange={setCountry}
          required
          requiredMessage="Please choose your country."
          placeholder="Choose Country"
          fieldProps={fieldProps("country")}
          emptyIcon={<GlobeIcon className="size-4 text-ink/40" />}
          options={countryOptions}
        />
      </Field>
      <Field title="Province/State" id="billing-state" error={errorFor("state")} className="sm:col-span-2">
        {/* A list for the countries that have one, otherwise a text box. key: a new country starts empty */}
        {states ? (
          <Select
            key={country}
            id="billing-state"
            name="state"
            {...fieldProps("state")}
            defaultValue=""
            autoComplete="address-level1"
            placeholder="Choose State"
            options={states}
          />
        ) : (
          <input
            key={country}
            id="billing-state"
            name="state"
            {...fieldProps("state")}
            placeholder={country ? "Enter State" : "Choose a Country First"}
            disabled={!country}
            autoComplete="address-level1"
            className={`${field} disabled:cursor-not-allowed`}
          />
        )}
      </Field>
      <Field title="Postal Code/Zip Code" id="billing-zip" error={errorFor("postalCode")} className="sm:col-span-2">
        <input id="billing-zip" {...fieldProps("postalCode")} name="postalCode" placeholder="Enter Zip Code" autoComplete="postal-code" required className={field} />
      </Field>

      <Field
        title="Nearest Enhance English Center"
        note="(For communication and processing purposes)"
        id="billing-center"
        error={errorFor("center")}
        className="sm:col-span-6"
      >
        <CenterSelect id="billing-center" name="center" centers={centers} fieldProps={fieldProps("center")} />
      </Field>
    </div>
  );
}

// The only gateway for now, shown chosen
function PaymentGateway() {
  return (
    <section className={`${card} bg-white`}>
      <h2 className="text-lg font-bold">Payment Gateway</h2>
      <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-green-500 bg-green-50 p-4 has-focus-visible:ring-2 has-focus-visible:ring-green-500/40">
        <input type="radio" name="gateway" value="sslcommerz" defaultChecked className="peer sr-only" />
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-green-600 text-white">
          <CheckIcon className="size-3.5" strokeWidth={3} />
        </span>
        {/* The text goes under the logo when there is no room beside it */}
        <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="shrink-0 rounded-sm bg-brand-navy px-2 py-1 text-[0.625rem] font-extrabold tracking-wide text-white">
            SSLCOMMERZ
          </span>
          <span className="min-w-48 flex-1">
            <span className="block text-sm font-bold">SSL Commerz</span>
            <span className="block text-xs text-ink/75">
              Credit Card, Debit Card, Netbanking, Digital Payment
            </span>
          </span>
        </span>
      </label>
    </section>
  );
}

/*
  The checkout page's content (app/checkout/page.js): the courses in the cart,
  the billing details (can be folded away), the payment gateway and, beside them,
  the cart's total and coupon (components/CartSummary.jsx) with "Make Payment".
  Make Payment checks the form, then hands over to the gateway (lib/checkout.js).
*/
export default function CheckoutView() {
  const formId = useId();
  const { formProps, fieldProps, errorFor } = useFieldErrors();
  const items = useCart();
  const coupon = useCoupon();
  // The cart is only known in the browser; until then nothing is shown
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);
  const [billingOpen, setBillingOpen] = useState(true);
  // False while the billing details slide open or shut, when their edges are clipped
  const [billingSettled, setBillingSettled] = useState(true);

  function showBilling(open) {
    if (open === billingOpen) return;
    setBillingOpen(open);
    // With reduced motion there is no slide, so nothing to wait for
    setBillingSettled(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  if (!inBrowser) return <div className="min-h-64" />;

  if (!items.length) {
    return (
      <div className="py-10 text-center">
        <p className="text-xl font-bold">Your cart is empty</p>
        <p className="mt-2 text-sm text-ink/75">Add a course to your cart to check out.</p>
        <Link
          href="/ielts"
          className="mt-5 inline-block border border-brand-orange bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const billing = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    setError(null);
    try {
      const { redirectUrl, orderId, invoiceUrl } = await startPayment({ billing, items, coupon });
      // Kept for the payment success page, which the gateway sends the student to
      saveLastOrder({
        id: String(orderId),
        items: items.map((item) => item.title),
        amount: cartTotals(items, coupon).final,
        invoiceUrl: invoiceUrl ?? null,
      });
      window.location.assign(redirectUrl);
    } catch (failure) {
      setError(failure.message);
      setBusy(false);
    }
  }

  return (
    // minmax(0, 1fr): the column is as wide as the screen allows, never as wide as its content
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:gap-16">
      <form {...formProps} id={formId} onSubmit={handleSubmit} className="grid gap-6">
        <CartItems items={items} />

        <section className={`${card} bg-white`}>
          <h2>
            <button
              type="button"
              aria-expanded={billingOpen}
              onClick={() => showBilling(!billingOpen)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-lg font-bold"
            >
              Billing Details
              <ChevronDownIcon
                className={`size-5 text-brand-orange transition-transform duration-300 ${billingOpen ? "rotate-180" : ""}`}
              />
            </button>
          </h2>
          {/* Slides open and shut (grid-rows 0fr → 1fr); folded fields are inert.
              Once open, nothing is clipped, so the centre list can hang below the card. */}
          <div
            inert={!billingOpen}
            onTransitionEnd={(event) =>
              event.target === event.currentTarget && setBillingSettled(true)
            }
            className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
              billingOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div
              className={`px-1 pb-1 ${billingOpen && billingSettled ? "overflow-visible" : "overflow-hidden"}`}
            >
              <BillingFields fieldProps={fieldProps} errorFor={errorFor} />
            </div>
          </div>
        </section>

        <PaymentGateway />
      </form>

      <CartSummary items={items}>
        {/* Outside the form (form= links it). It unfolds the billing details first,
            so the browser can point at a field that still needs filling in. */}
        <button
          type="submit"
          form={formId}
          disabled={busy}
          onClick={() => flushSync(() => showBilling(true))}
          className={summaryButton}
        >
          {busy ? "Please wait…" : "Make Payment"}
          <CreditCardIcon className="size-4" />
        </button>
        {error && (
          <p role="alert" className="mt-2 text-xs text-brand-orange">
            {error}
          </p>
        )}
      </CartSummary>
    </div>
  );
}
