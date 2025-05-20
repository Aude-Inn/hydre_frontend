import { GameNotificationData } from "../types/socket.types";

type Props = {
  notifications: GameNotificationData[];
};

export function NotificationsDropdown({ notifications }: Props) {
  return (
  <div className="absolute top-10 right-0 w-[92vw] sm:w-80 max-h-[24rem] overflow-y-auto bg-white/10 backdrop-blur-md border border-pink-400/20 shadow-2xl rounded-2xl z-40 p-4 animate-fade-in">
  <h4 className="text-pink-300 font-bold text-lg mb-4 flex items-center gap-2">
    📢 Derniers ajouts :
  </h4>

  {notifications.length === 0 ? (
    <p className="text-sm text-gray-300">Aucune notification pour le moment</p>
  ) : (
    <ul className="space-y-2">
      {notifications.map((item, index) => (
        <li
          key={index}
          className="bg-pink-300/20 text-pink-100 px-4 py-2 rounded-xl flex justify-between items-center text-sm"
        >
          <span className="truncate max-w-[65%]">{item.name}</span>
          <span className="text-xs text-pink-200 ml-2 whitespace-nowrap">
            {new Date(item.timestamp).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}

