"use client";
import { useState } from "react";
import ListingCard from "./ListingCard";

type Product = {
  id: string;
  name: string;
  price: string;
  type: string;
  image: string;
};

interface ListingsSectionProps {
  products: Product[];
}

const ListingsSection: React.FC<ListingsSectionProps> = ({ products }) => {
  const [selectedType, setSelectedType] = useState<string>("All");

  const types = ["All", "Single", "Single Wide", "One and Half", "Double"];

  const filteredProducts =
    selectedType === "All"
      ? products
      : products.filter((p) => p.type === selectedType);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Product In-stock</h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className=" rounded-md px-3 py-2 text-sm"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ListingCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found for this type.</p>
        )}
      </div>
    </section>
  );
};

export default ListingsSection;
