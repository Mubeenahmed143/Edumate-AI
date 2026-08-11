import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiMessageCircle,
  FiFileText,
  FiHelpCircle,
  FiBriefcase,
  FiCode,
  FiCalendar,
  FiX,
  FiStar,
} from "react-icons/fi";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: FiHome,
  },
  {
    name: "AI Chat",
    path: "/chat",
    icon: FiMessageCircle,
  },
  {
    name: "AI Notes",
    path: "/notes",
    icon: FiFileText,
  },
  {
    name: "Quiz Generator",
    path: "/quiz",
    icon: FiHelpCircle,
  },
  {
    name: "Career Mentor",
    path: "/career",
    icon: FiBriefcase,
  },
  {
    name: "Coding Assistant",
    path: "/coding",
    icon: FiCode,
  },
  {
    name: "Study Planner",
    path: "/planner",
    icon: FiCalendar,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          
          {/* Mobile Close */}
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="font-semibold text-slate-700 dark:text-white">
              Menu
            </span>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* AI Badge */}
          <div className="mb-5 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-4 text-white shadow-lg shadow-blue-500/20">
            <div className="mb-2 flex items-center gap-2">
              <FiStar size={18} />

              <span className="text-sm font-semibold">
                EduMate AI
              </span>
            </div>

            <p className="text-xs leading-5 text-blue-100">
              Your intelligent study companion.
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon size={19} />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
            <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
              <p className="text-xs font-semibold text-slate-700 dark:text-white">
                AI Usage
              </p>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500"></div>
              </div>

              <p className="mt-2 text-[11px] text-slate-500">
                35% of free usage used
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;