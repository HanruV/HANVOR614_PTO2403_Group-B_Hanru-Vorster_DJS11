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
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Favorite Episodes</h2>
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
