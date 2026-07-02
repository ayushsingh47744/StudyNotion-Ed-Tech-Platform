import React, { useEffect, useRef, useState } from "react";
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Teacher.png";
import HighlightText from "./HighlightText";

const InstructorSection = () => {
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    const currentRef = imageRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-center gap-32">
        
        {/* Left Side - Image */}
        <div className="lg:w-[50%]" ref={imageRef}>
          <img
            src={Instructor}
            alt="Instructor"
            className={`shadow-richblack-700 shadow-[-8px_-8px_0_0] rounded-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isInView ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </div>

        {/* Right Side - Content */}
        <div className="lg:w-[50%] flex flex-col gap-10">
          <h1 className="text-4xl font-semibold lg:w-[70%]">
            Become an
            <HighlightText text={" instructor"} />
          </h1>

          <p className="font-medium text-[16px] text-richblack-300 text-justify w-[90%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructorSection;