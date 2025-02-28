// A component that conditionally renders either ShowList or Favorites
// based on the current route
import { useLocation } from "react-router-dom";
import ShowList from "./ShowList";
import Favorites from "./Favorites";
import PropTypes from "prop-types";

const ShowsSection = ({ onPlayEpisode }) => {
  // Get current location to determine which component to render
  const location = useLocation();
  // Check if we're on the favorites route
  const isFavoritesRoute = location.pathname === "/favorites";

  return (
    <section className="shows-container">
      <div className="shows-and-favorites-container">
        {/* Conditionally render Favorites or ShowList based on current route */}
        {isFavoritesRoute ? (
          <Favorites onPlayEpisode={onPlayEpisode} />
        ) : (
          <ShowList />
        )}
      </div>
    </section>
  );
};

ShowsSection.propTypes = {
  onPlayEpisode: PropTypes.func,
};

export default ShowsSection;
