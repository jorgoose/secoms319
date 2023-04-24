const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
