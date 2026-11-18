
import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Bookmark,
  Terminal,
  AlertTriangle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const suggestions = [
  "Create a new Git branch",
  "Find all .txt files in a folder",
  "Check which process is using a port",
];

const operatingSystems = ["macOS", "Windows", "Linux"];
const shells = ["Bash", "Zsh", "PowerShell", "Command Prompt"];
const levels = ["Beginner", "Intermediate", "Advanced"];

export default function Assistant() {
  const [prompt, setPrompt] = useState(
    "Create a new Git branch called feature-login"
  );

  const [os, setOs] = useState("macOS");
  const [shell, setShell] = useState("Zsh");
  const [level, setLevel] = useState("Beginner");

  const [command, setCommand] = useState("");
  const [explanation, setExplanation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Generate command using AI
  const generate = async (value = prompt) => {
    if (!value.trim() || loading) return;

    setLoading(true);
    setError("");
    setCommand("");
    setExplanation("");
    setCopied(false);
    setSaved(false);

    try {
      const response = await fetch(
        `${API_URL}/api/${encodeURIComponent(os)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userPrompt: `${value}
Shell: ${shell}.
Experience level: ${level}.
Return a safe, compatible command.`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Request failed (${response.status})`
        );
      }

      const cleaned = String(data.command || "")
        .trim()
        .replace(/^```[\w-]*\s*/i, "")
        .replace(/\s*```$/, "")
        .replace(/^# Command for:\s*/i, "")
        .trim();

      if (!cleaned) {
        throw new Error("The AI returned an empty command.");
      }

      setCommand(cleaned);

      setExplanation(
        data.explanation ||
          "Review the command and replace any placeholders before running it."
      );

      // Save to history
      const history = JSON.parse(
        localStorage.getItem("ac-history") || "[]"
      );

      localStorage.setItem(
        "ac-history",
        JSON.stringify([
          {
            id: Date.now(),
            prompt: value,
            os,
            shell,
            command: cleaned,
            createdAt: new Date().toISOString(),
          },
          ...history,
        ].slice(0, 50))
      );
    } catch (e) {
      setError(e.message || "Unable to generate a command.");
    } finally {
      setLoading(false);
    }
  };

  // Copy command
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1400);
    } catch (e) {
      console.error("Copy failed:", e);
      setError("Unable to copy command. Please try again.");
    }
  };

  // Save command
  const save = () => {
    try {
      const existing = JSON.parse(
        localStorage.getItem("ac-saved") || "[]"
      );

      if (existing.some((item) => item.command === command)) {
        setSaved(true);
        return;
      }

      localStorage.setItem(
        "ac-saved",
        JSON.stringify([
          {
            id: Date.now(),
            prompt,
            os,
            command,
          },
          ...existing,
        ])
      );

      setSaved(true);
    } catch (e) {
      console.error("Save failed:", e);
      setError("Unable to save command.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-[#f2efff]">

      {/* Page Heading */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
          <Sparkles size={14} />
          AI COMMAND GENERATOR
        </div>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          What do you want to do?
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Describe the outcome you need. We'll find the right command
          for your setup.
        </p>
      </div>

      {/* Main Form */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#12111f]">

        <div className="border-b border-white/10 px-6 py-5">
          <h3 className="font-semibold text-white">
            Describe your task
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Tell Marlow what you want your terminal to accomplish.
          </p>
        </div>

        <div className="space-y-7 p-6">

          {/* Prompt */}
          <div>
            <label
              htmlFor="task"
              className="mb-3 block text-sm font-medium text-gray-200"
            >
              Your request
            </label>

            <textarea
              id="task"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Find all PDF files modified this week"
              className="min-h-36 w-full resize-y rounded-xl border border-white/10 bg-[#090817] p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {/* Operating System */}
          <div>
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-200">
                Operating system
              </label>

              <p className="mt-1 text-xs text-gray-500">
                Used to ensure command compatibility.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {operatingSystems.map((item) => (
                <button
                  key={item}
                  onClick={() => setOs(item)}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                    os === item
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {os === item && (
                    <Check size={14} className="mr-1 inline" />
                  )}
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Shell */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-200">
              Shell
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {shells.map((item) => (
                <button
                  key={item}
                  onClick={() => setShell(item)}
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    shell === item
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {shell === item && (
                    <Check size={13} className="mr-1 inline" />
                  )}
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-200">
                Experience level
              </label>

              <p className="mt-1 text-xs text-gray-500">
                Controls how detailed the explanation should be.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {levels.map((item) => (
                <button
                  key={item}
                  onClick={() => setLevel(item)}
                  className={`rounded-xl border px-3 py-3 text-sm transition ${
                    level === item
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {level === item && (
                    <Check size={13} className="mr-1 inline" />
                  )}
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            disabled={loading || !prompt.trim()}
            onClick={() => generate()}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/10 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles size={18} />

            {loading ? "Generating command..." : "Generate Command"}

            <ArrowRight size={18} />
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Suggested Prompts */}
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Need inspiration?
        </p>

        <div className="flex flex-wrap gap-3">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => {
                setPrompt(item);
                generate(item);
              }}
              disabled={loading}
              className="rounded-full border border-white/10 bg-[#12111f] px-4 py-2.5 text-xs text-gray-400 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-violet-300 disabled:opacity-50"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Generated Result */}
      {command && (
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#12111f]">

          {/* Result Heading */}
          <div className="flex flex-wrap items-center gap-4 border-b border-white/10 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Terminal size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-white">
                Generated command
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {os} · {shell} · {level}
              </p>
            </div>

            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              Review first
            </span>
          </div>

          {/* Command Output */}
          <div className="space-y-5 p-6">

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#090817] p-5">
              <code className="whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-violet-300">
                {command}
              </code>
            </div>

            {/* Explanation */}
            {explanation && (
              <div className="rounded-xl border border-white/10 bg-[#090817] p-4">
                <h4 className="mb-2 text-sm font-semibold text-white">
                  Explanation
                </h4>

                <p className="text-sm leading-relaxed text-gray-400">
                  {explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={save}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-violet-500/40 hover:text-white"
              >
                {saved ? <Check size={16} /> : <Bookmark size={16} />}
                {saved ? "Saved" : "Save command"}
              </button>

              <button
                onClick={copy}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy command"}
              </button>
            </div>

            <p className="text-center text-xs leading-relaxed text-gray-500">
              Review the command and replace placeholders before executing it.
              AesthetiCommand never runs commands for you.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
