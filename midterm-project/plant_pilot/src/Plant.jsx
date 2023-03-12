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
            className="rounded-lg shadow-md mb-3 h-50 w-80"
            src={loading ? <>Loading image name...</> : plant.data.image_url}
          />
          <h2 className="font-semibold">
            <strong>Common Name: {loading ? <>Loading common name...</> : plant.data.common_name}</strong> <br></br> 
            Scientific Name: {loading ? <>Loading scientific name...</> : plant.data.scientific_name} <br></br>
            Year Discovered: {loading ? <>Loading year discovered...</> : plant.data.year} <br></br>
            Observed in: {loading ? <>Loading location...</> : plant.data.observations} <br></br>
            Minimal Temperature °F: {loading ? <>Loading optimal temperature...</> : plant.data.growth.minimum_temperature.deg_f} <br></br>
            Minimal Temperature °C: {loading ? <>Loading optimal temperature...</> : plant.data.growth.minimum_temperature.deg_c} <br></br> 
            Maximal Temperature °F: {loading ? <>Loading optimal temperature...</> : plant.data.growth.maximum_temperature.deg_f} <br></br>
            Maximal Temperature °C: {loading ? <>Loading optimal temperature...</> : plant.data.growth.maximum_temperature.deg_c} <br></br> 
          </h2>
        </div>
      </div>
      <div className="text-center pb-6">...</div>
    </div>
  );
}

export default Plant;
