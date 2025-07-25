"use client";
import { useState, useEffect } from "react";
import { CheckoutBreadcrumbs } from "@/components/checkout/CheckoutBreadcrumbs";
import { AddressForm } from "@/components/checkout/AddressForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  orientation: string;
  quantity: number;
}

interface AddressInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  additionalNotes: string;
}

interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState<"address" | "payment">("address");
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    additionalNotes: "",
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items and address info from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load cart items
      const cartRaw = localStorage.getItem("cart");
      setCartItems(cartRaw ? JSON.parse(cartRaw) : []);

      // Load saved address if exists
      const savedAddress = localStorage.getItem("checkoutAddress");
      if (savedAddress) {
        setAddressInfo(JSON.parse(savedAddress));
      }
    }
  }, []);

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save address to localStorage
    localStorage.setItem("checkoutAddress", JSON.stringify(addressInfo));
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment and submit order
    const orderData = {
      address: addressInfo,
      payment: paymentInfo,
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      ),
      createdAt: new Date().toISOString(),
    };

    console.log("Order submitted:", orderData);
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutAddress");
    // Redirect to order confirmation page
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        <div className="max-w-7xl mx-auto p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="mb-6">
            Please add items to your cart before proceeding to checkout
          </p>
          <Link href="/doors">
            <Button>Browse Doors</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      <div className="max-w-7xl mx-auto p-6">
        <CheckoutBreadcrumbs currentStep={step} />
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === "address" ? (
              <AddressForm
                addressInfo={addressInfo}
                onAddressChange={handleAddressChange}
                onSubmit={handleAddressSubmit}
              />
            ) : (
              <PaymentForm
                onSubmit={handlePaymentSubmit}
                onBack={() => setStep("address")}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <OrderSummary cartItems={cartItems} total={total} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Button({ children, asChild, ...props }: any) {
  const Comp = asChild ? Link : "button";
  return (
    <Comp
      className="inline-flex items-center justify-center px-6 py-3 bg-airbanBlue text-white font-medium rounded-md hover:bg-airbanBlue/90 transition-colors"
      {...props}
    >
      {children}
    </Comp>
  );
}
