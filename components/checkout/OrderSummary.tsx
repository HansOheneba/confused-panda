"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  orientation: string;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  total: number;
}

export function OrderSummary({ cartItems, total }: OrderSummaryProps) {
  return (
    <Card className="rounded-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <Link
            href="/cart"
            className="text-sm text-airbanBlue hover:underline flex items-center"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </Link>
        </div>

        <div className="space-y-4 mb-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.orientation}`}
              className="flex justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.orientation} • Qty: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span>
              Subtotal (
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
            </span>
            <span>GHS {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery</span>
            <span className="text-airbanBlue">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Installation</span>
            <span className="text-airbanBlue">Free</span>
          </div>
        </div>

    
      </CardContent>
    </Card>
  );
}
