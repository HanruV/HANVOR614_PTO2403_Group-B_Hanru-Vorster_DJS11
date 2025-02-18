import ShowsSection from "./shows/ShowsSection";
import MusicPlayer from "./musicPlayer/musicPlayer";

const MainContent = () => {
  return (
    <main className="main-content">
      <ShowsSection />
      <section className="player-container">
        <MusicPlayer />
      </section>
    </main>
  );
};

export default MainContent;
