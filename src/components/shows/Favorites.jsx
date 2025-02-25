import { useState } from "react";
import SortButton from "../common/SortButton";
import { sortByTitle } from "../../sortFunctions/SortAZ";

export default function Favorites() {
  // Initialize favorites state from localStorage
  // If no favorites exist in localStorage, initialize with empty array
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("podcastFavorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  // Sort order state
  const [sortOrder, setSortOrder] = useState("asc");

  // Removes a favorite episode by its ID
  // Updates both state and localStorage to maintain persistence
  const handleRemoveFavorite = (favoriteId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((fav) => fav.id !== favoriteId);
      localStorage.setItem("podcastFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Add sort toggle handler
  const handleSortToggle = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    // Sort favorites based on episode title
    const sortedFavorites = sortByTitle(
      favorites.map((fav) => ({
        ...fav,
        title: fav.episode.title, // Map to match the structure expected by sortByTitle
      })),
      newOrder
    ).map((sorted) =>
      favorites.find((fav) => fav.episode.title === sorted.title)
    );

    setFavorites(sortedFavorites);
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Favorite Episodes</h2>
        <div className="filter-controls">
          <SortButton currentOrder={sortOrder} onToggle={handleSortToggle} />
        </div>
      </div>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorite episodes yet</p>
        ) : (
          favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              <div className="favorite-content">
                <div className="favorite-info-container">
                  <h3 className="favorite-title">{favorite.episode.title}</h3>
                  <p className="favorite-info">
                    <span className="favorite-label">Show Title:</span>{" "}
                    {favorite.showTitle}
                  </p>
                  <p className="favorite-info">
                    <span className="favorite-label">Season:</span>{" "}
                    {favorite.seasonTitle}
                  </p>
                  <p className="favorite-added-date">
                    <span className="favorite-label">Date Added: </span>
                    {new Date(favorite.dateAdded).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className="favorite-remove-button"
                  onClick={() => handleRemoveFavorite(favorite.id)}
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
