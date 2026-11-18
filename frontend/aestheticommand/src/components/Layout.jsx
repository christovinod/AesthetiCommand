
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Terminal,
  Home,
  Sparkles,
  BookOpen,
  Clock3,
  Bookmark,
  GraduationCap,
  Settings,
  Search,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Customize", icon: Home },
  { to: "/assistant", label: "AI Command Assistant", icon: Sparkles },
  { to: "/library", label: "Command Library", icon: BookOpen },
  { to: "/history", label: "History", icon: Clock3 },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/learn", label: "Learn", icon: GraduationCap },
];

const titles = {
  "/": "Customize",
  "/assistant": "AI command assistant",
  "/library": "Command library",
  "/history": "History",
  "/saved": "Saved commands",
  "/learn": "Learn",
  "/settings": "Settings",
};

function getHistoryCount() {
  try {
    return JSON.parse(localStorage.getItem("ac-history") || "[]").length;
  } catch {
    return 0;
  }
}

export default function Layout() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [historyCount] = useState(getHistoryCount);

  const title = titles[location.pathname] || "AesthetiCommand";

  return (
    <div className="min-h-screen bg-[#080714] text-[#f2efff]">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-white/10 bg-[#0d0b19] px-4 py-6 md:flex">

        {/* Brand */}
        <NavLink to="/" className="mb-10 flex shrink-0 items-center gap-3 px-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <Terminal size={23} />
          </span>

          <span className="text-lg font-bold tracking-tight">
            Aestheti<span className="text-violet-400">Command</span>
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 space-y-2">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "border border-violet-500/20 bg-violet-500/15 text-violet-300"
                    : "border border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    className={
                      isActive
                        ? "text-violet-400"
                        : "text-gray-500 group-hover:text-white"
                    }
                  />

                  <span className="flex-1">{label}</span>

                  {to === "/history" && (
                    <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-400">
                      {historyCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Bottom */}
        <div className="mt-auto shrink-0 space-y-5 pt-6">

          {/* Quick Tip */}
          <div className="flex gap-3 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-violet-400" />

            <div>
              <p className="text-sm font-semibold text-white">
                Quick tip
              </p>

              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                Press ⌘ K to generate
              </p>
            </div>
          </div>

          {/* Settings */}
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                isActive
                  ? "bg-violet-500/15 text-violet-300"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>

          {/* Profile */}
          <div className="flex items-center gap-3 border-t border-white/10 px-2 pt-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/20 text-sm font-bold text-violet-300">
              AK
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                Alex Kim
              </p>

              <p className="text-xs text-gray-500">
                Student plan
              </p>
            </div>

            <ChevronRight size={18} className="text-gray-500" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-col md:ml-64">

        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-white/10 bg-[#080714]/95 px-5 py-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-8">

          {/* Page Title */}
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-violet-400">
              AESTHETICOMMAND
            </span>

            <h1 className="mt-1 text-xl font-semibold tracking-tight text-white">
              {title}
            </h1>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-white/10 bg-[#12111f] px-4 py-2.5 transition focus-within:border-violet-500/60 md:w-72 md:flex-none">
              <Search size={17} className="shrink-0 text-gray-500" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands"
                className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              />

              <kbd className="hidden shrink-0 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-400 sm:block">
                ⌘ K
              </kbd>
            </label>

            {/* Settings Button */}
            <NavLink
              to="/settings"
              aria-label="Settings"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#12111f] text-gray-400 transition hover:border-violet-500/40 hover:text-violet-300"
            >
              <Settings size={19} />
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet context={{ globalSearch: search }} />
        </main>
      </div>
    </div>
  );
}
