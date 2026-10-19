"use client";

import CustomCourseForm from "@/components/CustomCourseForm";
import LinkModal from "@/components/LinkModal";

/*
  "Design Your Own Course" pop-up, placed once in app/layout.js. Every link to
  /custom-course (the "Make my Own Course" button of components/CustomCourse.jsx)
  opens it. Ctrl/Cmd-click or a new tab still opens the /custom-course page,
  which has the same form.
*/
export default function CustomCourseModal() {
  return (
    <LinkModal href="/custom-course" labelledBy="custom-course-title">
      <p className="w-fit bg-brand-orange px-2 py-1 text-sm font-bold text-white">
        Design your own course
      </p>
      <h2
        id="custom-course-title"
        className="mt-3 pr-8 text-2xl leading-tight font-bold sm:text-3xl"
      >
        Make Your{" "}
        <span className="font-coiny font-normal text-brand-orange">
          Own Course
        </span>
      </h2>
      <p className="mt-2 text-sm text-ink/75">
        Pick the modules, learning hours and mode of learning that fit your
        goals. We’ll call you with a course plan made for you.
      </p>

      <CustomCourseForm inDialog />
    </LinkModal>
  );
}
