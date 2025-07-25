import { Link } from "react-router-dom";
import SimpleThemeToggle from "./ThemeToggle";

export default function Header({ isDarkMode, onToggleTheme }) {
  return (
    <header className="app-header">
      <div>
        <img src="/microphone-svgrepo-com.svg" />
        <h1>OMNIPOD</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <SimpleThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
      </div>
      <Link className="header-link" to="/favouritesPage">
        Favourites
      </Link>
    </header>
  );
}
