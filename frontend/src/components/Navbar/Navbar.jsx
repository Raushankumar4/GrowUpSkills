import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
  const navigate = useNavigate()

  const { fetchProfile } = useUserContext()

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

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
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-white/20 dark:border-black/20 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          MyLogo
        </a>

        {/* Center: Search Bar */}
        <div className="w-full max-w-md mx-4 hidden md:block">
          <SearchBar />
        </div>

        {/* Right: Navigation Links, Theme Toggle, Avatar, Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-6 text-sm text-gray-700 dark:text-gray-200 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/courses" className="hover:text-blue-600">Courses</Link>

          </nav>

          {/* Theme Toggle Button */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Avatar Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link onClick={() => {
                  fetchProfile()
                }} to="/dashboard"> Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link onClick={() => {
                  handleLogout(navigate)
                }}>Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="space-y-4 mt-6 text-sm">
                  <Link to="/" className="block">Home</Link>
                  <Link to="/courses" className="block">Courses</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

