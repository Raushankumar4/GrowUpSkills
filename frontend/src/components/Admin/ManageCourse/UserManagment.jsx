import { useEffect, useState } from "react";

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
];

const roleColors = {
  Admin: "bg-red-100 text-red-700",
  User: "bg-blue-100 text-blue-700",
  Editor: "bg-green-100 text-green-700",
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => setUsers(mockUsers), 500);
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user ${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Lists</h2>

      {users.length === 0 ? (
        <div className="text-gray-500">Loading users...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="border rounded-lg p-4 bg-gray-50 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${roleColors[user.role] || "bg-gray-100 text-gray-700"}`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{user.email}</p>
              <div className="flex space-x-3">
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
