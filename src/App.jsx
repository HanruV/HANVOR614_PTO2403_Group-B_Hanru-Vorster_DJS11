import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowsSection from "./components/shows/ShowsSection";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <ShowsSection />
        <section className="player-container">
          <MusicPlayer />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
