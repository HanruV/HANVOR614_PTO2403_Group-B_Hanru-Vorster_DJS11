import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowsSection from "./components/shows/ShowsSection";
import ShowDetails from "./components/shows/ShowDetails";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";

function App() {
  return (
    // BrowserRouter: Enables client-side routing for the entire application
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ShowsSection />} />
          {/* :id is a variable that can be accessed in ShowDetails component */}
          <Route path="/show/:id" element={<ShowDetails />} />
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
