"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-light dark:hover:bg-dark"
    >
      <Sun className="h-5 w-5 text-dark dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-5 w-5 text-white dark:block" aria-hidden="true" />
    </button>
  );
};

export default ThemeToggler;
