import { useState, useEffect } from "react";
import SortButton from "../common/SortButton";
import { GENRE_MAP } from "../../constants/genres";
import ShowDetails from "./ShowDetails";

export default function ShowList() {
  // State to store the list of podcast shows
  const [shows, setShows] = useState([]);
  // State to sort the list
  const [sortOrder, setSortOrder] = useState("asc");
  // State to store the currently selected show
  const [selectedShowId, setSelectedShowId] = useState(null);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  // State to track error message
  const [errorMessage, setErrorMessage] = useState(null); // Initialize error message state

  // Fetch shows data when component mounts
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          // Check if the response is not ok
          throw new Error("Network response was not ok"); // Throw an error if response is not ok
        }
        const data = await response.json();
        sortShows(data, sortOrder);
      } catch {
        setErrorMessage("Something went wrong, reload the page"); // Set error message state
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched or an error occurs
      }
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

  return (
    <div>
      {selectedShowId ? (
        <ShowDetails
          showId={selectedShowId}
          onBack={() => setSelectedShowId(null)}
        />
      ) : (
        <>
          <div className="shows-header">
            <h2>All Shows</h2>
            <SortButton currentOrder={sortOrder} onToggle={handleSortToggle} />
          </div>
          <div className="show-list-grid">
            {isLoading ? (
              <p>Shows Loading...</p>
            ) : errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              shows.map((show) => (
                <div
                  key={show.id}
                  className="show-card"
                  onClick={() => setSelectedShowId(show.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={show.image}
                    alt={show.title}
                    className="show-image"
                  />
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
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
