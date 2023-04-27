import React, { useState, useEffect } from "react";
import axios from "axios";

interface Game {
  id: number;
  type: number;
  name: string;
  discounted: boolean;
  discount_percent: number;
  original_price: number;
  final_price: number;
  currency: string;
  large_capsule_image: string;
  small_capsule_image: string;
  windows_available: boolean;
  mac_available: boolean;
  linux_available: boolean;
  streamingvideo_available: boolean;
  discount_expiration: number;
  header_image: string;
  controller_support?: string;
}

interface CartItem {
  game: Game;
  quantity: number;
}

const App: React.FC = () => {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/featured")
      .then((response) => setFeaturedGames(response.data))
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:3000/api/games")
      .then((response) => {
        setAllGames(response.data);
        setIsLoading(false); // <-- Set isLoading to false
      })
      .catch((error) => console.error(error));

    console.log("allGames: ", allGames);
  }, []);

  const handleAddToCart = (game: Game) => {
    const existingCartItem = cart.find((item) => item.game.id === game.id);
    if (existingCartItem) {
      const updatedCart = cart.map((item) => {
        if (item.game.id === game.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    } else {
      const newCartItem = { game: game, quantity: 1 };
      setCart([...cart, newCartItem]);
    }
    setCartItemCount(cartItemCount + 1);
  };

  const handleRemoveFromCart = (game: Game) => {
    const existingCartItem = cart.find((item) => item.game.id === game.id);
    if (existingCartItem && existingCartItem.quantity > 1) {
      const updatedCart = cart.map((item) => {
        if (item.game.id === game.id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((item) => item.game.id !== game.id);
      setCart(updatedCart);
    }
    setCartItemCount(cartItemCount - 1);
  };

  const isInCart = (game: Game) => {
    return cart.some((item) => item.game.id === game.id);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = allGames.filter((game) =>
    game.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              And no, you don't need to button-mash to progress.
            </p>
          </div>
        )}

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
      </main>
      {/* Full Game List */}
      {allGames.length > 0 && (
        <div className="flex flex-col px-8 py-4 mt-8">
          <h2 className="text-lg font-bold mb-4">All Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredGames.map((game) => {
              const cartItem = cart.find((item) => item.game.id === game.id);
              const isInFeaturedGames = featuredGames.some(
                (featuredGame) => featuredGame.id === game.id
              );

              if (isInFeaturedGames) {
                return null;
              }

              return (
                <div key={game.id} className="bg-white rounded-lg shadow-lg">
                  <img
                    src={game["Header image"]}
                    alt={game["Name"]}
                    className="rounded-t-lg"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold">{game["Name"]}</h2>
                      <p className="text-sm text-gray-600">
                        {game["Price"] === 0 ? "FREE" : "$" + game["Price"]}
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
      </footer>{" "}
    </div>
  );
};

export default App;
