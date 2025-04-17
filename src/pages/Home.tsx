import { Carousel } from "../components/Carousel";
import { TopGamesTable } from "../components/TopGamesTable";
import { Marquis } from "../components/Marquis";

import '../index.css';

export function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

<div className="text-center mb-20">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wide neon-title">
           Hydre
          </h1>
        </div>
          {/* Marquee */}
          <div className="mb-5">
            <Marquis />
          </div>
      <div className="p-8 relative z-10 backdrop-blur-sm bg-black/10 mt-24 rounded-xl">
        {/* Carousel  */}
        <div className="mb-10">
          <Carousel />
        </div>
        {/* Top */}
        <div className="mb-10">
          <TopGamesTable />
        </div>
      </div>
        {/* Marquee  */}
        <div className="mb-5">
          <Marquis />
        </div>
    </div>
  );
}




