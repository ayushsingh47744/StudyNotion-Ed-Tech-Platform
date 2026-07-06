import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Image and Video Import
import Banner from "../assets/Images/Background1.png";
// Component Imports
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HighlightText from "../components/core/HomePage/HighlightText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-between text-white">
        {/* Hero with background image */}
        <div className="relative flex w-full flex-col items-center overflow-hidden">
          {/* Background Image */}
          <img
            src={Banner}
            alt="banner"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-richblack-900/70" />

          {/* Foreground Content */}
          <div className="relative z-10 mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-8 pb-28 pt-16">
            {/* Become a Instructor Button */}
            <Link to={"/signup"}>
              <div className="group mx-auto w-fit rounded-full bg-richblack-800/80 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] backdrop-blur-sm transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                  <p>Become an Instructor</p>
                  <FaArrowRight />
                </div>
              </div>
            </Link>

            {/* Heading */}
            <div className="hero-slide-in-left text-center text-4xl font-semibold">
              Empower Your Future with
              <HighlightText text={"Coding Skills"} />
            </div>

            {/* Sub Heading */}
            <div className="hero-slide-in-right -mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and
              personalized feedback from instructors.
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-row gap-7">
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Book a Demo
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
          {/* Code Section 1  */}
          <div>
            <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className="text-4xl font-semibold">
                  Unlock your
                  <HighlightText text={"coding potential"} /> 
                  with our online courses.
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btnText: "Try it Yourself",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-yellow-25"}
              codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
              backgroundGradient={<div className="codeblock1 absolute"></div>}
            />
          </div>

          {/* Code Section 2 */}
          <div>
            <CodeBlocks
              position={"lg:flex-row-reverse"}
              heading={
                <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                  Start
                  <HighlightText text={"coding in seconds"} />
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btnText: "Continue Lesson",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                btnText: "Learn More",
                link: "/signup",
                active: false,
              }}
              codeColor={"text-white"}
              codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
              backgroundGradient={<div className="codeblock2 absolute"></div>}
            />
          </div>

          {/* Explore Section */}
          <ExploreMore />
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative z-0 -mt-16 lg:-mt-32 bg-gradient-to-b from-[#02040a] via-[#0b1d3a] to-[#02040a] text-richblack-5">
        <div className="homepage_bg relative h-[320px] overflow-hidden">
          {/* Top fade overlay - blends pattern into the section above */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-richblack-900/60 to-transparent" />

          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[60px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          {/* Bottom fade overlay - blends pattern into the section below */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02040a]/60 to-transparent" />
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-8 flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold text-richblack-5 lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px] text-richblack-300">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviews from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;