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
            </a><br></br>
            <p>Course Name: SE/ComS319 Construction of User Interfaces, Spring 2023<br></br>
            Date: March 12th, 2023
            <div className="flex flex-col w-full h-full mt-6">
              <p>Team Members:<br></br>
              Logan Jorgensen<br></br>
              • <a href="mailto:lmj@iastate.edu">lmj@iastate.edu</a><br></br>
              David Szczepanik<br></br>
              • <a href="mailto:djs1@iastate.edu">djs1@iastate.edu</a><br></br>
              </p>
            </div>
            </p>

          </p>

        <p class="mb-1">
          Website Created Using Tailwind CSS and ReactJS.
        </p>
        </div>
      </div>
    </div>
  );
}

export default Credits;
