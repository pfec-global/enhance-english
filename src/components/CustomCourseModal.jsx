"use client";

import { usePathname } from "next/navigation";
import LinkModal from "@/components/LinkModal";
import RegistrationForm from "@/components/RegistrationForm";
import { registrationPageForPath } from "@/data/examRegistration";

/*
  "Design Your Own Course" pop-up, placed once in app/layout.js. Every link to
  /custom-course (the "Make my Own Course" button of components/CustomCourse.jsx)
  opens it. Ctrl/Cmd-click or a new tab still opens the /custom-course page,
  which has the same form.
  It is the site's one sign-up form (components/RegistrationForm.jsx), for the
  exam of the page it opens on. `pages` are the exam registration pages.
*/
export default function CustomCourseModal({ pages }) {
  const pathname = usePathname();

  return (
    <LinkModal href="/custom-course" labelledBy="custom-course-title" plain>
      <RegistrationForm
        page={registrationPageForPath(pages, pathname)}
        title="Design Your Own Course"
        titleId="custom-course-title"
        inDialog
      />
    </LinkModal>
  );
}
