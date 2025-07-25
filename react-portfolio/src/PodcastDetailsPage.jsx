import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { genres } from "./Data.js";
import "./PodcastDetailsPage.css";
import { Link } from "react-router-dom";

export function getGenreNames(genreIds) {
  return genreIds.map((id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.title : "Unknown";
  });
}

export default function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    async function fetchPodcast() {
      try {
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        const data = await res.json();
        setPodcast(data);
      } catch (err) {
        setError("Failed to load podcast");
      }
    }
    fetchPodcast();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!podcast) return <p>Loading...</p>;

  const genreNames = getGenreNames(podcast.genres);

  const seasonData =
    selectedSeason &&
    podcast.seasons.find((season) => season.season === Number(selectedSeason));

  function handleClick(episode) {
    const fullEpisode = {
      title: episode.title,
      description: episode.description,
      file: episode.file,
      podcastTitle: episode.podcastTitle,
      image: podcast.image,
      dateAdded: new Date().toISOString(),
    };
    alert("Episode added to favourites");
    saveToFavourites(fullEpisode);
  }

  function saveToFavourites(episode) {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    favourites.push(episode);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    console.log("Saving to favourites:", episode);
  }

  function handlePlay(episode) {
    const episodeToSave = {
      title: episode.title,
      audioUrl: episode.file,
      podcastTitle: podcast.title,
      image: podcast.image,
    };

    localStorage.setItem("currentEpisode", JSON.stringify(episodeToSave));
    window.dispatchEvent(new Event("episodeChanged"));
  }

  return (
    <div className="podcast-detail">
      <Link to="/">Home</Link>
      <img src={podcast.image} alt={podcast.title} className="podcast-image" />
      <div className="podcast-info">
        <h1 className="podcast-title">{podcast.title}</h1>
        <p className="podcast-description">{podcast.description}</p>
        <p className="podcast-updated">
          Last updated: {new Date(podcast.updated).toLocaleDateString()}
        </p>
        <p className="podcast-genres">
          Genres: {genreNames.join(", ") || "None"}
        </p>
        <p className="podcast-seasons">Seasons: {podcast.seasons.length}</p>

        {/* Season Selector */}
        {podcast.seasons.length > 0 && (
          <select
            className="season-dropdown"
            onChange={(e) => setSelectedSeason(e.target.value)}
            value={selectedSeason || ""}
          >
            <option value="" disabled>
              Select a season
            </option>
            {podcast.seasons.map((season) => (
              <option key={season.season} value={season.season}>
                Season {season.season}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Episodes List */}
      {seasonData && (
        <div className="episodes">
          <h2>Episodes in Season {selectedSeason}</h2>
          <ul>
            {seasonData.episodes.map((episode, index) => (
              <li key={index} className="episode">
                <div className="episodes-image">
                  <img
                    src={podcast.image || "fallback.jpg"}
                    alt={episode.podcastTitle || "Podcast"}
                    className="episode-image"
                  />
                </div>
                <div className="icon-and-title">
                  <h3>{episode.title}</h3>
                  <img
                    src="/heart-alt-svgrepo-com.svg"
                    className="heart-icon"
                    onClick={() => handleClick(episode)}
                  />
                </div>
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
      )}
    </div>
  );
}
