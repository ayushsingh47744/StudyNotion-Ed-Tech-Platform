// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";

// import { FaStar } from "react-icons/fa";
// import { Autoplay } from "swiper/modules";

// import { apiConnector } from "../../services/apiConnector";
// import { ratingsEndpoints } from "../../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const truncateWords = 15;

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await apiConnector(
//           "GET",
//           ratingsEndpoints.REVIEWS_DETAILS_API
//         );

//         if (data?.success) {
//           setReviews(data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <div className="w-full text-white">
//       <div className="mx-auto my-12 w-11/12 max-w-[1200px]">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={24}
//           loop={reviews.length > 4}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay]}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {reviews.map((review, index) => (
//             <SwiperSlide key={index}>
//               <div className="group relative h-[260px] overflow-hidden rounded-2xl bg-gradient-to-b from-richblack-700 to-richblack-800 p-[1.5px] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(255,214,10,0.18)]">
//                 {/* gradient border, subtle by default, glows on hover */}
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-100/20 via-transparent to-yellow-100/20 opacity-40 transition-opacity duration-500 group-hover:opacity-100" />

//                 <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-richblack-800 p-5">
//                   {/* top accent bar */}
//                   <div className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-yellow-50 to-yellow-100 transition-all duration-500 ease-out group-hover:w-full" />

//                   <div className="flex items-center gap-3">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review.user.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt="user"
//                       className="h-11 w-11 rounded-full object-cover ring-2 ring-richblack-600 transition-all duration-500 group-hover:scale-105 group-hover:ring-yellow-100"
//                     />

//                     <div>
//                       <p className="font-semibold text-richblack-5 transition-colors duration-300 group-hover:text-yellow-50">
//                         {review?.user?.firstName} {review?.user?.lastName}
//                       </p>

//                       <p className="text-xs text-richblack-400">
//                         {review?.course?.courseName}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="text-sm leading-relaxed text-richblack-25">
//                     {review?.review?.split(" ").length > truncateWords
//                       ? `${review.review
//                           .split(" ")
//                           .slice(0, truncateWords)
//                           .join(" ")}...`
//                       : review?.review}
//                   </p>

//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, starIndex) => (
//                       <FaStar
//                         key={starIndex}
//                         className={`transition-all duration-300 ease-out group-hover:scale-125 ${
//                           starIndex < Math.round(review?.rating)
//                             ? "text-yellow-100"
//                             : "text-richblack-500"
//                         }`}
//                         style={{ transitionDelay: `${starIndex * 50}ms` }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";

// import { FaStar, FaQuoteRight } from "react-icons/fa";
// import { Autoplay } from "swiper/modules";

// import { apiConnector } from "../../services/apiConnector";
// import { ratingsEndpoints } from "../../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const truncateWords = 15;

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await apiConnector(
//           "GET",
//           ratingsEndpoints.REVIEWS_DETAILS_API
//         );

//         if (data?.success) {
//           setReviews(data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <div className="w-full text-white">
//       <div className="mx-auto my-12 w-11/12 max-w-[1200px]">
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={28}
//           loop={reviews.length > 4}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[Autoplay]}
//           breakpoints={{
//             640: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {reviews.map((review, index) => (
//             <SwiperSlide key={index}>
//               <div className="group relative h-[270px] overflow-hidden rounded-2xl bg-gradient-to-b from-richblack-700/80 to-richblack-800 p-[1px] shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(255,214,10,0.25)]">
//                 {/* soft glowing border, brightens on hover */}
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-100/10 via-transparent to-yellow-50/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

//                 {/* subtle sheen sweep on hover */}
//                 <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
//                   <div className="absolute -inset-y-10 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-700 ease-out group-hover:left-[130%]" />
//                 </div>

//                 <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-richblack-800/95 p-6 backdrop-blur-sm">
//                   {/* top accent bar */}
//                   <div className="absolute left-0 top-0 h-[2.5px] w-0 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 transition-all duration-500 ease-out group-hover:w-full" />

//                   {/* quote icon watermark */}
//                   <FaQuoteRight className="absolute right-5 top-5 text-2xl text-richblack-700 opacity-40 transition-all duration-500 group-hover:text-yellow-100/20" />

//                   <div className="flex items-center gap-3">
//                     <img
//                       src={
//                         review?.user?.image
//                           ? review.user.image
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                       }
//                       alt="user"
//                       className="h-11 w-11 rounded-full object-cover shadow-md ring-2 ring-richblack-600 transition-all duration-500 ease-out group-hover:scale-105 group-hover:ring-yellow-100/80"
//                     />

//                     <div>
//                       <p className="font-semibold tracking-wide text-richblack-5 transition-colors duration-300 group-hover:text-yellow-50">
//                         {review?.user?.firstName} {review?.user?.lastName}
//                       </p>

//                       <p className="text-xs font-light text-richblack-400">
//                         {review?.course?.courseName}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="relative pl-3 text-sm italic leading-relaxed tracking-wide text-richblack-100 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-full before:bg-yellow-100/30 before:transition-all before:duration-500 group-hover:before:bg-yellow-100">
//                     "
//                     {review?.review?.split(" ").length > truncateWords
//                       ? `${review.review
//                           .split(" ")
//                           .slice(0, truncateWords)
//                           .join(" ")}...`
//                       : review?.review}
//                     "
//                   </p>

//                   <div className="flex items-center justify-between border-t border-richblack-700 pt-3">
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, starIndex) => (
//                         <FaStar
//                           key={starIndex}
//                           className={`text-sm transition-all duration-300 ease-out group-hover:scale-125 ${
//                             starIndex < Math.round(review?.rating)
//                               ? "text-yellow-100 drop-shadow-[0_0_4px_rgba(255,214,10,0.4)]"
//                               : "text-richblack-600"
//                           }`}
//                           style={{ transitionDelay: `${starIndex * 60}ms` }}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-xs font-medium uppercase tracking-wider text-richblack-500 transition-colors duration-300 group-hover:text-yellow-100">
//                       {review?.rating || 0}.0 rating
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;


import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { FaStar, FaQuoteRight } from "react-icons/fa";
import { Autoplay } from "swiper/modules";

import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

const getRatingLabel = (rating) => {
  const r = Math.round(rating || 0);
  if (r >= 5) return "Excellent";
  if (r === 4) return "Very Good";
  if (r === 3) return "Good";
  if (r === 2) return "Average";
  return "Poor";
};

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        if (data?.success) {
          setReviews(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="w-full text-white">
      <div className="mx-auto my-12 w-11/12 max-w-[1200px]">
        <Swiper
          slidesPerView={1}
          spaceBetween={28}
          loop={reviews.length > 4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="group relative h-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-richblack-700/80 to-richblack-800 p-[1px] shadow-[0_0_40px_-5px_rgba(56,189,248,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_0_60px_-5px_rgba(56,189,248,0.35)]">
                {/* soft glowing border, brightens on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/10 via-transparent to-yellow-100/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                {/* subtle sheen sweep on hover */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute -inset-y-10 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all duration-700 ease-out group-hover:left-[130%]" />
                </div>

                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-richblack-800/95 p-6 backdrop-blur-sm">
                  {/* top accent bar */}
                  <div className="absolute left-0 top-0 h-[2.5px] w-0 bg-gradient-to-r from-sky-400 via-yellow-100 to-sky-400 transition-all duration-500 ease-out group-hover:w-full" />

                  {/* quote icon watermark */}
                  <FaQuoteRight className="absolute right-5 top-5 text-4xl text-richblack-700 opacity-60 transition-all duration-500 group-hover:text-yellow-100/25" />

                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.image
                          ? review.user.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt="user"
                      className="h-11 w-11 rounded-full object-cover shadow-md ring-2 ring-richblack-600 transition-all duration-500 ease-out group-hover:scale-105 group-hover:ring-yellow-100/80"
                    />

                    <div>
                      <p className="font-semibold tracking-wide text-richblack-5 transition-colors duration-300 group-hover:text-yellow-50">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </p>

                      <p className="text-xs font-light text-richblack-400">
                        Student
                      </p>

                      <p className="mt-1 inline-block rounded-full bg-richblack-700 px-2 py-[2px] text-[10px] font-medium tracking-wide text-yellow-100">
                        {review?.course?.courseName}
                      </p>
                    </div>
                  </div>

                  <p className="relative mt-4 pl-3 text-sm italic leading-relaxed tracking-wide text-richblack-100 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:rounded-full before:bg-yellow-100/30 before:transition-all before:duration-500 group-hover:before:bg-yellow-100">
                    "
                    {review?.review?.split(" ").length > truncateWords
                      ? `${review.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")}...`
                      : review?.review}
                    "
                  </p>

                  <div className="mt-auto flex items-end justify-between border-t border-richblack-700 pt-4">
                    <div>
                      <p className="text-3xl font-bold leading-none text-yellow-100">
                        {(review?.rating || 0).toFixed(1)}
                      </p>
                      <p className="mt-1 text-xs font-light text-richblack-400">
                        {getRatingLabel(review?.rating)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <FaStar
                          key={starIndex}
                          className={`text-sm transition-all duration-300 ease-out group-hover:scale-125 ${
                            starIndex < Math.round(review?.rating)
                              ? "text-yellow-100 drop-shadow-[0_0_4px_rgba(255,214,10,0.4)]"
                              : "text-richblack-600"
                          }`}
                          style={{ transitionDelay: `${starIndex * 60}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;