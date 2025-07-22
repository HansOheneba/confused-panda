import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, User, MessageCircle, Calendar } from "lucide-react";
import { getFeaturedStories, formatDate, type NewsStory } from "@/lib/newsroom";

const getCategoryIcon = (category: NewsStory["category"]) => {
  switch (category) {
    case "video":
      return <Play className="w-5 h-5 text-white" />;
    case "article":
      return <User className="w-5 h-5 text-white" />;
    case "interview":
      return <MessageCircle className="w-5 h-5 text-white" />;
    default:
      return <User className="w-5 h-5 text-white" />;
  }
};

const getCategoryColor = (category: NewsStory["category"]) => {
  switch (category) {
    case "video":
      return "bg-purple-600";
    case "article":
      return "bg-blue-600";
    case "interview":
      return "bg-gray-800";
    default:
      return "bg-blue-600";
  }
};

const cardColors = ["#0C120C", "#FFFFFF", "#8F95D3"];

const getCardColor = (index: number) => {
  return cardColors[index % cardColors.length];
};

const getCardStyle = (index: number) => {
  return `border-none`;
};

const getTextStyle = (index: number) => {
  // Middle card (index 1) has white background, so use black text
  return index === 1 ? "text-gray-800" : "text-white";
};

const getTitleStyle = (index: number) => {
  // Middle card (index 1) has white background, so use black text
  return index === 1 ? "text-gray-900" : "text-white";
};

export const NewsroomSection = () => {
  const featuredStories = getFeaturedStories();

  return (
    <div className="bg-airbanBlue">
      <section className="py-16 max-w-6xl mx-auto text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Airban Newsroom</h2>
              <h3 className="text-blue-100 mb-4">Stories and Interviews</h3>
            </div>

            <p className="text-blue-100 max-w-md">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredStories.map((story, index) => {
              const bgColor = getCardColor(index);
              return (
                <Card
                  key={story.id}
                  className={getCardStyle(index)}
                  style={{ backgroundColor: bgColor }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div
                        className={`w-10 h-10 ${getCategoryColor(
                          story.category
                        )} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        {getCategoryIcon(story.category)}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold mb-2 ${getTitleStyle(
                            index
                          )}`}
                        >
                          {story.title}
                        </h4>
                      </div>
                    </div>

                    <p className={`text-sm mb-4 ${getTextStyle(index)}`}>
                      {story.description}
                    </p>

                    <div
                      className={`flex items-center text-xs ${getTextStyle(
                        index
                      )}`}
                    ></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
