import PropTypes from "prop-types";

export default function MusicPlayer({ currentEpisode }) {
  // Default audio URL if no episode is selected
  // This ensures the audio player always has a valid source
  const audioUrl =
    currentEpisode?.file ||
    "https://podcast-api.netlify.app/placeholder-audio.mp3";

  // Format the display title with show and season information
  // Shows a default message if no episode is currently selected
  const episodeTitle = currentEpisode
    ? `${currentEpisode.title} (${currentEpisode.showTitle} - ${currentEpisode.seasonTitle})`
    : "No episode selected";

  return (
    <div className="audio-player">
      <div className="episode-info">
        <span className="now-playing">Now Playing:</span>
        <span className="episode-title">{episodeTitle}</span>
      </div>
      <audio
        src={audioUrl}
        controls
        className="audio-controls"
        // Automatically play when a new episode is selected
        // The !! converts currentEpisode to a boolean value
        autoPlay={!!currentEpisode}
      />
    </div>
  );
}

// Type validation for component props
MusicPlayer.propTypes = {
  currentEpisode: PropTypes.shape({
    title: PropTypes.string,
    file: PropTypes.string,
    showTitle: PropTypes.string,
    seasonTitle: PropTypes.string,
  }),
};
