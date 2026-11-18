
import { useState } from "react";
import {
  Clock3,
  Copy,
  Trash2,
  Terminal,
  Check,
  History as HistoryIcon,
} from "lucide-react";

export default function History() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ac-history") || "[]");
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState(null);

  // Clear all history
  const clear = () => {
    localStorage.removeItem("ac-history");
    setItems([]);
  };

  // Copy individual command
  const copyCommand = async (item) => {
    try {
      await navigator.clipboard.writeText(item.command);
      setCopiedId(item.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1400);
    } catch (error) {
      console.error("Unable to copy command:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-[#f2efff]">

      {/* Page Heading */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
            <Clock3 size={14} />
            YOUR ACTIVITY
          </span>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Recently generated commands.
          </h2>

          <p className="text-sm text-gray-400">
            Your command history is stored in this browser.
          </p>
        </div>

        {/* Clear History Button */}
        {items.length > 0 && (
          <button
            onClick={clear}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20"
          >
            <Trash2 size={16} />
            Clear history
          </button>
        )}
      </div>

      {/* History Count */}
      {items.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#12111f] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <HistoryIcon size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Command history
              </p>
              <p className="text-xs text-gray-500">
                Your recently generated commands
              </p>
            </div>
          </div>

          <span className="rounded-lg bg-violet-500/15 px-3 py-1.5 text-sm font-semibold text-violet-300">
            {items.length} {items.length === 1 ? "command" : "commands"}
          </span>
        </div>
      )}

      {/* History List */}
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#12111f] p-5 transition hover:border-violet-500/30 md:p-6"
            >
              {/* Item Header */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Terminal size={19} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words text-sm font-semibold text-white md:text-base">
                      {item.prompt}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="rounded-md bg-white/5 px-2 py-1">
                        {item.os}
                      </span>

                      {item.shell && (
                        <span className="rounded-md bg-white/5 px-2 py-1">
                          {item.shell}
                        </span>
                      )}

                      <span>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleString()
                          : "Date unavailable"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => copyCommand(item)}
                  aria-label="Copy command"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:border-violet-500/40 hover:text-violet-300"
                >
                  {copiedId === item.id ? (
                    <Check size={17} />
                  ) : (
                    <Copy size={17} />
                  )}
                </button>
              </div>

              {/* Command */}
              <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#090817] p-4">
                <code className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-violet-300 md:text-sm">
                  {item.command}
                </code>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <Terminal size={13} />
                  Generated command
                </span>

                <button
                  onClick={() => copyCommand(item)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-violet-400 transition hover:text-violet-300"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy command
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12111f]/60 px-6 py-12 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
            <Clock3 size={28} />
          </div>

          <h3 className="text-lg font-semibold text-white">
            No history yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
            Commands you generate with the AI assistant will appear here.
            Start generating commands to build your history.
          </p>

          <a
            href="/assistant"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <Terminal size={16} />
            Generate your first command
          </a>
        </div>
      )}
    </div>
  );
}
