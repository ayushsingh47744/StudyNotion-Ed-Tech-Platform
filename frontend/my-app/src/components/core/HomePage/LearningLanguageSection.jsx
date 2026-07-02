import React, { useEffect, useRef, useState } from "react";
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div>
      <div className="text-4xl font-semibold text-center my-10">
        Your swiss knife for
        <HighlightText text={"learning any language"} />
        <div className="text-center text-richblack-300 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div
          ref={sectionRef}
          className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0"
        >
          <img
            src={Know_your_progress}
            alt=""
            className={`object-contain lg:-mr-32 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isInView ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
          <img
            src={Compare_with_others}
            alt=""
            className={`object-contain lg:-mb-10 lg:-mt-0 -mt-12 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-150 ${
              isInView ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
          <img
            src={Plan_your_lessons}
            alt=""
            className={`object-contain lg:-ml-36 lg:-mt-5 -mt-16 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-300 ${
              isInView ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          />
        </div>
      </div>

      <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
        <CTAButton active={true} linkto={"/signup"}>
          <div className="">Learn More</div>
        </CTAButton>
      </div>
    </div>
  );
};

export default LearningLanguageSection;