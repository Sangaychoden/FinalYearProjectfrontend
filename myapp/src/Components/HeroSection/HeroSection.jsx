// HeroSection.jsx
import { BiPhoneCall } from "react-icons/bi";
import banner from "../../../public/images/home/cover.jpeg";

const HeroSection = () => {
  return (
    <div
      className="
        w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px]
        bg-cover bg-center text-white relative grid items-center justify-center
      "
      style={{ backgroundImage: `url(${banner})` }}
      data-aos="fade-down"
    >
      {/* ✅ No dark overlay — keep background vivid */}

      {/* Content */}
      <div className="relative z-10 2xl:w-[820px] text-center font-inter px-4">
        <h4
          className="text-lg sm:text-xl md:text-2xl mb-4 tracking-wide"
          style={{
            textShadow:
              "0 3px 8px rgba(0,0,0,.65), 0 6px 18px rgba(0,0,0,.35)",
          }}
        >
          LUXURY HOTEL AND RESORT
        </h4>

        <div className="mb-7 md:mb-8 lg:mb-9 xl:mb-10">
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl
              font-semibold leading-[44px] sm:leading-[50px]
              md:leading-[60px] lg:leading-[70px] 3xl:leading-[78px]
            "
            style={{
              textShadow:
                "0 4px 10px rgba(0,0,0,.75), 0 8px 24px rgba(0,0,0,.45)",
            }}
          >
            RIVERSIDE SERENITY,
          </h1>

          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl
              font-semibold leading-[44px] sm:leading-[50px]
              md:leading-[60px] lg:leading-[70px] 3xl:leading-[78px]
            "
            style={{
              textShadow:
                "0 4px 10px rgba(0,0,0,.75), 0 8px 24px rgba(0,0,0,.45)",
            }}
          >
            BHUTANESE WARMTH
          </h1>
        </div>
      </div>

      {/* ✅ Contact info strip */}
      <div
        className="
          w-[221px] h-[50px] border-white border hidden md:flex
          items-center justify-center absolute left-0 top-1/2 -rotate-90
        "
      >
        <BiPhoneCall className="w-5 h-5 mr-2 text-khaki" /> +975 17755898
      </div>
    </div>
  );
};

export default HeroSection;
