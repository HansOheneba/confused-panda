"use client";

import React from "react";
import Image from "next/image";
import PropertyTabs from "@/components/PropertyTab";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyListings } from "@/components/PropertyListings";
import { DoorsSection } from "@/components/DoorsSection";
import { NewsroomSection } from "@/components/NewsroomSection";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-12 md:py-0 h-auto md:h-[90vh] bg-[url('/assets/hero.png')] bg-cover bg-center bg-no-repeat w-full px-4 md:px-20">
        <div className="relative z-20 flex flex-col md:justify-center md:items-start justify-center h-auto md:h-full px-4 sm:px-12 max-w-6xl mx-auto">
          <div className="text-left max-w-2xl text-white mb-8">
            <h1 className="text-3xl sm:text-5xl font-bold my-4 sm:mb-6 pt-10 md:pt-0">
              Buy, rent or sell your <br /> property easily
            </h1>
            <p className="text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              A great platform to buy, sell, or even rent your{" "}
              <br className="hidden sm:block" />
              properties without any commissions.
            </p>
          </div>
          <div className="w-full sm:max-w-xl">
            <PropertyTabs />
          </div>
        </div>

        {/* Hero Image (Right side) */}
        <Image
          className="absolute bottom-0 right-0 w-[300px] md:w-[400px] lg:w-[500px] z-10 hidden md:block"
          src="/assets/heroHouse.png"
          alt="Hero Image"
          width={500}
          height={500}
          priority
        />
      </section>

      <section className="py-24 px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 gap-x-20 lg:grid-cols-3 grid-cols-1">
            {/* Left Side Illustration Card */}
            <div className="lg:order-1 order-1 ">
              <Card className="bg-airbanBlue text-white h-full relative overflow-hidden">
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4">
                    The new way to find your new home
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Find your dream place to live in with more than 10k+
                    properties listed.
                  </p>
                </CardContent>

                {/* Responsive Image */}
                <Image
                  src="/assets/airbanIllustration.png"
                  alt="House illustration"
                  width={500}
                  height={300}
                  className="absolute bottom-0 -right-16 w-1/2 sm:w-1/3 md:w-[250px] lg:w-[350px] hidden md:block"
                />
              </Card>
            </div>

            {/* Feature Cards - 2x2 Grid */}
            <div className="lg:col-span-2 lg:order-2 order-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className=" flex flex-col gap-3">
                  <Image
                    src="/assets/feature1.png"
                    alt="Property Insurance"
                    width={60}
                    height={60}
                  />
                  <h4 className="font-semibold mb-2">Property Insurance</h4>
                  <p className="text-gray-600 text-sm">
                    We offer our customer property
                    <br />
                    protection of liability coverage
                    <br />
                    and insurance for their better life.
                  </p>
                </div>

                <div className=" flex flex-col gap-3">
                  <Image
                    src="/assets/feature2.png"
                    alt="Lowest Commission"
                    width={60}
                    height={60}
                  />
                  <h4 className="font-semibold mb-2">Lowest Commission</h4>
                  <p className="text-gray-600 text-sm">
                    You no longer have to negotiate
                    <br />
                    commissions and haggle with other agents.
                    <br />
                    It only costs 2%!
                  </p>
                </div>

                <div className=" flex flex-col gap-3">
                  <Image
                    src="/assets/feature3.png"
                    alt="Best Price"
                    width={60}
                    height={60}
                  />
                  <h4 className="font-semibold mb-2">Best Price</h4>
                  <p className="text-gray-600 text-sm">
                    Not sure what you should be charging
                    <br />
                    for your property? No need to worry,
                    <br />
                    let us do the numbers for you.
                  </p>
                </div>

                <div className=" flex flex-col gap-3">
                  <Image
                    src="/assets/feature4.png"
                    alt="Overall Control"
                    width={60}
                    height={60}
                  />
                  <h4 className="font-semibold mb-2">Overall Control</h4>
                  <p className="text-gray-600 text-sm">
                    Get a virtual tour, and schedule visits before
                    <br />
                    you rent or buy any properties.
                    <br />
                    You get overall control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PropertyListings />
      <DoorsSection />
      <NewsroomSection />

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Are you a landowner?
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-base md:text-lg">
            Share your property with thousands of interested buyers. Enter your
            email to get listed today.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="pr-32 h-14 w-full"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 h-10 rounded-lg text-white bg-airbanBlue hover:bg-airbanBlue/90"
              type="submit"
            >
              Submit
            </Button>
          </div>
          <div className="py-10 text-sm text-gray-500">
            <p>
              Join <span className="text-blue-600 font-medium">1000+</span>{" "}
              other landowners and get your property seen
              <br />
              by thousands of potential buyers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
