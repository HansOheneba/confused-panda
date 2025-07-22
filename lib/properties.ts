export interface Property {
  id: string;
  image: string;
  price: string;
  period: string;
  title: string;
  address: string;
  location: string;
  description: string;
  beds: number;
  baths: number;
  sqft: string;
  features: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
    price: "2,095",
    period: "/month",
    title: "Palm Harbor",
    address: "2699 Green Valley, East Legon, Accra",
    location: "Accra",
    description:
      "Modern 3-bedroom apartment in East Legon with secure parking and backup power.",
    beds: 3,
    baths: 2,
    sqft: "5x7",
    features: ["24/7 Security", "Standby Generator", "Borehole Water"],
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
    price: "2,700",
    period: "/month",
    title: "Beverly Springfield",
    address: "2821 Lake Sevilla, Airport Residential, Accra",
    location: "Accra",
    description:
      "Spacious 4-bedroom townhouse in a gated community near Airport City.",
    beds: 4,
    baths: 3,
    sqft: "6x7.5",
    features: ["Gated Community", "Swimming Pool", "CCTV Surveillance"],
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=300&h=200&fit=crop",
    price: "4,550",
    period: "/month",
    title: "Faulkner Ave",
    address: "909 Woodland St, Ridge, Accra",
    location: "Accra",
    description:
      "Elegant home located in Ridge with close access to embassies and schools.",
    beds: 4,
    baths: 3,
    sqft: "8x10",
    features: ["Fiber Internet", "Water Reservoir", "Air Conditioning"],
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=300&h=200&fit=crop",
    price: "2,400",
    period: "/month",
    title: "St. Crystal",
    address: "210 US Highway, Kumasi City Center",
    location: "Kumasi",
    description:
      "Modern apartment with excellent access to Kumasi Mall and public transport.",
    beds: 4,
    baths: 2,
    sqft: "6x8",
    features: ["Solar Backup", "Public Transport Nearby", "Balcony View"],
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop",
    price: "1,500",
    period: "/month",
    title: "Cove Red",
    address: "243 Curlew Road, Takoradi Beachfront",
    location: "Takoradi",
    description:
      "Affordable 2-bedroom unit near the Takoradi beach. Ideal for small families.",
    beds: 2,
    baths: 1,
    sqft: "5x7.5",
    features: ["Beach Access", "Private Parking", "Tiled Compound"],
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
    price: "1,600",
    period: "/month",
    title: "Tarpon Bay",
    address: "103 Lake Shores, Cape Coast",
    location: "Cape Coast",
    description:
      "Charming 3-bedroom home with natural breeze, close to schools and markets.",
    beds: 3,
    baths: 1,
    sqft: "5x7",
    features: ["Close to Schools", "Green Surroundings", "Water Tank"],
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
