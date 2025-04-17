export function Marquis() {
  return (
    <div className="relative w-full overflow-hidden py-3 mt-10 px-2">
      <div className="p-[2px] rounded-lg bg-gradient-to-r from-teal-400 via-pink-400 to-purple-500 shadow-md">
        <div className="backdrop-blur-sm bg-black/20 rounded-lg">
          <div className="marquee-wrapper">
            <div className="marquee-content text-xl font-extralight tracking-wide text-teal-300 uppercase py-2 px-4">
              <span>
                🎮 Hydre — Play together 👾 — Jouez ensemble 💥 — Zusammen spielen 🕹️ — เล่นด้วยกัน 🚀 — 一緒に遊ぶ 👑 — Jugar juntos 💎 — Grajcie razem 🧩 &nbsp;&nbsp;&nbsp;
              </span>
              <span>
                🎮 Hydre — Play together 👾 — Jouez ensemble 💥 — Zusammen spielen 🕹️ — เล่นด้วยกัน 🚀 — 一緒に遊ぶ 👑 — Jugar juntos 💎 — Grajcie razem 🧩 &nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <style>{`
        .marquee-wrapper {
          white-space: nowrap;
          overflow: hidden;
        }
  
        .marquee-content {
          display: inline-flex;
          animation: scrollMarquee 30s linear infinite;
        }
  
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
  
}


