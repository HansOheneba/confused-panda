import Image from "next/image";
import ListingsSection from "@/components/ListingsSection";
import { getDoors } from "@/lib/doors";

export default function DoorsPage() {
  // Get doors from lib and map to ListingSection's product shape
  const products = getDoors().map((door) => ({
    id: door.id,
    name: door.name,
    price: `GHS ${door.price}`,
    type: door.category,
    image: door.image_url || "/assets/door2.png",
    colors: ["brown", "black"], // Placeholder, adjust as needed
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      {/* Hero Section */}
      <section>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#134B86] rounded-3xl p-12 relative overflow-hidden h-72">
            {/* Text at bottom-left */}
            <div className="absolute left-12 bottom-10 z-10">
              <h1 className="text-5xl font-bold text-white mb-4">
                Airban Doors
              </h1>
              <p className="text-xl text-blue-100">
                Best Deal Online on smart watches
              </p>
            </div>

            {/* Image at bottom-right */}
            <div className="absolute right-32 -bottom-32">
              <Image
                src="/assets/door2.png"
                alt="Airban Door"
                width={150}
                height={150}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <ListingsSection products={products} />
    </div>
  );
}
