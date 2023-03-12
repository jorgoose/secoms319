import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { render } from "react-dom";
import Thermometer from "react-thermometer-component";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Humidity from "./components/Humidity";

function Home() {
  const [temp, setTemp] = useState(0);

  // Function to set current temperature at load of page
  useEffect(() => {
    // fetch("http://localhost:3001/temp")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTemp(data);
    //   });

    // Placeholder
    setTemp(60);
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
          <h1 className="mt-2">
            Optimal Temp for &#123;Plant Name&#125;: {temp}°C
          </h1>
        </div>
        <div className="...">
          <Humidity />
        </div>
        <div className="..."></div>
        <div className="col-span-4 m-auto my-8 font-bold">
          A Bunch of Examples of Common Plants Will be Shown Below Here:
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 1</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 2</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 3</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 4</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 5</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 6</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img
            className="rounded-lg shadow-md mb-3"
            src="https://tailwindcss.com/img/card-top.jpg"
          />
          <h2 className="font-semibold text-center">Plant 7</h2>
          <p>
            Plant description. Here will be more details about the specific
            plant being shown...
          </p>
        </div>
        <div className="m-auto ml-8 mb-8">
          <img src="https://tailwindcss.com/img/card-top.jpg" />
          <h2 className="font-semibold text-center">Plant 8</h2>
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

export default Home;
