const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Mongo
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

// Endpoint to get all products
app.get("/api/products", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");

  const query = {};

  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(100)
    .toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

// Endpoint to provide a "page" of products (4 products per page, page 1 is the first 8 products, page 2 is the next 8 products, etc.)
app.get("/api/products/:page", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");

  const query = {};

  const results = await db
    .collection("fakestore_catalog")
    .find(query)
    .limit(4)
    .skip((req.params.page - 1) * 4)
    .toArray();

  console.log(results);
  res.status(200);
  res.send(results);
});

// Create a new product
app.post("/api/products", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to POST MongoDB");

  console.log("Request body: ");
  console.log(req.body);

  // Set newProduct to the request body with an additional unique _id property
  const newProduct = { ...req.body, _id: uuidv4() };

  console.log("Product to be added to the database: ");
  console.log(newProduct);

  // Add the product to the database
  const result = await db.collection("fakestore_catalog").insertOne(newProduct);

  console.log(result);

  res.status(200);
  res.send(result);
});

// Update a product
app.put("/api/products/:id", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to PUT MongoDB");

  // Update the product in the database
  const results = await db
    .collection("fakestore_catalog")
    .updateOne({ _id: req.params.id }, { $set: req.body });

  console.log(results);
  res.status(200);
  res.send(results);
});

// Delete a product
// Delete a product
app.delete("/api/products/:id", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to DELETE MongoDB");

  const id = req.params.id;
  console.log("Product to be deleted from the database: ");
  console.log(id);

  // Delete the product from the database
  const result = await db
    .collection("fakestore_catalog")
    .deleteOne({ _id: id });

  console.log(result);

  res.status(200);
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
