import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SIGNED_IN_COOKIE, TOKEN_COOKIE } from "@/lib/session";

// A sign-in the admin no longer accepts (expired, or signed out elsewhere): its
// cookies are removed, then the student signs in again. app/profile/page.js sends
// them here, as a page cannot remove cookies itself.
export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE);
  cookieStore.delete(SIGNED_IN_COOKIE);
  redirect("/login");
}
