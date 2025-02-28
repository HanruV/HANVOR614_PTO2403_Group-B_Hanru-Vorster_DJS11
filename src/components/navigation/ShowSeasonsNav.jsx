// A navigation component for the show seasons page
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function ShowSeasonsNav() {
  const navigate = useNavigate();
  // Extracting the show ID from URL parameters
  const { id } = useParams();

  const handleBack = () => {
    // Navigate back to the show details page
    navigate(`/show/${id}`);
  };

  return (
    <nav className="show-details-nav">
      <button onClick={handleBack} className="back-button">
        ← Back to Show
      </button>
    </nav>
  );
}

ShowSeasonsNav.propTypes = {
  onBack: PropTypes.func.isRequired,
};
