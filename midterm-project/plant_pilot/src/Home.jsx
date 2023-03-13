import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { render } from "react-dom";
import Thermometer from "react-thermometer-component";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Humidity from "./components/Humidity";

function Home() {
  const [temp, setTemp] = useState(60);

  const [loading, setLoading] = useState(true);

  // Array of plants to display, total of 8 plants
  let [plants, setPlants] = useState([
    {
      id: 249477,
      data: {},
    },
    {
      id: 236068,
      data: {},
    },
    {
      id: 110975,
      data: {},
    },
    {
      id: 423390,
      data: {},
    },
  ]);

  // Function to set current temperature at load of page
  useEffect(() => {
    // Loop through plants and fetch data from API
    plants.forEach((plant) => {
      // Get method to "https://localhost:8000/plant/" + id
      fetch("http://localhost:8000/plant/" + plant.id)
        .then((response) => response.json())
        .then((data) => {
          // Add the plant data to the plant object
          plant.data = data.data;
        });
    });

    // Loading is done
    setLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-4 m-auto mt-8">
          {/* TODO: Search bar */}

          <input
            type="text"
            placeholder="Search for a Plant Here:"
            className="border px-2 py-2 rounded w-80"
            // When user presses enter, redirect to search page
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                window.location.href = "/search/" + event.target.value;
              }
            }}
          ></input>
        </div>
        <div className="..."></div>
        <div className="m-auto p-20">
          <Thermometer
            theme="light"
            value="60"
            max="100"
            steps="3"
            format="°C"
            size="large"
            height="300"
          />
          <h1 className="mt-8">Current Temp: {temp}°C</h1>
        </div>
        <div className="...">
          <Humidity />
        </div>
        <div className="..."></div>
        <div className="col-span-4 m-auto my-8 font-bold">
          A Bunch of Examples of Common Plants Will be Shown Below Here:
        </div>
        {/* For each plant in plants, create a set of elements */}
        {plants.map((plant) => (
          <div className="m-auto ml-8 mb-8">
            {/* Image wrapped in a div to crop it to a consistent square size, using object-fit */}
            <div className="w-72 h-72 overflow-hidden rounded-lg shadow-md m-auto mb-3">
              <img
                src={loading ? reactLogo : plant.data.image_url}
                alt="Plant"
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="font-semibold text-center">
              {plant.data.common_name}
            </h2>
            <h3 className="text-center">{plant.data.scientific_name}</h3>
            <p>
              Plant description. Here will be more details about the specific
              plant being shown...
            </p>
          </div>
        ))}
      </div>
      <div className="text-center pb-6">...</div>
    </div>
  );
}

export default Home;
