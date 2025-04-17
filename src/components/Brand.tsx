import { Link } from "react-router-dom";

export function Brand() {
  return (
    <div className="flex justify-center items-center">
      <Link to="/">
        <img src="/Hydre.png" alt="Brand Logo" className="w-15 h-auto" />
      </Link>
    </div>
  );
}
