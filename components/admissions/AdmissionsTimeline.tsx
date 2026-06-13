import { cn } from "@/lib/utils";

const steps = [
  {
    step: 1,
    title: "Submit Inquiry",
    description:
      "Complete the online inquiry form or visit the admissions office during working hours.",
  },
  {
    step: 2,
    title: "Document Submission",
    description:
      "Provide birth certificate, previous school records, CNIC/B-Form copies, and passport photos.",
  },
  {
    step: 3,
    title: "Entrance Assessment",
    description:
      "Students sit for a grade-appropriate assessment in English, Mathematics, and general aptitude.",
  },
  {
    step: 4,
    title: "Interview",
    description:
      "A brief interview with the student and parents to discuss expectations and school values.",
  },
  {
    step: 5,
    title: "Admission Offer",
    description:
      "Successful candidates receive an offer letter with fee structure and enrollment deadline.",
  },
  {
    step: 6,
    title: "Enrollment",
    description:
      "Pay admission fees, complete registration forms, and receive uniform and book list.",
  },
];

export default function AdmissionsTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 hidden h-full w-px bg-gold/20 sm:left-6 md:block" />
      <div className="space-y-6">
        {steps.map((item) => (
          <div key={item.step} className="relative flex gap-4 sm:gap-6">
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12",
                "border-gold bg-charcoal text-sm font-bold text-gold sm:text-base"
              )}
            >
              {item.step}
            </div>
            <div
              className={cn(
                "flex-1 rounded-xl border border-white/10 bg-charcoal-light/60 p-4 sm:p-5",
                "transition-colors hover:border-gold/20"
              )}
            >
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
