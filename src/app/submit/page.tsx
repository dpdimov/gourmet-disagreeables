import Breadcrumb from "@/components/Common/Breadcrumb";
import SubmitForm from "./SubmitForm";

export const metadata = {
  title: "Submit a Recipe | Gourmet Disagreeables",
};

export default function SubmitPage() {
  return (
    <>
      <Breadcrumb
        pageName="Submit a Recipe"
        description="Share your favourite recipe with The Disagreeables. You can also import from a URL."
      />
      <section className="pb-[120px] pt-[60px]">
        <div className="container">
          <div className="mx-auto max-w-[800px]">
            <SubmitForm />
          </div>
        </div>
      </section>
    </>
  );
}
