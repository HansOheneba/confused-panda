"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import { getPropertiesSync } from "@/lib/properties";
import EmblaCarousel from "@/components/carousel/EmblaCarousel";

export default function PropertiesPage() {
  const propertyList = getPropertiesSync();

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
    <>
      <div className=" bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="max-w-2xl mx-auto opacity-90">
            Welcome to Airban Homes, where your dream home awaits in the most
            desirable locations across Ghana and beyond. Explore our handpicked
            collection of premium properties — each with its own unique story,
            lifestyle, and investment potential. With options to suit every
            taste and budget, your perfect home is just a step away.
          </p>
        </section>
      </div>

      {/* Property Listings */}
      <div className="bg-white">
        <section className="max-w-7xl mx-auto px-4 pb-20 space-y-20">
          {propertyList.map((property, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={property.id}
                className="grid grid-cols-1 md:grid-cols-2 items-center gap-10"
              >
                {/* Image - appears first on even indexes, second on odd indexes */}
                <div
                  className={`w-full h-full rounded-lg overflow-hidden shadow-lg ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={900}
                    height={600}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Details - appears second on even indexes, first on odd indexes */}
                <div
                  className={`space-y-4 ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <h2 className="text-3xl font-bold">{property.title}</h2>
                  <div className="flex items-center text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#4c5460"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
           c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5
           2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      />
                    </svg>

                    <span>{property.address}</span>
                  </div>
                  {property.bedrooms && (
                    <div className="flex items-center text-sm font-medium">
                      <Image
                        src="/assets/bed.svg"
                        alt="Bedrooms"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      {property.bedrooms}
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center text-sm font-medium">
                      <Image
                        src="/assets/bath.svg"
                        alt="Bathrooms"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      {property.baths} Bathroom
                      {property.baths > 1 ? "s" : ""}
                    </div>
                  )}
                  {property.sqft && (
                    <div className="flex items-center text-sm font-medium">
                      <Image
                        src="/assets/area.svg"
                        alt="Area"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      {property.sqft} sqm
                    </div>
                  )}

                  <Button asChild>
                    <a href={`/properties/${property.id}`}>
                      View This Property
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </section>

        <section className="py-10">
          <h2 className="text-3xl font-bold text-center mb-8">
           Previously Listed Properties
            </h2>
          <EmblaCarousel images={propertyList.map(prop => prop.image)} />
        </section>

        {/* FAQ */}
        <FAQSection faqs={faqs} />
      </div>
    </>
  );
}
