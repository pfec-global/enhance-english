"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  PrivacyAgreement,
  Select,
  SentMessage,
  courseOfPage,
  courses,
  field,
  submitButton,
} from "@/components/FormFields";

/*
  "Book Your Free Demo Class" form: in the pop-up (components/DemoClassModal.jsx)
  and on the /book-demo page. Once sent it shows a thank-you message instead,
  with a "Close" button in the pop-up (`inDialog`).
*/
export default function DemoClassForm({ inDialog }) {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: send the details (new FormData(event.currentTarget)) to the real
    // demo class booking API once there is one.
    setSent(true);
  }

  if (sent) {
    return (
      <SentMessage inDialog={inDialog}>
        Our team will call you soon to book your free demo class.
      </SentMessage>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
      <input
        name="name"
        placeholder="Full Name"
        aria-label="Full Name"
        autoComplete="name"
        required
        className={field}
      />
      {/* Email and phone side by side from tablets up */}
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="email"
          type="email"
          placeholder="Email ID"
          aria-label="Email ID"
          autoComplete="email"
          required
          className={field}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          aria-label="Phone Number"
          autoComplete="tel"
          required
          className={field}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          name="course"
          label="Course"
          defaultValue={courseOfPage(pathname)}
        >
          {courses.map((course) => (
            <option key={course}>{course}</option>
          ))}
        </Select>
        <Select name="mode" label="Class Mode" defaultValue="">
          <option>Offline (at our office)</option>
          <option>Online</option>
        </Select>
      </div>

      <PrivacyAgreement />

      <button type="submit" className={submitButton}>
        Book My Free Class
      </button>
    </form>
  );
}
