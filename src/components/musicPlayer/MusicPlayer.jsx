import { useState } from "react";

export default function MusicPlayer() {
  // State variables for managing audio playback
  // audioUrl: stores the URL of the currently playing audio file
  const [audioUrl] = useState(
    "https://podcast-api.netlify.app/placeholder-audio.mp3"
  );

  // This will store the title of the episode playing
  const [episodeTitle] = useState("No episode selected");

  return (
    <div className="audio-player">
      <div className="episode-info">
        <span className="now-playing">Now Playing:</span>
        <span className="episode-title">{episodeTitle}</span>
      </div>
      <audio src={audioUrl} controls className="audio-controls" />
    </div>
  );
}
