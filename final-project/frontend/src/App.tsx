import React, { useState, useEffect } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/featured")
      .then((response) => setGames(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="font-bold text-lg">Featured Games</h1>
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
                0
              </span>
            </a>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-4 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredGames.map((game) => (
            <div key={game.id} className="bg-white rounded-lg shadow-lg">
              <img
                src={game.large_capsule_image}
                alt={game.name}
                className="rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{game.name}</h2>
                <p className="text-sm text-gray-600">
                  {game.currency} {game.final_price / 100}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-4 px-8 text-center">
        <p>&copy; 2022 Steam Store</p>
      </footer>
    </div>
  );
};

export default App;
