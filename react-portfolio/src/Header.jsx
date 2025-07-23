import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="app-header">
      <div>
        <img src="/microphone-svgrepo-com.svg" />
        <h1>OMNIPOD</h1>
      </div>
      <Link to="/favouritesPage">Favourites</Link>
    </header>
  );
}
