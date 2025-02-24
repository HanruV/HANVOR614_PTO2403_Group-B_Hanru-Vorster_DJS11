import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowsSection from "./components/shows/ShowsSection";
import ShowDetails from "./components/shows/ShowDetails";
import ShowSeasons from "./components/shows/ShowSeasons";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import ShowEpisodes from "./components/shows/ShowEpisodes";
import Favorites from "./components/shows/Favorites";

function App() {
  return (
    // BrowserRouter: Enables client-side routing for the entire application
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ShowsSection />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/show/:id/seasons" element={<ShowSeasons />} />
          <Route
            path="/show/:id/season/:seasonNumber"
            element={<ShowEpisodes />}
          />
        </Routes>
        <section className="player-container">
          <MusicPlayer />
        </section>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
