"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AddressInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  additionalNotes: string;
}

interface AddressFormProps {
  addressInfo: AddressInfo;
  onAddressChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddressForm({
  addressInfo,
  onAddressChange,
  onSubmit,
}: AddressFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Card className="rounded-none">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-airbanBlue" />
            Delivery Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <Input
                name="firstName"
                value={addressInfo.firstName}
                onChange={onAddressChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <Input
                name="lastName"
                value={addressInfo.lastName}
                onChange={onAddressChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <Input
              name="email"
              type="email"
              value={addressInfo.email}
              onChange={onAddressChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number *
            </label>
            <Input
              name="phone"
              type="tel"
              value={addressInfo.phone}
              onChange={onAddressChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Address *
            </label>
            <Input
              name="address"
              value={addressInfo.address}
              onChange={onAddressChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City *</label>
            <Input
              name="city"
              value={addressInfo.city}
              onChange={onAddressChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-airbanBlue"
              value={addressInfo.additionalNotes}
              onChange={onAddressChange}
            />
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end">
        <Button type="submit" className="bg-airbanBlue hover:bg-airbanBlue/90">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
