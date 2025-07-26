import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { getProperties } from "@/lib/properties";
import Link from "next/link";

export function PropertyListings() {
  const properties = getProperties();

  return (
    <div className=" flex bg-gradient-to-b from-white to-[#E2F0FF] ">
      <section className="py-16 max-w-6xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Based on your location</h2>
            <p className="text-gray-600">
              Some of our picked properties near your location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <Link href="/properties" className="text-center" >
            <div className="text-center">
              <Button className="">Browse more properties</Button>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
