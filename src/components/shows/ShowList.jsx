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
  // state for shows
  const [shows, setShows] = useState([]);

  // fetching and storing shows/genres
  useEffect(() => {
    const fetchShows = async () => {
      //shows
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
      setShows(sortedData);
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
              <p>Seasons: {show.seasons}</p>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
