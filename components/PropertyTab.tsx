"use client"; // required for Next.js App Router

import { useState } from "react";

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  return (
    <div>
      {/* Tabs */}
      <div className="flex w-fit text-black font-semibold text-sm">
        <button
          onClick={() => setActiveTab("buy")}
          className={`border-b-2 px-10 py-2 bg-white rounded-tl-md ${
            activeTab === "buy"
              ? "border-blue-400 border-b-3 text-blue-800"
              : "border-gray-400 border-b-1 hover:border-gray-300"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`border-b-2 px-10 py-2 bg-white rounded-tr-md ${
            activeTab === "sell"
              ? "border-blue-400 border-b-3 text-blue-800"
              : "border-gray-400 border-b-1 hover:border-gray-300 hover:border-b-2"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Location Selector Content */}
      <div className="flex bg-white w-fit text-black text-sm rounded-tr-md rounded-b-md">
        <div className="flex items-center">
          {activeTab === "buy" ? (
            <>
              <p className="text-slate-500 py-4 px-7">
                Location <br />
                <span className="text-black font-bold">Spintex, Accra</span>
              </p>
              <div className="border-slate border-l-2 border-solid h-10"></div>
              <p className="text-slate-500 py-4 px-7">
                Price Range <br />
                <span className="text-black font-bold">GH₵ 200k - 500k</span>
              </p>
            </>
          ) : (
            <>
              <p className="text-slate-500 py-4 px-7">
                Property Type <br />
                <span className="text-black font-bold">3-Bedroom House</span>
              </p>
              <div className="border-slate border-l-2 border-solid h-10"></div>
              <p className="text-slate-500 py-4 px-7">
                Location <br />
                <span className="text-black font-bold">East Legon</span>
              </p>
            </>
          )}

          <div className="border-slate border-l-2 border-solid h-10"></div>

          <div className="px-14">
            <button className="text-white bg-blue-800 rounded-md py-2 px-5 font-semibold">
              {activeTab === "buy" ? "Browse Properties" : "List Property"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
