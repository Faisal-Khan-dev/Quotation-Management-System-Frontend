import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, MoreVertical, Bell, X } from "lucide-react";
import { useDataContext } from "../../context/DataContext";
import axios from "axios";
import { base_url } from "../../services/config";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import PermissionDenied from "../../components/ErrorsModal/PermissionDenied";

function AddUserModal({ open, onClose }) {
  const modalRef = useRef(null);
  const {dataLoad} = useDataContext()

  // Outside Click Close
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  // Form State
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { getUserDetails } = useAuthContext();
  

  // Handle Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit → Axios POST
  const handleSubmit = async () => {
    try {
      const url = `${base_url}/auth/register-user`;
      const userData = getUserDetails();

      const res = await axios.post(url, {
        name: formData.userName,
        email: formData.email,
        password: formData.password,
        companyId: userData.companyId,
      });

      toast.success("User Create Succesfully");
      dataLoad()
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!open) return null;

  return (
    <>
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
      <div
        ref={modalRef}
        className="
          bg-white
          py-4 
          px-7
          rounded-2xl
          shadow-[0_4px_30px_rgba(0,0,0,0.2)]
          w-[460px]
        "
      >
        {/* Title exactly like screenshot */}
        <h2 className="text-[18px] font-semibold mb-6">
          Configure Field: <span className="font-normal">Add User</span>
        </h2>

        {/* Form grid exactly like screenshot */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-xs text-gray-500">user name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-[#F7F7F7]"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-[#F7F7F7]"
            />
          </div>
          {/* </div> */}

          <div className="mb-4">
            <label className="text-xs text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm bg-[#F7F7F7]"
            />
          </div>

          {/* Buttons aligned to right like screenshot */}
          <div className="flex justify-end items-center">
            <button
              onClick={handleSubmit}
              className="
              bg-black 
              text-white 
              px-6 
              py-2 
              rounded-md 
              text-sm
              hover:bg-gray-800
            "
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
 </>
  );
}

const UserManagement = () => {
  const { data } = useDataContext();
  const { getUserDetails } = useAuthContext();
  const users = data?.users || [];

  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false)
  const userData = getUserDetails()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <AddUserModal open={open} onClose={() => setOpen(false)} />
        {permissionModal && (
      <PermissionDenied onClose={() => setPermissionModal(false)}/>
        )}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team members and their account permissions
          </p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1"
          >
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">BM</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-900">
                Brown Martin
              </div>
              <div className="text-xs text-gray-500">Business Owner</div>
            </div>
          </button>
        </div>
      </div>

      {/* User Table Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Table Header */}
        <div className="p-3 md:p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-3 md:items-center">
          <h2 className="text-sm md:text-base font-medium text-gray-900 flex items-center gap-2">
            All Users{" "}
            <span className="text-gray-400 font-normal">{users.length}</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            <button
              onClick={() => {userData?.role === 'staff' ? setPermissionModal(true) : setOpen(true)}}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 justify-center hover:bg-gray-800"
            >
              <Plus className="w-4 h-4" /> Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  User name
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Access
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Last action ↑
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date added
                </th>
                <th className="px-4 md:px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <img
                          src={user.profileImage}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        all
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        staff
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex justify-center">
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded">
              ←
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              3
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded">
              4
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Profile Popover */}
      {showProfile && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white rounded-lg shadow-lg p-4 w-64 animate-fade-in">
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm font-medium">
              "Brown Martin" Options Updated
            </div>
            <button
              onClick={() => setShowProfile(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300">
            View Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
