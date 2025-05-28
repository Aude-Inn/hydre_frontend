import { Brand } from "./Brand";
import { Nav } from "./Nav";
import { Notifications } from "./Notif";

export function Header() {
  return (
    <header className="w-full z-50 backdrop-blur-sm bg-black/20 p-[2px] shadow-md">
      
        <div className="flex items-center justify-between relative">
       
          <div className="flex-shrink-0">
            <Brand />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Nav />
          </div>
 
          <div className="flex-shrink-0">
            <Notifications />
          </div>
        </div>
      
    </header>
  );
}
