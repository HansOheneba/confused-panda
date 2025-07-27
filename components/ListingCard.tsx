import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ListingCard({ product }: { product: any }) {
  return (
    <div className="w-64 h-80 bg-white rounded-xl shadow-md overflow-hidden border flex flex-col">
      {/* Product Image */}
      <div className="bg-airbanBlue/10 h-40 flex justify-center items-center p-4">
        <Image
          src={product.image || "/assets/placeholder.png"}
          alt={product.name}
          width={150}
          height={150}
          className="object-contain max-h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (
              target.src !==
              window.location.origin + "/assets/placeholder.png"
            ) {
              target.src = "/assets/placeholder.png";
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-3 space-y-2 flex flex-col justify-between">
        <div>
          <h2 className="text-gray-800 text-sm font-medium line-clamp-2">
            {product.name}
          </h2>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500">{product.type}</p>
            <span className="text-airbanBlue font-semibold text-sm">
              GHS {product.price}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link href={`/doors/${product.id}`}>
          <Button className="w-full mt-2" asChild>
            <span>View Details</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
