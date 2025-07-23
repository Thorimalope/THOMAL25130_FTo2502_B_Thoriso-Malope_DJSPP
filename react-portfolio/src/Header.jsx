import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <h1>🎙️ Podcast App</h1>
      <Link to="/favouritesPage">Favourites</Link>
    </header>
  );
}
