import { useState, useEffect } from "react";
import SortButton from "../common/SortButton";
import { GENRE_MAP } from "../../constants/genres";
import ShowDetailModal from "./ShowDetailModal";

export default function ShowList() {
  // State to store the list of podcast shows
  const [shows, setShows] = useState([]);
  // State for sorting the list
  const [sortOrder, setSortOrder] = useState("asc");
  // State to store the currently selected show
  const [selectedShow, setSelectedShow] = useState(null);
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch shows data when component mounts
  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      sortShows(data, sortOrder);
    };

    fetchShows();
  }, [sortOrder]);

  // Sort the shows list based on the sort order
  const sortShows = (data, order) => {
    const sortedShows = [...data].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });
    setShows(sortedShows);
  };

  // Function to toggle the sort order of the shows list
  const handleSortToggle = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Determine the new sort order based on the current order

    setSortOrder(newOrder); // Update the state with the new sort order

    sortShows(shows, newOrder); // Sort the shows list based on the new order
  };

  // Function to handle the click event on a show card
  const handleShowClick = (show) => {
    // Update the selected show state with the clicked show
    setSelectedShow(show);
    // Open the modal by setting isModalOpen to true
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="shows-header">
        <h2>All Shows</h2>
        <SortButton currentOrder={sortOrder} onToggle={handleSortToggle} />
      </div>
      <div className="show-list-grid">
        {shows.map((show) => (
          <div
            key={show.id}
            className="show-card"
            onClick={() => handleShowClick(show)}
            style={{ cursor: "pointer" }}
          >
            <img src={show.image} alt={show.title} className="show-image" />
            <div className="show-content">
              <h3 className="show-title">{show.title}</h3>
              <p className="show-info">
                <span className="card-sub-heading">Genres:</span>{" "}
                {show.genres
                  // Convert each genre ID to its corresponding title using GENRE_MAP
                  .map((genreId) => GENRE_MAP[genreId]?.title)
                  // Remove any undefined values (in case of unknown genre IDs)
                  .filter(Boolean)
                  // Join all genre titles with commas and spaces
                  .join(", ")}
              </p>
              <p className="show-info">
                <span className="card-sub-heading">Seasons:</span>{" "}
                {show.seasons}
              </p>
            </div>
            <p className="show-date">
              <span className="card-sub-heading">Updated:</span>{" "}
              {new Date(show.updated).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      {/* Render the modal if it is open */}
      {isModalOpen && (
        <ShowDetailModal
          show={selectedShow}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
