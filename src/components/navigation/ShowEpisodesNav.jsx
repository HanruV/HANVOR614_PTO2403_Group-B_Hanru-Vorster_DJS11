import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ShowEpisodesNav({
  showId,
  selectedSeason,
  allSeasons,
  onSeasonChange,
  isLoading,
  error,
}) {
  // Hook to navigate programmatically
  const navigate = useNavigate();

  const handleBack = () => {
    // Navigate back to the seasons page for the current show
    navigate(`/show/${showId}/seasons`);
  };

  return (
    <nav className="show-episodes-nav">
      <button onClick={handleBack} className="back-button">
        ← Back to Seasons
      </button>
      {/* Render season selection if not loading and no error */}
      {!isLoading && !error && allSeasons.length > 0 && (
        <select
          value={selectedSeason?.season || ""}
          onChange={onSeasonChange}
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
  );
}

ShowEpisodesNav.propTypes = {
  showId: PropTypes.string.isRequired,
  selectedSeason: PropTypes.object,
  allSeasons: PropTypes.array.isRequired,
  onSeasonChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
