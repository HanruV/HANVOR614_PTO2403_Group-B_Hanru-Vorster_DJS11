import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowsSection from "./components/shows/ShowsSection";
import ShowDetails from "./components/shows/ShowDetails";
import ShowSeasons from "./components/shows/ShowSeasons";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ShowEpisodes from "./components/shows/ShowEpisodes";

function App() {
  // State to track the currently playing episode
  // Passed to the MusicPlayer component
  const [currentEpisode, setCurrentEpisode] = useState(null);

  // Function to handle episode playback requests from child components
  // This function is passed down to ShowEpisodes as a prop
  const handlePlayEpisode = (episode) => {
    setCurrentEpisode(episode);
  };

  return (
    // BrowserRouter: Enables client-side routing for the entire application
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ShowsSection />} />
          <Route
            path="/favorites"
            element={<ShowsSection onPlayEpisode={handlePlayEpisode} />}
          />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/show/:id/seasons" element={<ShowSeasons />} />
          <Route
            path="/show/:id/season/:seasonNumber"
            element={<ShowEpisodes onPlayEpisode={handlePlayEpisode} />}
          />
        </Routes>
        <section className="player-container">
          {/* Pass the current episode data to the MusicPlayer */}
          <MusicPlayer currentEpisode={currentEpisode} />
        </section>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
