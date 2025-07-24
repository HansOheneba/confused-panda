"use client";

import EmptyCart from "@/components/EmptyCart";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  orientation: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    if (typeof window !== "undefined") {
      const cartRaw = localStorage.getItem("cart");
      setCartItems(cartRaw ? JSON.parse(cartRaw) : []);
      setIsLoading(false);

      // Listen for cart updates from other tabs
      const handleStorageChange = () => {
        const updatedCart = localStorage.getItem("cart");
        setCartItems(updatedCart ? JSON.parse(updatedCart) : []);
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, []);

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    updateCartCount();
  };

  const removeItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);

    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    updateCartCount();
  };

  const updateCartCount = () => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", count.toString());
    window.dispatchEvent(new Event("cartCountUpdate"));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (isLoading) return null;
  if (cartItems.length === 0) return (
   <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
     <EmptyCart />
   </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Cart</h1>
              <p className="text-sm text-gray-600 mt-1">
                {cartItems.length} ITEM{cartItems.length !== 1 ? "S" : ""}
              </p>
            </div>

            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.orientation}`}
                  className="flex gap-4 p-4 bg-white rounded-lg border"
                >
                  <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-medium">Orientation:</span>{" "}
                        {item.orientation}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 text-sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      GHS {Number(item.price).toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="text-sm text-gray-600">
                          {" "}
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Free Installation Notice */}
            <div className="mt-6">
              <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
                <p className="text-sm text-gray-700">
                  Free Installation and Delivery in Accra
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <Card className="rounded-none">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Sub Total</span>
                    <span>GHS {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>GHS 0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Installation</span>
                    <span className="text-blue-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Coupon Applied</span>
                    <span>GHS 0.00</span>
                  </div>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-base mb-4">
                  <span>TOTAL</span>
                  <span>GHS {total.toFixed(2)}</span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    Estimated Delivery by
                  </p>
                  <p className="font-medium">Aug 09, 2025</p>
                </div>

                <div className="mb-4">
                  <div className="flex gap-2">
                    <Input placeholder="Coupon Code" className="flex-1" />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-blue-700 hover:bg-blue-800">
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
