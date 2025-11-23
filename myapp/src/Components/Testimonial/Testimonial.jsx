// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// import { useState } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";

// const Testimonial = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);

//   const [sliderRef, instanceRef] = useKeenSlider({
//     slides: { perView: 1, spacing: 20 },
//     breakpoints: {
//       "(min-width: 1024px)": {
//         slides: { perView: 2, spacing: 30 },
//         centered: true,
//       },
//     },
//     loop: true,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       setLoaded(true);
//     },
//   });

//   const testimonials = [
//     {
//       name: "Marina Trange",
//       role: "Manager",
//       img: "/images/home/boy.jpg",
//       text: "“Professionally repurpose flexible testing procedures via molla in customer service. Dynamically reconceptualize value-added systems before manufactured products.”",
//     },
//     {
//       name: "John D. Alexon",
//       role: "Manager",
//       img: "/images/home/boy.jpg",
//       text: "“Enthusiastically envisioneer emerging best practices and deliver seamless experiences with personalized service and comfort.”",
//     },
//     {
//       name: "Brandon Mack",
//       role: "Manager",
//       img: "/images/home/boy.jpg",
//       text: "“Dynamically repurpose modernized platforms with hospitality-driven experiences and sustainable values.”",
//     },
//   ];

//   return (
//     <section className="bg-[url('/images/home/background.png')] bg-[rgba(30,30,30,0.4)] dark:bg-[rgba(30,30,30,0.6)] bg-opacity-40 grid items-center justify-center bg-no-repeat bg-cover">
//       <div className="Container py-20 lg:py-[120px]">
//         {/* Section Header */}
//         <div
//           className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
//           data-aos="fade-up"
//           data-aos-duration="1000"
//         >
//           <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-5">
//             <hr className="w-[150px] h-[1px] text-[#8C8C8C]" />
//           </div>
//           <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-black mt-[20px] mb-[16px] font-Arial font-semibold uppercase">
//             Customer's Testimonial
//           </h1>
//           <p className="font-Arial leading-7 lg:leading-[26px] text-black font-normal text-sm sm:text-base">
//             Hear from our guests who have experienced the comfort and Bhutanese
//             hospitality at Thim Dorji Resort. Their stories reflect the
//             memorable stays.
//           </p>
//         </div>

//         {/* Small Screen Static Testimonial */}
//         <div className="mt-14 sm:hidden px-2">
//           <div className="py-[10px]">
//             <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
//             <div className="bg-white dark:bg-normalBlack p-6 shadow-md relative">
//               <p className="font-Arial text-sm leading-[26px] text-black dark:text-lightGray font-normal italic mb-[20px]">
//                 {testimonials[0].text}
//               </p>
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={testimonials[0].img}
//                   className="w-[65px] h-[65px] rounded-full"
//                   alt={testimonials[0].name}
//                 />
//                 <div>
//                   <h4 className="text-base lg:text-[22px] leading-[26px] text-black dark:text-white font-semibold font-Garamond">
//                     {testimonials[0].name}
//                   </h4>
//                   <p className="text-sm md:text-base leading-[26px] font-normal text-[#555555] dark:text-lightGray flex items-center">
//                     <span className="w-5 h-[1px] inline-block bg-[#006600] mr-2"></span>
//                     {testimonials[0].role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
//           </div>
//         </div>

//         {/* Slider for Medium and Large Screens */}
//         <div className="relative mt-14 hidden sm:block">
//           <div ref={sliderRef} className="keen-slider">
//             {testimonials.map((t, index) => (
//               <div key={index} className="keen-slider__slide flex justify-center">
//                 <div className="w-full md:w-[90%] lg:w-[95%] flex flex-col">
//                   <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
//                   <div className="bg-white dark:bg-normalBlack p-6 md:p-10 relative shadow-md flex flex-col justify-between min-h-[300px]">
//                     <p className="font-Arial text-sm sm:text-base leading-[26px] text-black dark:text-lightGray font-normal xl:text-lg mt-[10px] italic mb-[20px] flex-grow">
//                       {t.text}
//                     </p>
//                     <div className="flex items-center space-x-6 mt-4">
//                       <img
//                         src={t.img}
//                         className="w-[65px] h-[65px] rounded-full"
//                         alt={t.name}
//                       />
//                       <div>
//                         <h4 className="text-base lg:text-[22px] leading-[26px] text-black dark:text-white font-semibold font-Garamond">
//                           {t.name}
//                         </h4>
//                         <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-[#555555] dark:text-lightGray flex items-center">
//                           <span className="w-5 h-[1px] inline-block bg-[#006600] mr-2"></span>
//                           {t.role}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Arrow Buttons */}
//           {loaded && instanceRef.current && (
//             <>
//               <button
//                 onClick={() => instanceRef.current.prev()}
//                 className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-[#006600] text-white p-3 rounded-full shadow-md hover:bg-[#004d00] transition"
//               >
//                 <FaArrowLeft />
//               </button>
//               <button
//                 onClick={() => instanceRef.current.next()}
//                 className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-[#006600] text-white p-3 rounded-full shadow-md hover:bg-[#004d00] transition"
//               >
//                 <FaArrowRight />
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonial;
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const API_URL = `${import.meta.env.VITE_API_URL}/testimonials/testimonials`;
const DEFAULT_PHOTO = "/images/home/default_profile.png";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1, spacing: 20 },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: { perView: 2, spacing: 30 },
        centered: true,
      },
    },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // ✅ Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(API_URL, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch testimonials");

        const data = await res.json();
        const active = (data.testimonials || data).filter((t) => !t.isArchived);
        setTestimonials(active);
      } catch (err) {
        console.error("❌ Error fetching testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  // ✅ Default image
  const getImage = (img) => (img && img.trim() !== "" ? img : DEFAULT_PHOTO);

  // ✅ Format stay period like “July 2 to July 3, 2025”
  const formatStayPeriod = (period) => {
    if (!period) return "";
    try {
      const [start, end] = period.split(" to ");
      const startDate = new Date(start);
      const endDate = new Date(end);

      const startMonth = startDate.toLocaleString("default", { month: "long" });
      const endMonth = endDate.toLocaleString("default", { month: "long" });
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const year = endDate.getFullYear();

      return `${startMonth} ${startDay} to ${endMonth} ${endDay}, ${year}`;
    } catch {
      return period;
    }
  };

  return (
    <section className="bg-[url('/images/home/background.png')] bg-[rgba(30,30,30,0.4)] dark:bg-[rgba(30,30,30,0.6)] bg-opacity-40 grid items-center justify-center bg-no-repeat bg-cover">
      <div className="Container py-20 lg:py-[120px]">
        {/* Section Header */}
        <div
          className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-5">
            <hr className="w-[150px] h-[1px] text-[#8C8C8C]" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[38px] leading-[42px] 2xl:leading-[52px] text-black mt-[20px] mb-[16px] font-Arial font-semibold uppercase">
            Customer's Testimonial
          </h1>
          <p className="font-Arial leading-7 lg:leading-[26px] text-black font-normal text-sm sm:text-base">
            Hear from our guests who have experienced the comfort and Bhutanese
            hospitality at Thim Dorji Resort. Their stories reflect the
            memorable stays.
          </p>
        </div>

        {/* Small Screen Static Testimonial */}
        <div className="mt-14 px-2">
          {testimonials.length > 0 && (
            <div className="py-[10px]">
              <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
              <div className="bg-white dark:bg-normalBlack p-6 shadow-md relative">
                <p className="font-Arial text-sm leading-[26px] text-black dark:text-lightGray font-normal italic mb-[20px]">
                  {testimonials[0].message}
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={getImage(testimonials[0].image)}
                    className="w-[65px] h-[65px] rounded-full"
                    alt={testimonials[0].name || "Guest"}
                  />
                  <div>
                    <h4 className="text-base lg:text-[22px] leading-[26px] text-black dark:text-white font-semibold font-Garamond">
                      {testimonials[0].name || "Anonymous"}
                    </h4>
                    <p className="text-sm md:text-base leading-[26px] font-normal text-[#555555] dark:text-lightGray flex items-center">
                      <span className="w-5 h-[1px] inline-block bg-[#006600] mr-2"></span>
                      {formatStayPeriod(testimonials[0].stayPeriod)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
            </div>
          )}
        </div>

        {/* Slider for Medium and Large Screens */}
        {testimonials.length > 0 && (
          <div className="relative mt-14 hidden sm:block">
            <div ref={sliderRef} className="keen-slider">
              {testimonials.map((t, index) => (
                <div key={index} className="keen-slider__slide flex justify-center">
                  <div className="w-full md:w-[90%] lg:w-[95%] flex flex-col">
                    <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
                    <div className="bg-white dark:bg-normalBlack p-6 md:p-10 relative shadow-md flex flex-col justify-between min-h-[300px]">
                      <p className="font-Arial text-sm sm:text-base leading-[26px] text-black dark:text-lightGray font-normal xl:text-lg mt-[10px] italic mb-[20px] flex-grow">
                        {t.message}
                      </p>
                      <div className="flex items-center space-x-6 mt-4">
                        <img
                          src={getImage(t.image)}
                          className="w-[65px] h-[65px] rounded-full"
                          alt={t.name || "Guest"}
                        />
                        <div>
                          <h4 className="text-base lg:text-[22px] leading-[26px] text-black dark:text-white font-semibold font-Garamond">
                            {t.name || "Anonymous"}
                          </h4>
                          <p className="pt-1 text-sm md:text-base leading-[26px] font-normal text-[#555555] dark:text-lightGray flex items-center">
                            <span className="w-5 h-[1px] inline-block bg-[#006600] mr-2"></span>
                            {formatStayPeriod(t.stayPeriod)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[85%] h-[10px] bg-[#006600] mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow Buttons */}
            {loaded && instanceRef.current && (
              <>
                <button
                  onClick={() => instanceRef.current.prev()}
                  className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-[#006600] text-white p-3 rounded-full shadow-md hover:bg-[#004d00] transition"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() => instanceRef.current.next()}
                  className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-[#006600] text-white p-3 rounded-full shadow-md hover:bg-[#004d00] transition"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonial;
