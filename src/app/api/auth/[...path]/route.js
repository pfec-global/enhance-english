import { cookies } from "next/headers";
import { callApi, SIGNED_IN_COOKIE, studentIp, TOKEN_COOKIE } from "@/lib/session";

// The website's side of student accounts (called by lib/auth.js): passes each request
// on to the admin's API and keeps the sign-in in cookies instead of handing the token
// to the page. POST /api/auth/<action>, e.g. /api/auth/login.

// The actions passed on, with the admin's path for each
const actions = {
  login: "auth/login",
  register: "auth/register",
  "register/verify": "auth/register/verify",
  "password/forgot": "auth/password/forgot",
  "password/verify": "auth/password/verify",
  "password/reset": "auth/password/reset",
  "code/resend": "auth/code/resend",
  logout: "auth/logout",
};

// The ones that sign the student in: their answer carries the access token
const signsIn = new Set(["login", "register/verify"]);

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export async function POST(request, { params }) {
  const action = (await params).path.join("/");
  if (!(action in actions)) {
    return Response.json({ message: "Not found." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const isLogout = action === "logout";

  let result;
  try {
    result = await callApi(actions[action], {
      method: "POST",
      body: isLogout ? undefined : await request.json().catch(() => ({})),
      token: isLogout ? cookieStore.get(TOKEN_COOKIE)?.value : undefined,
      ip: studentIp(request),
    });
  } catch {
    return Response.json(
      { message: "We could not reach the server. Please check your connection and try again." },
      { status: 502 },
    );
  }
  const { status, json } = result;

  // Signed out on this browser even if the token had already stopped working
  if (isLogout) {
    cookieStore.delete(TOKEN_COOKIE);
    cookieStore.delete(SIGNED_IN_COOKIE);
    return Response.json({ message: "You have been signed out." });
  }

  if (signsIn.has(action) && status < 300 && json.data?.token) {
    const expires = json.data.expiresAt ? new Date(json.data.expiresAt) : new Date(Date.now() + THIRTY_DAYS);
    const secure = process.env.NODE_ENV === "production";
    cookieStore.set(TOKEN_COOKIE, json.data.token, { httpOnly: true, secure, sameSite: "lax", path: "/", expires });
    cookieStore.set(SIGNED_IN_COOKIE, "1", { secure, sameSite: "lax", path: "/", expires });
    // The token stays on the server
    return Response.json({ data: { student: json.data.student } }, { status });
  }

  return Response.json(json, { status });
}
