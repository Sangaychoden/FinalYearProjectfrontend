import { Link, useLocation } from "react-router-dom";

const BreadCrumb = ({ title, home }) => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  return (
<section className="bg-[url('/images/home/room/bgbg.png')] bg-no-repeat bg-cover h-[300px] md:h-[550px] bg-center grid items-center justify-center">
  <div className="mt-10 text-center">
    <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-10 lg:leading-[60px] 2xl:leading-[70px] text-white font-semibold font-Arial uppercase">
      {title}
    </h1>
  </div>
</section>

  );
};

export default BreadCrumb;
