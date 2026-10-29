import { useSyncExternalStore } from "react";

// Student accounts: sign in, sign up with a one-time secret code, password recovery
// and sign out (components/AuthPanel.jsx). Runs in the browser.
//
// Each call goes to this website's own server (app/api/auth/[...path]/route.js), which
// passes it on to the admin's API (enhance_english_admin) and keeps the sign-in in an
// httpOnly cookie. Each call throws an Error whose message is shown under the form
// when the admin turns the request down (e.g. a wrong code).

const SIGNED_IN_COOKIE = "ee_signed_in";
// Fired on this page when someone signs in or out, for useSignedIn
const AUTH_EVENT = "ee-auth";

// POST /api/auth/<path> with `body` -> its `data`
async function call(path, body) {
  let response;
  try {
    response = await fetch(`/api/auth/${path}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
    });
  } catch {
    throw new Error("We could not reach the server. Please check your connection and try again.");
  }

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    // A form error from the admin: its first message, e.g. "This number is already used…"
    const firstError = Object.values(json.errors ?? {})[0]?.[0];
    throw new Error(
      firstError ||
        json.message ||
        (response.status === 429
          ? "Too many tries. Please wait a minute and try again."
          : "Something went wrong. Please try again."),
    );
  }
  return json.data ?? {};
}

const announce = () => window.dispatchEvent(new Event(AUTH_EVENT));

export async function signIn({ login, password }) {
  const data = await call("login", { login, password });
  announce();
  return data;
}

// Creates the account and emails the secret code to `login` (an email address)
export const signUp = (details) => call("register", details);

// The secret code of a new account: it is verified and signed in
export async function verifySignUp({ login, code }) {
  const data = await call("register/verify", { login, code });
  announce();
  return data;
}

// Emails a secret code to the account of `login` (its email address or mobile number)
export const sendRecoveryCode = ({ login }) => call("password/forgot", { login });

// Returns { token }, which allows the password to be set with resetPassword
export const verifyRecoveryCode = ({ login, code }) =>
  call("password/verify", { login, code });

export const resetPassword = ({ login, token, password }) =>
  call("password/reset", { login, token, password });

// Asks for a new code for the sign-up or the recovery of `login`
export const resendCode = ({ login, purpose }) =>
  call("code/resend", { login, purpose });

export async function signOut() {
  await call("logout");
  announce();
}

// Whether someone is signed in on this browser (the readable cookie set with the
// sign-in), e.g. for the header's "My Profile" link. False while the page is built.
const readSignedIn = () => document.cookie.split("; ").includes(`${SIGNED_IN_COOKIE}=1`);

function subscribe(listener) {
  window.addEventListener(AUTH_EVENT, listener);
  // Signed in or out in another tab
  window.addEventListener("focus", listener);
  return () => {
    window.removeEventListener(AUTH_EVENT, listener);
    window.removeEventListener("focus", listener);
  };
}

export const useSignedIn = () => useSyncExternalStore(subscribe, readSignedIn, () => false);
