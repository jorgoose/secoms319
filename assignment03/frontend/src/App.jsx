import { useState, useEffect } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    _id: "",
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });
  const [updatePriceId, setUpdatePriceId] = useState("");
  const [updatePriceValue, setUpdatePriceValue] = useState("");

  // Fetch all products from the local backend API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products"); // Use relative URL
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        // Use relative URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct), // Include the request body with the new product data
      });
      const data = await response.json();
      setProducts([...products, data]);
      setNewProduct({
        _id: "",
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: {
          rate: "",
          count: "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Update the price of a product
  const updatePrice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${updatePriceId}`,
        {
          // Use relative URL
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price: updatePriceValue }),
        }
      );
      const data = await response.json();
      setProducts(
        products.map((product) => (product.id === data.id ? data : product))
      );
      setUpdatePriceId("");
      setUpdatePriceValue("");
    } catch (error) {
      console.log(error);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        // Use relative URL
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>
      {/* Add Product */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Add Product</h2>
        <form onSubmit={addProduct}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="title">
              Title
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              required
            />
          </div>
          {/* Add other fields (price, description, category, image, rating) similarly */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="id">
              ID
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="id"
              value={newProduct.id}
              onChange={(e) =>
                setNewProduct({ ...newProduct, id: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="price">
              Price
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="description">
              Description
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="category">
              Category
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="category"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="image">
              Image
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="rate">
              Rate
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="rate"
              value={newProduct.rating.rate}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  rating: { ...newProduct.rating, rate: parseInt(e.target.value) },
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="count">
              Count
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="count"
              value={newProduct.rating.count}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  rating: { ...newProduct.rating, count: parseInt(e.target.value) },
                })
              }
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>{" "}
      {/* View Products */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">View Products</h2>
        {products.map((product) => (
          <div key={product.id} className="border border-gray-300 p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
            <h4 className="text-lg font-bold mb-2">${product.price}</h4>
            <p className="text-lg mb-2">{product.description}</p>
            <br />
            {/* Category with each word in the string capitalized */}
            <p className="text-lg mb-2">
              Category:{" "}
              {product.category.split(" ").map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1) + " ";
              })}
            </p>
            <img
              className="w-64 h-64 object-contain"
              src={product.image}
              alt={product.title}
            />
            <br />
            <p className="text-lg mb-2">
              Rating: {product.rating.rate} ({product.rating.count})
            </p>
            <p className="text-lg mb-2">ID: {product._id}</p>
            {/* Display other product information */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => deleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {/* Update Price */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Update Price</h2>
        <form onSubmit={updatePrice}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="updatePriceId">
              Product ID
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="updatePriceId"
              value={updatePriceId}
              onChange={(e) => setUpdatePriceId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="updatePriceValue">
              New Price
            </label>
            <input
              className="border border-gray-300 px-2 py-1 w-64"
              type="text"
              id="updatePriceValue"
              value={updatePriceValue}
              onChange={(e) => setUpdatePriceValue(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Update Price
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
