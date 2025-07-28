import React from "react";
import { Construction } from "lucide-react"; // Optional icon from lucide-react

const Properties = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <Construction className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800">
        This page is currently under construction
      </h1>
      <p className="text-gray-600 mt-2 max-w-md">
        We're working hard to bring this feature to life. Please check back
        soon!
      </p>
    </div>
  );
};

export default Properties;
