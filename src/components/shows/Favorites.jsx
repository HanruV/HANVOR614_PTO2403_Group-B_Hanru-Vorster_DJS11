import { useState } from "react";

export default function Favorites() {
  // Initialize favorites state from localStorage
  // If no favorites exist in localStorage, initialize with empty array
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("podcastFavorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Removes a favorite episode by its ID
  // Updates both state and localStorage to maintain persistence
  const handleRemoveFavorite = (favoriteId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((fav) => fav.id !== favoriteId);
      localStorage.setItem("podcastFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div>
      <div className="shows-header">
        <h2>Favorite Episodes</h2>
      </div>
      <div className="show-list-grid">
        {favorites.length === 0 ? (
          <p>No favorite episodes yet</p>
        ) : (
          // Map through favorites array to create episode cards
          favorites.map((favorite) => (
            <div key={favorite.id} className="show-card episode-card">
              <div className="show-content">
                <h3 className="show-title">{favorite.episode.title}</h3>
                <p className="show-info">
                  <span className="card-sub-heading">Show Title:</span>{" "}
                  {favorite.showTitle}
                </p>
                <p className="show-info">
                  <span className="card-sub-heading">Season:</span>{" "}
                  {favorite.seasonTitle}
                </p>
                <p className="show-info">
                  <span className="card-sub-heading">Added:</span>{" "}
                  {new Date(favorite.dateAdded).toLocaleDateString()}
                </p>
                <button
                  className="add-remove-toggle-button"
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
