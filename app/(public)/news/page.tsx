import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getArticles, formatDate } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const NewsroomPage = () => {
  const articles = getArticles();

  return (
    <div className=" bg-gradient-to-b from-airbanBlue via-white to-white text-black py-40   ">
      {/* Hero Section */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Newsroom
            </h1>
            <p className="mt-4 text-xl max-w-2xl mx-auto">
              Stay updated with the latest insights, trends, and stories from
              our team
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                {/* <div className="mb-2">
                  <span className="text-sm text-gray-500">
                    {formatDate(article.publishedAt)}
                  </span>
                </div> */}
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0 mt-auto">
                <Link href={`/news/${article.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    Read More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsroomPage;
