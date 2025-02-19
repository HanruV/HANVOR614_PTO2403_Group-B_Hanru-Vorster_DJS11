import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ShowDetailModal({ onClose, showId }) {
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      const response = await fetch(
        `https://podcast-api.netlify.app/id/${showId}`
      );
      const data = await response.json();
      setShowDetails(data);
    };

    fetchShowDetails();
  }, [showId]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => {
          // Prevents the click event from closing the modal if content is clicked
          e.stopPropagation();
        }}
      >
        <h2>Show Details: {showDetails?.title}</h2>
        <div
          className="modal-image-background"
          style={{ backgroundImage: `url(${showDetails?.image})` }}
        ></div>
        <p>{showDetails?.description}</p>
      </div>
    </div>
  );
}

ShowDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
};
