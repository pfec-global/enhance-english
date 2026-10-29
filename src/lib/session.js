import { cookies } from "next/headers";

// The signed-in student, on the server. The admin's Passport token is kept in an
// httpOnly cookie (set by app/api/auth/[...path]/route.js), so scripts in the page can
// never read it; a second, readable cookie only says that someone is signed in, for
// the header's "My Profile" link (lib/auth.js).

const API_URL = (process.env.API_URL || "http://localhost:8010").replace(/\/+$/, "");

export const TOKEN_COOKIE = "ee_token";
export const SIGNED_IN_COOKIE = "ee_signed_in";

// A request to the admin's API: /api/v1/<path>. `token` signs it in as the student;
// `ip` is the student's address, so the admin's rate limits count each student
// (it believes it only from this server, see TRUSTED_PROXIES in the admin's .env).
// Returns { status, json }. Throws if the admin cannot be reached.
export async function callApi(path, { method = "GET", body, token, ip } = {}) {
  const response = await fetch(`${API_URL}/api/v1/${path}`, {
    method,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(ip && { "X-Forwarded-For": ip }),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  return { status: response.status, json: await response.json().catch(() => ({})) };
}

// The student's IP address as the reverse proxy in front of this server saw it
// (nginx: proxy_set_header X-Real-IP $remote_addr), else the last address it added
export function studentIp(request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").map((part) => part.trim());
  return request.headers.get("x-real-ip") || forwarded?.at(-1) || undefined;
}

// The signed-in student with their purchased courses (GET /api/v1/me), or null when
// nobody is signed in or the admin no longer accepts the sign-in. Throws when the
// admin cannot be reached or fails, so a short outage does not sign anyone out.
export async function getStudent() {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;
  if (!token) return null;

  const { status, json } = await callApi("me", { token });
  if (status === 401) return null;
  if (status !== 200) throw new Error(`me answered ${status}`);
  return json.data;
}
