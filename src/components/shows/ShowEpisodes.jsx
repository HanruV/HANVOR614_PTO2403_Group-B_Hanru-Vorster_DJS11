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
  // state to store the selected season
  const [selectedSeason, setSelectedSeason] = useState(season);

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
                  <p className="show-info">
                    <span className="card-sub-heading">Description:</span>{" "}
                    {episode.description}
                  </p>
                  <button
                    className="add-remove-toggle-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Add to Favorites
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
