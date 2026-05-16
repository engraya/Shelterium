"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const pathname = usePathname();

  return (
    <header
      className={`left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${
        sticky
          ? "fixed z-[9999] bg-white/90 shadow-sticky backdrop-blur-md dark:bg-gray-dark/90 dark:shadow-sticky-dark"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-48 max-w-full px-4 xl:mr-12">
            <Link href="/" className={`block w-full ${sticky ? "py-4 lg:py-2" : "py-6"}`}>
              <Logo iconSize={30} textClassName="text-base" />
            </Link>
          </div>

          {/* Desktop nav + actions */}
          <div className="flex w-full items-center justify-between px-4">
            {/* Desktop nav */}
            <nav className="hidden lg:block">
              <ul className="flex space-x-10">
                {menuData.map((menuItem, index) => (
                  <li key={index} className="group relative">
                    {menuItem.path ? (
                      <Link
                        href={menuItem.path}
                        aria-current={pathname === menuItem.path ? "page" : undefined}
                        className={`flex py-6 text-sm font-medium transition-colors duration-150 ${
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
                          className="flex cursor-pointer items-center gap-1 py-6 text-sm font-medium text-dark transition-colors duration-150 group-hover:text-primary dark:text-white/70 dark:group-hover:text-white"
                        >
                          {menuItem.title}
                          <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <div className="invisible absolute left-0 top-full z-50 min-w-[200px] rounded-lg bg-white p-2 opacity-0 shadow-two transition-all duration-200 group-hover:visible group-hover:top-[calc(100%-4px)] group-hover:opacity-100 dark:bg-dark">
                          {menuItem.submenu?.map((submenuItem, i) => (
                            <Link
                              href={submenuItem.path ?? "#"}
                              key={i}
                              className="block rounded-md px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-light hover:text-primary dark:text-white/70 dark:hover:bg-dark dark:hover:text-white"
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
              <Link href="/signup" className="hidden md:block">
                <Button size="sm" variant="primary">
                  Sign Up
                </Button>
              </Link>
              <ThemeToggler />

              {/* Mobile menu trigger */}
              <Sheet>
                <SheetTrigger
                  aria-label="Open menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-light dark:hover:bg-dark lg:hidden"
                >
                  <Menu className="h-5 w-5 text-dark dark:text-white" aria-hidden="true" />
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-white dark:bg-dark p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex h-full flex-col">
                    {/* Sheet header */}
                    <div className="border-b border-stroke-stroke px-6 py-5 dark:border-stroke-dark">
                      <Link href="/">
                        <Logo iconSize={26} textClassName="text-sm" />
                      </Link>
                    </div>

                    {/* Sheet nav links */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                      <ul className="space-y-1">
                        {menuData.map((menuItem, index) => (
                          <li key={index}>
                            {menuItem.path ? (
                              <Link
                                href={menuItem.path}
                                aria-current={pathname === menuItem.path ? "page" : undefined}
                                className={`flex rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                                  pathname === menuItem.path
                                    ? "bg-primary/10 text-primary"
                                    : "text-dark hover:bg-gray-light hover:text-primary dark:text-white/70 dark:hover:bg-dark dark:hover:text-white"
                                }`}
                              >
                                {menuItem.title}
                              </Link>
                            ) : (
                              <div>
                                <button
                                  type="button"
                                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-dark transition-colors hover:bg-gray-light dark:text-white/70"
                                >
                                  {menuItem.title}
                                  <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                  />
                                </button>
                                {openIndex === index && menuItem.submenu && (
                                  <ul className="ml-4 mt-1 space-y-1 border-l border-stroke-stroke pl-4 dark:border-stroke-dark">
                                    {menuItem.submenu.map((submenuItem, i) => (
                                      <li key={i}>
                                        <Link
                                          href={submenuItem.path ?? "#"}
                                          className="block rounded-md px-3 py-2 text-sm text-dark/70 transition-colors hover:text-primary dark:text-white/50 dark:hover:text-white"
                                        >
                                          {submenuItem.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Sheet footer CTA */}
                    <div className="border-t border-stroke-stroke px-6 py-5 dark:border-stroke-dark">
                      <div className="flex flex-col gap-3">
                        <Link
                          href="/signin"
                          className="text-center text-sm font-medium text-dark transition-colors hover:text-primary dark:text-white/70 dark:hover:text-white"
                        >
                          Sign In
                        </Link>
                        <Link href="/signup">
                          <Button variant="primary" size="md" className="w-full">
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
