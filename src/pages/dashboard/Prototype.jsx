import React, { useState } from "react";
import plus_icon from "/images/icons/plus.png";
import Prototypes from "../../components/prototype/Prototypes";
import LandTitle from "../../components/landTitle/LandTitle";
import LandSize from "../../components/landsize/LandSize";
import Category from "../../components/category/Category";
import Features from "../../components/features/Features";

const Prototype = () => {
  const navItems = [
    { label: "Prototypes", component: <Prototypes /> },
    { label: "Land Title", component: <LandTitle /> },
    { label: "Land Size", component: <LandSize/> },
    { label: "Category", component: <Category /> },
    { label: "Features", component: <Features/> },
    { label: "Documents", component: <div>Payments Content</div> },
    { label: "Videos", component: <div>Settings Content</div> },
    { label: "Banners / Images", component: <div>Settings Content</div> },
    { label: "Directions", component: <div>Settings Content</div> },
    { label: "Map Link", component: <div>Settings Content</div> },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative top-14 pb-10">
      <div className="mt-5">
        <div className="grid grid-cols-[1fr_3fr] gap-4">
          {/* Side Nav */}
          <div className="bg-gray-100 p-4 rounded-md h-fit">
            <ul className="flex flex-col gap-2">
              
              {navItems.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <li key={item.label}>
                    
                    <button
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-[#b0b2c359] border border-[#B0B2C3]"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <img src={plus_icon} alt="Plus Icon" className="w-5 h-5 mr-2" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Content */}
          <div className="bg-white p-4 rounded-md shadow">
            {navItems[activeIndex].component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prototype;
