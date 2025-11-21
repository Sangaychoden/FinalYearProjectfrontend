
import { useState } from "react";
import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { IoIosCall } from "react-icons/io";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(`${API_URL}/contact/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setMsg(data.message || "Failed to send message.");
      }
    } catch (err) {
      setMsg("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <BreadCrumb title="Contact Us" />

      {/* Contact */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-[#F5F5F5] dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px] ">
          <div className="flex items-center flex-col md:flex-row">
            <div
              className="py-5 sm:p-5 flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                CONTACT US
              </h2>
              <p className="text-Lora text-sm text-[#808080] dark:text-lightGray">
                For inquiries and support, contact us below.
              </p>

              {/* call */}
              <div className="flex items-center my-4 group">
                <div className="w-[40px] h-[40px] bg-white dark:bg-lightBlack group-hover:bg-[#006600] grid items-center justify-center rounded-full">
                  <IoIosCall size={22} className="text-[#006600] group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-4">
                  <p className="text-[#808080]">Call Us Now</p>
                  <p className="text-black dark:text-lightGray">
                    ‪+975 17755898‬ | ‪+65 8111 9926‬
                  </p>
                </div>
              </div>
              <hr />

              {/* email */}
              <div className="flex items-center my-4 group">
                <div className="w-[40px] h-[40px] bg-white dark:bg-lightBlack group-hover:bg-[#006600] grid items-center justify-center rounded-full">
                  <MdEmail size={22} className="text-[#006600] group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-4">
                  <p className="text-[#808080]">Send Email</p>
                  <p className="text-black dark:text-lightGray">
                    resortthimdorjireservation@gmail.com
                  </p>
                </div>
              </div>
              <hr />

              {/* location */}
              <div className="flex items-center my-4 group">
                <div className="w-[40px] h-[40px] bg-white dark:bg-lightBlack group-hover:bg-[#006600] grid items-center justify-center rounded-full">
                  <MdOutlineShareLocation size={22} className="text-[#006600] group-hover:text-whiteSmoke" />
                </div>
                <div className="ml-4">
                  <p className="text-[#808080]">Our Locations</p>
                  <p className="text-black dark:text-lightGray">
                    Remphakha / Lower Tsendona, <br />
                    Sangachokor Road, Paro 12002, Bhutan
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 py-5 sm:p-5">
              <div className="bg-lightBlack p-[30px] lg:p-[45px]">
                <h2 className="text-[24px] text-white text-center font-semibold">
                  GET IN TOUCH
                </h2>

                <div className="grid grid-cols-1 gap-2 mt-8">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-[#fff] text-white bg-transparent mt-4"
                    placeholder="Your Name"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-[#fff] text-white bg-transparent mt-4"
                    placeholder="Enter E-mail"
                  />

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-[#fff] text-white bg-transparent mt-4"
                    placeholder="Enter Subject"
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 border border-[#fff] text-white bg-transparent mt-4 resize-none"
                    placeholder="Write Message:"
                  />

                  <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="w-full bg-[#006600] text-white h-10 mt-5"
                  >
                    {loading ? "Sending..." : "SEND MESSAGE"}
                  </button>

                  {msg && (
                    <p className="text-center text-white mt-3">{msg}</p>
                  )}
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