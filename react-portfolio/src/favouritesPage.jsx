import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./index.css";

export default function FavouritesPage() {
  const [favEpisodes, setFavEpisodes] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
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

  const removeFromFavourites = (episodeToRemove) => {
    const updatedFavs = favEpisodes.filter(
      (episode) =>
        episode.title !== episodeToRemove.title ||
        episode.podcastTitle !== episodeToRemove.podcastTitle
    );
    setFavEpisodes(updatedFavs);
    localStorage.setItem("favourites", JSON.stringify(updatedFavs));
  };

  const sortedEpisodes = [...favEpisodes].sort((a, b) => {
    const dateA = new Date(a.dateAdded || 0);
    const dateB = new Date(b.dateAdded || 0);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <div className="favourites-list">
        <div className="episodes">
          <header className="favourites-header">
            <div>
              <img src="/microphone-svgrepo-com.svg" />
              <h2>Favourite Episodes</h2>
            </div>
            <Link to="/">Home</Link>
          </header>

          <div className="sort-dropdown">
            <label htmlFor="sort">Sort by: </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <ul>
            {sortedEpisodes.map((episode, index) => (
              <li key={index} className="episode">
                <div className="episodes-image">
                  <img
                    src={episode.image || "fallback.jpg"}
                    alt={episode.podcastTitle || "Podcast"}
                    className="episode-image"
                  />
                </div>
                <div className="icon-and-title">
                  <h3>{episode.title}</h3>
                  <img
                    src="/broken-heart-divided-in-two-parts-svgrepo-com.svg"
                    className="broken-heart"
                    onClick={() => removeFromFavourites(episode)}
                    alt="Remove from favourites"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <p>{episode.description}</p>

                {episode.dateAdded && (
                  <p className="date-added">
                    Added: {new Date(episode.dateAdded).toLocaleDateString()}
                  </p>
                )}

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
