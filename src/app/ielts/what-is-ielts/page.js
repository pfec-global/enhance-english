import ExamInfoPage from "@/components/ExamInfoPage";
import { ieltsInfo } from "@/data/examInfo";

export const metadata = {
  title: "What is IELTS? Test Types, Format & Scoring | Enhance English",
  description: ieltsInfo.intro,
};

export default function WhatIsIeltsPage() {
  return <ExamInfoPage info={ieltsInfo} />;
}
