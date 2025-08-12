// Example usage of the properties API-like functions
// This file demonstrates how to use the async functions for future API integration

import { useState, useEffect } from "react";
import {
  getProperties,
  getPropertyById,
  getPropertiesByLocation,
  getPropertiesByPriceRange,
  getPropertiesByBedrooms,
  getFeaturedProperties,
  searchProperties,
  Property,
} from "./properties";

// Example: Loading properties with async function
export function AsyncPropertiesExample() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to load properties:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;

  return (
    <div>
      <h2>All Properties ({properties.length})</h2>
      {properties.map((property) => (
        <div key={property.id}>
          <h3>{property.title}</h3>
          <p>
            {property.location} - GHS {property.price}
          </p>
        </div>
      ))}
    </div>
  );
}

// Example: Search functionality
export function PropertySearchExample() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Property[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setSearching(true);
      const searchResults = await searchProperties(query);
      setResults(searchResults);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search properties..."
      />
      <button onClick={handleSearch} disabled={searching}>
        {searching ? "Searching..." : "Search"}
      </button>

      <div>
        <h3>Search Results ({results.length})</h3>
        {results.map((property) => (
          <div key={property.id}>
            <h4>{property.title}</h4>
            <p>
              {property.location} - GHS {property.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example: Filter by location
export function LocationFilterExample() {
  const [location, setLocation] = useState("Accra");
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const loadPropertiesByLocation = async () => {
      const data = await getPropertiesByLocation(location);
      setProperties(data);
    };

    loadPropertiesByLocation();
  }, [location]);

  return (
    <div>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="Accra">Accra</option>
        <option value="Kumasi">Kumasi</option>
        <option value="Tema">Tema</option>
        <option value="Cape Coast">Cape Coast</option>
        <option value="Takoradi">Takoradi</option>
      </select>

      <div>
        <h3>
          Properties in {location} ({properties.length})
        </h3>
        {properties.map((property) => (
          <div key={property.id}>
            <h4>{property.title}</h4>
            <p>
              {property.address} - GHS {property.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example: Featured properties
export function FeaturedPropertiesExample() {
  const [featured, setFeatured] = useState<Property[]>([]);

  useEffect(() => {
    const loadFeatured = async () => {
      const data = await getFeaturedProperties(3); // Get top 3 featured
      setFeatured(data);
    };

    loadFeatured();
  }, []);

  return (
    <div>
      <h2>Featured Properties</h2>
      {featured.map((property) => (
        <div
          key={property.id}
          style={{ border: "2px solid gold", padding: "10px", margin: "10px" }}
        >
          <h3>⭐ {property.title}</h3>
          <p>
            {property.location} - GHS {property.price}
          </p>
          <p>{property.description}</p>
        </div>
      ))}
    </div>
  );
}

// When you're ready to connect to a real API, just replace the functions in properties.ts
// For example:
/*
export const getProperties = async (): Promise<Property[]> => {
  const response = await fetch('/api/properties');
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
};

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  const response = await fetch(`/api/properties/${id}`);
  if (!response.ok) return undefined;
  return response.json();
};
*/
