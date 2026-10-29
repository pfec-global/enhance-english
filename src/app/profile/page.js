import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { HelpCircleIcon, KeyIcon } from "@/components/icons";
import LogOutButton from "@/components/LogOutButton";
import { getStudent } from "@/lib/session";

export const metadata = {
  title: "My Profile | Enhance English",
  description: "Your Enhance English account details and order history.",
  robots: { index: false, follow: false },
};

const smallButton =
  "inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-semibold transition-colors";

const cardShadow = "shadow-[0.375rem_0.375rem_0_var(--color-brand-yellow)]";

// Shown for a course that has no picture of its own (or was deleted since)
const fallbackImage = "/image/course-hero.jpg";

function Stat({ label, value }) {
  return (
    <div className={`w-36 border border-black/15 bg-white p-4 ${cardShadow}`}>
      <p className="text-xs leading-snug text-ink/75">{label}</p>
      <p className="mt-2 text-xl font-bold text-brand-orange">{value}</p>
    </div>
  );
}

function OrderCard({ order }) {
  return (
    <article className={`flex flex-col border border-black/15 bg-white ${cardShadow}`}>
      <div className="relative aspect-[16/9]">
        <Image
          src={order.course?.image?.src || fallbackImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="flex items-center gap-1 text-xs">
          Order ID: <strong>{order.orderId}</strong>
          <CopyButton text={order.orderId} label="order ID" />
        </p>
        <h3 className="mt-1.5 leading-snug font-bold">
          {order.course ? (
            <Link href={order.course.href} className="hover:text-brand-orange">
              {order.title}
            </Link>
          ) : (
            order.title
          )}
        </h3>
        {/* mt-auto keeps the price and buttons on the bottom line of every card */}
        <p className="mt-auto pt-3 text-xs">
          Price <strong className="text-lg">৳{order.price}</strong>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {order.invoice ? (
            <a
              href={order.invoice}
              download
              className="rounded-sm border border-brand-orange bg-brand-orange px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-transparent hover:text-brand-orange"
            >
              Download Invoice
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="The invoice is not ready yet"
              className="cursor-not-allowed rounded-sm border border-brand-orange bg-brand-orange px-3 py-2 text-xs font-semibold text-white opacity-60"
            >
              Download Invoice
            </span>
          )}
          <Link
            href="/contact"
            className="rounded-sm border border-brand-orange px-3 py-2 text-xs text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
          >
            Get Help
          </Link>
        </div>
      </div>
    </article>
  );
}

/*
  My Profile: the student's name, email and phone with "Change Password" (opens the
  recovery steps of the sign-in pop-up, components/AuthModal.jsx), "Get Help" and
  "Log Out", two stat boxes, and every course they bought as a card. The student comes
  from the admin (GET /api/v1/me, lib/session.js); only a signed-in student gets here.
*/
export default async function ProfilePage() {
  // Signed out, the proxy (src/proxy.js) already sent the student to /login. A sign-in
  // the admin no longer accepts has its cookies removed first.
  const profile = await getStudent();
  if (!profile) redirect("/api/auth/expired");

  const courses = profile.purchasedCourses ?? [];
  const activeSince = new Date(profile.joinedAt).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        {/* The wave across the background (same as the contact page) */}
        <Image
          src="/image/404/vector-1.png"
          alt=""
          width={2880}
          height={914}
          sizes="100vw"
          className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-60 select-none"
        />

        <div className="site-container relative flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:justify-between lg:py-16">
          <div>
            <p className="inline-block bg-brand-orange px-2 py-1 text-xs font-semibold text-white">
              My Profile
            </p>
            <h1 className="mt-3 text-3xl font-bold text-brand-orange sm:text-4xl">
              {profile.name}
            </h1>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm sm:text-base">
              <dt className="font-bold">Email Address:</dt>
              <dd className="break-all">{profile.email || "—"}</dd>
              <dt className="font-bold">Phone Number:</dt>
              <dd>{profile.phone || "—"}</dd>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/forgot-password"
                className={`${smallButton} border-brand-orange bg-white text-brand-orange hover:bg-brand-orange hover:text-white`}
              >
                Change Password
                <KeyIcon className="size-4" />
              </Link>
              <Link
                href="/contact"
                className={`${smallButton} border-brand-blue bg-brand-blue text-white hover:bg-transparent hover:text-ink`}
              >
                Get Help
                <HelpCircleIcon className="size-4" />
              </Link>
              <LogOutButton
                className={`${smallButton} border-ink/30 bg-white text-ink hover:border-ink hover:bg-ink hover:text-white`}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Stat label="No of Items Purchased" value={courses.length} />
            <Stat label="Active Since" value={activeSince} />
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container py-12 lg:py-16">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Order History</h2>
          {courses.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <OrderCard key={course.id} order={course} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-center text-ink/75">
              You haven&apos;t bought any courses yet.{" "}
              <Link href="/ielts" className="text-brand-orange underline">
                Explore our courses
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
