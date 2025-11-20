import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { BsPlay } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";
import { BsTwitter } from "react-icons/bs";
import { useState } from "react";
import FsLightbox from "fslightbox-react";

const About = () => {
  const [toggler, setToggler] = useState(false);

  return (
    <section className="">
      <BreadCrumb title="About Us" home={""} />

      {/* about content */}
      <section className="bg-white dark:bg-white">
        <div className="Container py-20 2xl:py-[120px] sm:overflow-hidden lg:overflow-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* image */}
            <div
              className="flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <img
                src="/images/home/about/about.png"
                alt=""
                className="w-full h-full"
              />
            </div>

            {/* text */}
            <div
              className="mt-10 md:mt-0 md:ml-10 lg:ml-[90px] 2xl:ml-[100px] space-y-3 xl:space-y-4 flex-1 font-Arial"
              data-aos="zoom-in-down"
              data-aos-duration="1000"
            >
              <h5 className="text-base leading-[26px] font-medium text-black dark:text-black font-Arial">
                LUXURY HOTEL AND RESORT
              </h5>

              <h1 className="text-[22px] sm:text-2xl md:text-[21px] xl:text-3xl 2xl:text-[38px] leading-6 md:leading-7 lg:leading-[30px] 2xl:leading-[44px] font-semibold my-4 text-black dark:text-black font-Arial">
                PARO, BHUTAN
              </h1>

              <p className="text-sm xl:text-base md:text-sm lg:text-base font-normal leading-[26px] text-[#333] dark:text-black font-Arial">
               At Thim Dorji Resort, we pride ourselves on offering a unique hospitality experience that blends comfort, warmth, and the charm of Paro. Each of our guestrooms opens up to stunning views of the Paro River, allowing guests to relax and unwind while being surrounded by nature’s serenity.         
              </p>

              <p className="text-sm sm:text-base font-normal leading-[26px] mt-5 text-[#333] dark:text-black font-Arial">
                Our team is dedicated to creating memorable stays, providing personalized service that reflects the local culture and traditions. Whether you’re here for a peaceful getaway or a memorable adventure, we ensure your stay is comfortable, authentic, and truly unforgettable.
              </p>

              <div className="bg-[#F5F5F5] dark:bg-white px-[30px] py-5">
                <p className="text-sm sm:text-base leading-10 3xl:leading-[50px] font-medium font-Arial text-black dark:text-black">
                  Remphakha / Lower Tsendona, Sangachokor Road.
                </p>
                <p className="text-sm sm:text-base leading-10 font-medium font-Arial text-black dark:text-black">
                  Paro, 12002, Bhutan
                </p>
              </div>

          
            </div>
            {/* text */}
          </div>
        </div>
      </section>

      {/* best hotel manager */}
      <div className="bg-lightBlack -z-[1] py-20 2xl:py-[120px]">
        <div className="Container ">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center ">
            <div
              className="flex-1 h-[100%] w-full relative "
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="flex-1 h-[100%] w-full relative ">
                <img
                  src="/images/home/room1.jpeg"
                  className="h-full w-full md:h-[80%] lg:h-full object-cover"
                  alt=""
                />

                <div
                  className="w-[70px] h-[70px] text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1] "
                  onClick={() => setToggler(!toggler)}
                >
                  <BsPlay className="w-8 h-8 ml-1" />
                </div>
                <span className="top-[47%] md:top-[33%] lg:top-[48%] left-[43%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation"></span>
              </div>
              <FsLightbox
                toggler={toggler}
                sources={["https://youtu.be/3Tlf--DXIdg?si=vipka1tpOJAKDoHJ"]}
              />
            </div>

            <div
              className="bg-[#f8f6f3] dark:bg-normalBlack space-y-5 flex-1 px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px] font-Arial"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <h5 className="text-base leading-[26px] font-semibold text-lightBlack dark:text-white font-Arial">
                MANAGER
              </h5>
              <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold font-Arial">
                LUXURY BEST HOTEL IN TOWN 
              </h1>
              <p className="text-sm sm:text-base font-Arial text-[#333] dark:text-lightGray font-normal leading-[26px]">
                Welcome! Our team is committed to making your stay comfortable and memorable with warm hospitality and personalized service.
              </p>
              <p className="text-sm sm:text-base font-Arial italic leading-[26px]  text-[#333] dark:text-lightGray font-normal ">
             “Where you experience a unique hospitality culture
and a Paro River view from the guestrooms”
              </p>
              <div className="flex items-center space-x-6 pt-5">
                <img
                  src="/images/home/about/pema.png"
                  className="w-[65px] h-[65px] object-cover"
                  alt=""
                />
                <div className="">
                  <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Arial">
                  Pema Wangchuck
                  </h4>
                  <p className="pt-1 text-base leading-[26px] font-normal text-[#333] dark:text-lightGray flex items-center font-Arial">
                    <span className="w-5 h-[1px] inline-block text-[#333] bg-khaki mr-2"></span>
                    Manger
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      
    </section>
  );
};

export default About;