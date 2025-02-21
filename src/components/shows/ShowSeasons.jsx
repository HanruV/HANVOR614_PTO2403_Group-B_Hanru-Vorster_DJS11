import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ShowSeasons() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleBack = () => {
    navigate(`/show/${id}`);
  };

  return (
    <div className="show-details">
      <nav className="show-details-nav">
        <button onClick={handleBack} className="back-button">
          ← Back to Show Details
        </button>
      </nav>
      <h2>Show Seasons</h2>

      {isLoading ? (
        <h2>Loading seasons...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="seasons-container">
          <div className="show-list-grid">
            {seasons.map((season, index) => (
              <div key={season.season || index} className="show-card">
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
