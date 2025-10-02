import React, { useEffect } from "react";

export default function EditUserModal({ user, onClose, onSave, form, setForm }) {
  if (!user) return null;

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-blue-600 mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="first_name"
            value={form.first_name || ""}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 border rounded text-sm"
            required
          />
          <input
            type="text"
            name="last_name"
            value={form.last_name || ""}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 border rounded text-sm"
            required
          />
          <input
            type="number"
            name="tr_number"
            value={form.tr_number || ""}
            onChange={handleChange}
            placeholder="TR Number"
            className="w-full px-3 py-2 border rounded text-sm"
            required
          />
          <input
            type="number"
            name="its_number"
            value={form.its_number || ""}
            onChange={handleChange}
            placeholder="ITS Number"
            className="w-full px-3 py-2 border rounded text-sm"
            required
          />
          <select
            name="role"
            value={form.role || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded text-sm"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="prefect">Prefect</option>
            <option value="deputy">Deputy</option>
            <option value="lajnat">Lajnat</option>
            <option value="student">Student</option>
          </select>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
