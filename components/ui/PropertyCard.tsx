import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";

interface PropertyCardProps {
  image: string;
  price: string;
  period: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
}

export function PropertyCard({
  image,
  price,
  period,
  title,
  address,
  beds,
  baths,
  sqft,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow py-0">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-airbanBlue">{price}</span>
            <span className="text-gray-500 ml-1">{period}</span>
          </div>
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 flex items-center">
          <MapPin className="w-3 h-3 mr-1" />
          {address}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="w-4 h-4 mr-1" />
            {beds} Beds
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1" />
            {baths} Bathrooms
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 mr-1" />
            {sqft} m²
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
