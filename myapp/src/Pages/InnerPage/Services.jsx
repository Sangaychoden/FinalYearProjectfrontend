// import { HiArrowLongRight } from "react-icons/hi2";
// import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Services = () => {
//   // Toggle whether to show services beyond the first 3
//   const [showAll, setShowAll] = useState(false);

//   return (
//     <section className="bg-white text-black font-inter">
//       <BreadCrumb title="services" />

//       {/* service page content */}
//       <div className="bg-white">
//         <section className="Container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]">
//           {/* section title */}
//           <div
//             className="flex flex-col md:flex-row md:items-center justify-between mb-12 px-3 sm:px-5"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <div className="md:w-[450px]">
//               <h5 className="text-base leading-[26px] font-medium mb-[14px] uppercase">
//                 SERVICES
//               </h5>
//               <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] font-semibold">
//                 ENJOY  BEST QUALITY FACILITIES
//               </h1>
//             </div>

//             {/* (Button removed from here) */}
//           </div>

//           {/* facilities container */}
//           <div>
//             {/* facilities section - 1 */}
//             <hr className="text-[#e8e8e8] my-10" />
//             <div
//               className="grid grid-cols-1 md:grid-cols-2"
//               data-aos="zoom-in-up"
//               data-aos-duration="1000"
//             >
//               <div className="relative w-full h-[100%] md:pr-[30px]">
//                 <img
//                   src="/images/home/services/service1.png"
//                   alt="Gym Training Grounds"
//                   className="w-full h-full"
//                 />
//                 <div className="hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%]">
//                   <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px]">01</h2>
//                 </div>
//               </div>
//               <div className="relative md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0 h-full">
//                 <h4 className="text-base font-semibold leading-[26px] pb-[6px] uppercase mt-2 md:mt-0">
//                   LOFT
//                 </h4>
//                 <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold">
//                   <Link to="/service_details">The Loft</Link>
//                 </h1>

//                 <p className="text-sm sm:text-base leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative">
//                   The Loft is located on the top floor of the Right Guestroom Wing.
//                   <br />
//                   <br />
//                   It is a column-free open space, with a panoramic view of the Bhutanese countryside, designed specially for yoga and meditation sessions.
//                 </p>
//                 <Link to="/service_details" aria-label="Read more about Gym Training Grounds">
//                   <HiArrowLongRight size={40} className="hover:opacity-70" />
//                 </Link>
//               </div>
//             </div>

//             {/* facilities section - 2 */}
//             <hr className="text-[#e8e8e8] mb-10 mt-10" />
//             <div
//               className="grid grid-cols-1 md:grid-cols-2"
//               data-aos="zoom-in-up"
//               data-aos-duration="1000"
//             >
//               <div className="md:mr-[2px] lg:mr-[110px] h-full">
//                 <h4 className="text-base font-semibold leading-[26px] pb-[6px] uppercase">
//                   RESTAURANT
//                 </h4>
//                 <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold">
//                   <Link to="/service_details">The Restaurant</Link>
//                 </h1>

//                 <p className="relative text-sm sm:text-base leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
//                   Our restaurant offers a wide choice of freshly prepared à la carte meals, perfect for both casual dining and special occasions.
//                   <br />
//                   <br />
//                   For groups, functions, or celebrations, we can also arrange custom buffets to suit your needs.
//                 </p>
//                 <Link to="/service_details" aria-label="Read more about Indoor Swimming Pool">
//                   <HiArrowLongRight size={40} className="hover:opacity-70" />
//                 </Link>
//               </div>

//               <div className="w-full h-[100%] md:pl-[30px] relative mt-5 md:mt-0">
//                 <img
//                   src="/images/home/services/service2.png"
//                   alt="Indoor Swimming Pool"
//                   className="w-full h-full"
//                 />
//                 <div className="hidden md:block absolute -top-[0px] -left-[12%]">
//                   <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px]">02</h1>
//                 </div>
//               </div>
//             </div>

//             {/* facilities section - 3 */}
//             <hr className="text-[#e8e8e8] my-10" />
//             <div
//               className="grid grid-cols-1 md:grid-cols-2"
//               data-aos="zoom-in-up"
//               data-aos-duration="1000"
//             >
//               <div className="relative w-full h-[100%] md:pr-[30px]">
//                 <img
//                   src="/images/home/services/service3.png"
//                   alt="The Restaurant Center"
//                   className="w-full h-full"
//                 />
//                 <div className="hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%]">
//                   <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px]">03</h2>
//                 </div>
//               </div>
//               <div className="md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0 relative h-full">
//                 <h4 className="text-base font-semibold leading-[26px] pb-[6px] uppercase mt-2 md:mt-0">
//                   Foods
//                 </h4>
//                 <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold">
//                   <Link to="/service_details"> The Menu</Link>
//                 </h1>

//                 <p className="text-sm sm:text-base leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] relative before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
//                   Our set menus for house guests are carefully planned and change every day of the week, from Monday through Sunday.
//                   <br />
//                   <br />
//                   Each day features a different selection of dishes, allowing guests to enjoy a variety of flavors throughout their stay.
//                 </p>
//                 <Link to="/service_details" aria-label="Read more about The Restaurant Center">
//                   <HiArrowLongRight size={40} className="hover:opacity-70" />
//                 </Link>
//               </div>
//             </div>

//             {/* ONLY render anything beyond the 3rd when showAll === true */}
//             {showAll && (
//               <>
//                 {/* facilities section - 4 */}
//                 <hr className="text-[#e8e8e8] mb-10 mt-10" />
//                 <div
//                   className="grid grid-cols-1 md:grid-cols-2"
//                   data-aos="zoom-in-up"
//                   data-aos-duration="1000"
//                 >
//                   <div className="md:mr-[2px] lg:mr-[110px] h-full">
//                     <h4 className="text-base font-semibold leading-[26px] pb-[6px] uppercase">
//                       Experience
//                     </h4>
//                     <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold">
//                       <Link to="/service_details">Gym Training Grounds</Link>
//                     </h1>

//                     <p className="relative text-sm sm:text-base leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
//                       Rapidiously myocardinate cross-platform intellectual capital
//                       after model. Appropriately create interactive infrastructures
//                       after are Holisticly facilitate stand-alone
//                     </p>
//                     <Link to="/service_details" aria-label="Read more about Gym Training Grounds">
//                       <HiArrowLongRight size={40} className="hover:opacity-70" />
//                     </Link>
//                   </div>

//                   <div className="w-full h-[100%] relative md:pl-[30px] mt-5 md:mt-0">
//                     <img
//                       src="/images/home/services/service2.png"
//                       alt="Gym Training Grounds"
//                       className="w-full h-full"
//                     />
//                     <div className="hidden md:block absolute -top-[0px] -left-[12%]">
//                       <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px]">04</h1>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* NEW: bottom-right toggle button (same side), after all sections */}
// <div className="px-3 sm:px-5 mt-10 flex md:justify-end">
//   <button
//     type="button"
//     className="btn-items inline-flex items-center justify-center px-5 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
//     style={{
//       backgroundColor: "#000",
//       color: "#fff",
//       border: "1px solid #000",
//       fontFamily: "Arial, sans-serif",
//     }}
//     onClick={() => setShowAll((v) => !v)}
//     aria-expanded={showAll}
//   >
//     {showAll ? "view less" : "view more"}
//   </button>
// </div>

//           </div>
//         </section>
//       </div>
//     </section>
//   );
// };

// export default Services;
// src/Pages/Services/Services.jsx
import { HiArrowLongRight } from "react-icons/hi2";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const DEFAULT_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // fallback image
const API_URL = `${import.meta.env.VITE_API_URL}/facilities`;

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch(API_URL, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch facilities");
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.facilities || [];
        setFacilities(list);
      } catch (err) {
        console.error("Error fetching facilities:", err);
      }
    };
    fetchFacilities();
  }, []);

  const getImage = (f) =>
    f?.images?.length > 0 ? f.images[0] : DEFAULT_IMAGE;

  // Only show first 3 unless "show all" is toggled
  const visibleFacilities = showAll ? facilities : facilities.slice(0, 3);

  // Utility to truncate text to ~50 words
const truncateText = (text, wordLimit = 50) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

  return (
    <section className="bg-white text-black font-inter">
      <BreadCrumb title="services" />

      <div className="bg-white">
        <section className="Container py-[80px] md:py-0 md:pb-[120px] lg:py-[120px]">
          {/* section title */}
          <div
            className="flex flex-col md:flex-row md:items-center justify-between mb-12 px-3 sm:px-5"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="md:w-[450px]">
              <h5 className="text-base leading-[26px] font-medium mb-[14px] uppercase">
                SERVICES
              </h5>
              <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[38px] lg:leading-[44px] font-semibold">
                ENJOY BEST QUALITY FACILITIES
              </h1>
            </div>
          </div>

          {/* facilities container */}
          <div>
            {visibleFacilities.map((facility, index) => (
              <div key={facility._id || index}>
                <hr className="text-[#e8e8e8] my-10" />

                {/* Alternate layout every section like your original */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                  data-aos="zoom-in-up"
                  data-aos-duration="1000"
                >
                  {/* Image Side */}
                  {index % 2 === 0 ? (
                    <>
                      <div className="relative w-full h-[100%] md:pr-[30px]">
                        <img
                          src={getImage(facility)}
                          alt={facility.title || "Facility"}
                          className="w-full h-full object-cover"
                        />
                        <div className="hidden md:block absolute -top-[0px] md:-right-[12%] -right-[7%]">
                          <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px]">
                            {String(index + 1).padStart(2, "0")}
                          </h2>
                        </div>
                      </div>

                      <div className="relative md:ml-[60px] lg:ml-[107px] mt-3 md:mt-0 h-full">
                        <h4 className="text-base font-semibold leading-[26px] pb-[6px] uppercase mt-2 md:mt-0">
                          {facility.title || "Facility"}
                        </h4>
                        <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold">
                          <Link to="/service_details">
                            {facility.title || "Service"}
                          </Link>
                        </h1>

<p className="text-sm sm:text-base leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px] relative">
  {truncateText(facility.description) || "No description available for this facility."}
</p>

                        {/* <Link
                          to="/service_details"
                          aria-label={`Read more about ${facility.title || "Facility"}`}
                        >
                          <HiArrowLongRight size={40} className="hover:opacity-70" />
                        </Link> */}
                        <Link
                          to={`/service_details/${facility._id}`}
                          aria-label={`Read more about ${facility.title || "Facility"}`}
                        >
                          <HiArrowLongRight size={40} className="hover:opacity-70" />
                        </Link>

                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:mr-[2px] lg:mr-[110px] h-full">
                        <h4 className="text-base font-semibold leading-[26px] pb-[6px] uppercase">
                          {facility.title || "Facility"}
                        </h4>
                        <h1 className="text-2xl md:text-3xl 2xl:text-[32px] leading-[26px] font-semibold">
                          <Link to="/service_details">
                            {facility.title || "Service"}
                          </Link>
                        </h1>

                        <p className="relative text-sm sm:text-base leading-[26px] font-normal my-10 lg:mt-[46px] lg:mb-[40px] before:absolute before:h-[30px] before:left-0 before:top-[-35px] before:bg-[#ddd] before:w-[1px]">
                          {facility.description ||
                            "No description available for this facility."}
                        </p>
                        <Link
                          to="/service_details"
                          aria-label={`Read more about ${facility.title || "Facility"}`}
                        >
                          <HiArrowLongRight size={40} className="hover:opacity-70" />
                        </Link>
                      </div>

                      <div className="w-full h-[100%] md:pl-[30px] relative mt-5 md:mt-0">
                        <img
                          src={getImage(facility)}
                          alt={facility.title || "Facility"}
                          className="w-full h-full object-cover"
                        />
                        <div className="hidden md:block absolute -top-[0px] -left-[12%]">
                          <h1 className="text-3xl md:text-4xl lg:text-[40px] leading-[38px]">
                            {String(index + 1).padStart(2, "0")}
                          </h1>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* View more / less button only if more than 3 facilities */}
            {facilities.length > 3 && (
              <div className="px-3 sm:px-5 mt-10 flex md:justify-end">
                <button
                  type="button"
                  className="btn-items inline-flex items-center justify-center px-5 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "1px solid #000",
                    fontFamily: "Arial, sans-serif",
                  }}
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                >
                  {showAll ? "view less" : "view more"}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Services;
