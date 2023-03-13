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
            <br></br>
            <p>
              Course Name: SE/ComS319 Construction of User Interfaces, Spring
              2023<br></br>
              Date: March 12th, 2023
              <div className="flex flex-col w-full h-full mt-6">
                <p>
                  Team Members:<br></br>
                  Logan Jorgensen<br></br>•{" "}
                  <a href="mailto:lmj@iastate.edu">lmj@iastate.edu</a>
                  <br></br>
                  David Szczepanik<br></br>•{" "}
                  <a href="mailto:djs1@iastate.edu">djs1@iastate.edu</a>
                  <br></br>
                </p>
              </div>
            </p>
          </p>

          <p class="mb-1 mt-4">
            Website Created Using Tailwind CSS and ReactJS.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          {/* Row div */}
          <div className="flex flex-row items-center justify-center w-full h-full">
            {/* Tailwind CSS Logo */}
            <a href="https://tailwindcss.com/">
              <img
                src="https://yt3.googleusercontent.com/ikv41jMTr1uHGdILrJhvbfVJcDt4oqhwApKX37TjAleF_cRPbF2W-waj7uMnS5JySvnlvAlTCg=s900-c-k-c0x00ffffff-no-rj"
                alt="Tailwind CSS Logo"
                className="w-32 h-32"
              />
            </a>
            {/* ReactJS Logo */}
            <a href="https://reactjs.org/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"
                alt="ReactJS Logo"
                className="w-24 h-22"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credits;
