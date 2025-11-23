
import { useState } from "react";
import Swal from "sweetalert2";
import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { IoIosCall } from "react-icons/io";

const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill all fields!",
                  confirmButtonColor: "#008000",
          background: "#006600",
          color: "#fff",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to send message.",
                    confirmButtonColor: "#008000",
          background: "#006600",
          color: "#fff",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We have received your message. Thank you!",
                  confirmButtonColor: "#008000",
          background: "#006600",
          color: "#fff",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
                  confirmButtonColor: "#008000",
          background: "#006600",
          color: "#fff",
      });
      console.error(error);
    }
  };

  return (
    <div>
      <BreadCrumb title="Contact" />

      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-[#F5F5F5] dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px] ">
          <div className="flex items-center flex-col md:flex-row">

            {/* LEFT SIDE */}
            <div className="py-5 sm:p-5 flex-1" data-aos="zoom-in-up" data-aos-duration="1000">
              <h2 className="text-Arial text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] 
              leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                CONTACT US
              </h2>

              <p className="text-Lora text-sm sm:text-base leading-[26px] text-[#808080] dark:text-lightGray font-normal">
                For inquiries and support, contact us below.
              </p>

              {/* PHONE */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px]
                dark:bg-lightBlack bg-[#F5F5F5] dark:group-hover:bg-[#006600]
                grid items-center justify-center -full transition-all duration-300">
                  <IoIosCall size={22} className="text-[#006600] group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Arial text-sm text-[#808080] dark:text-lightGray">Call Us Now</p>
                  <p className="font-Arial text-lg text-black dark:text-lightGray">
                    ‪+975 17755898‬ | ‪+65 8111 9926‬
                  </p>
                </div>
              </div>

              <hr className="dark:text-[#D3D3D3] bg-[#D3D3D3] h-[0.5px]" />

              {/* EMAIL */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px]
                bg-[#F5F5F5] dark:bg-lightBlack dark:group-hover:bg-[#006600]
                grid items-center justify-center -full transition-all duration-300">
                  <MdEmail size={22} className="text-[#006600] group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Arial text-sm text-[#808080] dark:text-lightGray">Send Email</p>
                  <p className="font-Arial text-lg text-black dark:text-lightGray">
                    resortthimdorjireservation@gmail.com
                  </p>
                </div>
              </div>

              <hr className="dark:text-[#D3D3D3] bg-[#D3D3D3] h-[0.5px]" />

              {/* LOCATION */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px]
                bg-[#F5F5F5] dark:bg-lightBlack dark:group-hover:bg-[#006600]
                grid items-center justify-center -full transition-all duration-300">
                  <MdOutlineShareLocation size={22} className="text-[#006600] group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Arial text-sm text-[#808080] dark:text-lightGray">Our Location</p>
                  <p className="font-Arial text-lg text-black dark:text-lightGray">
                    Remphakha / Lower Tsendona,<br />
                    Sangachokor Road, Paro 12002, Bhutan
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="flex-1 py-5 sm:p-5" data-aos="zoom-in-up" data-aos-duration="1000">
              <div className="bg-lightBlack p-[30px] lg:p-[45px] 2xl:p-[61px]">

                <h2 className="font-Arial text-[20px] sm:text-2xl md:text-[28px] text-white font-semibold text-center">
                  GET IN TOUCH
                </h2>

                <div className="grid grid-cols-1 gap-2 mt-8">

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-12 px-4 border border-[#fff] bg-transparent mt-4 placeholder:text-[#fff] text-white outline-none"
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter E-mail"
                    className="w-full h-12 px-4 border border-[#fff] bg-transparent mt-4 placeholder:text-[#fff] text-white outline-none"
                  />

                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Subject"
                    className="w-full h-12 px-4 border border-[#fff] bg-transparent mt-4 placeholder:text-[#fff] text-white outline-none"
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write Message:"
                    className="w-full h-[121px] px-4 border border-[#fff] bg-transparent mt-4 placeholder:text-[#fff] text-white outline-none resize-none"
                  ></textarea>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#006600] text-white text-center h-10 2xl:h-[55px] mt-5"
                  >
                    {loading ? "Sending..." : "SEND MESSAGE"}
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MAP */}
      <div data-aos="fade-down" data-aos-duration="1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2697.2123904420587!2d89.40006427404145!3d27.439489637257118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e19d66c309f7db%3A0xe4bcdc9983c238!2sResort%20Thim-Dorji%20%40%20Paro%20Riverfront!5e1!3m2!1sen!2sbt!4v1758921692338!5m2!1sen!2sbt"
          height={450}
          className="w-full"
          loading="lazy"
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
