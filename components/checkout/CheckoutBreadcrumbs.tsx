import Link from "next/link";
import { ChevronRight, Home, CreditCard, MapPin } from "lucide-react";

interface CheckoutBreadcrumbsProps {
  currentStep: "address" | "payment";
}

export function CheckoutBreadcrumbs({ currentStep }: CheckoutBreadcrumbsProps) {
  return (
    <div className="flex items-center text-md mb-8 gap-3">
     
      <span
        className={`flex items-center ${
          currentStep === "address"
            ? "font-semibold text-black"
            : "text-gray-700"
        }`}
      >
       
        Address
      </span>
      <ChevronRight className="h-4 w-4 mx-2 text-gray-800" />
      <span
        className={`${
          currentStep === "payment"
            ? "font-semibold text-black"
            : "text-gray-700"
        }`}
      >
       
        Payment
      </span>
    </div>
  );
}
