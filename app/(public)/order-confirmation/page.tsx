"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderConfirmationPage({ searchParams }: any) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const orderRaw =
      typeof window !== "undefined"
        ? sessionStorage.getItem("orderConfirmation")
        : null;
    if (orderRaw) {
      setOrder(JSON.parse(orderRaw));
    }
  }, []);

  if (!order) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">No order found</h1>
          <Link href="/doors" className="text-airbanBlue underline">
            Browse Doors
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-airbanBlue/10 via-white to-white py-24 text-black">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-airbanBlue mb-2">
            Your Order has been placed!
          </h1>
          <p className="text-gray-600">
            We've received your order and it's being processed, you should hear from us soon.
          </p>
        </div>

        <section className="mb-6 space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="text-gray-700">
            <div>
              <span className="font-medium">Order ID:</span> {order.id}
            </div>
            <div>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.created_at).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Email:</span> {order.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {order.phone_number}
            </div>
            <div>
              <span className="font-medium">Address:</span> {order.location}
            </div>
            {order.notes && (
              <div>
                <span className="font-medium">Notes:</span> {order.notes}
              </div>
            )}
          </div>
        </section>

        <hr className="my-6" />

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Items Ordered
          </h2>
          <ul className="space-y-4">
            {order.items.map((item: any, idx: number) => (
              <li
                key={idx}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">
                    {item.door_name}
                  </span>
                  <span className="text-sm text-gray-600">
                    x{item.quantity}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Orientation: {item.orientation || "Default"}
                </div>
                <div className="text-sm text-gray-600">
                  Unit Price: GH₵{item.unit_price}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-right text-lg font-bold text-airbanBlue mt-6">
          Total: GH₵{order.total_price}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">
            A copy of your order details has been sent to your email.
          </p>
          <Link
            href="/doors"
            className="inline-block px-6 py-3 bg-airbanBlue text-white rounded-full hover:bg-airbanBlue/90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
