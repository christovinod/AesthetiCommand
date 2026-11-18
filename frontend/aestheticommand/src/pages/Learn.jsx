
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  GraduationCap,
  X,
  Check,
  BookOpen,
} from "lucide-react";

import { lessons } from "../data/commands";

export default function Learn() {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ac-lessons") || "[]");
    } catch {
      return [];
    }
  });

  const [active, setActive] = useState(null);

  const progress = lessons.length
    ? Math.round((completed.length / lessons.length) * 100)
    : 0;

  // Mark lesson as completed
  const finish = (id) => {
    const next = completed.includes(id)
      ? completed
      : [...completed, id];

    setCompleted(next);
    localStorage.setItem("ac-lessons", JSON.stringify(next));
    setActive(null);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-8 text-[#f2efff]">

      {/* Learning Hero */}
      <section className="overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-[#19132e] via-[#12111f] to-[#12111f] p-6 md:p-9">

        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-violet-300">
          <GraduationCap size={15} />
          LEARNING PATHS
        </div>

        <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
          Build command-line confidence.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
          Short, practical lessons that explain not just what to type,
          but why it works.
        </p>

        {/* Progress */}
        <div className="mt-8 max-w-2xl space-y-3">

          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-gray-400">
              {completed.length} of {lessons.length} lessons completed
            </span>

            <span className="font-semibold text-violet-300">
              {progress}% complete
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Section Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Available lessons
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Learn at your own pace.
          </p>
        </div>

        <span className="rounded-lg border border-white/10 bg-[#12111f] px-3 py-2 text-xs text-gray-400">
          {lessons.length} lessons
        </span>
      </div>

      {/* Lesson Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {lessons.map((lesson, i) => {
          const isCompleted = completed.includes(lesson.id);

          return (
            <article
              key={lesson.id}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#12111f] p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-950/20"
            >

              {/* Card Top */}
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    lesson.level.toLowerCase() === "beginner"
                      ? "border-green-500/20 bg-green-500/10 text-green-400"
                      : lesson.level.toLowerCase() === "intermediate"
                      ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                      : "border-red-500/20 bg-red-500/10 text-red-400"
                  }`}
                >
                  {lesson.level}
                </span>

                <span className="font-mono text-sm text-gray-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Lesson Content */}
              <div className="mt-6 flex-1">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <BookOpen size={20} />
                </div>

                <h3 className="text-lg font-semibold text-white transition group-hover:text-violet-300">
                  {lesson.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                  {lesson.description}
                </p>
              </div>

              {/* Lesson Footer */}
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">

                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock3 size={14} />
                  {lesson.duration}
                </span>

                <button
                  onClick={() => setActive(lesson)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  {isCompleted ? "Review lesson" : "Start lesson"}
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Completion Status */}
              {isCompleted && (
                <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
                  <Check size={14} />
                  Completed
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Empty Lessons State */}
      {lessons.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#12111f] p-12 text-center">
          <BookOpen size={30} className="mx-auto text-gray-500" />
          <p className="mt-4 font-semibold text-white">
            No lessons available yet
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Add lessons to your commands data file to get started.
          </p>
        </div>
      )}

      {/* Lesson Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-title"
            className="relative my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-[#12111f] p-6 shadow-2xl shadow-black/50 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setActive(null)}
              aria-label="Close lesson"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <GraduationCap size={21} />
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wider text-violet-400">
                  LEARNING PATH
                </p>

                <span className="text-xs text-gray-500">
                  {active.duration}
                </span>
              </div>
            </div>

            <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {active.level}
            </span>

            <h2
              id="lesson-title"
              className="mt-4 pr-8 text-2xl font-bold text-white md:text-3xl"
            >
              {active.title}
            </h2>

            <div className="mt-6 max-h-[50vh] overflow-y-auto">
              <p className="whitespace-pre-line text-sm leading-7 text-gray-300">
                {active.content}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
              <button
                onClick={() => setActive(null)}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => finish(active.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                <Check size={16} />
                Mark as completed
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
