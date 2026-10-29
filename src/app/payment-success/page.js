import PaymentSuccess from "@/components/PaymentSuccess";

// Kept out of search results: it only makes sense right after a payment.
export const metadata = {
  title: "Purchase Successful | Enhance English",
  robots: { index: false, follow: true },
};

// Where the payment gateway (SSLCommerz) sends the student after a successful payment,
// /payment-success?order=<order id> (see lib/checkout.js).
export default async function PaymentSuccessPage({ searchParams }) {
  const { order } = await searchParams;
  return <PaymentSuccess orderId={typeof order === "string" ? order : null} />;
}
