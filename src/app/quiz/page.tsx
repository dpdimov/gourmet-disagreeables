import Breadcrumb from "@/components/Common/Breadcrumb";
import DinnerQuiz from "@/components/Quiz/DinnerQuiz";
import { quizzes } from "@/data/quizzes";

export const metadata = {
  title: "Dinner Quiz | Gourmet Disagreeables",
};

export const dynamic = "force-dynamic";

export default function QuizPage() {
  const initialIndex = Math.floor(Math.random() * quizzes.length);

  return (
    <>
      <Breadcrumb
        pageName="Dinner Quiz"
        description="Discover your food personality with The Disagreeables."
      />
      <DinnerQuiz allQuizzes={quizzes} initialIndex={initialIndex} />
    </>
  );
}
