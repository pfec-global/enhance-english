import { callApi, studentIp } from "@/lib/session";

// The cart's "Apply" (lib/cart.js, applyCoupon): asks the admin whether a coupon code
// can be used today. POST /api/coupons/check with { code } -> the admin's answer,
// { data: { code, percentage, startsOn, expiresOn } } or a 422 saying why not.
// It goes through this server so the admin can count tries per student (its limit
// stops codes being guessed), and so its address stays out of the page.
export async function POST(request) {
  const { code } = await request.json().catch(() => ({}));

  try {
    const { status, json } = await callApi("coupons/check", {
      method: "POST",
      body: { code: typeof code === "string" ? code : "" },
      ip: studentIp(request),
    });
    return Response.json(json, { status });
  } catch {
    return Response.json(
      { message: "We could not reach the server. Please check your connection and try again." },
      { status: 502 },
    );
  }
}
