import React from "react";
import Login from "./pages/Forms/Login";
import Signup from "./pages/Forms/Signup";
import { Routes, Route } from "react-router-dom";
import ClientDashboard from "./pages/admin/ClientList";
import UserManagement from "./pages/admin/UserManagement";
import NewInvoice from "./pages/admin/NewInvoice";
import Template from "./pages/admin/Templeate";
import Setting from "./pages/admin/profile/Setting";
import Profile from "./pages/admin/profile/Profile";
import About from "./pages/admin/profile/About";
import Notification from "./pages/admin/profile/Notification";
import FAQs from "./pages/admin/profile/FAQ";
import Layout from "./pages/Layout";
import Dashboard from "./pages/admin/Dashboard";
import QuotationHistory from "./pages/admin/QuotationHistory";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <>
    <ToastContainer />
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* Public Routes */}
         <Route path="new-invoice/:invoiceId" element={<NewInvoice />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected/Admin Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/client-list" element={<ClientDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/new-invoice" element={<NewInvoice />} />
            <Route path="/template" element={<Template />} />
            <Route path="/quotation-history" element={<QuotationHistory />} />
          </Route>
          <Route path="/notifications" element={<Notification />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/about" element={<About />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </DataProvider>
    </AuthProvider>
    </>
  );
};

export default App;
