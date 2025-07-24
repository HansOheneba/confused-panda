import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ListingCard({ product }: { product: any }) {
  return (
    <div className="w-64 bg-white rounded-xl shadow-md overflow-hidden border">
      {/* Product Image */}
      <div className="bg-airbanBlue/10 p-4 flex justify-center">
        <Image
          src={"/assets/door2.png"}
          alt={product.name}
          width={50}
          height={50}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-2">
        {/* Title & Price */}
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-sm font-medium">{product.name}</h2>
          <span className="text-airbanBlue font-semibold text-sm">
            {product.price}
          </span>
        </div>

        {/* Category */}
        <p className="text-sm text-gray-500">{product.type}</p>

        {/* View Details Button */}
        <Link href={`/doors/${product.id}`}>
          <Button className="w-full" asChild>
            <span>View Details</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
