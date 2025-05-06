import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";

export function Nav() {
  const { user, logout} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="relative ">
     
      <ul className="hidden md:flex items-center gap-8 text-md font-semibold text-white">
        <li>
          <Link to="/" className="hover:text-teal-300 transition" onClick={closeMenu}>Home</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login" className="hover:text-teal-300 transition" onClick={closeMenu}>Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-teal-300 transition" onClick={closeMenu}>Sign Up</Link>
            </li>
          </>
        )}

        {user?.role === "user" && (
          <>
            <li>
              <Link to="/profile" className="hover:text-teal-300 transition" onClick={closeMenu}>You</Link>
            </li>
            <li>
              <Link to="/game-lists" className="hover:text-teal-300 transition" onClick={closeMenu}>Games</Link>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/dashboard" className="hover:text-teal-300 transition" onClick={closeMenu}>Dashboard</Link>
            </li>
            <li>
              <Link to="/game-lists" className="hover:text-teal-300 transition" onClick={closeMenu}>Games</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-teal-300 transition" onClick={closeMenu}>You</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="text-red-400 hover:text-red-500 transition"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

     
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

   
      {menuOpen && (
        <ul className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-md rounded-lg px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-white z-50 w-48">
          <li>
            <Link to="/" onClick={closeMenu} className="hover:text-teal-300">Home</Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to="/login" onClick={closeMenu} className="hover:text-teal-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" onClick={closeMenu} className="hover:text-teal-300">Sign Up</Link>
              </li>
            </>
          )}

          {user?.role === "user" && (
            <>
              <li>
                <Link to="/profile" onClick={closeMenu} className="hover:text-teal-300">You</Link>
              </li>
              <li>
                <Link to="/game-lists" onClick={closeMenu} className="hover:text-teal-300">Games</Link>
              </li>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <li>
                <Link to="/dashboard" onClick={closeMenu} className="hover:text-teal-300">Dashboard</Link>
              </li>
              <li>
                <Link to="/game-lists" onClick={closeMenu} className="hover:text-teal-300">Games</Link>
              </li>
              <li>
                <Link to="/profile" onClick={closeMenu} className="hover:text-teal-300">You</Link>
              </li>
            </>
          )}

          {user && (
            <li>
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}


  
  

