import { redirect } from "next/navigation";

// "Exam Registration" in the main navigation opens the IELTS page. The PTE
// page is linked from the PTE menu and cards.
export default function ExamRegistrationPage() {
  redirect("/exam-registration/ielts");
}
