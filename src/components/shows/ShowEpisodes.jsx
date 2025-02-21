import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ShowEpisodes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const season = location.state?.season;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setIsLoading(true);
        if (!season) {
          throw new Error("No season data available");
        }
        // Uses season data from the state
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Failed to load episodes. Please refresh the page:",
          error.message
        );
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [season]);

  // Function to handle the click event on the back button
  const handleBack = () => {
    // Navigate to the seasons page for the current show
    navigate(`/show/${id}/seasons`);
  };

  return (
    <div className="show-details">
      <nav className="show-details-nav">
        <button onClick={handleBack} className="back-button">
          ← Back to Seasons
        </button>
      </nav>

      {isLoading ? (
        <h2>Loading episodes...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="seasons-container">
          <h2>{season.title} - Episodes</h2>
          <div className="show-list-grid">
            {season.episodes.map((episode, index) => (
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
