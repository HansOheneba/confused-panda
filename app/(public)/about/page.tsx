import Image from "next/image";
import { Button } from "@/components/ui/button";
import LeadershipTeam from "@/components/LeadershipTeam";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40 ">
      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-200 shadow-lg rounded-md p-16 max-w-6xl mx-auto relative">
            <div className="text-left mb-8">
              <h1 className="text-xl md:text-5xl font-medium mb-4">
                About Airban Homes
              </h1>
              <p className="text-sm opacity-90 max-w-2xl">
                Airban Homes is a registered real estate brokerage company,
                working to narrow the accommodation deficit in the contemporary
                living market. The firm provides an avenue for sales, purchases
                and rental of property in Ghana.
              </p>
            </div>
            <Image
              height={300}
              width={300}
              alt="constructor"
              src="/assets/constructor.png"
              className="absolute right-4 bottom-0 w-36 sm:w-40 md:w-52 lg:w-64 xl:w-72 hidden lg:flex"
            />
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <div className="bg-gradient-to-b from-transparent via-white to-white">
        <section className="py-12 md:py-20 max-w-6xl mx-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1 w-full mt-8 md:mt-0">
                <Image
                  src="/assets/kitchen.png"
                  alt="Modern kitchen interior"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover shadow-md w-full h-auto"
                />
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Our Core Values
                </h2>
                <p className="text-gray-600 mb-6">
                  We are committed to providing exceptional service and
                  upholding the highest standards in all our dealings.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 border border-airbanBlue font-thin rounded-sm text-sm bg-airbanBlue/10">
                    Integrity
                  </span>
                  <span className="px-4 py-2 border border-airbanBlue font-thin rounded-sm text-sm bg-airbanBlue/10">
                    Professionalism
                  </span>
                  <span className="px-4 py-2 border border-airbanBlue font-thin rounded-sm text-sm bg-airbanBlue/10">
                    Reliability
                  </span>
                </div>
                <Button className=" w-full sm:w-auto" asChild>
                  <a href="tel:+233302984032">Speak with Agent →</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Leadership Team Section */}
      <LeadershipTeam />

      {/* Testimonial Section */}
      <section className="pt-12 md:pt-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-airbanBlue mb-8 max-w-3xl mx-auto leading-tight">
            "Buying a home right now will be the best opportunity in your
            Lifetime"
          </blockquote>
          <div className="flex  flex-col items-center justify-center gap-4">
            <Image
              src="/assets/warren.jpg"
              alt="Warren Buffett"
              width={150}
              height={150}
              className="rounded-full h-20 w-20 border border-airbanBlue object-cover"
            />
            <div className="text-center">
              <p className="font-medium text-gray-500 italic">Warren Buffett</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
