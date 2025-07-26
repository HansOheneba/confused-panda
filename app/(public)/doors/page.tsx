import Image from "next/image";
import ListingsSection from "@/components/ListingsSection";
import { Door } from "@/types/Door";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getDoors() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/doors`, { next: { revalidate: 60 } }); // Optional: Revalidate every 60s

  if (!response.ok) {
    throw new Error("Failed to fetch doors");
  }

  return response.json();
}

function DoorsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export default function DoorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40">
      {/* Hero Section */}
      <section>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#134B86] rounded-3xl p-12 relative overflow-hidden h-72">
            <div className="absolute left-12 bottom-10 z-10">
              <h1 className="text-5xl font-bold text-white mb-4">
                Airban Doors
              </h1>
              <p className="text-xl text-blue-100">
                Premium Quality Doors for Every Space
              </p>
            </div>
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

      {/* Products Section with Suspense */}
      <section className="max-w-7xl mx-auto mt-12">
        <Suspense fallback={<DoorsSkeleton />}>
          <DoorsList />
        </Suspense>
      </section>
    </div>
  );
}

async function DoorsList() {
  const doors: Door[] = await getDoors();

  const products = doors.map((door) => ({
    id: door.id,
    name: door.name,
    price: `GHS ${door.price}`,
    type: door.type,
    image: door.image_url || "/assets/door2.png",
  }));

  return <ListingsSection products={products} />;
}
