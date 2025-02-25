import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowEpisodesNav from "../navigation/ShowEpisodesNav";

export default function ShowEpisodes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const season = location.state?.season;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // state to store all seasons
  const [allSeasons, setAllSeasons] = useState([]);
  // state to store the show title
  const [showTitle, setShowTitle] = useState("");
  // state to store the selected season
  const [selectedSeason, setSelectedSeason] = useState(season);
  // Initialize favorites state from localStorage or empty array if none exists
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("podcastFavorites");
    // Initialize favorites state from localStorage or empty array if none exists
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // fetch all seasons
  useEffect(() => {
    const fetchAllSeasons = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }
        const data = await response.json();
        setAllSeasons(data.seasons);
        setShowTitle(data.title); // Store the show title
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Failed to load seasons. Please refresh the page:",
          error.message
        );
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSeasons();
  }, [id]);

  // Function to handle season change
  const handleSeasonChange = (event) => {
    const newSeason = allSeasons.find(
      (s) => s.season === Number(event.target.value)
    );
    if (newSeason) {
      setSelectedSeason(newSeason);
      navigate(`/show/${id}/season/${newSeason.season}`, {
        state: { season: newSeason },
        replace: true,
      });
    }
  };

  // Function to handle adding/removing episodes from favorites
  const handleToggleFavorite = (episode) => {
    // Create a unique identifier for the favorite episode
    const favoriteEpisode = {
      id: `${id}-${selectedSeason.season}-${episode.title}`, // Unique ID combining show, season, and episode
      showId: id,
      showTitle: showTitle, // Add show title to the stored data
      seasonNumber: selectedSeason.season,
      seasonTitle: selectedSeason.title,
      episode: episode,
      dateAdded: new Date().toISOString(),
    };

    setFavorites((prevFavorites) => {
      // Check if episode is already in favorites
      const existingIndex = prevFavorites.findIndex(
        (fav) => fav.id === favoriteEpisode.id
      );
      let newFavorites;

      if (existingIndex >= 0) {
        // Remove from favorites if already exists
        newFavorites = prevFavorites.filter(
          (fav) => fav.id !== favoriteEpisode.id
        );
      } else {
        // Add to favorites if doesn't exist
        newFavorites = [...prevFavorites, favoriteEpisode];
      }

      // Update localStorage with the new favorites list
      localStorage.setItem("podcastFavorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="show-episodes">
      <ShowEpisodesNav
        showId={id}
        selectedSeason={selectedSeason}
        allSeasons={allSeasons}
        onSeasonChange={handleSeasonChange}
        isLoading={isLoading}
        error={error}
      />

      {isLoading ? (
        <h2>Loading episodes...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="seasons-container">
          <h2>{selectedSeason?.title} - Episodes</h2>
          <div className="show-list-grid">
            {selectedSeason?.episodes.map((episode, index) => (
              <div key={index} className="show-card episode-card">
                <div className="show-content">
                  <h3 className="show-title">{episode.title}</h3>
                  {/* Toggle button that changes text based on favorite status */}
                  <button
                    className="add-remove-toggle-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(episode);
                    }}
                  >
                    {/* Check if episode is in favorites by looking up its unique ID */}
                    {favorites.some(
                      (fav) =>
                        fav.id ===
                        `${id}-${selectedSeason.season}-${episode.title}`
                    )
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
