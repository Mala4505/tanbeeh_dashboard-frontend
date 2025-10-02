// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from "@mui/x-data-grid";
// import { useAuth } from "../context/AuthContext";
// import EditUserModal from "./EditUserModal";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminDashboard = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     tr_number: "",
//     its_number: "",
//     class: "",
//     hizb: "",
//     role: "",
//     password: "",
//   });

//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);
//   const [form, setForm] = useState({});
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const { user } = useAuth();
//   const token = localStorage.getItem("authToken");

//   const fetchUsers = () => {
//     axios
//       .get(`${import.meta.env.VITE_API_URL}/users/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUsers(res.data))
//       .catch((err) => toast.error("Failed to fetch users"));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const payload = {
//         ...formData,
//         tr_number: parseInt(formData.tr_number),
//         its_number: parseInt(formData.its_number),
//         class: parseInt(formData.class),
//       };

//       await axios.post(`${import.meta.env.VITE_API_URL}/users`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setMessage("✅ User created successfully!");
//       setFormData({
//         first_name: "",
//         last_name: "",
//         tr_number: "",
//         its_number: "",
//         class: "",
//         hizb: "",
//         role: "",
//         password: "",
//       });
//       fetchUsers();
//     } catch (err) {
//       setError("❌ Failed to create user. Please check the inputs or your access.");
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setForm(user);
//   };

//   const handleSave = async (updatedUser) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_URL}/users/${updatedUser.id}`,
//         updatedUser,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setUsers((prev) =>
//         prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
//       );
//       setEditingUser(null);
//       toast.success("User updated successfully");
//     } catch (err) {
//       console.error("Failed to update user:", err);
//       toast.error("Failed to update user");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;

//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUsers((prev) => prev.filter((u) => u.id !== id));
//       toast.success("User deleted successfully");
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//       toast.error("Failed to delete user");
//     }
//   };

//   const roleColors = {
//     admin: "bg-red-100 text-red-700 border-red-300",
//     prefect: "bg-blue-100 text-blue-700 border-blue-300",
//     deputy: "bg-yellow-100 text-yellow-700 border-yellow-300",
//     lajnat: "bg-green-100 text-green-700 border-green-300",
//     student: "bg-gray-100 text-gray-700 border-gray-300",
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "first_name", headerName: "First Name", width: 130 },
//     { field: "last_name", headerName: "Last Name", width: 130 },
//     { field: "tr_number", headerName: "TR Number", width: 120 },
//     { field: "its_number", headerName: "ITS Number", width: 120 },
//     { field: "class", headerName: "Class", width: 100 },
//     { field: "hizb", headerName: "Hizb", width: 100 },
//     {
//       field: "role",
//       headerName: "Role",
//       width: 140,
//       renderCell: (params) => {
//         const color =
//           roleColors[params.value] ||
//           "bg-gray-200 text-gray-800 border-gray-300";
//         return (
//           <span
//             className={`px-2 py-1 rounded-full border text-xs font-semibold ${color}`}
//           >
//             {params.value}
//           </span>
//         );
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => (
//         <div className="flex gap-2">
//           <button
//             onClick={() => handleEdit(params.row)}
//             className="text-blue-600 hover:underline text-sm"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(params.row.id)}
//             className="text-red-600 hover:underline text-sm"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div style={{ height: "80vh", width: "100%" }}>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h2 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h2>

//       {/* User Creation Form */}
//       <div className="max-w-xl bg-white p-6 rounded shadow mb-10">
//         <h3 className="text-xl font-semibold mb-4">Create New User</h3>
//         {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}
//         {error && <p className="mb-4 text-red-500 font-medium">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {[
//             { name: "first_name", placeholder: "First Name" },
//             { name: "last_name", placeholder: "Last Name" },
//             { name: "tr_number", placeholder: "TR Number", type: "number" },
//             { name: "its_number", placeholder: "ITS Number", type: "number" },
//             { name: "class", placeholder: "Class", type: "number" },
//             { name: "hizb", placeholder: "Hizb" },
//             { name: "password", placeholder: "Password", type: "password" },
//           ].map(({ name, placeholder, type = "text" }) => (
//             <input
//               key={name}
//               type={type}
//               name={name}
//               placeholder={placeholder}
//               value={formData[name]}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded"
//               required
//             />
//           ))}

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded"
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="prefect">Prefect</option>
//             <option value="deputy">Deputy</option>
//             <option value="lajnat">Lajnat</option>
//             <option value="student">Student</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-accent text-white py-2 rounded hover:bg-highlight"
//           >
//             Create User
//           </button>
//         </form>
//       </div>

//       {/* User List Table */}
//       <div className="bg-white shadow rounded p-4 overflow-x-auto">
//         <DataGrid
//           rows={users}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10, 25, 50]}
//           checkboxSelection
//           disableRowSelectionOnClick
//           sx={{
//             "& .MuiDataGrid-columnHeaders": {
//               position: "sticky",
//               top: 0,
//               backgroundColor: "#f5f5f5",
//               zIndex: 1,
//             },
//           }}
//         />
//       </div>

//       {/* Edit Modal */}
//       {editingUser && (
//         <EditUserModal
//           user={editingUser}
//           onClose={() => setEditingUser(null)}
//           onSave={handleSave}
//           form={form}
//           setForm={setForm}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../context/AuthContext";
import EditUserModal from "./EditUserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    tr_number: "",
    its_number: "",
    class: "",
    hizb: "",
    role: "",
    password: "",
  });

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();
  const token = localStorage.getItem("authToken");

  const fetchUsers = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Failed to fetch users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        tr_number: parseInt(formData.tr_number),
        its_number: parseInt(formData.its_number),
        class: parseInt(formData.class),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ User created successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        tr_number: "",
        its_number: "",
        class: "",
        hizb: "",
        role: "",
        password: "",
      });
      fetchUsers();
    } catch (err) {
      toast.error("❌ Failed to create user. Please check the inputs or your access.");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm(user);
  };

  const handleSave = async (updatedUser) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${updatedUser.id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setEditingUser(null);
      toast.success("User updated successfully");
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const roleColors = {
    admin: "bg-red-100 text-red-700 border-red-300",
    prefect: "bg-blue-100 text-blue-700 border-blue-300",
    deputy: "bg-yellow-100 text-yellow-700 border-yellow-300",
    lajnat: "bg-green-100 text-green-700 border-green-300",
    student: "bg-gray-100 text-gray-700 border-gray-300",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First Name", width: 130 },
    { field: "last_name", headerName: "Last Name", width: 130 },
    { field: "tr_number", headerName: "TR Number", width: 120 },
    { field: "its_number", headerName: "ITS Number", width: 120 },
    { field: "class", headerName: "Class", width: 100 },
    { field: "hizb", headerName: "Hizb", width: 100 },
    {
      field: "role",
      headerName: "Role",
      width: 140,
      renderCell: (params) => {
        const color =
          roleColors[params.value] ||
          "bg-gray-200 text-gray-800 border-gray-300";
        return (
          <span
            className={`px-2 py-1 rounded-full border text-xs font-semibold ${color}`}
          >
            {params.value}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h2>

      {/* Accordion Header */}
      <div
        className="bg-white rounded shadow cursor-pointer px-6 py-4 flex justify-between items-center mb-2"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <h3 className="text-xl font-semibold">Create New User</h3>
        <span className="text-gray-500">{isFormOpen ? "▲" : "▼"}</span>
      </div>

      {/* Accordion Body with Two-Column Form */}
      {isFormOpen && (
        <div className="bg-white p-6 rounded-b shadow mb-10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="tr_number"
              placeholder="TR Number"
              value={formData.tr_number}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="its_number"
              placeholder="ITS Number"
              value={formData.its_number}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <input
              type="number"
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="prefect">Prefect</option>
              <option value="deputy">Deputy</option>
              <option value="lajnat">Lajnat</option>
              <option value="student">Student</option>
            </select>
            <input
              type="text"
              name="hizb"
              placeholder="Hizb"
              value={formData.hizb}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-accent text-white py-2 rounded hover:bg-highlight"
            >
              Create User
            </button>
          </form>
        </div>
      )}

      {/* User List Table */}
      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              backgroundColor: "#f5f5f5",
              zIndex: 1,
            },
          }}
        />
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
          form={form}
          setForm={setForm}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
