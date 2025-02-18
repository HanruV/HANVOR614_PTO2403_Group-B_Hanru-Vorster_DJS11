import { useState, useEffect } from "react";

export default function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch("https://podcast-api.netlify.app");
      const data = await response.json();
      setShows(data);
    };
    fetchShows();
  }, []);

  return (
    <div>
      <h2>Podcast Shows</h2>
      <div>
        {shows.map((show) => (
          <div key={show.id}>
            <h3>{show.title}</h3>
            <img src={show.image} alt={show.title} />
            <p>{show.description}</p>
            <p>seasons: {show.seasons}</p>
            <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
