export interface NewsStory {
  id: string;
  title: string;
  description: string;
  category: "video" | "article" | "interview";
  date: string;
  featured?: boolean;
}

export const newsStories: NewsStory[] = [
  {
    id: "1",
    title: "Optimizing electricity use for business profitability",
    description:
      "Learn how to reduce your electricity bills and increase profitability through smart energy management.",
    category: "video",
    date: "2025-07-18",
    featured: true,
  },
  {
    id: "2",
    title: "The Airban Journey",
    description:
      "Discover how Airban started and our mission to revolutionize the real estate industry.",
    category: "article",
    date: "2025-07-15",
    featured: true,
  },
  {
    id: "3",
    title: "Community Spotlight: Success Stories",
    description:
      "Join our community and stay updated with the latest news and opportunities from our users.",
    category: "interview",
    date: "2025-07-12",
    featured: true,
  },
  {
    id: "4",
    title: "Smart Property Investment Tips for 2025",
    description:
      "Expert insights on making the most of your property investments in the current market.",
    category: "article",
    date: "2025-07-10",
    featured: false,
  },
  {
    id: "5",
    title: "How Technology is Changing Real Estate",
    description:
      "Exploring the latest tech trends that are reshaping how we buy, sell, and rent properties.",
    category: "video",
    date: "2025-07-08",
    featured: false,
  },
  {
    id: "6",
    title: "Customer Success: From Renter to Owner",
    description:
      "An inspiring story of how one of our users transitioned from renting to owning their dream home.",
    category: "interview",
    date: "2025-07-05",
    featured: false,
  },
];

// Helper functions
export const getFeaturedStories = (): NewsStory[] => {
  return newsStories.filter((story) => story.featured).slice(0, 3);
};

export const getLatestStories = (limit: number = 6): NewsStory[] => {
  return newsStories
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getStoriesByCategory = (
  category: NewsStory["category"]
): NewsStory[] => {
  return newsStories.filter((story) => story.category === category);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
