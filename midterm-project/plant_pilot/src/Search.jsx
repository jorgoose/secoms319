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

  const [loading, setLoading] = useState(true);

  async function fetchResults() {
    const response = await fetch("http://localhost:8000/search/" + query);
    const data = await response.json();
    setResults(data.data);
    console.log(data);
    setLoading(false);
  }

  //   TODO - fetch data from API based on query and save results on page load
  useEffect(() => {
    fetch("http://localhost:8000/search/" + query)
      .then((response) => response.json())
      .then((data) => {
        fetchResults();
      });
  }, []);

  return (
    <div>
      <div className="col-span-4 m-auto mt-8">
        <h1 className="text-4xl font-bold text-center">
          Search Results for "{query}"
        </h1>
      </div>
      {/* Grid with three columns */}
      <div className="grid grid-cols-4">
        {/* Iterate through each value in data under result in results an create a div */}
        {results.map((result) => (
          // Contains the common name of the plant, the scientific name, and the image. Image is maintains aspect ratio to prevent stretching and distorting the image.
          // However, the image is croppe to fit the size of the div. This is done by setting the object-fit property to cover, and the images will all be the same size.
          <div className="col-span-1 m-auto mt-8">
            <div className="flex justify-center">
              <div className="m-auto mt-8 mb-8">
                <img
                  className="rounded-lg shadow-md mb-3"
                  src={result.image_url}
                  style={{
                    objectFit: "cover",
                    width: "300px",
                    height: "300px",
                  }}
                />
                <h2 className="font-semibold text-center">
                  {result.common_name}
                </h2>
                <p className="text-center">{result.scientific_name}</p>
              </div>
            </div>
            {/* Button to redirect to individual plant page */}
            <div className="text-center">
              <a
                href={"/plant/" + result.id}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
