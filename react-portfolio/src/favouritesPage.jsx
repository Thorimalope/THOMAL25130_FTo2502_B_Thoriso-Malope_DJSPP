import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function FavouritesPage() {
  const [favEpisodes, setFavEpisodes] = useState([]);

  useEffect(function () {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavEpisodes(storedFavs);
  }, []);

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
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
                {episode.file && (
                  <audio controls src={episode.file}>
                    Your browser does not support the audio tag.
                  </audio>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
