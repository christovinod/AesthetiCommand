
import { useState } from "react";
import {
  Bookmark,
  Copy,
  Trash2,
  Check,
  Terminal,
  Sparkles,
} from "lucide-react";

export default function Saved() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ac-saved") || "[]");
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState(null);

  // Remove a saved command
  const remove = (id) => {
    const next = items.filter((item) => item.id !== id);

    setItems(next);
    localStorage.setItem("ac-saved", JSON.stringify(next));

    if (copiedId === id) {
      setCopiedId(null);
    }
  };

  // Copy command to clipboard
  const copyCommand = async (item) => {
    try {
      await navigator.clipboard.writeText(item.command);
      setCopiedId(item.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy command:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-[#f2efff]">

      {/* Page Heading */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
            <Bookmark size={14} />
            YOUR COLLECTION
          </span>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Commands worth keeping.
          </h2>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
            Save useful commands from the AI assistant for quick access.
          </p>
        </div>

        <span className="inline-flex w-fit items-center rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300">
          {items.length} {items.length === 1 ? "saved command" : "saved commands"}
        </span>
      </div>

      {/* Saved Commands */}
      {items.length > 0 ? (
        <div className="space-y-4">

          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#12111f] p-5 transition hover:border-violet-500/30 sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                {/* Command Information */}
                <div className="min-w-0 flex-1 space-y-4">

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                      <Terminal size={19} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-white">
                        {item.prompt}
                      </h3>

                      <span className="mt-1 inline-block text-xs text-gray-500">
                        {item.os}
                      </span>
                    </div>
                  </div>

                  {/* Terminal Command */}
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#090817] p-4">
                    <code className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-violet-300">
                      {item.command}
                    </code>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex shrink-0 items-center gap-2 sm:pt-1">

                  <button
                    onClick={() => copyCommand(item)}
                    aria-label="Copy command"
                    title="Copy command"
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                      copiedId === item.id
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : "border-white/10 bg-white/5 text-gray-400 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300"
                    }`}
                  >
                    {copiedId === item.id ? (
                      <Check size={17} />
                    ) : (
                      <Copy size={17} />
                    )}
                  </button>

                  <button
                    onClick={() => remove(item.id)}
                    aria-label="Remove saved command"
                    title="Remove saved command"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}

        </div>
      ) : (

        /* Empty State */
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#12111f]/60 px-6 py-12 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
            <Bookmark size={27} />
          </div>

          <h3 className="mt-6 text-xl font-semibold text-white">
            No saved commands yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
            Generate a command using the AI assistant and select Save to keep it here for quick access.
          </p>

          <a
            href="/assistant"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <Sparkles size={16} />
            Generate a command
          </a>
        </div>
      )}
    </div>
  );
}
