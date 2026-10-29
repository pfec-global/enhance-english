// Payment of the cart at the checkout (components/CheckoutView.jsx). Runs in the browser.
//
// TODO: the admin has no checkout endpoint yet. Once it does, it should save the
// order (billing details, courses, coupon), start an SSLCommerz payment session and
// answer with the gateway's page to send the student to and the order's id
// ({ redirectUrl, orderId, invoiceUrl? }). After a successful payment SSLCommerz should
// send the student to /payment-success?order=<orderId> (app/payment-success/page.js);
// after a failed or cancelled one, back to /checkout.

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

// POST /api/v1/checkout -> { redirectUrl, orderId, invoiceUrl }. Throws an Error whose
// message is shown under the button when the payment cannot be started.
export async function startPayment({ billing, items, coupon }) {
  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    throw new Error(
      "Online payment is not available yet. Please contact us to complete your purchase.",
    );
  }

  const response = await fetch(`${API_URL}/api/v1/checkout`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      billing,
      courses: items.map((item) => item.href),
      coupon: coupon?.code ?? null,
      gateway: "sslcommerz",
    }),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok || !json.data?.redirectUrl) {
    throw new Error(json.message || "The payment could not be started. Please try again.");
  }
  return json.data;
}
