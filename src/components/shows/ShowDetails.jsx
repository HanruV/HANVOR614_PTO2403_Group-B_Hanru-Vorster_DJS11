import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import ShowDetailsNav from "../navigation/ShowDetailsNav";

export default function ShowDetails({ showId, onBack }) {
  // State to hold show details and loading status
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch show details from the API
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
        console.error(
          "Failed to fetch show details, please reload a show:",
          error.message,
          error.stack
        );
        setShowDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId]);

  return (
    <div className="show-details">
      <ShowDetailsNav onBack={onBack} />
      {isLoading ? (
        <h2>Details Loading...</h2>
      ) : !showDetails ? (
        <h2>Failed to fetch show details, please reload a show.</h2>
      ) : (
        <>
          {/* Displaying show title and image */}
          <h2 className="show-title">Show Details: {showDetails.title}</h2>
          <div
            className="show-image-background"
            style={{ backgroundImage: `url(${showDetails.image})` }}
          ></div>
          <h3 className="show-description-heading">Description</h3>
          <p>{showDetails.description}</p>
        </>
      )}
    </div>
  );
}

// PropTypes for type checking the component's props
ShowDetails.propTypes = {
  showId: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
