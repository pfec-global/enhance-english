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

// The modules a visitor can put together, shown as chips to tick
const modules = [
  "Listening",
  "Reading",
  "Writing",
  "Speaking",
  "Grammar",
  "Vocabulary",
  "Pronunciation",
  "Presentation Skills",
];

const hours = [
  "Up to 20 hours",
  "20–40 hours",
  "40–60 hours",
  "60+ hours",
  "Not sure yet",
];

/*
  "Design Your Own Course" form: the modules, learning hours and mode of
  learning the visitor wants, for their goal. In the pop-up
  (components/CustomCourseModal.jsx) and on the /custom-course page. Once sent
  it shows a thank-you message instead, with a "Close" button in the pop-up
  (`inDialog`).
*/
export default function CustomCourseForm({ inDialog }) {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);
  const [noModule, setNoModule] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const details = new FormData(event.currentTarget);

    // At least one module (a group of checkboxes can't be `required` by itself)
    if (details.getAll("modules").length === 0) {
      setNoModule(true);
      event.currentTarget.querySelector('[name="modules"]').focus();
      return;
    }

    // TODO: send the details to the real custom course request API once there is one.
    setSent(true);
  }

  if (sent) {
    return (
      <SentMessage inDialog={inDialog}>
        Our team will call you soon with a course plan made for you.
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

      <Select
        name="goal"
        label="Learning Goal"
        defaultValue={courseOfPage(pathname)}
      >
        {courses.map((course) => (
          <option key={course}>{course}</option>
        ))}
      </Select>

      <fieldset
        aria-describedby={noModule ? "custom-course-modules-error" : undefined}
      >
        <legend className="text-sm font-semibold">
          Modules{" "}
          <span className="font-normal text-ink/60">(pick one or more)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {modules.map((module) => (
            <label key={module} className="cursor-pointer">
              <input
                type="checkbox"
                name="modules"
                value={module}
                onChange={() => setNoModule(false)}
                className="peer sr-only"
              />
              <span className="block rounded-full border border-black/20 px-3.5 py-1.5 text-sm transition-colors select-none peer-checked:border-brand-orange peer-checked:bg-brand-orange peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange/40 hover:border-brand-orange">
                {module}
              </span>
            </label>
          ))}
        </div>
        {noModule && (
          <p
            id="custom-course-modules-error"
            role="alert"
            className="mt-2 text-xs font-semibold text-brand-orange"
          >
            Pick at least one module.
          </p>
        )}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select name="hours" label="Learning Hours" defaultValue="">
          {hours.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
        <Select name="mode" label="Mode of Learning" defaultValue="">
          <option>Offline (at our office)</option>
          <option>Online</option>
          <option>Both online and offline</option>
        </Select>
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Anything else we should know? (optional)"
        aria-label="Anything else we should know?"
        className={`${field} resize-y`}
      />

      <PrivacyAgreement />

      <button type="submit" className={submitButton}>
        Request My Custom Course
      </button>
    </form>
  );
}
