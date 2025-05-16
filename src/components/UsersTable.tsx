import { useEffect, useState } from "react";
import { User } from "../types/user.type";
import { deleteUser, getAllUsers, updateUserById } from "../services/UsersService";

interface UsersTableProps {
  isDashboard: boolean;
}

export function UsersTable({ isDashboard }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // Récup
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loadedUsers = await getAllUsers();
        setUsers(loadedUsers);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (!confirmed) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      setError("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  // Modif
  const handleUpdate = async () => {
    if (!editingUser) return;

    if (!formData.name || !formData.role) {
      setError("Tous les champs sont requis.");
      return;
    }

    try {
      const updated = await updateUserById(editingUser._id, formData);
      setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
      setEditingUser(null);
      setError(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour.");
      console.error(err);
    }
  };

  // 🔄 Champs du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto mt-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
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
              <tr key={user._id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4 hidden sm:table-cell">{user.email}</td>
                <td className="py-2 px-4 hidden md:table-cell">••••••</td>
                <td className="py-2 px-4 hidden sm:table-cell">{user.role}</td>
                {isDashboard && (
                  <td className="py-2 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
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

      {editingUser && (
        <div className="mt-4 p-4 bg-white/10 rounded-lg">
          <h3 className="text-teal-200 mb-4">Modifier l'utilisateur</h3>
          <div className="mb-2">
            <label className="block text-white">Nom</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="p-2 rounded bg-white/10 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-white">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 rounded bg-white/10 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-white">Rôle</label>
            <input
              name="role"
              type="text"
              value={formData.role}
              onChange={handleInputChange}
              className="p-2 rounded bg-white/10 w-full"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-teal-400 hover:bg-teal-500 text-white p-2 rounded-full mt-4"
          >
            Sauvegarder les modifications
          </button>
        </div>
      )}
    </div>
  );
}
