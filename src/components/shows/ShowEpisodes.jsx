import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ShowEpisodes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const season = location.state?.season;

  // Function to handle the click event on the back button
  const handleBack = () => {
    // Navigate to the seasons page for the current show
    navigate(`/show/${id}/seasons`);
  };

  if (!season) {
    return <div>No season data available</div>;
  }

  return (
    <div className="show-details">
      <nav className="show-details-nav">
        <button onClick={handleBack} className="back-button">
          ← Back to Seasons
        </button>
      </nav>

      <h2>{season.title} - Episodes</h2>

      <div className="show-list-grid">
        {season.episodes.map((episode, index) => (
          <div key={index} className="show-card" style={{ cursor: "pointer" }}>
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
  );
}
