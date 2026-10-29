"use client";

import AuthPanel from "@/components/AuthPanel";
import LinkModal from "@/components/LinkModal";

/*
  Sign in / sign up pop-up, placed once in app/layout.js. Every link to /login
  (the header's "Log In" button) opens it on the sign-in screen, every link to
  /register on the create-account screen and to /forgot-password (the profile's
  "Change Password") on the recovery screen. Ctrl/Cmd-click or a new tab still opens
  that page, which has the same card (components/AuthPanel.jsx).
*/
const views = { "/register": "signup", "/forgot-password": "forgot" };

export default function AuthModal() {
  return (
    <LinkModal
      href={["/login", "/register", "/forgot-password"]}
      labelledBy="auth-title"
      plain
      closeLabel
      className="max-w-md"
    >
      {(href) => (
        <AuthPanel initialView={views[href] ?? "signin"} />
      )}
    </LinkModal>
  );
}
