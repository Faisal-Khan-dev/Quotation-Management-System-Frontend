import React, { useEffect } from "react";
import {
  Search,
  Bell,
  TrendingDown,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  MessageCircle,
  Menu,
} from "lucide-react";
import { base_url } from "../../services/config";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
import axios from "axios";
import SaveAsModal from "../../components/common/SaveAsModal";
import ShareQuotationModal from "../../components/common/ShareQuotationModal";

export default function Dashboard() {
  const { getUserDetails, token } = useAuthContext();
  const userData = getUserDetails();
  const { data, setData, dataLoad } = useDataContext();
  const quotations = data?.quotations || [];
  const users = data?.users || [];

  const totalQuotation = quotations.length;
  const pendingQuotation = quotations.filter((q) => q.status === "sent").length;
  const totalUsers = users.length;

  useEffect(() => {

    if (token === false) return;
    dataLoad();
  }, [token]);

  return (
    <>
    <div className="w-full min-h-screen bg-[#F8F9FA]">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4 w-full">
        <div className="flex items-center justify-between w-full">
          {/* MOBILE MENU ICON (handled by Layout) */}
          <button className="sm:hidden p-2 mr-3 rounded-md border">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 sm:gap-12 w-full">
            <h1 className="text-lg font-semibold text-gray-800">Admin</h1>

            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2.5 bg-[#F8F9FA] border-0 rounded-lg w-full text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden sm:flex items-center gap-5">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">{(userData?.name)?.slice(0,2)}</span>
              </div>
              <div className="text-sm font-semibold text-gray-800">
              {userData?.name}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-4 sm:px-8 py-6 w-full mx-auto">
        <h2 className="text-[22px] sm:text-[28px] font-semibold text-gray-900 mb-7">
          Welcome Martin Brown, 👋
        </h2>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-7 w-full">
          {/* Total Quotation */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-[15px] text-gray-600 font-medium">
                Total Quotation
              </span>
            </div>
            <div>
              <div className="text-[36px] font-bold text-gray-900 mb-2">
                {totalQuotation}
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-500">10 last week</span>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-[15px] text-gray-600 font-medium">
                Pending Quotation
              </span>
            </div>
            <div>
              <div className="text-[36px] font-bold text-gray-900 mb-2">
                {pendingQuotation}
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500">10% last week</span>
              </div>
            </div>
          </div>

          {/* New Clients */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 bg-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="text-[15px] text-gray-600 font-medium">
                New Clients
              </span>
            </div>

            <div>
              <div className="text-[36px] font-bold text-gray-900 mb-2">
                {totalUsers}
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500">100 last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Quotation Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h3 className="text-[17px] font-semibold text-gray-900">
              Recent Quotation
            </h3>
          </div>

          <table className="min-w-full table-auto">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left py-4 px-6 text-[13px] font-semibold text-gray-600">
                  #
                </th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold text-gray-600">
                  Client Name
                </th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold text-gray-600">
                  Total Amount
                </th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-[13px] font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {quotations.map((q, i) => (
                <tr
                  key={q._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-6 text-[14px] text-gray-700 font-medium">
                    {i + 1}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-gray-900 font-semibold">
                    {q.customerDetails?.customerName}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-gray-600">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-[14px] text-gray-900 font-semibold">
                    {q.totalAmount}
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold bg-green-50 text-green-700 border border-green-100">
                      {q.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 flex items-center gap-1">
                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                      <Eye className="w-[18px] h-[18px]" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                      <Edit className="w-[18px] h-[18px]" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                      <Trash2 className="w-[18px] h-[18px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all">
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
    </>
  );
}
