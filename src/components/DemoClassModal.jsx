"use client";

import DemoClassForm from "@/components/DemoClassForm";
import LinkModal from "@/components/LinkModal";

/*
  "Book Your Free Demo Class" pop-up, placed once in app/layout.js.
  Every link to /book-demo on the site (the "Book Free Demo Class" buttons, in
  components or in data files) opens it instead of going to that page — so a
  new button only needs href="/book-demo". Ctrl/Cmd-click or a new tab still
  opens the /book-demo page, which has the same form.
*/
export default function DemoClassModal() {
  return (
    <LinkModal href="/book-demo" labelledBy="demo-class-title">
      <p className="w-fit bg-brand-orange px-2 py-1 text-sm font-bold text-white">
        100% Free
      </p>
      <h2
        id="demo-class-title"
        className="mt-3 pr-8 text-2xl leading-tight font-bold sm:text-3xl"
      >
        Book Your Free{" "}
        <span className="font-coiny font-normal text-brand-orange">
          Demo Class
        </span>
      </h2>
      <p className="mt-2 text-sm text-ink/75">
        Try a class with our expert trainers before you join. Leave your details
        and we’ll call you to fix a time that suits you.
      </p>

      <DemoClassForm inDialog />
    </LinkModal>
  );
}
