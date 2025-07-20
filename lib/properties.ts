export interface Property {
  id: string;
  image: string;
  price: string;
  period: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: string;
}

export const properties: Property[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
    price: "$2,095",
    period: "/month",
    title: "Palm Harbor",
    address: "2699 Green Valley, Highland Lake, FL",
    beds: 3,
    baths: 2,
    sqft: "5x7",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
    price: "$2,700",
    period: "/month",
    title: "Beverly Springfield",
    address: "2821 Lake Sevilla, Palm Harbor, FL",
    beds: 4,
    baths: 3,
    sqft: "6x7.5",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=300&h=200&fit=crop",
    price: "$4,550",
    period: "/month",
    title: "Faulkner Ave",
    address: "909 Woodland St, Michigan, MN",
    beds: 4,
    baths: 3,
    sqft: "8x10",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=300&h=200&fit=crop",
    price: "$2,400",
    period: "/month",
    title: "St. Crystal",
    address: "210 US Highway, Highland Lake, FL",
    beds: 4,
    baths: 2,
    sqft: "6x8",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop",
    price: "$1,500",
    period: "/month",
    title: "Cove Red",
    address: "243 Curlew Road, Palm Harbor, FL",
    beds: 2,
    baths: 1,
    sqft: "5x7.5",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
    price: "$1,600",
    period: "/month",
    title: "Tarpon Bay",
    address: "103 Lake Shores, Michigan, MN",
    beds: 3,
    baths: 1,
    sqft: "5x7",
  },
];

// Utility functions that simulate API behavior
export const getProperties = (): Property[] => {
  return properties;
};

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};

export const getPropertiesByLocation = (location: string): Property[] => {
  return properties.filter((property) =>
    property.address.toLowerCase().includes(location.toLowerCase())
  );
};

export const getPropertiesByPriceRange = (
  minPrice: number,
  maxPrice: number
): Property[] => {
  return properties.filter((property) => {
    const price = parseInt(property.price.replace(/[$,]/g, ""));
    return price >= minPrice && price <= maxPrice;
  });
};
