import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ShowDetailModal({ onClose, showId }) {
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //fetches show details data from api dynamically with the showID prop
  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        console.error("Failed to fetch show details:", error);
        setShowDetails(null);
      } finally {
        setIsLoading(false);
      }
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
        {isLoading ? (
          <h2>Details Loading...</h2>
        ) : !showDetails ? (
          <h2>Failed to get details, re-open the show please</h2>
        ) : (
          <>
            <h2 className="show-title">Show Details: {showDetails.title}</h2>
            <div
              className="modal-image-background"
              style={{ backgroundImage: `url(${showDetails.image})` }}
            ></div>
            <h3 className="modal-description-heading">Description</h3>
            <p>{showDetails.description}</p>
          </>
        )}
      </div>
    </div>
  );
}

ShowDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  showId: PropTypes.string.isRequired,
};
