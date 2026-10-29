import { NextResponse } from "next/server";

// Runs before the pages below are built. Only checks whether this browser has a
// sign-in (the cookies set by app/api/auth/[...path]/route.js); /profile then asks the
// admin whether it is still valid, and sends an expired one to /api/auth/expired.
// - /profile: signed out, go to the sign-in page
// - /login, /register: signed in already, go to the profile
const TOKEN_COOKIE = "ee_token";
const signedInOnly = ["/profile"];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const signedIn = request.cookies.has(TOKEN_COOKIE);
  const isPrivate = signedInOnly.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (isPrivate && !signedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!isPrivate && signedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/register"],
};
