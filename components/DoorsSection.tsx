import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DoorsSection() {
  return (
    <>
      {/* Airban Doors Section */}
      <div className=" bg-white">
        <section className="overflow-hidden bg-white max-w-6xl mx-auto">
          <div className="py-20 text-center">
            <h1 className="py-5 font-bold text-4xl font-open">Airban Doors</h1>
            <p className="text-gray-600">
              Behind every door is a story waiting to begin. Let us help you
              find the perfect place to start your next chapter.
            </p>
          </div>

          <div className="w-full flex justify-center px-16">
            <div className="flex gap-3 w-fit items-center">
              <Image
                className="w-2/6"
                src="/assets/door1.png"
                alt="Door 1"
                width={400}
                height={400}
              />
              <Image
                className="w-1/6"
                src="/assets/door2.png"
                alt="Door 2"
                width={200}
                height={400}
              />
              <Image
                className="w-3/6"
                src="/assets/door3.png"
                alt="Door 3"
                width={600}
                height={400}
              />
            </div>
          </div>

          <div className="flex justify-center py-10">
            <Link href={"/doors"}>
              <Button className="bg-airbanBlue px-7 py-1 text-white hover:bg-airbanBlue/90">
                View More
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
