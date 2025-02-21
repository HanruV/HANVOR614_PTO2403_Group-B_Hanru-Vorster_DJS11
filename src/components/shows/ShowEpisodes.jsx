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

      <div className="episodes-list">
        {season.episodes.map((episode, index) => (
          <div key={index} className="episode-item">
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
