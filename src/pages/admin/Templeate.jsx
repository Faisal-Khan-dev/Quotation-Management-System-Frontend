import React from "react";
import img1 from "../../assets/images/tem1.png";
import img2 from "../../assets/images/tem2.png";
import img3 from "../../assets/images/tem3.png";
import img4 from "../../assets/images/tem4.png";
import img5 from "../../assets/images/tem5.png";
import img6 from "../../assets/images/tem6.png";
import img7 from "../../assets/images/tem7.png";
import img8 from "../../assets/images/tem8.png";
import AccessError from "../../components/ErrorsModal/AccessError";
import { useAuthContext } from "../../context/AuthContext";
import TempErro from "../../components/ErrorsModal/TempErro";

// Array of template images
const images = [
  { id: 1, src: img1 },
  { id: 2, src: img2 },
  { id: 3, src: img3 },
  { id: 4, src: img4 },
  { id: 5, src: img5 },
  { id: 6, src: img6 },
  { id: 7, src: img7 },
  { id: 8, src: img8 },
];

const Template = () => {
  const { getUserDetails } = useAuthContext();
  const userData = getUserDetails();

  return (
    <section className="p-4 md:p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6">Templates</h1>
      {images.length < 1 ? <TempErro /> : 
      userData?.role === "staff" ? (
        <AccessError />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((item) => (
            <div key={item.id} className="w-full">
              <img
                src={item.src}
                alt={`Template ${item.id}`}
                className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-all"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Template;
