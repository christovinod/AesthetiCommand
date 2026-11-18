
import { useMemo, useState } from "react";
import {
  Search,
  Terminal,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import { commandItems } from "../data/commands";

const categories = [
  "All",
  "Git",
  "Files",
  "Networking",
  "Processes",
  "Permissions",
];

export default function Library() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  // Filter commands by category and search query
  const filtered = useMemo(() => {
    return commandItems.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchContent =
        `${item.title} ${item.command} ${item.description} ${item.category} ${item.platforms.join(" ")}`;

      const matchesSearch = searchContent
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [query, category]);

  // Risk badge styling
  const getRiskStyle = (risk) => {
    if (risk === "Safe") {
      return {
        className:
          "border-green-500/20 bg-green-500/10 text-green-400",
        Icon: ShieldCheck,
      };
    }

    if (risk === "Caution") {
      return {
        className:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
        Icon: AlertTriangle,
      };
    }

    return {
      className:
        "border-red-500/20 bg-red-500/10 text-red-400",
      Icon: ShieldAlert,
    };
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-[#f2efff]">

      {/* Page Heading */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
            <Terminal size={14} />
            COMMAND LIBRARY
          </span>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Learn, explore, and run with confidence.
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
            Clear explanations for the commands developers use every day.
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          {filtered.length} {filtered.length === 1 ? "command" : "commands"}
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#12111f] px-4 py-4 transition focus-within:border-violet-500/50">
        <Search size={19} className="shrink-0 text-gray-500" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search commands, tasks, or syntax..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-xs text-gray-500 transition hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Browse categories
        </p>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                category === item
                  ? "border-violet-500 bg-violet-500/15 text-violet-300"
                  : "border-white/10 bg-[#12111f] text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Command Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {filtered.map((item) => {
          const risk = getRiskStyle(item.risk);
          const RiskIcon = risk.Icon;

          return (
            <article
              key={item.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#12111f] p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-950/20"
            >

              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Terminal size={19} />
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${risk.className}`}
                >
                  <RiskIcon size={13} />
                  {item.risk}
                </span>
              </div>

              {/* Command Details */}
              <div className="mt-5 flex-1">
                <h3 className="text-lg font-semibold text-white transition group-hover:text-violet-300">
                  {item.title}
                </h3>

                <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#090817] p-4">
                  <code className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-violet-300">
                    {item.command}
                  </code>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">

                <span className="rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300">
                  {item.category}
                </span>

                <span className="text-xs text-gray-500">
                  {item.platforms.join(", ")}
                </span>

                <ArrowRight
                  size={17}
                  className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-violet-400"
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty Search Results */}
      {filtered.length === 0 && (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12111f]/60 p-10 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
            <Search size={24} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No commands found
          </h3>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Try another search term or select a different category.
          </p>

          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
