"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { appLogo } from "assets";
import Button from "@/components/ui/Button";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen((prev) => !prev);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const pathname = usePathname();

  return (
    <header
      className={`left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${
        sticky
          ? "fixed z-[9999] bg-white/80 shadow-sticky backdrop-blur-md dark:bg-gray-dark/80 dark:shadow-sticky-dark"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-48 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`block w-full ${sticky ? "py-4 lg:py-2" : "py-6"}`}
            >
              <Image
                src={appLogo}
                alt="Propellio AI"
                width={140}
                height={30}
                className="w-full"
                priority
              />
            </Link>
          </div>

          {/* Nav + actions */}
          <div className="flex w-full items-center justify-between px-4">
            {/* Mobile toggle */}
            <button
              onClick={navbarToggleHandler}
              id="navbarToggler"
              aria-label={navbarOpen ? "Close menu" : "Open menu"}
              aria-expanded={navbarOpen}
              aria-controls="navbarCollapse"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-2 ring-primary transition-colors hover:bg-gray-light focus-visible:ring-2 dark:hover:bg-dark lg:hidden"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[26px] bg-black transition-all duration-300 dark:bg-white ${
                  navbarOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[26px] bg-black transition-all duration-300 dark:bg-white ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[26px] bg-black transition-all duration-300 dark:bg-white ${
                  navbarOpen ? "top-[-8px] -rotate-45" : ""
                }`}
              />
            </button>

            {/* Nav */}
            <nav
              id="navbarCollapse"
              className={`navbar absolute right-0 z-30 w-[260px] rounded-lg border border-body-color/20 bg-white px-6 py-4 shadow-two transition-all duration-300 dark:border-body-color/10 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent lg:shadow-none lg:!opacity-100 dark:lg:bg-transparent ${
                navbarOpen ? "visible top-full opacity-100" : "invisible top-[110%] opacity-0"
              }`}
            >
              <ul className="block lg:flex lg:space-x-10">
                {menuData.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        aria-current={pathname === menuItem.path ? "page" : undefined}
                        className={`flex py-2 text-sm font-medium transition-colors duration-150 lg:inline-flex lg:px-0 lg:py-6 ${
                          pathname === menuItem.path
                            ? "text-primary"
                            : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                        }`}
                      >
                        {menuItem.title}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSubmenu(index)}
                          aria-expanded={openIndex === index}
                          className="flex w-full cursor-pointer items-center justify-between py-2 text-sm font-medium text-dark transition-colors duration-150 group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:inline-flex lg:w-auto lg:px-0 lg:py-6"
                        >
                          {menuItem.title}
                          <span className="pl-2">
                            <svg width="16" height="16" viewBox="0 0 25 24" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </button>
                        <div
                          className={`submenu left-0 top-full rounded-lg bg-white shadow-two transition-all duration-200 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:w-[220px] lg:p-4 lg:opacity-0 lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100 ${
                            openIndex === index ? "block" : "hidden lg:block"
                          }`}
                        >
                          {menuItem.submenu?.map((submenuItem, i) => (
                            <Link
                              href={submenuItem.path ?? "#"}
                              key={i}
                              className="block rounded-md py-2.5 text-sm text-dark transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                            >
                              {submenuItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Auth + Theme */}
            <div className="flex items-center gap-3 pr-16 lg:pr-0">
              <Link
                href="/signin"
                className="hidden text-sm font-medium text-dark transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white md:block"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="hidden md:block"
              >
                <Button size="sm" variant="primary">
                  Sign Up
                </Button>
              </Link>
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
