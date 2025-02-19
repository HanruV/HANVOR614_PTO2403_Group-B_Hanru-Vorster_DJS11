import ShowList from "./ShowList";
import SuggestedShows from "./SuggestedShows";

const ShowsSection = () => {
  return (
    <section className="shows-container">
      <div className="shows-and-favorites-container">
        <ShowList />
        {/* <Favorites /> */}
      </div>
      <div className="all-show-details-container">
        <SuggestedShows />
      </div>
    </section>
  );
};

export default ShowsSection;
