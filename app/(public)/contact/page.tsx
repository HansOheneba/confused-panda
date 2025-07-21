import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import ContactInfoCard from "@/components/ContactInfoCard";

const contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      {/* Hero Section */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-200 shadow-lg rounded-md p-16 max-w-6xl mx-auto">
            <div className="text-left mb-8">
              <h1 className="text-xl md:text-5xl font-medium mb-4">
                Get in Touch with Airban Homes
              </h1>
              <p className="text-sm opacity-90 max-w-2xl">
                Welcome to Estatein's Contact Us page. We're here to assist you
                with any inquiries, requests, or feedback you may have. Whether
                you're looking to buy or sell a property, explore investment
                opportunities, or simply want to connect, we're just a message
                away. Reach out to us, and let's start a conversation.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="grid lg:grid-cols-4 gap-6 mx-auto max-w-6xl py-20">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter First Name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter Last Name" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter Phone Number" />
                  </div>
                  <div className="col-span-2">
                    <Label className="mb-1" htmlFor="property">
                      What is your enquiry about?
                    </Label>
                    <Select>
                      <SelectTrigger id="enquiryType" className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">
                          Buying a Property
                        </SelectItem>
                        <SelectItem value="selling">
                          Selling a Property
                        </SelectItem>
                        <SelectItem value="renting">
                          Renting a Property
                        </SelectItem>
                        <SelectItem value="investment">
                          Investment Opportunities
                        </SelectItem>
                        <SelectItem value="general">General Enquiry</SelectItem>
                        <SelectItem value="support">
                          Support/Assistance
                        </SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
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
                    placeholder="Enter your message here..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button className="w-fit">Send Your Message</Button>
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
