import "./styles.css";
import ShowList from "./components/shows/ShowList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShowDetails from "./components/shows/ShowDetails";
import MusicPlayer from "./components/musicPlayer/musicPlayer";

function App() {
  return (
    <div>
      <Header />
      {/* Main Contnet */}
      <div className="main-content">
        <div className="shows-container">
          <div className="shows-and-favorites-container">
            <ShowList />
            {/* <Favorites /> */}
          </div>
          <div className="all-show-details-container">
            <ShowDetails />
          </div>
        </div>
        <div className="player-container">
          <MusicPlayer />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
