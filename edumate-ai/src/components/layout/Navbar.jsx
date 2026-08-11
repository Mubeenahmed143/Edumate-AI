import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMenu,
  FiBell,
  FiSun,
  FiMoon,
  FiUser,
} from "react-icons/fi";

function Navbar({ onMenuClick }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FiMenu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
              E
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                EduMate <span className="text-blue-600">AI</span>
              </h1>
              <p className="hidden text-[10px] text-slate-500 sm:block">
                Smart Student Assistant
              </p>
            </div>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme */}
          <button
            onClick={toggleDarkMode}
            className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Toggle theme"
          >
            {darkMode ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>

          {/* Notifications */}
          <button
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Notifications"
          >
            <FiBell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950"></span>
          </button>

          {/* User */}
          <button className="flex items-center gap-2 rounded-xl p-1.5 pr-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-semibold text-white">
              S
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Student
              </p>
              <p className="text-[11px] text-slate-500">
                Free Account
              </p>
            </div>

            <FiUser className="hidden text-slate-400 sm:block" size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;