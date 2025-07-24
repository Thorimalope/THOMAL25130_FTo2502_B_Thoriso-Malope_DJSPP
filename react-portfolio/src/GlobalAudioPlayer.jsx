import React, { useRef, useEffect, useState } from "react";
import "./GlobalAudioPlayer.css";

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    function handleEpisodeChange() {
      const savedEpisode = JSON.parse(localStorage.getItem("currentEpisode"));
      if (savedEpisode) {
        setCurrentEpisode(savedEpisode);
      }
    }

    window.addEventListener("episodeChanged", handleEpisodeChange);

    handleEpisodeChange();

    return () => {
      window.removeEventListener("episodeChanged", handleEpisodeChange);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (currentEpisode && isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Playback failed:", err.message);
      });
    } else {
      audioRef.current.pause();
    }
  }, [currentEpisode, isPlaying]);

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setProgress((current / total) * 100);
  };

  const handleSeek = (e) => {
    const percent = e.target.value;
    const newTime = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(percent);
  };

  if (!currentEpisode) return null;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={currentEpisode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="player-details">
        <strong>{currentEpisode.title}</strong>
        <span>{currentEpisode.podcastTitle}</span>
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="player-button"
      >
        {isPlaying ? "⏸" : "▶️"}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="player-slider"
      />
    </div>
  );
};

export default GlobalAudioPlayer;
