import ShowList from "./ShowList";
import ShowDetails from "./ShowDetails";

const ShowsSection = () => {
  return (
    <section className="shows-container">
      <div className="shows-and-favorites-container">
        <ShowList />
        {/* <Favorites /> */}
      </div>
      <div className="all-show-details-container">
        <ShowDetails />
      </div>
    </section>
  );
};

export default ShowsSection;
