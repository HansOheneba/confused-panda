"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import ContactInfoCard from "@/components/ContactInfoCard";
import Image from "next/image";

// Simple toast for feedback
const showToast = (message: string) => {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className =
    "fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg z-50 text-sm font-medium animate-fade-in-up";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-fade-out");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
};

const contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, enquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.enquiryType) {
      showToast("Please select an enquiry type");
      return;
    }

    setIsSubmitting(true);
    showToast("Submitting your enquiry...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            enquiry_type: formData.enquiryType,
            additional_info: formData.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      const data = await response.json();
      showToast("Enquiry submitted successfully! We'll get back to you soon.");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      showToast("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      {/* Hero Section */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-200 shadow-lg rounded-md p-8 md:p-16 max-w-6xl mx-auto relative">
            <div className="text-left mb-8 relative z-10">
              <h1 className="text-xl md:text-3xl font-semibold mb-4">
                Get in Touch with Airban Homes
              </h1>
              <p className="text-xs opacity-90 max-w-md">
                Welcome to Estatein's Contact Us page. We're here to assist you
                with any inquiries, requests, or feedback you may have. Whether
                you're looking to buy or sell a property, explore investment
                opportunities, or simply want to connect, we're just a message
                away. Reach out to us, and let's start a conversation.
              </p>
            </div>

            {/* Responsive image, large but hidden on small screens */}
            <Image
              src="/assets/contactHero.png"
              alt="Contact Us"
              height={500}
              width={500}
              className="absolute right-0 bottom-0 hidden md:block md:h-[300px] lg:h-[400px] w-auto"
            />
          </div>
        </div>
      </section>
      <div className="grid lg:grid-cols-4 gap-6 mx-auto max-w-6xl py-20">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-1" htmlFor="property">
                      What is your enquiry about?
                    </Label>
                    <Select
                      value={formData.enquiryType}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="enquiryType" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buying a Property">
                          Buying a Property
                        </SelectItem>
                        <SelectItem value="Selling a Property">
                          Selling a Property
                        </SelectItem>
                        <SelectItem value="Renting a Property">
                          Renting a Property
                        </SelectItem>
                        <SelectItem value="Investment Opportunities">
                          Investment Opportunities
                        </SelectItem>
                        <SelectItem value="General Enquiry">
                          General Enquiry
                        </SelectItem>
                        <SelectItem value="Support/Assistance">
                          Support/Assistance
                        </SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="mb-1" htmlFor="message">
                    Additional Information
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button type="submit" className="w-fit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Send Your Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ContactInfoCard />
        </div>
      </div>
      {/* Office Location Section */}
      <section className="mt-16">
        <div className="container mx-auto px-4 ">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center pb-5">
            Where you can find us
          </h2>
          <div className="flex justify-center w-full">
            <div className="relative w-full overflow-hidden rounded-lg aspect-[16/9] max-h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.2639896381047!2d-0.11532962416217363!3d5.674924432440614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f150.1!3m3!1m2!1s0xfdf83ee5646fb2d%3A0x8f0ab5784572d649!2sAirban%20Homes!5e0!3m2!1sen!2sgh!4v1753087679744!5m2!1sen!2sgh"
                className="absolute top-0 left-0 h-full w-full border-0 filter grayscale"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Airban Homes Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default contact;
