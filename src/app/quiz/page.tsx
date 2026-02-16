import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata = {
  title: "Dinner Quiz | Gourmet Disagreeables",
};

export default function QuizPage() {
  return (
    <>
      <Breadcrumb
        pageName="Dinner Quiz"
        description="Test your culinary knowledge with The Disagreeables."
      />
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="rounded-card border border-gray-200 bg-white p-12 shadow-card">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <span className="text-4xl">🍳</span>
              </div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-black">
                Coming Soon
              </h2>
              <p className="text-base text-body-color">
                The Dinner Quiz is being prepared. Check back soon for a fun
                way to decide what to cook next, test your food knowledge, and
                settle disagreements once and for all.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
