"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import FAQSection from "@/components/FAQSection";
import { getPropertyById } from "@/lib/properties";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const propertyImages = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop",
];

const thumbnailImages = propertyImages.map((img) =>
  img.replace("w=600&h=400", "w=80&h=80")
);

export default function PropertyListing() {
  const params = useParams();
  const propertyId = Array.isArray(params?.propertyId)
    ? params.propertyId[0]
    : params?.propertyId;
  const property = propertyId ? getPropertyById(propertyId) : undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 2) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 2 + propertyImages.length) % propertyImages.length
    );
  };

  // Show two images at a time
  const getVisibleImages = () => {
    const first = propertyImages[currentImageIndex];
    const second =
      propertyImages[(currentImageIndex + 1) % propertyImages.length];
    return [first, second];
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      showToast("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    showToast("Submitting your enquiry...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/property`,
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
            selected_property: property?.title || "Property",
            message: formData.message,
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
        message: "",
        termsAccepted: false,
      });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      showToast("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "What is cluster housing perumnas?",
      answer:
        "Cluster housing perumnas is a housing concept that consists of several houses in a gated cluster. Cluster housing perumnas offers comfortable, secure, and affordable housing with various complete and modern facilities.",
    },
    {
      question: "Where is the location of cluster housing perumnas?",
      answer:
        "Our cluster housing developments are strategically located in prime areas with easy access to schools, shopping centers, hospitals, and public transportation.",
    },
    {
      question:
        "How much are the prices and types of houses in cluster housing perumnas?",
      answer:
        "We offer various types of houses ranging from 2-bedroom to 5-bedroom units, with prices starting from ₹350,000 to ₹2,500,000 depending on the location and specifications.",
    },
    {
      question: "What are the facilities provided in cluster housing perumnas?",
      answer:
        "Our cluster housing includes facilities such as 24/7 security, playground, swimming pool, jogging track, community center, and landscaped gardens.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white py-40">
      {/* Header */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <div className=" text-white">
          <div className="flex gap-3 items-center">
            <h1 className="text-xl font-medium">
              {property?.title || "Property"}
            </h1>
            <div className="flex items-center gap-2 bg-transparent px-3 py-1 rounded-md border border-white text-sm">
              <Image
                src="/assets/mapPin.png"
                alt="Location Icon"
                width={12}
                height={12}
              />
              {property?.location || "-"}
            </div>
          </div>
        </div>
        {/* Image Gallery */}
        <Card>
          <CardContent className="p-4">
            {/* Thumbnail Navigation */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {thumbnailImages.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index ||
                    currentImageIndex + 1 === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={thumb || "/placeholder.svg"}
                    alt={`Property thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Display (2 at a time) */}
            <div className="grid md:grid-cols-2 gap-4">
              {getVisibleImages().map((img, idx) => (
                <div className="relative" key={idx}>
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Property main view ${idx + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {idx === 0 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  {idx === 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Image Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {propertyImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Description & Property Stats (Dynamic) */}
            <div className="mx-auto rounded-lg border p-6 shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 mb-6">
                {property?.description || "No description available."}
              </p>

              <div className="grid grid-cols-3 divide-x border-t pt-4 text-sm text-gray-600">
                <div className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/bed.svg"
                      alt="Bed Icon"
                      width={20}
                      height={20}
                      className="mb-1"
                    />
                    <span className="text-xs uppercase tracking-wide">
                      Bedrooms
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {property?.beds?.toString().padStart(2, "0") || "-"}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/bath.svg"
                      alt="Bath Icon"
                      width={20}
                      height={20}
                      className="mb-1"
                    />
                    <span className="text-xs uppercase tracking-wide">
                      Bathrooms
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {property?.baths?.toString().padStart(2, "0") || "-"}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1 p-3">
                  <div className="flex items-start gap-2">
                    <Image
                      src="/assets/area.svg"
                      alt="Area Icon"
                      width={20}
                      height={20}
                      className="mb-1"
                    />
                    <span className="text-xs uppercase tracking-wide">
                      Area
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {property?.sqft ? property.sqft + " Sq Ft" : "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Key Features and Amenities
                </h2>
                <div className="space-y-3 px-5 text-sm">
                  {property?.features && property.features.length > 0 ? (
                    property.features.map((feature, idx) => (
                      <div className="flex items-center gap-3" key={idx}>
                        <Image
                          src="/assets/lightning.svg"
                          alt="Check Icon"
                          width={10}
                          height={20}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">No features listed.</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  Inquire About Seaside Serenity Villa
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Interested in this property? Our real estate experts will get
                  back to you with more details, including scheduling a viewing
                  and answering any questions you may have.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
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

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <Label htmlFor="property">Selected Property</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            property
                              ? `${property.title}, ${property.location}`
                              : "Select Property"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={property?.id || ""}>
                          {property
                            ? `${property.title}, ${property.location}`
                            : "Property"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message here..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox
                        id="terms"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            termsAccepted: !!checked,
                          }))
                        }
                        className="mr-1"
                      />
                      <Label htmlFor="terms" className="text-xs text-gray-500">
                        I agree with
                        <span className="text-black underline">
                          Terms of Use
                        </span>
                        and
                        <span className="text-black underline">
                          Privacy Policy
                        </span>
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Your Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="lg:py-20 p-10">
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
