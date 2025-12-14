import { useState } from "react";
import Userimg from "../../../assets/images/profileImg.png";
import ProfileSidebar from "../../../components/common/ProfileSidebar";
import { useAuthContext } from "../../../context/AuthContext";
import { base_url } from "../../../services/config";
import axios from "axios";

const Profile = () => {
  const { getUserDetails } = useAuthContext();
  const userData = getUserDetails();
  console.log("user Data ==>", userData);

  const [formData, setFormData] = useState({
    fullName: userData?.name,
    companyName: userData?.companyName,
    email: userData?.email,
    mobile: userData?.phoneNumber,
    gender: userData?.gender,
    profileImage: userData?.profileImage,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderSelect = (gender) => {
    if (isEditing) {
      setFormData((prev) => ({
        ...prev,
        gender: gender,
      }));
    }
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();

 
console.log("formData ==>", formData);

  const form = new FormData();
  form.append("id", userData.role === 'admin' ? userData.companyId : userData.staffId);
  form.append("role", userData.role);
  form.append("name", formData.fullName);
  form.append("email", formData.email);
  form.append("gender", formData.gender);

  // ONLY append file if actual file selected
  if (formData.profileImageFile) {
    form.append("profileImage", formData.profileImageFile);
  }

  try {
    const res = await axios.put(
      `${base_url}/auth/update-profile`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("UPDATE RESULT ==>", res.data);

    alert("Profile Updated Successfully");
    setIsEditing(false);

  } catch (error) {
    console.log("ERROR ===>", error);
    alert(error.response?.data?.message || "Update failed");
  }
};


  const handleEditToggle = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex">
      <ProfileSidebar />

      <div className="ml-6 flex justify-center items-start min-h-screen">
        <div className="rounded-lg w-full max-w-[740px] mx-auto ">
          <div className="h-full flex my-[32px] flex-col gap[50px]">
            {/* Upload Photo Section */}
            <div className="mb-[50px]">
              <div className="flex items-center gap-[12px]">
                {/* Profile Photo */}
                <div className="relative">
                  {console.log("form Data ==>", formData)}
                  <div className="flex items-center justify-center overflow-hidden">
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "84.84px",
                        opacity: 1,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Upload Info */}
                <div className="flex-1 my-[38px] gap-[12px]">
                  <button
                    disabled={!isEditing}
                    onClick={() =>
                      document.getElementById("profileUpload").click()
                    }
                    className={`text-[16px] border rounded-lg px-4 py-2 transition duration-200 
    ${
      isEditing
        ? "text-blue-500 border-gray-300 hover:bg-gray-50"
        : "text-gray-400 border-gray-200 cursor-not-allowed"
    }
  `}
                  >
                    Upload new photo
                  </button>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profileUpload"
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        profileImageFile: e.target.files[0],
                        profileImage: URL.createObjectURL(e.target.files[0]),
                      }))
                    }
                  />

                  <p className="text-[14px] text-gray-600 mt-2">
                    At least 800x800 px recommended.
                    <br />
                    JPG or PNG is allowed
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[50px] gap-x-20 mb-[50px]">
                {/* Full Name */}
                <div>
                  <label className="block text-[16px] font-bold text-gray-700 mb-[9px]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
    w-[326px] 
    h-[46px]
    pl-[18px] 
    pr-[30px] 
    py-[12px]
    text-[16px]
    border border-gray-300 
    rounded-[10px]
    opacity-100
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    outline-none transition duration-200 
    disabled:bg-gray-100 disabled:text-gray-500
  "
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-[16px] font-bold text-gray-700 mb-[9px]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
    w-[326px] 
    h-[46px]
    pl-[18px] 
    pr-[30px] 
    py-[12px]
    text-[16px]
    border border-gray-300 
    rounded-[10px]
    opacity-100
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    outline-none transition duration-200 
    disabled:bg-gray-100 disabled:text-gray-500
  "
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[16px] font-bold text-gray-700 mb-[9px]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="
    w-[326px] 
    h-[46px]
    pl-[18px] 
    pr-[30px] 
    py-[12px]
    text-[16px]
    border border-gray-300 
    rounded-[10px]
    opacity-100
    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
    outline-none transition duration-200 
    disabled:bg-gray-100 disabled:text-gray-500
  "
                  />
                </div>
              </div>

              {/* Gender Section - Button Style */}
              <div className="mb-[50px]">
                <label className="block text-[16px] font-bold text-gray-700 mb-[9px]">
                  Gender
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("male")}
                    className={`px-6 py-3 border rounded-lg transition duration-200 font-medium ${
                      formData.gender === "male"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : `border-gray-300 text-gray-700 ${
                            isEditing ? "hover:bg-gray-50" : ""
                          }`
                    } ${!isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={!isEditing}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenderSelect("female")}
                    className={`px-6 py-3 border rounded-lg transition duration-200 font-medium ${
                      formData.gender === "female"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : `border-gray-300 text-gray-700 ${
                            isEditing ? "hover:bg-gray-50" : ""
                          }`
                    } ${!isEditing ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={!isEditing}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Save Changes / Update Button - Centered */}
              <div className="mt-auto flex justify-center">
                {isEditing && (
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </form>

            {!isEditing && (
  <div className="mt-auto flex justify-center">
    <button
      type="button"
      onClick={handleEditToggle}
      className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
    >
      Update
    </button>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
