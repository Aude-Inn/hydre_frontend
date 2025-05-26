export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm text-gray-300 mt-12 rounded-t-2xl shadow-inner border-t border-pink-500/20">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
        {/* Contact */}
        <div>
          <h3 className="font-semibold text-pink-400 mb-2">Contact</h3>
          <p>La Rochelle</p>
          <p className="text-teal-300 hover:text-pink-400 transition">Email</p>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="font-semibold text-pink-400 mb-2">Liens utiles</h3>
          <p className="hover:text-teal-300 cursor-pointer transition">À propos</p>
          <p className="hover:text-teal-300 cursor-pointer transition">Confidentialité</p>
          <p className="hover:text-teal-300 cursor-pointer transition">Conditions</p>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="font-semibold text-pink-400 mb-2">Suivez-nous</h3>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-pink-500 transition"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-pink-400 py-4 border-t border-pink-500/10">
        © 2025 HYDRE. Tous droits réservés.
      </div>
    </footer>
  );
}

