"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/Toaster";
import { signOut } from "@/lib/auth";

// "Log Out" on the profile page (app/profile/page.js): ends the sign-in on this
// browser and on the admin, then goes to the home page with a "Logged out" message.
export default function LogOutButton({ className = "" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await signOut();
        } catch (failure) {
          // Still signed in: stay on the profile, so the student can try again
          showToast({ tone: "error", title: "Could not log out", text: failure.message });
          setBusy(false);
          return;
        }
        showToast({ title: "Logged out", text: "You have been logged out. See you soon!" });
        router.push("/");
        router.refresh();
      }}
      className={`cursor-pointer disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {busy ? "Logging out…" : "Log Out"}
    </button>
  );
}
