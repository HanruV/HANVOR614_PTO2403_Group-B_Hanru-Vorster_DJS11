// A component for displaying show details
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowDetailsNav from "../navigation/ShowDetailsNav";

export default function ShowDetails() {
  // Extracts the 'id' from the '/show/:id' route
  const { id } = useParams();
  // Used to navigate between routes without user clicking links
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      try {
        // Use the id from URL parameters to fetch specific show details
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        console.error(
          "Failed to load show details. Please refresh the page.",
          error.message
        );
        setShowDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]); // Re-fetch when id changes in URL

  // Navigation handler to return to home page
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="show-details">
      <ShowDetailsNav onBack={handleBack} />
      {isLoading ? (
        <h2>Details Loading...</h2>
      ) : !showDetails ? (
        <h2>Failed to load show details. Please refresh the page.</h2>
      ) : (
        <div className="show-details-content">
          <h2 className="show-title">{showDetails.title}</h2>
          <div className="show-details-layout">
            <div
              className="show-image-background"
              style={{ backgroundImage: `url(${showDetails.image})` }}
            ></div>
            <div className="show-description-container">
              <h3 className="show-description-heading">Description</h3>
              <p>{showDetails.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
