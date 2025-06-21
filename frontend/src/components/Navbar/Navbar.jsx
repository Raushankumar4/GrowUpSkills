import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../Auth/logout";
import { useUserContext } from "@/context/UserContext";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const { fetchProfile } = useUserContext();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="./SkillHub.png"
            alt="SkillHub Logo"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:block w-full max-w-md mx-6">
          <SearchBar />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <Link
              to="/"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              Courses
            </Link>
          </nav>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-sky-100 dark:hover:bg-zinc-800 transition"
          >
            {isDark ? (
              <Sun className="w-[18px] h-[18px] text-sky-600" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-sky-600" />
            )}
          </Button>

          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:scale-105 transition-transform">
                <AvatarImage src="./developer-avatar.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 rounded-xl shadow-xl p-1"
            >
              <DropdownMenuItem asChild>
                <Link
                  to="/dashboard"
                  onClick={() => fetchProfile()}
                  className="w-full px-2 py-1.5 text-sm rounded-md hover:bg-sky-100 dark:hover:bg-zinc-800 transition"
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/"
                  onClick={() => handleLogout(navigate)}
                  className="w-full px-2 py-1.5 text-sm rounded-md hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-300 transition"
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white dark:bg-zinc-900">
                <div className="mt-8 space-y-5 text-base font-semibold text-gray-700 dark:text-gray-200">
                  <Link
                    to="/"
                    className="block hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
                  >
                    Home
                  </Link>
                  <Link
                    to="/courses"
                    className="block hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
                  >
                    Courses
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
