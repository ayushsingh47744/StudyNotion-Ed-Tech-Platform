import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } 
      catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileCatalogOpen(false);
  }, [location]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`relative z-50 flex h-16 items-center justify-center border-b border-richblack-700/60 backdrop-blur-sm ${
        location.pathname !== "/" ? "bg-richblack-800/95" : "bg-richblack-900/40"
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/" className="transition-transform duration-200 hover:scale-[1.03]">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 py-2 text-[15px] font-medium transition-colors duration-150 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25 hover:text-richblack-50"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown className="transition-transform duration-200 group-hover:rotate-180" />

                    {/* Dropdown */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] w-[260px] translate-x-[-50%] translate-y-[3em] rounded-xl border border-richblack-700 bg-richblack-800 p-2 opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-[2.4em] group-hover:opacity-100 lg:w-[300px]">
                      {/* little pointer arrow */}
                      <div className="absolute left-[50%] top-0 -z-10 h-4 w-4 translate-x-[-50%] translate-y-[-40%] rotate-45 rounded-sm border-l border-t border-richblack-700 bg-richblack-800"></div>

                      {loading ? (
                        <p className="py-6 text-center text-sm text-richblack-300">
                          Loading...
                        </p>
                      ) : subLinks && subLinks.length ? (
                        <div className="flex flex-col gap-1">
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="group/item flex items-center justify-between rounded-lg px-4 py-3 text-richblack-100 transition-all duration-150 hover:bg-richblack-700 hover:pl-5 hover:text-yellow-25"
                                key={i}
                              >
                                <p className="text-sm font-medium">{subLink.name}</p>
                                <span className="opacity-0 transition-opacity duration-150 group-hover/item:opacity-100">
                                  →
                                </span>
                              </Link>
                            ))}
                        </div>
                      ) : (
                        <p className="py-6 text-center text-sm text-richblack-300">
                          No Courses Found
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`relative py-2 text-[15px] font-medium transition-colors duration-150 after:absolute after:-bottom-[1px] after:left-0 after:h-[2px] after:bg-yellow-25 after:transition-all after:duration-200 ${
                        matchRoute(link?.path)
                          ? "text-yellow-25 after:w-full"
                          : "text-richblack-25 after:w-0 hover:text-richblack-50 hover:after:w-full"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard - Desktop */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative transition-transform duration-150 hover:scale-110">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 transition-all duration-150 hover:border-richblack-500 hover:bg-richblack-700">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 transition-all duration-150 hover:border-richblack-500 hover:bg-richblack-700">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile: cart icon + hamburger */}
        <div className="flex items-center gap-x-4 md:hidden">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="mr-1"
          >
            {mobileMenuOpen ? (
              <AiOutlineClose fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute left-0 top-16 z-[1000] w-full border-b border-richblack-700 bg-richblack-800 md:hidden">
          <ul className="flex flex-col gap-y-1 px-6 py-4 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div>
                    <button
                      onClick={() => setMobileCatalogOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between py-3 text-[15px] font-medium"
                    >
                      <span>{link.title}</span>
                      <BsChevronDown
                        className={`transition-transform duration-200 ${
                          mobileCatalogOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileCatalogOpen && (
                      <div className="flex flex-col gap-1 pb-2 pl-4">
                        {loading ? (
                          <p className="py-3 text-sm text-richblack-300">Loading...</p>
                        ) : subLinks && subLinks.length ? (
                          subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg px-2 py-2 text-sm text-richblack-100 hover:text-yellow-25"
                                key={i}
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="py-3 text-sm text-richblack-300">
                            No Courses Found
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`py-3 text-[15px] font-medium ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}

            {/* Login/Signup - Mobile */}
            {token === null && (
              <li className="mt-2 flex flex-col gap-y-2 border-t border-richblack-700 pt-4">
                <Link to="/login">
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-900 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-900 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;