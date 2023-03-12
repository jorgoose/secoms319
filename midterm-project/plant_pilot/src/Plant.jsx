// Page that displays details for an individual plant type (i.e. Tulips)

import React from "react";

// Access URL path variable
import { useParams } from "react-router-dom";

// Access state variables
import { useState, useEffect } from "react";

// Access plant ID from URL path variable
const { id } = useParams();

function Plant() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex justify-center">
        <div className="m-auto mt-8 mb-8">
          <img
            className="rounded-lg shadow-md mb-3"
            src="https://tailwindcss.com/img/card-top.jpg"
          />
          <h2 className="font-semibold text-center">Plant 1</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
      </div>
      <div className="text-center pb-6">...</div>
    </div>
  );
}

export default Plant;
