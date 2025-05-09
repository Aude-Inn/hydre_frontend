import { useEffect, useState } from "react";
import { User } from "../types/user.type";
import { deleteUser, getUsers, updateUser } from "../services/UsersService";

interface UsersTableProps {
  isDashboard: boolean;
}

export function UsersTable({ isDashboard }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [updatedName, setUpdatedName] = useState<string>("");
  const [updatedEmail,  setUpdatedEmail] = useState<string>("");
  const [updatedRole, setUpdatedRole] = useState<string>("");

  useEffect(() => {
    const axiosUsers = async () => {
      try {
        const loadedUsers = await getUsers();
        setUsers(loadedUsers);
      } catch (error) {
        setError("Erreur lors du chargement des utilisateurs.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    axiosUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        setError("Erreur lors de la suppression de l'utilisateur.");
        console.log(error);
      }
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email)
    setUpdatedRole(user.role);
  };

  const handleUpdate = async () => {
    if (!updatedName || !updatedRole) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    try {
      // Envoi des données mises à jour
      const updatedUser = await updateUser({
        name: updatedName,
        email: updatedEmail,
        role: updatedRole,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setEditingUser(null); // Ferme le formulaire après mise à jour
    } catch (error) {
      setError("Erreur lors de la mise à jour de l'utilisateur.");
      console.log(error);
    }
  };

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md mt-6">
      <table className="min-w-[700px] w-full text-sm md:text-base text-white">
        <thead className="bg-white/10 text-teal-200">
          <tr>
            <th className="py-3 px-4 text-left">Nom</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Email</th>
            <th className="py-3 px-4 text-left hidden md:table-cell">Mot de passe</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Rôle</th>
            {isDashboard && <th className="py-3 px-4 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4 hidden sm:table-cell">{user.email}</td>
                <td className="py-2 px-4 hidden md:table-cell">*****</td>
                <td className="py-2 px-4 hidden sm:table-cell">{user.role}</td>
                {isDashboard && (
                  <td className="py-2 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center transition"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                        title="Supprimer"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isDashboard ? 5 : 4} className="py-4 px-4 text-center text-white">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Formulaire d'édition si un utilisateur est sélectionné */}
      {editingUser && (
        <div className="mt-4 p-4 bg-white/10 rounded-lg">
          <h3 className="text-teal-200 mb-4">Modifier l'utilisateur</h3>
          <div className="mb-2">
            <label className="block text-white">Nom</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="p-2 rounded bg-white/10 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-white">Rôle</label>
            <input
              type="text"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              className="p-2 rounded bg-white/10 w-full"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-teal-400 hover:bg-teal-500 text-white p-2 rounded-full mt-4"
          >
            Mettre à jour
          </button>
        </div>
      )}
    </div>
  );
}
