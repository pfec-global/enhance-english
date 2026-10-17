"use client";

import dynamic from "next/dynamic";

// components/ExamCalendar.jsx, loaded in the browser only because it depends on
// today's date. The empty square holds its space while it loads.
const LazyExamCalendar = dynamic(() => import("@/components/ExamCalendar"), {
  ssr: false,
  loading: () => <div className="aspect-square w-full" />,
});

export default LazyExamCalendar;
