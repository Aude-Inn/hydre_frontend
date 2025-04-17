import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Non Trouvée</h1>
      <p>Oups ! La page que vous cherchez n'existe pas.</p>
      <Link to="/" className="back-home">
        Retour à l'accueil
      </Link>
    </div>
  );
}
