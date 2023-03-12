// React component that shows search results for a given query

import React from "react";

// Access URL path variable
import { useParams } from "react-router-dom";

// Access state variables
import { useState, useEffect } from "react";

function Search() {
  const { query } = useParams();

  //   Variable to store search results
  const [results, setResults] = useState([]);

  //   TODO - fetch data from API based on query and save results on page load
  useEffect(() => {
    // fetch("http://localhost:3001/search/" + query)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setResults(data);
    //   });
  }, []);

  return (
    <div>
      <div className="col-span-4 m-auto mt-8">
        <h1 className="text-4xl font-bold text-center">
          Search Results for "{query}"
        </h1>
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
