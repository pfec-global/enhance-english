import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Log In | Enhance English",
  description: "Log in to your Enhance English account.",
};

// Normally the "Log In" buttons open the pop-up (components/AuthModal.jsx).
// This page has the same card, for a link opened in a new tab or shared.
export default function LoginPage() {
  return (
    <section className="bg-surface">
      <div className="site-container py-12 lg:py-16">
        <div className="mx-auto max-w-md">
          <AuthPanel initialView="signin" />
        </div>
      </div>
    </section>
  );
}
