import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Stagger animation by 100ms for each item

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transform transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-5 text-left font-semibold text-gray-900 hover:text-airbanBlue transition-colors duration-200 group">
          <span className="text-lg">{question}</span>
          <div className="relative">
            <div
              className={`transform transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {isOpen ? (
                <Minus className="h-5 w-5 text-airbanBlue" />
              ) : (
                <Plus className="h-5 w-5 text-gray-500 group-hover:text-airbanBlue transition-colors duration-200" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out">
          <div className="pb-6 pr-8 animate-in slide-in-from-top-1 duration-300">
            <p className="text-gray-600 leading-relaxed text-base">{answer}</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  // Default FAQ data with professional real estate content
  const defaultFaqs: FAQ[] = [
    {
      question: "Should I buy or continue to rent?",
      answer:
        "The decision to buy or rent depends largely on your financial circumstances and how long you plan to stay. If you're staying for just a few years, renting may be better. However, home ownership can be an excellent investment that appreciates in value, helps build equity, and provides financial gains. If you can meet your financial obligations and are ready for property maintenance responsibilities, buying could be the best decision you'll ever make.",
    },
    {
      question: "Do I need a Real Estate Broker?",
      answer:
        "Absolutely. When buying a home, you need a professional to engage with developers and ask all the technical questions that many overlook or are unaware of. Choose a broker who understands the real estate market and will represent your best interests. A well-versed broker can help you get value from your purchase and avoid common pitfalls that first-time home buyers make.",
    },
    {
      question: "Who pays the Realtor fees?",
      answer:
        "In most cases, the seller pays the broker fees. Many buyers are uncomfortable with the thought of additional charges from broker fees. However, avoiding broker fees provides no real gain and could lead to future charges that could have been avoided if a certified professional had represented your interests before the purchase.",
    },
    {
      question: "Do I have the option to inspect the property?",
      answer:
        "Yes, before closing the deal, you have the option to inspect the property. You can check for wiring, plumbing, or maintenance defects, or even conduct advance pre-construction inspections. Always take the opportunity to inspect the property before purchasing. Your broker will advise you on the necessary inspections relevant to your desired property.",
    },
    {
      question: "How much do I need for a down payment?",
      answer:
        "For a mortgage, most lenders expect 20% to 40% for a down payment, depending on their requirements and the type and duration of the loan. As exciting as home ownership is, your first down payment could be discouraging if you're not adequately prepared. We advise that you prepare a budget, plan and save towards a down payment before approaching a realtor.",
    },
    {
      question: "How do I get the best mortgage?",
      answer:
        "We know researching mortgages can be time-consuming and confusing. Since you're here, we recommend consulting our team for advice on the best rates and mortgages in Ghana. Our experienced representatives can guide you through the process and help you find the most suitable mortgage option for your needs.",
    },
    {
      question: "Can I afford a mortgage?",
      answer:
        "We use your Debt-To-Income (DTI) ratio to determine affordability. You can afford a home if your total debt, including your mortgage, is up to 43% or less of your income before tax. For example, if your monthly income is GHS 8,000, then your total monthly debt, including your new house payment, shouldn't exceed GHS 3,440 per month.",
    },
  ];

  const faqsToUse = faqs || defaultFaqs;

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about buying, renting, or real estate in general?
              We're here to provide clear, professional answers to help guide
              your decisions.
            </p>
        
          </div>

          <div className="space-y-2">
            {faqsToUse.map((faq, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden"
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
