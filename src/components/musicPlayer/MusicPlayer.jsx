import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export default function MusicPlayer({ currentEpisode }) {
  // Create a reference to the audio element
  const audioRef = useRef();

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

  // Set up beforeunload event listener
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if audio is currently playing
      if (audioRef.current && !audioRef.current.paused) {
        const message = "Audio is playing. Are you sure you want to leave?";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    // Attach a 'beforeunload' event listener to the window object to prompt the user
    // with a warning message if they attempt to leave the page while audio is playing.
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up event listener when component unmounts
    // to prevent the event listener to not remain active
    // after the component is no longer in use.
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // We use the ref so the dependency array is empty

  return (
    <div className="audio-player">
      <div className="episode-info">
        <span className="now-playing">Now Playing:</span>
        <span className="episode-title">{episodeTitle}</span>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        controls
        className="audio-controls"
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
