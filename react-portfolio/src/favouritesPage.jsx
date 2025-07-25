import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GlobalAudioPlayer from "./GlobalAudioPlayer";
import PodcastDetailsPage from "./PodcastDetailsPage";

export default function FavouritesPage() {
  const [favEpisodes, setFavEpisodes] = useState([]);

  useEffect(function () {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavEpisodes(storedFavs);
  }, []);

  const handlePlay = (episode) => {
    const currentEpisode = {
      title: episode.title,
      podcastTitle: episode.podcastTitle || "Favourite Podcast",
      audioUrl: episode.file,
      image: episode.image,
    };

    localStorage.setItem("currentEpisode", JSON.stringify(currentEpisode));
    window.dispatchEvent(new Event("episodeChanged"));
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <div className="favourites-list">
        <div className="episodes">
          <h2>Favourite Episodes</h2>
          <ul>
            {favEpisodes.map((episode, index) => (
              <li key={index} className="episode">
                <div className="episodes-image">
                  <img
                    src={episode.image || "fallback.jpg"}
                    alt={episode.podcastTitle || "Podcast"}
                    className="episode-image"
                  />
                </div>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                {episode.file && (
                  <button
                    onClick={() => handlePlay(episode)}
                    className="play-button"
                  >
                    ▶ Play
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
