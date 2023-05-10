import { useState, useEffect } from "react";

// Import PropTypes
import PropTypes from "prop-types";

import axios from "axios";

const CartItem = ({ game }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveFromCart = () => {
    setQuantity(quantity - 1);
  };

  const isInCart = () => {
    return quantity > 0;
  };

  const handleRemoveGame = (id) => {
    axios
      .delete(`http://localhost:3000/api/games/${id}`)
      .then(() => {
        // Refresh the page
        console.log("Game removed from database");
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  CartItem.propTypes = {
    game: PropTypes.object.isRequired,
  };

  const handleUpdateGame = (id, updatedGame) => {
    axios
      .put(`http://localhost:3000/api/games/${id}`, updatedGame)
      .then(() => {
        // Refresh the page
        console.log("Game updated in database");
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <img
        // 'large_capsule_image, if available, otherwise 'Header image'
        src={
          game["large_capsule_image"]
            ? game["large_capsule_image"]
            : game["Header image"]
        }
        alt={game["name"] ? game["name"] : game["Name"]}
        className="rounded-t-lg"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {game["name"] ? game["name"] : game["Name"]}
          </h2>
          <p className="text-sm text-gray-600">
            {game["final_price"] !== undefined && game["final_price"] !== 0
              ? "$" + game["final_price"] / 100
              : (game["final_price"] === 0 ||
                  game["final_price"] === undefined) &&
                game["Price"] === 0
              ? "FREE"
              : "$" + game["Price"]}
          </p>
        </div>
        <button
          className={`mt-4 mb-2 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
            isInCart()
              ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600"
          }`}
          onClick={isInCart() ? handleRemoveFromCart : handleAddToCart}
        >
          {isInCart() ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          className="mt-4 mb-2 py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          onClick={() => handleRemoveGame(game._id)}
        >
          Remove Game from Database
        </button>
        <button
          className="mt-4 mb-2 py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          onClick={() => handleUpdateGame(game._id)}
        >
          Upvote this Game
        </button>
      </div>
    </div>
  );
};

const AddGameForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, price, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
      </div>
      <button type="submit">Add Game</button>
    </form>
  );
};

AddGameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const App = () => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/featured")
      .then((response) => setFeaturedGames(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:3000/api/games")
      .then((response) => {
        setAllGames(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (game) => {
    const existingCartItemIndex = cart.findIndex(
      (item) => item.game.id === game.id
    );
    if (existingCartItemIndex !== -1) {
      const updatedCartItem = {
        ...cart[existingCartItemIndex],
        quantity: cart[existingCartItemIndex].quantity + 1,
      };
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex] = updatedCartItem;
      setCart(updatedCart);
    } else {
      const newCartItem = { game: game, quantity: 1 };
      setCart([...cart, newCartItem]);
    }
    setCartItemCount(cartItemCount + 1);
  };

  const handleRemoveFromCart = (game) => {
    const existingCartItemIndex = cart.findIndex(
      (item) => item.game.id === game.id
    );
    if (
      existingCartItemIndex !== -1 &&
      cart[existingCartItemIndex].quantity > 1
    ) {
      const updatedCartItem = {
        ...cart[existingCartItemIndex],
        quantity: cart[existingCartItemIndex].quantity - 1,
      };
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex] = updatedCartItem;
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((item) => item.game.id !== game.id);
      setCart(updatedCart);
    }
    setCartItemCount(cartItemCount - 1);
  };

  // const isInCart = (game) => {
  //   return cart.some((item) => item.game.id === game.id);
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = allGames.filter(
    (game) =>
      game.Name && game.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [newGame, setNewGame] = useState({
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });

  const handleAddGame = () => {
    axios
      .post("http://localhost:3000/api/games", {
        AppID: newGame.appid,
        Name: newGame.name,
        Price: newGame.price,
      })
      .then((response) => {
        setAllGames([...allGames, response.data]);
        setNewGame({ appid: "", name: "", price: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="font-bold text-lg">The Game Vault</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search Games"
            className="py-2 px-4 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="focus:outline-none">
            <a href="#" className="relative">
              <img
                src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG4.png"
                alt="cart"
                className="w-12 h-12"
              />
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
                {cartItemCount}
              </span>
            </a>
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 px-8 py-4">
        {/* Loading spinner */}
        {isLoading && (
          <div className="flex flex-col items-center mt-32">
            <div className="spinner"></div>
            <p className="mt-2 text-center">Loading games...</p>
            <p className="mt-1 text-gray-400 text-sm text-center mb-32">
              And no, you don&apos;t need to button-mash to progress.
            </p>
          </div>
        )}{" "}
        <div className="h-70vh overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredGames.map((game) => {
              const cartItem = cart.find((item) => item.game.id === game.id);

              return (
                <div key={game.id} className="bg-white rounded-lg shadow-lg">
                  <img
                    src={game["large_capsule_image"]}
                    alt={game["name"]}
                    className="rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold">{game["name"]}</h2>
                      <p className="text-sm text-gray-600">
                        {game["final_price"] === 0
                          ? "FREE"
                          : "$" + game["final_price"] / 100}
                      </p>
                    </div>
                    <button
                      className={`mt-4 mb-2 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${
                        cartItem
                          ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
                          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600"
                      }`}
                      onClick={() =>
                        cartItem
                          ? handleRemoveFromCart(game)
                          : handleAddToCart(game)
                      }
                    >
                      {cartItem ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Add Game */}
        <div className="flex flex-col px-8 py-4">
          <h2 className="text-lg font-bold mb-4">Add Game</h2>
          <form onSubmit={handleAddGame}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-gray-400 py-2 px-3 rounded-lg w-full"
                value={newGame.name}
                onChange={(e) =>
                  setNewGame({ ...newGame, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="border border-gray-400 py-2 px-3 rounded-lg w-full"
                value={newGame.price}
                onChange={(e) =>
                  setNewGame({ ...newGame, price: parseFloat(e.target.value) })
                }
                min="0"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block font-bold mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                className="border border-gray-400 py-2 px-3 rounded-lg w-full"
                value={newGame.image}
                onChange={(e) =>
                  setNewGame({ ...newGame, image: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add Game
            </button>
          </form>
        </div>
      </main>
      {/* Full Game List */}
      {allGames.length > 0 && (
        <div className="flex flex-col px-8 py-4 mt-8">
          <h2 className="text-lg font-bold mb-4">All Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredGames.map((game) => {
              const isInFeaturedGames = featuredGames.some(
                (featuredGame) => featuredGame.id === game.id
              );
              if (isInFeaturedGames) {
                return null;
              }
              return <CartItem key={game._id} game={game} />;
            })}
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-4 px-8 text-center">
        <p>
          This website is for demonstrational purposes only. To purchase these
          games, please navigate to the official Steam store at &nbsp;
          <a className="text-teal-500" href="https://store.steampowered.com">
            https://store.steampowered.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
