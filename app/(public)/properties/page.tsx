"use client";

import Image from "next/image";
import {
  Search,
  MapPin,
  Home,
  DollarSign,
  Calendar,
  Building,
  Plus,
  Minus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import FAQSection from "@/components/FAQSection";
import { useState } from "react";
import { properties as propertyList } from "@/lib/properties";

// ...existing code...

export default function PropertiesPage() {
  // ...existing code...

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
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      {/* Hero Section */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-200 shadow-lg rounded-md p-16 max-w-6xl mx-auto">
            <div className="text-left mb-8">
              <h1 className="text-xl md:text-5xl font-medium mb-4">
                Find Your Dream Property
              </h1>
              <p className="text-sm opacity-90 max-w-2xl">
                Welcome to Estatein, where your dream property awaits in every
                corner of our beautiful world. Explore our curated selection of
                properties, each offering a unique story and a chance to
                redefine your life. With categories to suit every dreamer, your
                journey
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Search Bar */}
      <div className="px-8">
        <div className="bg-white rounded-xl p-3 shadow-xl border border-gray-100 text-black relative z-10 max-w-2xl mx-auto -mt-16 mb-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search for a property"
                className="border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <Button className="px-6">
              <Search className="h-4 w-4 mr-2" />
              Find Property
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {/* Location */}
            <Select>
              <SelectTrigger className="border border-gray-300 bg-white hover:bg-gray-50">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accra">Accra</SelectItem>
                <SelectItem value="kumasi">Kumasi</SelectItem>
                <SelectItem value="takoradi">Takoradi</SelectItem>
                <SelectItem value="tamale">Tamale</SelectItem>
                <SelectItem value="cape-coast">Cape Coast</SelectItem>
              </SelectContent>
            </Select>

            {/* Property Type */}
            <Select>
              <SelectTrigger className="border border-gray-300 bg-white hover:bg-gray-50">
                <Home className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self-contained">Self-contained</SelectItem>
                <SelectItem value="chamber-hall">Chamber and Hall</SelectItem>
                <SelectItem value="2-bedroom">2 Bedroom Apartment</SelectItem>
                <SelectItem value="storey">Storey Building</SelectItem>
                <SelectItem value="office-space">Office Space</SelectItem>
              </SelectContent>
            </Select>

            {/* Pricing Range */}
            <Select>
              <SelectTrigger className="border border-gray-300 bg-white hover:bg-gray-50">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Price Range (GHS)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Under GHS 100,000</SelectItem>
                <SelectItem value="mid">GHS 100,000 - 500,000</SelectItem>
                <SelectItem value="high">Above GHS 500,000</SelectItem>
              </SelectContent>
            </Select>

            {/* Size */}
            <Select>
              <SelectTrigger className="border border-gray-300 bg-white hover:bg-gray-50">
                <Building className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-bed">1 Bedroom</SelectItem>
                <SelectItem value="2-bed">2 Bedrooms</SelectItem>
                <SelectItem value="3-bed">3+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            {/* Build Year */}
            <Select>
              <SelectTrigger className="border border-gray-300 bg-white hover:bg-gray-50">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Build Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">2020 - Present</SelectItem>
                <SelectItem value="recent">2015 - 2019</SelectItem>
                <SelectItem value="old">Before 2015</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <section className="py-32 bg-gradient-to-b from-transparent via-white to-white">
        <div className="container mx-auto px-4">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Discover a World of Possibilities
            </h2>
            <p className="text-sm max-w-3xl">
              Our portfolio of properties is as diverse as your dreams. Explore
              the following categories to find the perfect property that
              resonates with your vision of home
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {propertyList.map((property) => (
              <div
                key={property.id}
                className="rounded-xl border border-gray-200 shadow-sm p-4 max-w-sm bg-white"
              >
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={512}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {property.address}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-base font-medium text-gray-900">
                      ₵{property.price.replace(/[$,]/g, "")}
                    </span>
                    <a href={`/properties/${property.id}`}>
                      <Button className="">View Property Details</Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  );
}
