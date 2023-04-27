// Basic ExpressJS backend
const express = require("express");

// CORS
const cors = require("cors");

// Axios is a library for making HTTP requests
const axios = require("axios");

// Mongo
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "final_project";
const client = new MongoClient(url);
const db = client.db(dbName);

const app = express();

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Define the endpoint to retrieve all games
app.get("/api/games", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");

  // Query for the games sorted by the "Positive" attribute
  const query = {};

  const options = {
    sort: { Positive: -1 },
  };

  const results = await db
    .collection("games")
    .find(query, options)
    .limit(100)
    .toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

// Define the endpoint to retrieve the featured games
app.get("/api/featured", async (req, res) => {
  try {
    // Make a request to the Steam Web API to get the featured games data
    const response = await axios.get(
      "https://store.steampowered.com/api/featured/?cc=us&l=english&json=1&cc=us&l=english&v=1&format=json"
    );

    // Extract the featured_win array from the response and assing to the "result" variable
    const result = response.data.featured_win;

    // Send the result back to the client
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve featured games data" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
