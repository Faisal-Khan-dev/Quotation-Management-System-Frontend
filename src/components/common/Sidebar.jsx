import { NavLink, Link } from "react-router-dom";
import { Users, FileText, LayoutDashboard, UserPlus, Plus, ChevronLeft, History } from "lucide-react";
import Logo from "../../assets/images/logo.png";
import LogoText from "../../assets/images/logo 2.png";
import { useAuthContext } from "../../context/AuthContext";

const PROFILE_IMAGE_URL = "https://i.ibb.co/L9LzK2b/brown-martin.png";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const {getUserDetails} = useAuthContext()
  const userData = getUserDetails();

  console.log("userData ==>", userData);
  
  return (
    <aside
      className={`
    bg-white shadow-lg flex flex-col h-screen overflow-hidden border-r border-gray-200 sticky top-0
    z-50 transition-transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0
    w-[255px]
  `}
    >



      {/* TOP SECTION */}
      <div className="flex justify-between items-center mt-7 mb-4 px-4">
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-9 h-9" alt="Logo" />
          <img src={LogoText} className="h-6" alt="Logo Text" />
        </div>

        <button className="sm:hidden" onClick={closeSidebar}>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <hr className="border-gray-300 mb-3" />

      {/* NAVIGATION */}
      <nav className="flex flex-col flex-grow px-2 space-y-1">

        <NavLink
          to="/new-invoice"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-md font-medium mx-2 shadow-sm transition-all
            ${isActive ? "bg-[#22272B] text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`
          }
        >
          <Plus className="w-5 h-5" /> Create Quotation
        </NavLink>

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-md font-medium mx-2 transition-colors
            ${isActive ? "bg-[#22272B] text-white" : "text-gray-700 hover:bg-gray-100"}`
          }
        >
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </NavLink>

        {[{ to: "/client-list", icon: Users, label: "Client List" },
        { to: "/template", icon: FileText, label: "Templates" },
        { to: "/user-management", icon: UserPlus, label: "User Management" },
        { to: "/quotation-history", icon: History, label: "Quotation History" }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-md font-medium mx-2 transition-colors
                ${isActive ? "bg-[#22272B] text-white" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <Icon className="w-5 h-5" /> {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* PROFILE */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <Link to="/profile" className="flex items-center cursor-pointer">
          <img
            src={userData?.profileImage}
            className="w-10 h-10 rounded-full object-cover mr-3"
            alt="Profile"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">{userData?.name}</p>
            <p className="text-xs text-gray-500">Business owner</p>
          </div>
        </Link>
      </div>


    </aside>
  );
};

export default Sidebar;
