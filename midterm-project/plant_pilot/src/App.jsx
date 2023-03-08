import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { render } from "react-dom";
import Thermometer from "react-thermometer-component";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Humidity from "./components/Humidity";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 gap-4">
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
          <h1 className="mt-8">Current Temp: 60°C</h1>
          <h1 className="mt-2">
            Optimal Temp for &#123;Plant Name&#125;: 60°C
          </h1>
        </div>
        <div className="...">
          <Humidity />
        </div>
        <div className="...">06</div>
        <div className="col-span-2 ...">07</div>
      </div>
    </div>
  );
}

export default App;
