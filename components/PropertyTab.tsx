import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  const buyLocations = ["Spintex, Accra", "East Legon", "Dzorwulu"];
  const priceRanges = ["GH₵ 100k - 200k", "GH₵ 200k - 500k", "GH₵ 500k+"];

  const sellTypes = ["3-Bedroom House", "Apartment", "Commercial Space"];
  const sellLocations = ["East Legon", "Airport Residential", "Tema"];

  return (
    <div className="w-full px-4 sm:px-0 max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex w-full sm:w-fit text-black font-semibold text-sm">
        <button
          onClick={() => setActiveTab("buy")}
          className={`border-b-2 px-4 sm:px-8 py-2 bg-white rounded-tl-md transition-all duration-200 ${
            activeTab === "buy"
              ? "border-blue-400 border-b-4 text-blue-800"
              : "border-gray-300 border-b-2 hover:border-gray-400"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`border-b-2 px-4 sm:px-8 py-2 bg-white rounded-tr-md transition-all duration-200 ${
            activeTab === "sell"
              ? "border-blue-400 border-b-4 text-blue-800"
              : "border-gray-300 border-b-2 hover:border-gray-400"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch bg-white text-black text-sm rounded-b-md sm:rounded-tr-md shadow-sm border border-t-0 border-slate-200 p-3">
        {/* Inputs Section */}
        <div className="flex flex-col sm:flex-row flex-wrap sm:flex-1 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {activeTab === "buy" ? (
            <>
              <div className=" px-3 flex-1">
                <label className="block text-slate-500 mb-1 text-xs">Location</label>
                <select className="w-full p-1 bg-transparent border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black font-semibold">
                  {buyLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" px-3 flex-1">
                <label className="block text-slate-500 mb-1 text-xs">Price Range</label>
                <select className="w-full p-1 bg-transparent border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black font-semibold">
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className=" px-3 flex-1">
                <label className="block text-slate-500 mb-1 text-xs">
                  Property Type
                </label>
                <select className="w-full p-1 bg-transparent border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black font-semibold">
                  {sellTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" px-3 flex-1">
                <label className="block text-slate-500 mb-1 text-xs">Location</label>
                <select className="w-full p-1 bg-transparent border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-black font-semibold">
                  {sellLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        {/* CTA Button */}
        <div className="border-t sm:border-t-0 sm:border-l border-slate-200 w-full sm:w-auto">
          <div className="p-4 sm:px-6 flex items-center h-full justify-center">
            <Link href="/properties">
              <Button className="">
                {activeTab === "buy" ? "Browse Properties" : "List Property"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
