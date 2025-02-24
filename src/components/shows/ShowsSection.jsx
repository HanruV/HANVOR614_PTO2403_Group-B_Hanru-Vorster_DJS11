import { useLocation } from "react-router-dom";
import ShowList from "./ShowList";
import SuggestedShows from "./SuggestedShows";
import Favorites from "./Favorites";

const ShowsSection = () => {
  const location = useLocation();
  const isFavoritesRoute = location.pathname === "/favorites";

  return (
    <section className="shows-container">
      <div className="shows-and-favorites-container">
        {isFavoritesRoute ? <Favorites /> : <ShowList />}
      </div>
      <div className="all-show-details-container">
        <SuggestedShows />
      </div>
    </section>
  );
};

export default ShowsSection;
