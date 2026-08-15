import { useState } from "react";
import {
  FiBriefcase,
  FiUser,
  FiBookOpen,
  FiTarget,
  FiStar,
  FiArrowRight,
  FiCheckCircle,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";

function Career() {
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("");

  const [generated, setGenerated] = useState(false);
  const [career, setCareer] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCareer = async () => {
    if (
      !education.trim() ||
      !skills.trim() ||
      !interests.trim() ||
      !goal.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setError("");
    setGenerated(false);

    try {
      const response = await fetch(
        "http://localhost:5000/api/career",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            education: education.trim(),
            skills: skills.trim(),
            interests: interests.trim(),
            goal: goal.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Career analysis could not be generated."
        );
      }

      setCareer(data.career);
      setGenerated(true);
    } catch (err) {
      console.error("Career Error:", err);

      setError(
        err.message ||
          "Something went wrong while analyzing your career."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
            <FiBriefcase size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Career Mentor
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Discover the right career path based on your skills and interests.
            </p>
          </div>

        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">

        {/* FORM */}
        <div className="lg:col-span-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            <h2 className="font-semibold text-slate-900 dark:text-white">
              Tell us about yourself
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Provide a few details and EduMate AI will suggest suitable
              career paths.
            </p>

            {/* Education */}
            <div className="mt-5">

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiBookOpen size={16} />
                Education
              </label>

              <input
                type="text"
                value={education}
                onChange={(e) =>
                  setEducation(e.target.value)
                }
                placeholder="e.g. BS Computer Science"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

            </div>

            {/* Skills */}
            <div className="mt-4">

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiStar size={16} />
                Your Skills
              </label>

              <textarea
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                placeholder="e.g. HTML, CSS, JavaScript, React, Python"
                rows="3"
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

            </div>

            {/* Interests */}
            <div className="mt-4">

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiUser size={16} />
                Interests
              </label>

              <input
                type="text"
                value={interests}
                onChange={(e) =>
                  setInterests(e.target.value)
                }
                placeholder="e.g. AI, Web Development, Mobile Apps"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

            </div>

            {/* Goal */}
            <div className="mt-4">

              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FiTarget size={16} />
                Career Goal
              </label>

              <input
                type="text"
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value)
                }
                placeholder="e.g. Become a Full Stack Developer"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                <FiAlertCircle
                  className="mt-0.5 shrink-0"
                  size={16}
                />

                <span>{error}</span>
              </div>
            )}

            {/* Generate */}
            <button
              onClick={generateCareer}
              disabled={isLoading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {isLoading ? (
                <>
                  <FiLoader
                    className="animate-spin"
                    size={17}
                  />
                  Analyzing Your Career...
                </>
              ) : (
                <>
                  <FiStar size={17} />
                  Analyze My Career
                </>
              )}

            </button>

          </div>
        </div>

        {/* RESULT */}
        <div className="lg:col-span-3">

          <div className="min-h-[600px] rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            {!generated || !career ? (

              <div className="flex min-h-[540px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <FiBriefcase size={29} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
                  Your career roadmap will appear here
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Tell EduMate AI about your education, skills, interests and
                  goals to receive personalized career recommendations.
                </p>

              </div>

            ) : (

              <div>

                {/* Result Header */}
                <div className="border-b border-slate-200 pb-5 dark:border-slate-800">

                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                    AI Career Analysis
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {career.careerTitle}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {career.description}
                  </p>

                </div>

                {/* Match */}
                <div className="mt-5 rounded-2xl bg-blue-50 p-4 dark:bg-blue-500/10">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Career Match
                    </span>

                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {career.match}%
                    </span>

                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-500/20">

                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-700"
                      style={{
                        width: `${career.match}%`,
                      }}
                    ></div>

                  </div>

                </div>

                {/* Skills */}
                <div className="mt-6">

                  <div className="flex items-center gap-2">

                    <FiCheckCircle
                      className="text-emerald-600"
                      size={18}
                    />

                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Skills to Learn
                    </h3>

                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">

                    {career.skillsToLearn.map(
                      (skill, index) => (
                        <div
                          key={`${skill}-${index}`}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {skill}
                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* Roadmap */}
                <div className="mt-6">

                  <div className="flex items-center gap-2">

                    <FiTarget
                      className="text-violet-600"
                      size={18}
                    />

                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Suggested Roadmap
                    </h3>

                  </div>

                  <div className="mt-4 space-y-3">

                    {career.roadmap.map(
                      (step, index) => (
                        <div
                          key={`${step}-${index}`}
                          className="flex gap-3"
                        >

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                            {index + 1}
                          </div>

                          <p className="pt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                            {step}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>

                {/* Job Roles */}
                {career.jobRoles?.length > 0 && (
                  <div className="mt-6">

                    <div className="flex items-center gap-2">

                      <FiBriefcase
                        className="text-orange-500"
                        size={18}
                      />

                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        Possible Job Roles
                      </h3>

                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">

                      {career.jobRoles.map(
                        (role, index) => (
                          <span
                            key={`${role}-${index}`}
                            className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                          >
                            {role}
                          </span>
                        )
                      )}

                    </div>

                  </div>
                )}

                {/* Next Steps */}
                {career.nextSteps?.length > 0 && (
                  <div className="mt-6">

                    <div className="flex items-center gap-2">

                      <FiStar
                        className="text-blue-600"
                        size={18}
                      />

                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        Recommended Next Steps
                      </h3>

                    </div>

                    <div className="mt-3 space-y-2">

                      {career.nextSteps.map(
                        (step, index) => (
                          <div
                            key={`${step}-${index}`}
                            className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {step}
                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

                {/* Footer */}
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <FiCheckCircle size={16} />
                  Career roadmap generated by EduMate AI.
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Career;