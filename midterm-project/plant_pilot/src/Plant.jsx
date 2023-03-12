// Page that displays details for an individual plant type (i.e. Tulips)

import React from "react";

// Access URL path variable
import { useParams } from "react-router-dom";

// Access state variables
import { useState, useEffect } from "react";
import { render } from "react-dom";

function Plant() {
  // Access plant ID from URL path variable
  const { id } = useParams();

  // Fetch plant data from URL before rendering
  const [plant, setPlant] = useState({});

  const [loading, setLoading] = useState(true);

  async function fetchPlant() {
    const response = await fetch("http://localhost:8000/plant/" + id);
    const data = await response.json();
    setPlant(data);
    setLoading(false);
  }

  useEffect(() => {
    // Get method to ""https://localhost:8000/plant/" + id"
    fetchPlant();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex justify-center">
        <div className="m-auto mt-8 mb-8">
          <img
            className="rounded-lg shadow-md mb-3"
            src="https://tailwindcss.com/img/card-top.jpg"
          />
          <h2 className="font-semibold text-center">
            {loading ? <>Loading common name...</> : plant.data.common_name}
          </h2>
          <p></p>
        </div>
      </div>
      <div className="text-center pb-6">...</div>
    </div>
  );
}

export default Plant;
