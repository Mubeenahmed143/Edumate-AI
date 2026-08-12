import { useState } from "react";
import {
  FiCalendar,
  FiClock,
  FiBookOpen,
  FiTarget,
  FiCheckCircle,
  FiStar,
  FiArrowRight,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

function Planner() {
  const [exam, setExam] = useState("");
  const [hours, setHours] = useState("3");
  const [subjects, setSubjects] = useState([
    "Database Management",
    "Data Structures",
    "Object Oriented Programming",
  ]);

  const [newSubject, setNewSubject] = useState("");
  const [generated, setGenerated] = useState(false);

  const addSubject = () => {
    const subject = newSubject.trim();

    if (!subject) return;

    if (subjects.includes(subject)) {
      alert("This subject is already added.");
      return;
    }

    setSubjects([...subjects, subject]);
    setNewSubject("");
  };

  const removeSubject = (subjectToRemove) => {
    setSubjects(
      subjects.filter(
        (subject) => subject !== subjectToRemove
      )
    );
  };

  const generatePlan = () => {
    if (!exam.trim()) {
      alert("Please enter your exam or study goal.");
      return;
    }

    if (subjects.length === 0) {
      alert("Please add at least one subject.");
      return;
    }

    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
            <FiCalendar size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Study Planner
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a personalized study schedule and stay on track.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Build Your Study Plan
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Tell EduMate AI about your goal, subjects and available
              study time.
            </p>

            {/* Goal */}
            <div className="mt-5">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiTarget size={16} />
                Exam / Study Goal
              </label>

              <input
                type="text"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                placeholder="e.g. Midterm Exams in 20 days"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Hours */}
            <div className="mt-4">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiClock size={16} />
                Daily Study Hours
              </label>

              <select
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
                <option value="5">5 Hours</option>
                <option value="6">6+ Hours</option>
              </select>
            </div>

            {/* Subjects */}
            <div className="mt-5">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiBookOpen size={16} />
                Subjects
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addSubject();
                    }
                  }}
                  placeholder="Add subject"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />

                <button
                  onClick={addSubject}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  title="Add subject"
                >
                  <FiPlus size={18} />
                </button>
              </div>

              {/* Subject List */}
              <div className="mt-3 space-y-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <FiBookOpen
                        className="shrink-0 text-pink-500"
                        size={15}
                      />

                      <span className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                        {subject}
                      </span>
                    </div>

                    <button
                      onClick={() => removeSubject(subject)}
                      className="ml-2 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-red-500 dark:hover:bg-slate-700"
                      title="Remove subject"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate */}
            <button
              onClick={generatePlan}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:from-pink-700 hover:to-violet-700"
            >
              <FiStar size={17} />
              Generate AI Study Plan
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-3">
          <div className="min-h-[620px] rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            {!generated ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                  <FiCalendar size={29} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
                  Your study plan will appear here
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Add your exam goal, available study time and subjects.
                  EduMate AI will organize them into a smart study schedule.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    Smart Schedule
                  </span>

                  <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    Time Management
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    Exam Preparation
                  </span>
                </div>
              </div>
            ) : (
              <div>
                {/* Result Header */}
                <div className="border-b border-slate-200 pb-5 dark:border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                    AI Generated Plan
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    Your Study Roadmap
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-medium text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                      🎯 {exam}
                    </span>

                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      ⏰ {hours} hours/day
                    </span>
                  </div>
                </div>

                {/* Today's Plan */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Day 1
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-800 dark:text-white">
                        Today's Study Plan
                      </h3>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                      <FiCalendar size={18} />
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="mt-4 space-y-3">
                    <div className="flex gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <FiBookOpen size={17} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">
                              Database Management
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Study normalization and practice examples.
                            </p>
                          </div>

                          <span className="shrink-0 text-xs font-semibold text-blue-600 dark:text-blue-400">
                            60 min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                        <FiBookOpen size={17} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">
                              Data Structures
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Revise arrays, linked lists and stacks.
                            </p>
                          </div>

                          <span className="shrink-0 text-xs font-semibold text-violet-600 dark:text-violet-400">
                            60 min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <FiCheckCircle size={17} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white">
                              OOP Revision
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                              Review classes, inheritance and polymorphism.
                            </p>
                          </div>

                          <span className="shrink-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            45 min
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">
                        Daily Progress
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800 dark:text-white">
                        0% completed
                      </p>
                    </div>

                    <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                      0/{subjects.length} tasks
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-full w-0 rounded-full bg-pink-600"></div>
                  </div>
                </div>

                {/* Tip */}
                <div className="mt-5 flex gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-500/20 dark:bg-yellow-500/10">
                  <FiStar
                    className="mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400"
                    size={17}
                  />

                  <div>
                    <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                      AI Study Tip
                    </p>

                    <p className="mt-1 text-xs leading-5 text-yellow-700/80 dark:text-yellow-300/70">
                      Take a short 5–10 minute break after every focused
                      study session to maintain concentration.
                    </p>
                  </div>
                </div>

                {/* Continue */}
                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                  View Full Weekly Plan
                  <FiArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planner;