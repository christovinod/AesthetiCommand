import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Terminal,
} from "lucide-react";

const colors = [
  { name: "White", value: "#f8fafc" },
  { name: "Violet", value: "#a78bfa" },
  { name: "Blue", value: "#60a5fa" },
  { name: "Cyan", value: "#22d3ee" },
  { name: "Green", value: "#4ade80" },
  { name: "Yellow", value: "#facc15" },
  { name: "Red", value: "#fb7185" },
];

const backgrounds = [
  { name: "None", value: "transparent" },
  { name: "Slate", value: "#334155" },
  { name: "Violet", value: "#6d28d9" },
  { name: "Blue", value: "#1d4ed8" },
  { name: "Green", value: "#166534" },
];

export default function Customize() {
  const [text, setText] = useState("Welcome to my terminal");
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [color, setColor] = useState("#a78bfa");
  const [background, setBackground] = useState("transparent");
  const [copied, setCopied] = useState(false);

  const ansiColor = {
    "#f8fafc": "37",
    "#a78bfa": "35",
    "#60a5fa": "34",
    "#22d3ee": "36",
    "#4ade80": "32",
    "#facc15": "33",
    "#fb7185": "31",
  }[color] || "35";

  const ansiBg = {
    transparent: "",
    "#334155": ";44",
    "#6d28d9": ";45",
    "#1d4ed8": ";44",
    "#166534": ";42",
  }[background] || "";

  const command = `printf "\\033[${bold ? "1;" : ""}${italic ? "3;" : ""}${underline ? "4;" : ""}${ansiColor}${ansiBg}m${text.replaceAll('"', '\\"')}\\033[0m\\n"`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Unable to copy command.");
    }
  };

  const reset = () => {
    setText("Welcome to my terminal");
    setBold(true);
    setItalic(false);
    setUnderline(false);
    setColor("#a78bfa");
    setBackground("transparent");
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-5 md:p-8 text-[#f2efff]">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-violet-300 mb-4">
            <Terminal size={14} />
            CLI APPEARANCE STUDIO
          </span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Design terminal text your way.
          </h2>

          <p className="text-sm md:text-base text-gray-400 max-w-2xl">
            Format text visually, preview it instantly, then copy the exact
            command your terminal can render.
          </p>
        </div>

        <Link
          to="/assistant"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-3 text-sm font-semibold transition-colors"
        >
          <Sparkles size={16} />
          Open AI command assistant
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Formatting Panel */}
        <section className="rounded-2xl border border-white/10 bg-[#12111f] overflow-hidden">

          <div className="flex items-center gap-4 p-6 border-b border-white/10">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300 font-bold">
              01
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">Format your text</h3>
              <p className="text-xs text-gray-400 mt-1">
                Use the controls below or ask AI for a style.
              </p>
            </div>

            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          <div className="p-6 space-y-6">

            {/* Text Input */}
            <div>
              <label
                htmlFor="terminal-text"
                className="block text-sm font-medium mb-3"
              >
                Terminal text
              </label>

              <textarea
                id="terminal-text"
                maxLength={120}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-28 resize-none rounded-xl border border-white/10 bg-[#090817] p-4 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                placeholder="Enter your terminal text..."
              />

              <div className="text-right text-xs text-gray-500 mt-2">
                {text.length} / 120
              </div>
            </div>

            {/* Text Style */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Text style
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setBold(!bold)}
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    bold
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30"
                  }`}
                >
                  <b>B</b> Bold
                </button>

                <button
                  onClick={() => setItalic(!italic)}
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    italic
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30"
                  }`}
                >
                  <i>I</i> Italic
                </button>

                <button
                  onClick={() => setUnderline(!underline)}
                  className={`rounded-lg border px-4 py-2 text-sm transition ${
                    underline
                      ? "border-violet-500 bg-violet-500/15 text-violet-300"
                      : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30"
                  }`}
                >
                  <u>U</u> Underline
                </button>
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Text color
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.value)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-sm transition ${
                      color === c.value
                        ? "border-violet-500 bg-violet-500/10 text-white"
                        : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: c.value }}
                    />
                    {c.name}
                    {color === c.value && (
                      <Check size={14} className="ml-auto text-violet-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Background
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {backgrounds.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setBackground(c.value)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-sm transition ${
                      background === c.value
                        ? "border-violet-500 bg-violet-500/10 text-white"
                        : "border-white/10 bg-[#090817] text-gray-400 hover:border-white/30"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{
                        background:
                          c.value === "transparent"
                            ? "linear-gradient(135deg,#171720 45%,#fb7185 46%,#fb7185 53%,#171720 54%)"
                            : c.value,
                      }}
                    />
                    {c.name}
                    {background === c.value && (
                      <Check size={14} className="ml-auto text-violet-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Preview Column */}
        <div className="flex flex-col gap-6">

          {/* Terminal Preview */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#12111f]">

            <div className="flex items-center gap-3 border-b border-white/10 bg-[#191729] px-5 py-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <span className="flex-1 text-center text-xs text-gray-400">
                Live terminal preview
              </span>

              <span className="text-xs font-semibold text-green-400">
                LIVE
              </span>
            </div>

            <div className="min-h-64 space-y-5 bg-[#090817] p-6 font-mono text-sm">
              <div className="text-green-400">
                alex@macbook ~ %
              </div>

              <div
                className="inline-block max-w-full whitespace-pre-wrap break-words rounded px-1 py-1"
                style={{
                  color,
                  backgroundColor: background,
                  fontWeight: bold ? 700 : 400,
                  fontStyle: italic ? "italic" : "normal",
                  textDecoration: underline ? "underline" : "none",
                }}
              >
                {text || "Your text preview"}
              </div>

              <div className="flex items-center text-green-400">
                alex@macbook ~ %
                <span className="ml-2 h-4 w-2 animate-pulse bg-violet-400" />
              </div>
            </div>
          </section>

          {/* Command Panel */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#12111f]">

            <div className="flex items-center gap-4 border-b border-white/10 p-6">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300 font-bold">
                02
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">
                  Terminal-ready command
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Compatible with Bash and Zsh.
                </p>
              </div>

              <span className="text-xs text-green-400">
                ◇ Safe
              </span>
            </div>

            <div className="space-y-4 p-6">
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#090817] p-4">
                <code className="whitespace-pre-wrap break-all font-mono text-xs leading-6 text-violet-300">
                  {command}
                </code>
              </div>

              <button
                onClick={copy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy command"}
              </button>

              <p className="text-center text-xs leading-relaxed text-gray-500">
                This command only prints styled text. It does not change
                files or system settings.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
