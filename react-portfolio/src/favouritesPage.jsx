import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

export default function FavouritesPage() {
  return (
    <>
      <Router>
        <nav>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </nav>
      </Router>

      <div className="favourites-list">
        <div className="episodes">
          <h2>Episodes in Season {selectedSeason}</h2>
          <ul>
            {seasonData.episodes.map((episode, index) => (
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
