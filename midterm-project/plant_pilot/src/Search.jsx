// React component that shows search results for a given query

import React from "react";

function Search() {
  return (
    <div>
      <div className="col-span-4 m-auto mt-8">
        <h1 className="text-4xl font-bold text-center">Search Results</h1>
      </div>
      <div className="m-auto ml-8 mb-8">
        <img
          className="rounded-lg shadow-md mb-3"
          src="https://tailwindcss.com/img/card-top.jpg"
        />
        <h2 className="font-semibold text-center">Plant 1</h2>
        <p>
          Plant description. Here will be more details about the specific plant
          being shown...
        </p>
      </div>
      <div className="m-auto ml-8 mb-8">
        <img
          className="rounded-lg shadow-md mb-3"
          src="https://tailwindcss.com/img/card-top.jpg"
        />
        <h2 className="font-semibold text-center">Plant 2</h2>
        <p>
          Plant description. Here will be more details about the specific plant
          being shown...
        </p>
      </div>
      <div className="m-auto ml-8 mb-8">
        <img
          className="rounded-lg shadow-md mb-3"
          src="https://tailwindcss.com/img/card-top.jpg"
        />

        <h2 className="font-semibold text-center">Plant 3</h2>
        <p>
          Plant description. Here will be more details about the specific plant
          being shown...
        </p>
      </div>
    </div>
  );
}

export default Search;
