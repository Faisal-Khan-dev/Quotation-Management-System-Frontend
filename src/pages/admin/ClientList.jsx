import React, { useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import Sidebar from "../../components/common/Sidebar";
import { useDataContext } from "../../context/DataContext";
import NoClientAdded from "../../components/ErrorsModal/NoClientAdded";

export default function ClientDashboard() {
  // const [clients] = useState([
  //   {
  //     id: 1,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Approved",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  //   {
  //     id: 2,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Rejected",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  //   {
  //     id: 3,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Approved",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  //   {
  //     id: 4,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Rejected",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  //   {
  //     id: 5,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Approved",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  //   {
  //     id: 6,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Rejected",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  //   {
  //     id: 7,
  //     name: "James Carter",
  //     company: "Graphite Solutions",
  //     phone: "‪+1 202 555 0143‬",
  //     status: "Approved",
  //     date: "11-02-2025",
  //     amount: "$100",
  //   },
  // ]);
  const { data } = useDataContext();
  const quotations = data?.quotations || [];
   const users = data?.users || [];
   const totalClients = users.length;
   const approvedQuotation = quotations.filter(quo => quo.status === 'completed').length
   const rejectedQuotation = quotations.filter(quo => quo.status === 'rejected').length
   const totalQuotationValue  = quotations.reduce((acc, quo) => { return quo.totalAmount + acc}, 0)

  
   



  return(
   
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Client List
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all your clients
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Brown"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Brown Martin</p>
              <p className="text-xs text-gray-500">@brown.m</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Clients</span>
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857..."
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalClients}</div>
          <div className="text-sm text-gray-500 mt-1">+2% vs last week</div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Approved Quotation</span>
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2..."
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{approvedQuotation}</div>
          <div className="text-sm text-gray-500 mt-1">+2% vs last week</div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Reject Quotation</span>
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
              <X className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{rejectedQuotation}</div>
          <div className="text-sm text-gray-500 mt-1">+2% vs last week</div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Value</span>
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657..."
                />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalQuotationValue}</div>
          <div className="text-sm text-gray-500 mt-1">+2% vs last week</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <span>Demo</span>
            <span className="text-gray-400">Go to demo</span>
            <X className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <span>Status</span>
            <span className="text-gray-400">Approved</span>
            <X className="w-4 h-4" />
          </button>

          <div className="relative w-full sm:w-auto sm:ml-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
        {quotations.length <1 ? <NoClientAdded /> : (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
           
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Company name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {quotations.map((client) => {
                const customer = client.customerDetails;
                

                return (
                  <tr key={client._id} className="hover:bg-gray-50">
                    {console.log(customer.customerName)}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {customer.customerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {customer.companyName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {customer.phoneNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          client.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {client.totalAmount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
       
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex flex-wrap gap-3 items-center justify-between">
          <div className="text-sm text-gray-600">
            Show <span className="font-medium">10</span> of{" "}
            <span className="font-medium">800 Result</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              &lt;
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              3
            </button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
              &gt;
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
      )
       
}
