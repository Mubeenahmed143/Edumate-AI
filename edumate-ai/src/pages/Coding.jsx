import { useState } from "react";
import {
  FiCode,
  FiPlay,
  FiCopy,
  FiCheckCircle,
  FiAlertCircle,
  FiBookOpen,
  FiLoader,
} from "react-icons/fi";

function Coding() {
  const [language, setLanguage] = useState("JavaScript");

  const [code, setCode] = useState(
`function calculateSum(a, b) {
  return a + b;
}

console.log(calculateSum(5));`
  );

  const [problem, setProblem] = useState("");

  const [generated, setGenerated] = useState(false);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const [copied, setCopied] = useState(false);

  // ---------------- ANALYZE CODE ----------------

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code first.");
      return;
    }

    setLoading(true);
    setGenerated(false);
    setResult("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/coding",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            code,
            problem,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setResult(data.result);
      setGenerated(true);
    } catch (error) {
      console.error("Coding Assistant Error:", error);

      setResult(
        `Unable to analyze your code.

${error.message}

Please make sure the EduMate backend server is running.`
      );

      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- COPY RESULT ----------------

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            <FiCode size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Coding Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Debug code, understand errors and learn programming with AI.
            </p>
          </div>

        </div>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="space-y-5">

          {/* Language */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Programming Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
              <option>PHP</option>
              <option>C#</option>
              <option>SQL</option>
            </select>

          </div>

          {/* Code Editor */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">

              <div className="flex items-center gap-2">
                <FiCode className="text-cyan-600" size={17} />

                <span className="text-sm font-semibold text-slate-800 dark:text-white">
                  Your Code
                </span>
              </div>

              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500 dark:bg-slate-800">
                {language}
              </span>

            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="min-h-[300px] w-full resize-none bg-slate-950 p-5 font-mono text-sm leading-6 text-slate-200 outline-none"
            />

          </div>

          {/* Problem */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              What problem are you facing?
            </label>

            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Example: My function is giving undefined. Explain what is wrong and how to fix it."
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading ? (
                <>
                  <FiLoader className="animate-spin" size={17} />
                  Analyzing Code...
                </>
              ) : (
                <>
                  <FiPlay size={17} />
                  Analyze Code with AI
                </>
              )}

            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div className="min-h-[650px] rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

          {/* EMPTY STATE */}
          {!generated && !loading && (
            <div className="flex min-h-[650px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                <FiCode size={30} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
                AI analysis will appear here
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Paste your code, describe your problem and let EduMate AI
                explain the issue and suggest a solution.
              </p>

              <div className="mt-6 grid w-full max-w-md gap-3 sm:grid-cols-2">

                <div className="rounded-xl bg-slate-50 p-3 text-left dark:bg-slate-800">

                  <FiAlertCircle
                    className="text-orange-500"
                    size={18}
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Find Errors
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Identify bugs and mistakes.
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-left dark:bg-slate-800">

                  <FiBookOpen
                    className="text-blue-500"
                    size={18}
                  />

                  <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Explain Code
                  </p>

                  <p className="mt-1 text-[11px] text-slate-500">
                    Understand code easily.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="flex min-h-[650px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                <FiLoader
                  className="animate-spin"
                  size={30}
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
                EduMate AI is analyzing your code...
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Please wait while AI checks your code and prepares an
                explanation and solution.
              </p>

            </div>
          )}

          {/* RESULT */}
          {generated && !loading && (
            <div className="p-5 sm:p-6">

              {/* Result Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    AI Code Analysis
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    Analysis Result
                  </h2>

                </div>

                <button
                  onClick={copyResult}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >

                  {copied ? (
                    <>
                      <FiCheckCircle size={14} />
                      Copied
                    </>
                  ) : (
                    <>
                      <FiCopy size={14} />
                      Copy
                    </>
                  )}

                </button>

              </div>

              {/* AI Result */}
              <div className="mt-5">

                <div className="flex items-center gap-2">
                  <FiBookOpen
                    className="text-blue-600"
                    size={18}
                  />

                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    AI Explanation
                  </h3>
                </div>

                <div className="mt-3 whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {result}
                </div>

              </div>

              {/* Status */}
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">

                <FiCheckCircle size={16} />

                Code analysis completed successfully.

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Coding;