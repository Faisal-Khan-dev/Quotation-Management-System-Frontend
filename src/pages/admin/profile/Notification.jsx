import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import ProfileSidebar from "../../../components/common/ProfileSidebar";
import DefaultImg from "../../../assets/images/profileImg.png";

const Notification = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/quotation/get-notifications"
        );

        const formatted = res.data.notifications.map((n) => ({
          img: DefaultImg, // fallback image
          name: n.userId?.name || "Unknown Staff",
          text: "filled the quotation form",
          time: new Date(n.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setNotifications(formatted);
      } catch (err) {
        console.log("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="w-full max-w-[1092px] h-auto my-[32px] mx-auto relative px-4">
        <div className="flex flex-col">
          <h1 className="text-center text-[25px] font-[700] mb-[8px]">
            Notifications
          </h1>

          <p className="text-gray-600 font-medium text-[16px] mb-[18px]">
            You have{" "}
            <span className="text-blue-600 font-medium">
              {notifications.length} notifications
            </span>{" "}
            today.
          </p>

          <div className="flex flex-col gap-[38px] relative">
            {notifications.map((item, index) => (
              <div
                key={index}
                ref={wrapperRef}
                className="flex items-center justify-between w-full relative 
                           max-sm:flex-col max-sm:items-start max-sm:gap-2"
              >
                <div className="flex items-center gap-[12px]">
                  <img
                    src={item.img}
                    className="w-[57px] h-[57px] rounded-full object-cover"
                  />

                  <div>
                    <p className="text-[18px] font-medium">
                      {item.name}
                      <span className="text-gray-600 font-normal">
                        , {item.text}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[18px]">{item.time}</p>
                  </div>
                </div>

                <div className="max-sm:mt-2">
                  {openMenu === index ? (
                    <button
                      onClick={() => setOpenMenu(null)}
                      className="absolute right-0 top-6 bg-white shadow-lg border border-grey rounded-md px-[26px] py-[6px] font-[700] text-[16px] cursor-pointer hover:bg-gray-100 transition"
                    >
                      Delete
                    </button>
                  ) : (
                    <div
                      onClick={() => setOpenMenu(index)}
                      className="cursor-pointer"
                    >
                      <MoreVertical className="text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
