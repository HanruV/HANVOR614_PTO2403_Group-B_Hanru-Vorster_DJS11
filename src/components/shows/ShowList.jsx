import { useState, useEffect } from "react";

const styles = {
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "1rem",
    display: "flex",
    gap: "1rem",
  },
  image: {
    width: "33%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
  },
  content: {
    flex: "2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

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
      <h2>Podcast Shows</h2>
      <div style={styles.grid}>
        {shows.map((show) => (
          <div key={show.id} style={styles.card}>
            <img src={show.image} alt={show.title} style={styles.image} />
            <div style={styles.content}>
              <h3>{show.title}</h3>
              <p>
                Genres:{" "}
                {show.genres
                  // Convert each genre ID to its corresponding title using GENRE_MAP
                  .map((genreId) => GENRE_MAP[genreId]?.title)
                  // Remove any undefined values (in case of unknown genre IDs)
                  .filter(Boolean)
                  // Join all genre titles with commas and spaces
                  .join(", ")}
              </p>
              <p>Seasons: {show.seasons}</p>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
