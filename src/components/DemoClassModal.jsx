"use client";

import { usePathname } from "next/navigation";
import LinkModal from "@/components/LinkModal";
import RegistrationForm from "@/components/RegistrationForm";
import { registrationPageForPath } from "@/data/examRegistration";

/*
  "Book Your Free Demo Class" pop-up, placed once in app/layout.js.
  Every link to /book-demo on the site (the "Book Free Demo Class" buttons, in
  components or in data files) opens it instead of going to that page — so a
  new button only needs href="/book-demo". Ctrl/Cmd-click or a new tab still
  opens the /book-demo page, which has the same form.
  It is the site's one sign-up form (components/RegistrationForm.jsx), for the
  exam of the page it opens on. `pages` are the exam registration pages.
*/
export default function DemoClassModal({ pages }) {
  const pathname = usePathname();

  return (
    <LinkModal href="/book-demo" labelledBy="demo-class-title" plain>
      <RegistrationForm
        page={registrationPageForPath(pages, pathname)}
        title="Book Your Free Demo Class"
        titleId="demo-class-title"
        inDialog
      />
    </LinkModal>
  );
}
