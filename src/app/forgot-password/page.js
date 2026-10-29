import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Recover your Account | Enhance English",
  description: "Set a new password for your Enhance English account.",
};

// Same card as /login (and the pop-up, components/AuthModal.jsx), on the recovery screen.
export default function ForgotPasswordPage() {
  return (
    <section className="bg-surface">
      <div className="site-container py-12 lg:py-16">
        <div className="mx-auto max-w-md">
          <AuthPanel initialView="forgot" />
        </div>
      </div>
    </section>
  );
}
