import Link from "next/link";
import { useState } from "react";

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");

  // Sample dropdown options
  const buyLocations = ["Spintex, Accra", "East Legon", "Dzorwulu"];
  const priceRanges = ["GH₵ 100k - 200k", "GH₵ 200k - 500k", "GH₵ 500k+"];

  const sellTypes = ["3-Bedroom House", "Apartment", "Commercial Space"];
  const sellLocations = ["East Legon", "Airport Residential", "Tema"];

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
                <select className="text-black font-bold bg-transparent appearance-none focus:outline-none">
                  {buyLocations.map((loc) => (
                    <option key={loc} value={loc} className="text-black p-5">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block border-slate border-l-2 border-solid h-10 my-auto"></div>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Price Range <br />
                <select className="text-black font-bold bg-transparent appearance-none focus:outline-none">
                  {priceRanges.map((range) => (
                    <option key={range} value={range} className="text-black">
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Property Type <br />
                <select className="text-black font-bold bg-transparent appearance-none focus:outline-none">
                  {sellTypes.map((type) => (
                    <option key={type} value={type} className="text-black">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block border-slate border-l-2 border-solid h-10 my-auto"></div>
              <div className="text-slate-500 py-4 px-5 sm:px-7">
                Location <br />
                <select className="text-black font-bold bg-transparent appearance-none focus:outline-none">
                  {sellLocations.map((loc) => (
                    <option key={loc} value={loc} className="text-black">
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="border-slate border-t-2 sm:border-t-0 sm:border-l-2 border-solid w-full sm:w-auto cursor-pointer">
          <div className="p-4 sm:px-8 sm:py-0 flex justify-start sm:justify-center items-center h-full">
            <Link href={"/properties"}>
              <button className="w-full sm:w-auto text-white bg-blue-800 rounded-md py-2 px-6 font-semibold">
                {activeTab === "buy" ? "Browse Properties" : "List Property"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
