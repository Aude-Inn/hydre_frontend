import { GamesTable } from "../components/GamesTable";
import { UsersTable } from "../components/UsersTable";
import { AdminDashboardMessage } from "../components/AdminDashboardMessage";

export function Dashboard() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 space-y-10">
      <h1 className="text-3xl md:text-4xl text-center font-bold text-white">
      <span className="text-teal-300">Dashboard d’Hydre</span> 
      </h1>

      {/* Messages */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-4">Messages des utilisateurs</h2>
        <AdminDashboardMessage />
      </section>

      {/* Games */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-4">Gestion des jeux</h2>
        <GamesTable isDashboard={true} />
      </section>

      {/* Users */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-md border border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-4">Gestion des utilisateurs</h2>
        <UsersTable isDashboard={true} />
      </section>
    </div>
  );
}

