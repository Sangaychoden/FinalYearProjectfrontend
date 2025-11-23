
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL 

const ServiceDetails = () => {
  const { id } = useParams(); // Facility ID from URL
  const [facility, setFacility] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // ✅ Fetch facility details
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const res = await fetch(`${API_URL}/facilities/${id}`);
        const data = await res.json();
        setFacility(data.facility);
      } catch (error) {
        console.error("❌ Error fetching facility details:", error);
      }
    };
    fetchFacility();
  }, [id]);

  // ✅ Image navigation
  const prevBtn = () =>
    setImageIndex((prev) =>
      facility?.images?.length ? (prev - 1 + facility.images.length) % facility.images.length : 0
    );
  const nextBtn = () =>
    setImageIndex((prev) =>
      facility?.images?.length ? (prev + 1) % facility.images.length : 0
    );

  if (!facility)
    return (
      <section className="bg-white py-32 text-center text-gray-600 font-['Inter']">
        <p>Loading facility details...</p>
      </section>
    );

  return (
    <section className="bg-white text-gray-700 font-['Inter']">
      <BreadCrumb title="Facility Details" />

      <div className="py-20 2xl:py-[120px] bg-white">
        <div className="Container">
          {/* ✅ Image Slider */}
          <div className="grid items-center grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-5">
            <div
              className="col-span-6 md:col-span-7 lg:col-span-6"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="overflow-hidden relative group">
                {facility.images && facility.images.length > 0 ? (
                  <img
                    src={facility.images[imageIndex]}
                    alt={facility.title}
                    className="transition-all duration-500 delay-300 w-full h-[250px] md:h-[500px] object-cover -lg"
                  />
                ) : (
                  <div className="w-full h-[250px] md:h-[500px] bg-gray-200 flex items-center justify-center -lg">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}

                {/* Left Arrow */}
                {facility.images?.length > 1 && (
                  <span
                    className="w-[40px] h-[40px] bg-white hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] left-[-50px] group-hover:left-4 transition-all duration-300 cursor-pointer shadow-md -full"
                    onClick={prevBtn}
                  >
                    <BsArrowLeft size={20} className="text-gray-800 hover:text-white" />
                  </span>
                )}

                {/* Right Arrow */}
                {facility.images?.length > 1 && (
                  <span
                    className="w-[40px] h-[40px] bg-white hover:bg-[#006600] grid items-center justify-center absolute bottom-[45%] right-[-50px] group-hover:right-4 transition-all duration-300 cursor-pointer shadow-md -full"
                    onClick={nextBtn}
                  >
                    <BsArrowRight size={20} className="text-gray-800 hover:text-white" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ✅ Facility Description */}
          <div className="pt-10 lg:pt-[45px] pr-3">
            <h2 className="py-3 font-semibold text-[26px] sm:text-3xl lg:text-4xl text-black">
              {facility.title}
            </h2>
            <p className="text-base leading-7 text-gray-600 font-normal">
              {facility.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
