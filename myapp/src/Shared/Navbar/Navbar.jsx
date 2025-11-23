import { Link, NavLink } from "react-router-dom";
import useScrollPosition from "./useScrollPosition";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const scrolled = scrollPosition > 10;
  const toggleNavbar = () => setIsOpen((p) => !p);

  const wrapperBg = scrolled ? "bg-white shadow-md" : "bg-white shadow-md";
  const linkColor = "text-black";

  const links = [
    { to: "/", label: "Home" },
    { to: "/room", label: "Rooms" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const navRef = useRef(null);

  // Click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`w-full fixed z-10 transition-all duration-300 font-inter lg:px-5 lg:py-2 ${wrapperBg}`}
      ref={navRef} // attach ref here
    >
      <div className="lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Logo */}
          <div className="w-48 lg:w-52 lg:p-4">
            <Link to="/">
              <img
                src="/images/home/logologo.png"
                alt="website_logo"
                className="hidden lg:block w-full"
              />
            </Link>
          </div>

          {/* Mobile top bar */}
          <div className="px-3 w-full lg:hidden flex justify-between items-center h-[70px]">
            <div className="w-28">
              <Link to="/">
                <img
                  src="/images/home/logologo.png"
                  alt="website_logo"
                  className="w-full"
                />
              </Link>
            </div>

            <div className="flex items-center">
              <button
                className="lg:hidden block focus:outline-none"
                onClick={toggleNavbar}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <IoMdClose className="w-6 h-6 text-black" />
                ) : (
                  <FaBars className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
          </div>

          {/* Links */}
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:items-center lg:space-x-6 xl:space-x-8 2xl:space-x-10
              flex flex-col lg:flex-row space-y-2 lg:space-y-0 uppercase py-3 lg:py-0 bg-white lg:bg-transparent`}
          >
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${linkColor} block px-3 py-2 transition-all duration-200 ${
                      isActive ? "font-semibold" : "hover:opacity-80"
                    }`
                  }
                  onClick={() => setIsOpen(false)} // close menu on link click
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
