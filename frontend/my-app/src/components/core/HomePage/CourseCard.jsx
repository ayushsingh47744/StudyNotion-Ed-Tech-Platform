import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData?.heading;

  return (
    <div
      className={`w-[360px] lg:w-[30%] rounded-2xl overflow-hidden transition-all duration-300 ease-out cursor-pointer border ${
        isActive
          ? "bg-richblack-800 border-richblack-500 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] -translate-y-1"
          : "bg-richblack-800 border-richblack-700 hover:-translate-y-1 hover:border-richblack-500"
      } text-richblack-25 h-[300px] box-border`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-[2px] border-richblack-400/40 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div className="text-yellow-50 font-semibold text-[20px] transition-colors duration-300">
          {cardData?.heading}
        </div>

        <div className="text-richblack-300 text-[15px] leading-6">
          {cardData?.description}
        </div>
      </div>

      <div className="flex justify-between text-richblack-200 px-6 py-3 font-medium transition-colors duration-300">
        {/* Level */}
        <div className="flex items-center gap-2 text-[15px]">
          <HiUsers className="text-yellow-50" />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-2 text-[15px]">
          <ImTree className="text-yellow-50" />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;