// A navigation component for the show details page
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

export default function ShowDetailsNav({ onBack }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSeasonsClick = () => {
    navigate(`/show/${id}/seasons`);
  };

  return (
    <nav className="show-details-nav">
      <button onClick={onBack} className="back-button">
        ← Back to Shows
      </button>
      <button onClick={handleSeasonsClick} className="seasons-button">
        Seasons
      </button>
    </nav>
  );
}

ShowDetailsNav.propTypes = {
  onBack: PropTypes.func.isRequired,
};
