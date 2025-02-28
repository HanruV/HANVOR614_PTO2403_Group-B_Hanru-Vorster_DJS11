import { useLocation } from "react-router-dom";
import ShowList from "./ShowList";
import Favorites from "./Favorites";
import PropTypes from "prop-types";

const ShowsSection = ({ onPlayEpisode }) => {
  const location = useLocation();
  const isFavoritesRoute = location.pathname === "/favorites";

  return (
    <section className="shows-container">
      <div className="shows-and-favorites-container">
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
