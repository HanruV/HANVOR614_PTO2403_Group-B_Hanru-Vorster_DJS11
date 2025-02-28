// A component for displaying favorite episodes
import { useState } from "react";
import SortButton from "../common/SortButton";
import SortDateAddedButton from "../common/SortDateAddedButton";
import { sortByTitle } from "../../sortFunctions/SortAZ";
import { sortByDateAdded } from "../../sortFunctions/SortDateAdded";
import PropTypes from "prop-types";

export default function Favorites({ onPlayEpisode }) {
  // Initialize favorites state from localStorage
  // If no favorites exist in localStorage, initialize with empty array
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("podcastFavorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  // Sort order state for episode title
  const [sortOrder, setSortOrder] = useState("asc");
  // Sort order state for date added
  const [dateOrder, setDateOrder] = useState("newest");

  // Removes a favorite episode by its ID
  // Updates both state and localStorage to maintain persistence
  const handleRemoveFavorite = (e, favoriteId) => {
    e.stopPropagation();

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

  // Handler for toggling date sort order
  const handleDateSortToggle = () => {
    const newOrder = dateOrder === "newest" ? "oldest" : "newest";

    setDateOrder(newOrder);

    const sortedFavorites = sortByDateAdded(favorites, newOrder);
    setFavorites(sortedFavorites);
  };

  // Function to handle episode play when a favorite card is clicked
  const handleEpisodePlay = (favorite) => {
    if (onPlayEpisode) {
      onPlayEpisode({
        title: favorite.episode.title,
        description: favorite.episode.description,
        file: favorite.episode.file,
        showTitle: favorite.showTitle,
        seasonTitle: favorite.seasonTitle,
      });
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h2>Favorite Episodes</h2>
        <div className="filter-controls">
          <SortButton currentOrder={sortOrder} onToggle={handleSortToggle} />
          <SortDateAddedButton
            currentOrder={dateOrder}
            onToggle={handleDateSortToggle}
          />
        </div>
      </div>
      <div className="favorites-grid">
        {favorites.length === 0 ? (
          <p>No favorite episodes yet</p>
        ) : (
          favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="favorite-card"
              onClick={() => handleEpisodePlay(favorite)}
              style={{ cursor: "pointer" }}
            >
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
                  onClick={(e) => handleRemoveFavorite(e, favorite.id)}
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

Favorites.propTypes = {
  onPlayEpisode: PropTypes.func,
};
