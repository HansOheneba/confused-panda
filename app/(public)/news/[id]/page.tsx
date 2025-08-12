import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleById, formatDate } from "@/lib/articles";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <div className=" bg-gradient-to-b from-airbanBlue to-gray-50 text-black pt-40 pb-10   ">
        <div className="bg-transparent">
          {/* Navigation */}
          <div className="">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Link href="/news">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-black hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Newsroom
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <header className="mb-8">
            {/* <div className="mb-4">
                <span className="text-sm text-gray-500">
                {formatDate(article.publishedAt)}
                </span>
            </div> */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </header>

          {/* Article Body */}
          <div className="max-w-none">
            <div className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-5 [&>h3]:mb-2 [&>p]:text-gray-700 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-2 [&>ul]:mb-4 [&>ul]:text-gray-700 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-2 [&>ol]:mb-4 [&>ol]:text-gray-700 [&>li]:text-gray-700 [&>strong]:font-semibold [&>strong]:text-gray-900 [&>a]:text-blue-600 [&>a]:hover:text-blue-800 [&>a]:underline [&>img]:my-8 [&>img]:rounded-lg [&>img]:mx-auto">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </div>

          {/* External Links Section */}
          {article.links && article.links.length > 0 && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Also Published On
              </h3>
              <div className="space-y-2">
                {article.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    <span className="underline underline-offset-2">
                      {link.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link href="/news">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Newsroom
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                Published on {formatDate(article.publishedAt)}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
};

export default ArticlePage;
