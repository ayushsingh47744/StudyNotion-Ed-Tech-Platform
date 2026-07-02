// import React from "react";
// import { FooterLink2 } from "../../data/footer-links";
// import { Link } from "react-router-dom";

// // Images
// import Logo from "../../assets/Logo/Logo-Full-Light.png";

// // Icons
// import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
// const Resources = [
//   "Articles",
//   "Blog",
//   "Chart Sheet",
//   "Code challenges",
//   "Docs",
//   "Projects",
//   "Videos",
//   "Workspaces",
// ];
// const Plans = ["Paid memberships", "For students", "Business solutions"];
// const Community = ["Forums", "Chapters", "Events"];

// // Paths that actually exist as routes in App.jsx
// const REAL_ROUTES = ["about", "contact"];

// // Helper to render either a real Link or inert text
// const FooterItem = ({ label, path }) => {
//   const isRealRoute = REAL_ROUTES.includes(path);
//   return isRealRoute ? (
//     <Link to={`/${path}`}>{label}</Link>
//   ) : (
//     <span className="cursor-default opacity-70">{label}</span>
//   );
// };

// const Footer = () => {
//   return (
//     <div className="bg-richblack-800">
//       <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
//         <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
//           {/* Section 1 */}
//           <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
//             <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
//               <img src={Logo} alt="" className="object-contain" />
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Company
//               </h1>
//               <div className="flex flex-col gap-2">
//                 {["About", "Careers", "Affiliates"].map((ele, i) => {
//                   const path = ele.toLowerCase();
//                   return (
//                     <div
//                       key={i}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <FooterItem label={ele} path={path} />
//                     </div>
//                   );
//                 })}
//               </div>
//               <div className="flex gap-3 text-lg">
//                 <FaFacebook />
//                 <FaGoogle />
//                 <FaTwitter />
//                 <FaYoutube />
//               </div>
//               <div></div>
//             </div>

//             <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Resources
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Resources.map((ele, index) => {
//                   const path = ele.split(" ").join("-").toLowerCase();
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <FooterItem label={ele} path={path} />
//                     </div>
//                   );
//                 })}
//               </div>

//               <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
//                 Support
//               </h1>
//               <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
//                 <FooterItem label="Help Center" path="help-center" />
//               </div>
//             </div>

//             <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//               <h1 className="text-richblack-50 font-semibold text-[16px]">
//                 Plans
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Plans.map((ele, index) => {
//                   const path = ele.split(" ").join("-").toLowerCase();
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <FooterItem label={ele} path={path} />
//                     </div>
//                   );
//                 })}
//               </div>
//               <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
//                 Community
//               </h1>

//               <div className="flex flex-col gap-2 mt-2">
//                 {Community.map((ele, index) => {
//                   const path = ele.split(" ").join("-").toLowerCase();
//                   return (
//                     <div
//                       key={index}
//                       className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                     >
//                       <FooterItem label={ele} path={path} />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Section 2 */}
//           <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
//             {FooterLink2.map((ele, i) => {
//               return (
//                 <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
//                   <h1 className="text-richblack-50 font-semibold text-[16px]">
//                     {ele.title}
//                   </h1>
//                   <div className="flex flex-col gap-2 mt-2">
//                     {ele.links.map((link, index) => {
//                       const path = link.link?.replace(/^\//, "") || "";
//                       return (
//                         <div
//                           key={index}
//                           className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                         >
//                           <FooterItem label={link.title} path={path} />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
//         {/* Section 1 */}
//         <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
//           <div className="flex flex-row">
//             {BottomFooter.map((ele, i) => {
//               const path = ele.split(" ").join("-").toLowerCase();
//               return (
//                 <div
//                   key={i}
//                   className={` ${
//                     BottomFooter.length - 1 === i
//                       ? ""
//                       : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
//                   } px-3 `}
//                 >
//                   <FooterItem label={ele} path={path} />
//                 </div>
//               );
//             })}
//           </div>

//           <div className="text-center">Made By Ayush Singh</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";

const BottomFooter = [
  { title: "About Us", link: "/about" },
  { title: "Contact Us", link: "/contact" },
];

// Only these routes actually exist in App.jsx
const REAL_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
  "/pricing",
  "/help-center",
  "/tutorials",
];

const FooterItem = ({ label, path }) => {
  const isRealRoute = REAL_ROUTES.includes(path);
  return isRealRoute ? (
    <Link to={path} className="hover:text-white transition">
      {label}
    </Link>
  ) : (
    <span className="cursor-default opacity-50">{label}</span>
  );
};

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-300">
      {/* Top Section */}
      <div className="w-11/12 max-w-7xl mx-auto py-14 flex flex-col lg:flex-row gap-10">

        {/* Brand Section — wider, takes ~35% */}
        <div className="lg:w-[35%] shrink-0">
          <Link to="/" className="inline-block mb-6">
            <img src={Logo} alt="StudyNotion" className="w-40" />
          </Link>
          <p className="text-sm leading-6 mb-4 max-w-xs">
            Empowering learners to build skills, create projects, and accelerate their careers.
          </p>
        </div>

        {/* Right Columns — 4 cols evenly spaced */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">

          {/* Socials */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider">Socials</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition">YouTube</a></li>
              <li><a href="https://www.linkedin.com/in/ayush-singh-00077433b/" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="https://github.com/ayushsingh47744" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterItem label="Privacy Policy" path="/privacy-policy" /></li>
              <li><FooterItem label="Terms of Service" path="/terms-of-service" /></li>
              <li><FooterItem label="Refund Policy" path="/refund-policy" /></li>
            </ul>
          </div>

          {/* Register */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider">Register</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterItem label="Sign Up" path="/signup" /></li>
              <li><FooterItem label="Login" path="/login" /></li>
              <li><FooterItem label="Pricing" path="/pricing" /></li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 tracking-wider">Pages</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterItem label="Home" path="/" /></li>
              <li><FooterItem label="Courses" path="/" /></li>
              <li><FooterItem label="Tutorials" path="/tutorials" /></li>
              <li><FooterItem label="Help" path="/help-center" /></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Divider + Bottom Bar */}
      <div className="border-t border-richblack-700">
        <div className="w-11/12 max-w-7xl mx-auto py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-wrap items-center gap-6">
            {BottomFooter.map((item, index) => (
              <FooterItem key={index} label={item.title} path={item.link} />
            ))}
          </div>
          <div>Made with ❤️ © {new Date().getFullYear()} StudyNotion</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;