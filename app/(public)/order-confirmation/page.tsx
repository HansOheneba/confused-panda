"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white py-40   ">
      <main className=" flex items-center justify-center py-10 px-4">
        <div className="max-w-6xl w-full bg-white rounded-lg overflow-hidden p-5">
          {/* Header Banner */}
          <div className="bg-airbanBlue text-white p-10 flex items-center justify-between relative rounded-lg">
            <h1 className="text-3xl font-extrabold">Thank You!!!</h1>
            <div className="absolute right-6 bottom-0 hidden md:block">
              <Image
                src="/assets/banner.png"
                alt="Door"
                width={240}
                height={120}
              />
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left Panel */}
            <div className="">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your Order has been placed!
              </h2>
              <p className="text-gray-600 mb-4">
                We've received your order and it's being processed, you should
                hear from us soon.
              </p>
              <p className="text-gray-500 text-sm">
                A copy of your order details has been sent to your email
              </p>

              <div className="mt-6">
                <Link href="/doors">
                  <Button className="w-full">Continue Shopping</Button>
                </Link>
              </div>
            </div>

            {/* Right Panel - Order Summary */}
            <div className="bg-airbanBlue text-white p-6 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-5 text-xs mb-10">
                <div className="flex justify-between">
                  <span className="font-semibold">Order ID</span>
                  <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Email</span>
                  <span>{order.email}</span>
                </div>
                {order.notes && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Notes</span>
                    <span>{order.notes}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold">TOTAL AMOUNT</span>
                  <span className="text-xl font-bold">
                    GHS {order.total_price}
                  </span>
                </div>
              </div>
              <hr className="border-gray-300/20" />

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-5">
                  Items Ordered
                </h3>
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white text-black p-4 rounded shadow-sm flex flex-col gap-2"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{item.door_name}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-700">
                        <span>Orientation</span>
                        <span className="font-semibold">{item.orientation || "Default"}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-700">
                        <span>Type</span>
                        <span className="font-semibold">{item.door_type || "-"}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-700">
                        <span>Unit Price</span>
                        <span className="font-semibold">GHS {item.unit_price}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-700">
                        <span>Quantity</span>
                        <span className="font-semibold text-gray-700">
                          x {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
