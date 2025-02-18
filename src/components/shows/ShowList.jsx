import { useState, useEffect } from "react";

export default function ShowList() {
  // State to store the list of podcast shows
  const [shows, setShows] = useState([]);

  // Mapping of genre IDs to their display titles
  const GENRE_MAP = {
    1: { title: "Personal Growth" },
    2: { title: "Investigative Journalism" },
    3: { title: "History" },
    4: { title: "Comedy" },
    5: { title: "Entertainment" },
    6: { title: "Business" },
    7: { title: "Fiction" },
    8: { title: "News" },
    9: { title: "Kids and Family" },
  };

  // Fetch shows data when component mounts
  useEffect(() => {
    const fetchShows = async () => {
      // Fetch podcast data from the API
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      // Sort the shows alphabetically by title before setting state
      const sortedShows = data.sort((a, b) => a.title.localeCompare(b.title));
      setShows(sortedShows);
    };

    fetchShows();
  }, []);

  return (
    <div>
      <h2>All Shows</h2>
      <div className="show-list-grid">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <img src={show.image} alt={show.title} className="show-image" />
            <div className="show-content">
              <h3 className="show-title">{show.title}</h3>
              <p className="show-info">
                Genres:{" "}
                {show.genres
                  // Convert each genre ID to its corresponding title using GENRE_MAP
                  .map((genreId) => GENRE_MAP[genreId]?.title)
                  // Remove any undefined values (in case of unknown genre IDs)
                  .filter(Boolean)
                  // Join all genre titles with commas and spaces
                  .join(", ")}
              </p>
              <p className="show-info">
                Seasons: {show.seasons} • Updated:{" "}
                {new Date(show.updated).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
