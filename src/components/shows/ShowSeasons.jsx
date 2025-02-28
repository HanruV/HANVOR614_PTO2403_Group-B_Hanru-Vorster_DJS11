// A component for displaying show seasons
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowSeasonsNav from "../navigation/ShowSeasonsNav";

export default function ShowSeasons() {
  const navigate = useNavigate();
  const { id } = useParams();
  // State to store the seasons data
  const [seasons, setSeasons] = useState([]);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to track error message
  const [error, setError] = useState(null);

  // Fetch seasons data when component mounts or show ID changes
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch seasons");
        }
        const data = await response.json();
        setSeasons(data.seasons);
      } catch (error) {
        console.error("Failed to fetch seasons:", error.message);
        setError("Failed to load seasons. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasons();
  }, [id]);

  // Handler for season click events
  // Uses navigate to change routes
  const handleSeasonClick = async (season) => {
    navigate(`/show/${id}/season/${season.season}`, { state: { season } });
  };

  return (
    <div className="show-details">
      <ShowSeasonsNav />

      {isLoading ? (
        <h2>Loading seasons...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="seasons-container">
          <h2>Show Seasons</h2>
          <div className="show-list-grid">
            {seasons.map((season, index) => (
              <div
                key={season.season || index}
                className="show-card"
                onClick={() => handleSeasonClick(season)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={season.image}
                  alt={season.title}
                  className="show-image"
                />
                <div className="show-content">
                  <h3 className="show-title">{season.title}</h3>
                  <p className="show-info">
                    <span className="card-sub-heading">Episodes:</span>{" "}
                    {season.episodes.length}
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
