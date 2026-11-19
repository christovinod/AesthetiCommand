
import { useState } from "react";
import {
  Settings,
  Check,
  Monitor,
  ShieldCheck,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [platform, setPlatform] = useState(
    localStorage.getItem("ac-default-os") || "macOS"
  );

  const [confirm, setConfirm] = useState(
    localStorage.getItem("ac-confirm") !== "false"
  );

  const [saved, setSaved] = useState(false);

  // Save preferences
  const save = () => {
    localStorage.setItem("ac-default-os", platform);
    localStorage.setItem("ac-confirm", String(confirm));

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-[#f2efff]">

      {/* Page Heading */}
      <div className="space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
          <Settings size={14} />
          PREFERENCES
        </span>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Make AesthetiCommand yours.
        </h2>

        <p className="text-sm leading-relaxed text-gray-400 md:text-base">
          Manage your local application preferences.
        </p>
      </div>

      {/* Settings Container */}
      <section className="max-w-3xl space-y-7 rounded-2xl border border-white/10 bg-[#12111f] p-6 sm:p-8">

        {/* Default Operating System */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <Monitor size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Default operating system
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Used as the initial selection in the AI assistant.
              </p>
            </div>
          </div>

          <select
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
              setSaved(false);
            }}
            className="w-full rounded-xl border border-white/10 bg-[#090817] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500/60 sm:w-44"
          >
            <option value="macOS">macOS</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
          </select>
        </div>

        <div className="border-t border-white/10" />

        {/* Command Safety Reminder */}
        <div className="flex items-center justify-between gap-5">

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Command safety reminder
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Show a reminder to review commands before running them.
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            type="button"
            role="switch"
            aria-checked={confirm}
            aria-label="Toggle safety reminder"
            onClick={() => {
              setConfirm(!confirm);
              setSaved(false);
            }}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ${
              confirm ? "bg-violet-600" : "bg-gray-700"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                confirm ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="border-t border-white/10" />

        {/* Save Button */}
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-gray-500">
            Your preferences are stored locally in this browser.
          </p>

          <button
            onClick={save}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
              saved
                ? "bg-green-600 hover:bg-green-500"
                : "bg-violet-600 hover:bg-violet-500"
            }`}
          >
            {saved ? <Check size={17} /> : <Save size={17} />}
            {saved ? "Preferences saved" : "Save preferences"}
          </button>
        </div>
      </section>
    </div>
  );
}
