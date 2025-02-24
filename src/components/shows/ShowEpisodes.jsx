import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    // Find the new season from the allSeasons array
    const newSeason = allSeasons.find(
      (s) => s.season === Number(event.target.value)
    );
    // If the new season is found, update the selectedSeason state and the URL
    if (newSeason) {
      setSelectedSeason(newSeason);
      // Update the URL to reflect the new season
      navigate(`/show/${id}/season/${newSeason.season}`, {
        state: { season: newSeason },
        replace: true,
      });
    }
  };

  // Function to handle the click event on the back button
  const handleBack = () => {
    navigate(`/show/${id}/seasons`);
  };

  return (
    <div className="show-episodes">
      <nav className="show-episodes-nav">
        <button onClick={handleBack} className="back-button">
          ← Back to Seasons
        </button>
        {!isLoading && !error && allSeasons.length > 0 && (
          <select
            value={selectedSeason?.season || ""}
            onChange={handleSeasonChange}
            className="season-select"
          >
            {allSeasons.map((s) => (
              <option key={s.season} value={s.season}>
                {s.title}
              </option>
            ))}
          </select>
        )}
      </nav>

      {isLoading ? (
        <h2>Loading episodes...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="seasons-container">
          <h2>{selectedSeason?.title} - Episodes</h2>
          <div className="show-list-grid">
            {selectedSeason?.episodes.map((episode, index) => (
              <div
                key={index}
                className="show-card"
                style={{ cursor: "pointer" }}
              >
                <div className="show-content">
                  <h3 className="show-title">{episode.title}</h3>
                  <p className="show-info">
                    <span className="card-sub-heading">Description:</span>{" "}
                    {episode.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
