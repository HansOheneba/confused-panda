"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Pencil } from "lucide-react";

interface AddressInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  additionalNotes?: string;
}

interface PaymentFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isCompletingOrder?: boolean;
}

export function PaymentForm({
  onSubmit,
  onBack,
  isCompletingOrder,
}: PaymentFormProps) {
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutAddress");
    if (stored) {
      setAddressInfo(JSON.parse(stored));
    }
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              Delivery Information
            </h2>
            <Button
              variant="ghost"
              type="button"
              onClick={onBack}
              className="text-sm text-airbanBlue hover:underline"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>

          {addressInfo ? (
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {addressInfo.firstName} {addressInfo.lastName}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {addressInfo.phone}
              </p>
              <p>
                <span className="font-medium">Email:</span> {addressInfo.email}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {addressInfo.address}
              </p>
              <p>
                <span className="font-medium">City:</span> {addressInfo.city}
              </p>
              {addressInfo.additionalNotes && (
                <p>
                  <span className="font-medium">Notes:</span>{" "}
                  {addressInfo.additionalNotes}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-red-500">
              No address information found.
            </p>
          )}

          <div className="pt-4 text-sm  font-medium">
            Payment Method:{" "}
            <span className="uppercase text-airbanBlue">Pay on Delivery</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back to Address
        </Button>
        <Button
          type="submit"
          className="bg-airbanBlue hover:bg-airbanBlue/90"
          disabled={!!isCompletingOrder}
        >
          {isCompletingOrder ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </form>
  );
}
