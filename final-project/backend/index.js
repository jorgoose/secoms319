// Basic ExpressJS backend
const express = require("express");

// CORS
const cors = require("cors");

// Axios is a library for making HTTP requests
const axios = require("axios");

// UUID
const { v4: uuidv4 } = require("uuid");

// Mongo
const { MongoClient, ObjectId } = require("mongodb");
const ObjectID = require("mongodb").ObjectID;
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
    .limit(1000)
    .toArray();

  // Only games without duplicate Name attribute
  const uniqueResults = [];
  const map = new Map();
  for (const item of results) {
    if (!map.has(item.Name)) {
      map.set(item.Name, true);
      uniqueResults.push(item);
    }
  }

  console.log(uniqueResults);
  res.status(200);
  res.send(uniqueResults);
});

// Define the paginated endpoint to retrieve all games
app.get("/api/games/paginated", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");

    // Get query parameters for pagination
    const { page, pageSize } = req.query;
    const pageNum = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 8;
    const skip = (pageNum - 1) * limit;

    // Query for the games sorted by the "Positive" attribute
    const query = {};

    const options = {
      sort: { Positive: -1 },
      skip: skip,
      limit: limit,
    };

    const results = await db.collection("games").find(query, options).toArray();

    // Only games without duplicate Name attribute
    const uniqueResults = [];
    const map = new Map();
    for (const item of results) {
      if (!map.has(item.Name)) {
        map.set(item.Name, true);
        uniqueResults.push(item);
      }
    }

    console.log(uniqueResults);
    res.status(200);
    res.send(uniqueResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve games data" });
  }
});

app.post("/api/games", (req, res) => {
  const newGame = {
    _id: uuid.v4(), // Generate a new unique ID for the game
    AppID: req.body.AppID,
    Name: req.body.Name,
    Price: req.body.Price,
  };

  db.collection("games").insertOne(newGame, (err, result) => {
    if (err) throw err;
    console.log("Game added to database");
    res.send(result.ops[0]);
  });
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

app.delete("/api/games/:id", (req, res) => {
  const gameId = req.params.id;
  console.log("Finding and deleting game with id: " + gameId);
  db.collection("games").deleteOne({ _id: gameId }, (err, result) => {
    if (err) throw err;
    console.log("Game deleted from database");
    res.send(result);
  });
});

// This endpoint will increment the "Positive" attribute of a game by 1
app.put("/api/games/:id", (req, res) => {
  const gameId = req.params.id;
  console.log("Finding and updating game with id: " + gameId);
  db.collection("games").updateOne(
    { _id: gameId },
    { $inc: { Positive: 1 } },
    (err, result) => {
      if (err) throw err;
      console.log("Game updated in database");
      res.send(result);
    }
  );
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
