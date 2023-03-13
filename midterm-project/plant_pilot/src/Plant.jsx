// Page that displays details for an individual plant type (i.e. Tulips)

import React from "react";
import Navbar from "./components/Navbar/Navbar";

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

    console.log(data);

    if (data.data.growth.minimum_temperature.deg_c === null){
      data.data.growth.minimum_temperature.deg_c = "No Temperature Data Available";
    }
    if (data.data.growth.minimum_temperature.deg_f === null){
      data.data.growth.minimum_temperature.deg_f = "No Temperature Data Available";
    }
    if (data.data.growth.maximum_temperature.deg_c === null){
      data.data.growth.maximum_temperature.deg_c = "No Temperature Data Available";
    }
    if (data.data.growth.maximum_temperature.deg_f === null){
      data.data.growth.maximum_temperature.deg_f = "No Temperature Data Available";
    }
    if (data.data.growth.atmospheric_humidity === null){
      data.data.growth.atmospheric_humidity = "No Humidity Data Available";
    }
    else
    {
      data.data.growth.atmospheric_humidity = data.data.growth.atmospheric_humidity / 10 * 100 + "%";
    }
    if (data.data.growth.light === null){
      data.data.growth.light = "No Light Data Available";
    }
    else
    {
      data.data.growth.light = data.data.growth.light / 10 * 100 + "%";
    }
    setPlant(data);
    setLoading(false);
  }

  useEffect(() => {
    // Get method to ""https://localhost:8000/plant/" + id"
    fetchPlant();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 min-h-screen">
      <div className="flex justify-center">
        <div className="m-auto mt-8 mb-8">
          <img
            className="rounded-lg shadow-md mb-3 h-25 w-40"
            src={loading ? <>Loading image name...</> : plant.data.image_url}
          />
          <h2 className="font-semibold">
            <strong>Common Name: {loading ? <>Loading common name...</> : plant.data.common_name}</strong> <br></br> 
            Trefle ID: {loading ? <>Loading Trefle ID...</> : plant.data.id} <br></br>
            Scientific Name: {loading ? <>Loading scientific name...</> : plant.data.scientific_name} <br></br>
            Year Discovered: {loading ? <>Loading year discovered...</> : plant.data.year} <br></br>
            Observed in: {loading ? <>Loading location...</> : plant.data.observations} <br></br>
            Minimum Temperature °F: {loading ? <>Loading optimal temperature...</> : plant.data.growth.minimum_temperature.deg_f} <br></br>
            Minimum Temperature °C: {loading ? <>Loading optimal temperature...</> : plant.data.growth.minimum_temperature.deg_c} <br></br> 
            Maximum Temperature °F: {loading ? <>Loading optimal temperature...</> : plant.data.growth.maximum_temperature.deg_f} <br></br>
            Maximum Temperature °C: {loading ? <>Loading optimal temperature...</> : plant.data.growth.maximum_temperature.deg_c} <br></br> 
            Atmospheric Humidity: {loading ? <>Loading optimal humidity...</> : plant.data.growth.atmospheric_humidity} <br></br>
            Optimal Lighting: {loading ? <>Loading optimal lighting...</> : plant.data.growth.light} <br></br>
          </h2>
        </div>
      </div>
      <div className="text-center pb-6">...</div>
    </div>
    </div>
  );
}

export default Plant;
