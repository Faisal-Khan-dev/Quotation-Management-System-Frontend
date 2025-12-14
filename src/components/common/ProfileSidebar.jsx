import React, { useState } from "react";
import {
  User,
  Settings,
  ChevronRight,
  ChevronDown,
  Bell,
  MessageCircle,
  Info,
  LogOut,
  Menu,
  X,
  BookDashedIcon,
} from "lucide-react";
import Userimg from "../../assets/images/profileImg.png";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const ProfileSidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {logout, getUserDetails} = useAuthContext();
  const userData = getUserDetails();

  const MenuItem = ({ icon, label, link, hasArrow = true }) => (
    <Link
      to={link}
      className="w-full flex items-center justify-between p-3 pb-[5px] rounded-lg 
      text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <span className="text-xl">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      {hasArrow && <ChevronRight className="w-5 h-5 text-gray-400" />}
    </Link>
  );

  const navigationItems = [
    { id: 1, icon: <BookDashedIcon className="w-5 h-5" />, label: "Dashboard", link: "/dashboard", hasArrow: true },
    { id: 1, icon: <User className="w-5 h-5" />, label: "My Profile", link: "/profile", hasArrow: true },
    { id: 3, icon: <Bell className="w-5 h-5" />, label: "Notifications", link: "/notifications", hasArrow: true },
    { id: 4, icon: <MessageCircle className="w-5 h-5" />, label: "FAQ", link: "/faq", hasArrow: true },
    { id: 5, icon: <Info className="w-5 h-5" />, label: "About App", link: "/about", hasArrow: true },
    { id: 2, icon: <Settings className="w-5 h-5" />, label: "Settings", isDropdown: true },
  ];

  const settingsItems = [
    { id: 1, label: "Account", link: "/settings/account" },
    { id: 2, label: "Privacy", link: "/settings/privacy" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`sticky top-0 left-0 h-screen bg-white shadow-xl w-[255px] flex flex-col p-4 
        font-sans transition-transform duration-300 z-40 sm:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:block`}
      >
        {/* Profile Header Link */}
        <Link
          to="/profile"
          className="flex items-center space-x-[10px] mt-[10px] mb-[38px] pb-[5px] 
          ml-4 sm:ml-4 cursor-pointer"
        >
          <img className="w-12 h-12 rounded-full object-cover" src={userData?.profileImage} alt="Profile" />
          <div className="flex flex-col">
            <p className="text-base font-semibold text-gray-800">{userData?.name}</p>
            <p className="text-xs text-gray-500">{userData?.email}</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-grow space-y-[38px]">
          {navigationItems.map((item) => (
            <div key={item.id}>
              {item.isDropdown ? (
                <div>
                  <button
                    className="w-full flex items-center justify-between p-3 pb-[5px] rounded-lg 
                    text-gray-700 hover:bg-gray-50 transition duration-150 cursor-pointer"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <div className="flex items-center space-x-4">
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transform transition duration-200 
                      ${isSettingsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Items */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out 
                    ${isSettingsOpen ? "max-h-40" : "max-h-0"}`}
                  >
                    {settingsItems.map((settingItem) => (
                      <Link
                        key={settingItem.id}
                        to={settingItem.link}
                        className="w-full block text-left pl-12 py-2 pb-[5px] 
                        text-sm text-gray-600 hover:bg-gray-100 transition duration-150"
                      >
                        {settingItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <MenuItem
                  icon={item.icon}
                  label={item.label}
                  link={item.link}
                  hasArrow={item.hasArrow}
                />
              )}
              <hr className="border-gray-200 mx-2" />
            </div>
          ))}
        </nav>

        {/* Logout Link */}
        <div className="mt-auto pt-4 mb-[46px] border-gray-200 pb-[5px] sm:mb-[146px]">
          <p
          onClick={logout}
          to="#"
            className="w-full flex items-center p-3 pb-[5px] rounded-lg text-gray-700 
            hover:bg-red-50 hover:text-red-600 transition duration-150"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-4 text-sm">Logout</span>
          </p>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileSidebar;
