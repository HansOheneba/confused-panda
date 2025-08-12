export interface Property {
  id: string;
  image: string;
  price: string;
  period: string;
  title: string;
  address: string;
  location: string;
  description: string;
  bedrooms: string;
  baths: number;
  sqft: string;
  features: string[];
  // Legacy support for existing code that might use 'beds'
  beds?: number;
  subImages?: string[];
}

export const properties: Property[] = [
  {
    id: "1",
    image: "/assets/otumfour1.png",
    price: "95,000",
    period: "/month",
    title: "OTUMFUOR COMPLEX ANNEX",
    address: "PMB CT 279",
    location: "Taifa - Kwabenya, Accra",
    description:
      "Stunning 4-bedroom villa with modern amenities, swimming pool, and landscaped gardens. Located in the prestigious East Legon area with 24/7 security.",
    bedrooms: "3 & 2 Bedroom Terrace",
    beds: 4,
    baths: 3,
    sqft: "...",
    features: [
      "Fitted Kitchen",
      "Utility",
      "Balconies",
      "En-suite Bedrooms",
      "Spacious Living and Dining area",
    ],
    subImages: ["/assets/otumfour2.png", "/assets/otumfour3.png"],
  },
  {
    id: "2",
    image: "/assets/apc1.png",

    price: "300,000",
    period: "/month",
    title: "AIRBAN PREMIUM COURT",
    address: "Off Adenta-Aburi Road",
    location: "Adenta – Aburi Ridge Cap, Accra",
    description:
      "Spacious 3-bedroom townhouse in a gated community near Airport City. Perfect for executives and families seeking comfort and convenience.",
    bedrooms: "4 Bedroom",
    beds: 3,
    baths: 4,
    sqft: "...",
    features: [
      "All rooms En-suite",
      "Fully fitted kitchen with appliance",
      "Electric Fence",
      "CCTV",
      "Boys quarters",
      "Storeroom",
      "Swimming Pool",
      "Home office",
      "Air condition units in all rooms",
      "Security Post",
    ],
    subImages: ["/assets/apc2.png", "/assets/apc3.png"],
  },
  {
    id: "3",
    image: "/assets/ap1.png",

    price: "80,000",
    period: "/month",
    title: "AIRBAN PROPERTY",
    address: "909 Woodland St, Ridge, Accra",
    location: "Ridge, Accra",
    description:
      "Elegant 5-bedroom mansion in Ridge with close access to embassies, international schools, and business districts. Features luxury finishes throughout.",
    bedrooms: "2 Bedroom (4 Expandable)",
    beds: 5,
    baths: 2,
    sqft: "...",
    features: [
      "Fully fitted kitchen with appliances",
      "Electric Fence",
      "Air condition units in all rooms",
    ],
    subImages: ["/assets/ap2.png", "/assets/ap3.png"],
  },
  // {
  //   id: "4",
  //   image:
  //     "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
  //   price: "280,000",
  //   period: "/month",
  //   title: "Contemporary Apartment at Kumasi",
  //   address: "210 US Highway, Kumasi City Center",
  //   location: "Kumasi City Center",
  //   description:
  //     "Modern 3-bedroom apartment with excellent access to Kumasi Mall, restaurants, and public transport. Ideal for urban professionals.",
  //   bedrooms: 3,
  //   beds: 3,
  //   baths: 2,
  //   sqft: "167",
  //   features: [
  //     "Solar Backup",
  //     "Public Transport Nearby",
  //     "Balcony View",
  //     "Elevator",
  //     "Security",
  //   ],
  // },
  // {
  //   id: "5",
  //   image:
  //     "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
  //   price: "180,000",
  //   period: "/month",
  //   title: "Beachfront Cottage at Takoradi",
  //   address: "243 Curlew Road, Takoradi Beachfront",
  //   location: "Takoradi Beachfront",
  //   description:
  //     "Charming 2-bedroom beachfront cottage with stunning ocean views. Perfect for those seeking a peaceful coastal lifestyle.",
  //   bedrooms: 2,
  //   beds: 2,
  //   baths: 2,
  //   sqft: "130",
  //   features: [
  //     "Beach Access",
  //     "Ocean View",
  //     "Private Parking",
  //     "Tiled Compound",
  //     "Outdoor Shower",
  //   ],
  // },
  // {
  //   id: "6",
  //   image:
  //     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  //   price: "220,000",
  //   period: "/month",
  //   title: "Family Home at Cape Coast",
  //   address: "103 Lake Shores, Cape Coast",
  //   location: "Cape Coast",
  //   description:
  //     "Comfortable 3-bedroom family home with natural breeze, close to schools and markets. Features traditional Ghanaian architecture with modern upgrades.",
  //   bedrooms: 3,
  //   beds: 3,
  //   baths: 2,
  //   sqft: "186",
  //   features: [
  //     "Close to Schools",
  //     "Green Surroundings",
  //     "Water Tank",
  //     "Veranda",
  //     "Traditional Design",
  //   ],
  // },
  // {
  //   id: "7",
  //   image:
  //     "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
  //   price: "380,000",
  //   period: "/month",
  //   title: "Penthouse at Cantonments",
  //   address: "45 Liberation Road, Cantonments, Accra",
  //   location: "Cantonments, Accra",
  //   description:
  //     "Luxurious 3-bedroom penthouse with panoramic city views. Features high-end finishes, rooftop terrace, and premium amenities.",
  //   bedrooms: 3,
  //   beds: 3,
  //   baths: 3,
  //   sqft: "232",
  //   features: [
  //     "City Views",
  //     "Rooftop Terrace",
  //     "Elevator",
  //     "Concierge Service",
  //     "Gym Access",
  //     "Parking",
  //   ],
  // },
  // {
  //   id: "8",
  //   image:
  //     "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  //   price: "520,000",
  //   period: "/month",
  //   title: "Gated Estate Villa at Tema",
  //   address: "789 Community 25, Tema",
  //   location: "Tema",
  //   description:
  //     "Magnificent 4-bedroom villa in an exclusive gated estate. Perfect for families wanting luxury living with top-notch security and amenities.",
  //   bedrooms: 4,
  //   beds: 4,
  //   baths: 3,
  //   sqft: "353",
  //   features: [
  //     "Gated Estate",
  //     "Swimming Pool",
  //     "Tennis Court",
  //     "24/7 Security",
  //     "Generator",
  //     "Landscaped Gardens",
  //   ],
  // },
  // {
  //   id: "9",
  //   image:
  //     "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
  //   price: "150,000",
  //   period: "/month",
  //   title: "Cozy Apartment at Adenta",
  //   address: "56 Adenta Housing Down, Adenta",
  //   location: "Adenta, Accra",
  //   description:
  //     "Affordable 2-bedroom apartment in a quiet residential area. Great for young professionals and small families starting their homeownership journey.",
  //   bedrooms: 2,
  //   beds: 2,
  //   baths: 1,
  //   sqft: "111",
  //   features: [
  //     "Quiet Neighborhood",
  //     "Public Transport",
  //     "Market Nearby",
  //     "Parking Space",
  //     "Water Tank",
  //   ],
  // },
  // {
  //   id: "10",
  //   image:
  //     "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
  //   price: "750,000",
  //   period: "/month",
  //   title: "Luxury Estate at Trasacco Valley",
  //   address: "12 Trasacco Valley Estate, East Legon",
  //   location: "Trasacco Valley, East Legon",
  //   description:
  //     "Premium 6-bedroom mansion in Ghana's most prestigious estate. Features world-class amenities including golf course access, clubhouse, and 24/7 security.",
  //   bedrooms: 6,
  //   beds: 6,
  //   baths: 5,
  //   sqft: "511",
  //   features: [
  //     "Golf Course Access",
  //     "Clubhouse",
  //     "24/7 Security",
  //     "Swimming Pool",
  //     "Gym",
  //     "Spa",
  //     "Multiple Garages",
  //     "Maid's Quarters",
  //   ],
  // },
  // {
  //   id: "11",
  //   image:
  //     "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
  //   price: "290,000",
  //   period: "/month",
  //   title: "Modern Duplex at Spintex",
  //   address: "134 Spintex Road, Accra",
  //   location: "Spintex, Accra",
  //   description:
  //     "Contemporary 3-bedroom duplex with modern design and smart home features. Located on the busy Spintex Road with easy access to amenities.",
  //   bedrooms: 3,
  //   beds: 3,
  //   baths: 3,
  //   sqft: "204",
  //   features: [
  //     "Smart Home Features",
  //     "Modern Design",
  //     "Backup Power",
  //     "CCTV",
  //     "Fiber Internet",
  //     "Parking",
  //   ],
  // },
  // {
  //   id: "12",
  //   image:
  //     "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  //   price: "420,000",
  //   period: "/month",
  //   title: "Waterfront Villa at Tema",
  //   address: "98 Harbour View, Tema",
  //   location: "Tema Harbour Area",
  //   description:
  //     "Spectacular 4-bedroom waterfront villa with direct beach access and harbor views. Perfect for those who love waterfront living.",
  //   bedrooms: 4,
  //   beds: 4,
  //   baths: 4,
  //   sqft: "279",
  //   features: [
  //     "Waterfront",
  //     "Beach Access",
  //     "Harbor Views",
  //     "Private Jetty",
  //     "Swimming Pool",
  //     "Security",
  //   ],
  // },
];

// Utility functions that simulate API behavior
export const getProperties = async (): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return properties;
};

export const getPropertyById = async (
  id: string
): Promise<Property | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50));
  return properties.find((property) => property.id === id);
};

export const getPropertiesByLocation = async (
  location: string
): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return properties.filter(
    (property) =>
      property.location.toLowerCase().includes(location.toLowerCase()) ||
      property.address.toLowerCase().includes(location.toLowerCase())
  );
};

export const getPropertiesByPriceRange = async (
  minPrice: number,
  maxPrice: number
): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return properties.filter((property) => {
    const price = parseInt(property.price.replace(/[,]/g, ""));
    return price >= minPrice && price <= maxPrice;
  });
};

export const getPropertiesByBedrooms = async (
  bedrooms: number
): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return properties.filter((property) => Number(property.bedrooms) === bedrooms);
};

export const getFeaturedProperties = async (
  limit: number = 6
): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Return properties with highest prices as "featured"
  return properties
    .sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[,]/g, ""));
      const priceB = parseInt(b.price.replace(/[,]/g, ""));
      return priceB - priceA;
    })
    .slice(0, limit);
};

export const searchProperties = async (query: string): Promise<Property[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 150));
  const searchTerm = query.toLowerCase();
  return properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.address.toLowerCase().includes(searchTerm) ||
      property.location.toLowerCase().includes(searchTerm) ||
      property.description.toLowerCase().includes(searchTerm) ||
      property.features.some((feature) =>
        feature.toLowerCase().includes(searchTerm)
      )
  );
};

// Synchronous versions for backward compatibility
export const getPropertiesSync = (): Property[] => {
  return properties;
};

export const getPropertyByIdSync = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};
