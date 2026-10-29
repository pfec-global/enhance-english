import AuthPanel from "@/components/AuthPanel";

export const metadata = {
  title: "Create an Account | Enhance English",
  description: "Create your Enhance English account.",
};

// Same card as /login (and the pop-up, components/AuthModal.jsx), on the create-account screen.
export default function RegisterPage() {
  return (
    <section className="bg-surface">
      <div className="site-container py-12 lg:py-16">
        <div className="mx-auto max-w-md">
          <AuthPanel initialView="signup" />
        </div>
      </div>
    </section>
  );
}
