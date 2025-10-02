import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../context/AuthContext";
import EditUserModal from "./EditUserModal";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({});
  const { user } = useAuth();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

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
    } catch (err) {
      console.error("Failed to update user:", err);
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
      console.error("Failed to delete user:", err);
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
    // <div style={{ height: "80vh", width: "100%" }}>
    // <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
    <div className="p-6 space-y-6">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <h2 className="text-2xl font-bold text-blue-600 mb-4">All Users</h2>{" "}
      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          showToolbar
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
}
