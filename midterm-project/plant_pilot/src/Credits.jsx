// React component for credits page

import React from "react";

import Navbar from "./components/Navbar/Navbar";

function Credits() {
  return (
    <div className="credits">
      <Navbar />
      {/* Div takes up full width and centers child elements */}
      <div className="flex flex-col items-center justify-center w-full h-full mt-6">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-4xl font-bold">Credits</h1>
          <p className="text-xl font-semibold mt-2">
            Plant data provided by{" "}
            <a href="https://trefle.io/" className="text-blue-600">
              Trefle API
            </a>
          </p>
          <p>More stuff...</p>
        </div>
      </div>
    </div>
  );
}

export default Credits;
