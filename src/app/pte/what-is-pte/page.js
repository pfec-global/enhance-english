import ExamInfoPage from "@/components/ExamInfoPage";
import { pteInfo } from "@/data/examInfo";

export const metadata = {
  title: "What is PTE? Test Types, Format & Scoring | Enhance English",
  description: pteInfo.intro,
};

export default function WhatIsPtePage() {
  return <ExamInfoPage info={pteInfo} />;
}
