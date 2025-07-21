"use client";

import { useState } from "react";

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <div className="w-full max-w-4xl">
      {/* Tabs */}
      <div className="flex w-fit text-black font-semibold text-sm">
        <button
          onClick={() => setActiveTab("buy")}
          className={`border-b-2 px-6 sm:px-10 py-2 bg-white rounded-tl-md ${
            activeTab === "buy"
              ? "border-blue-400 border-b-4 text-blue-800"
              : "border-gray-400 border-b-2 hover:border-gray-300"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`border-b-2 px-6 sm:px-10 py-2 bg-white rounded-tr-md ${
            activeTab === "sell"
              ? "border-blue-400 border-b-4 text-blue-800"
              : "border-gray-400 border-b-2 hover:border-gray-300"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center bg-white max-w-xl text-black text-sm rounded-tr-md rounded-b-md">
        {/* Info Sections */}
        <div className="flex flex-col sm:flex-row flex-1">
          {activeTab === "buy" ? (
            <>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Location <br />
                <span className="text-black font-bold">Spintex, Accra</span>
              </div>
              <div className="hidden sm:block border-slate border-l-2 border-solid h-10 my-auto"></div>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Price Range <br />
                <span className="text-black font-bold">GH₵ 200k - 500k</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Property Type <br />
                <span className="text-black font-bold">3-Bedroom House</span>
              </div>
              <div className="hidden sm:block border-slate border-l-2 border-solid h-10 my-auto"></div>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Location <br />
                <span className="text-black font-bold">East Legon</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="border-slate border-t-2 sm:border-t-0 sm:border-l-2 border-solid w-full sm:w-auto">
          <div className="p-4 sm:px-8 sm:py-0 flex justify-start sm:justify-center items-center h-full">
            <button className="w-full sm:w-auto text-white bg-blue-800 rounded-md py-2 px-6 font-semibold">
              {activeTab === "buy" ? "Browse Properties" : "List Property"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
