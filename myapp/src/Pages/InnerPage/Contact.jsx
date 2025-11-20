import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { IoIosCall } from "react-icons/io";

const Contact = () => {
  return (
    <div>
      <BreadCrumb title="Contact Us" />

      {/* Contact */}
      {/* Contact with Us */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-[#F5F5F5] dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px] ">
          <div className="flex items-center flex-col md:flex-row">
            <div
              className="py-5 sm:p-5 flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >

              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                CONTACT US
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px]  text-[#808080] dark:text-lightGray font-normal">
For inquiries and support, contact us below.
              </p>

              {/* call */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-[#006600] dark:group-hover:bg-[#006600] grid items-center justify-center rounded-full transition-all duration-300">
                  <IoIosCall
                    size={22}
                    className="text-[#006600] group-hover:text-whiteSmoke"
                  />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Arial text-sm leading-[26px] text-[#808080] dark:text-lightGray font-normal">
                    Call Us Now
                  </p>
                  <p className="font-Arial text-lg leading-[26px] text-black dark:text-lightGray font-normal">
                    ‪+975 17755898‬ | ‪+65 8111 9926‬
                  </p>
                </div>
              </div>
              <hr className="dark:text-[#D3D3D3] dark:bg-[#D3D3D3] text-[#D3D3D3] bg-[#D3D3D3] h-[0.5px]" />
              {/* email */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-[#006600] dark:group-hover:bg-[#006600] grid items-center justify-center rounded-full transition-all duration-300">
                  <MdEmail
                    size={22}
                    className="text-[#006600] group-hover:text-whiteSmoke"
                  />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Arial text-sm leading-[26px] text-[#808080] dark:text-lightGray font-normal">
                    Send Email
                  </p>
                  <p className="font-Arial text-lg leading-[26px] text-black dark:text-lightGray font-normal">
                   resortthimdorjireservation@gmail.com
                  </p>
                </div>
              </div>
              <hr className="dark:text-[#D3D3D3] dark:bg-[#D3D3D3] text-[#D3D3D3] bg-[#D3D3D3] h-[0.5px]" />
              {/* location */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-[#006600] dark:group-hover:bg-[#006600] grid items-center justify-center rounded-full transition-all duration-300">
                  <MdOutlineShareLocation
                    size={22}
                    className="text-[#006600] group-hover:text-whiteSmoke"
                  />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Arial text-sm leading-[26px] text-[#808080] dark:text-lightGray font-normal">
                    Our Locations
                  </p>
                  <p className="font-Arial text-lg leading-[26px] text-black dark:text-lightGray font-normal">
Remphakha / Lower Tsendona, <br/> 
Sangachokor Road, Paro 12002, Bhutan
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex-1 py-5 sm:p-5"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="bg-lightBlack  p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Arial text-[20px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center">
                  GET IN TOUCH
                </h2>
                <div className="grid items-center grid-cols-1 gap-2 mt-8">
                  <input
                    type="text"
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-[#fff] dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-[#fff] focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border  border-[#fff] dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-[#fff] focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Enter E-mail"
                    required
                  />
                  <input
                    type="subject"
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border  border-[#fff] dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-[#fff] focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Enter Subject"
                    required
                  />
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="w-full h-[121px] px-4 border border-[#fff] dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-[#fff] resize-none focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Write Message:"
                  ></textarea>
                  <button className="w-full bg-[#006600] text-white text-center h-10 2xl:h-[55px] mt-5">
                    SEND MESSAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* google map */}
      <div data-aos="fade-down" data-aos-duration="1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.2123904420587!2d89.40006427404145!3d27.439489637257118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e19d66c309f7db%3A0xe4bcdc9983c238!2sResort%20Thim-Dorji%20%40%20Paro%20Riverfront!5e1!3m2!1sen!2sbt!4v1758921692338!5m2!1sen!2sbt"
          height={450}
          allowFullScreen=""
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;