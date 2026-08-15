import { useState } from "react";
import {
  FiHelpCircle,
  FiStar,
  FiCheckCircle,
  FiArrowRight,
  FiRotateCcw,
  FiLoader,
} from "react-icons/fi";

function Quiz() {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState("5");
  const [difficulty, setDifficulty] = useState("Medium");

  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate REAL AI Quiz
  const startQuiz = async () => {
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          questionCount: Number(questionCount),
          difficulty,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "AI quiz could not be generated."
        );
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions were generated.");
      }

      setQuestions(data.questions);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setSelectedAnswer("");
      setAnswers([]);
      setFinished(false);
    } catch (err) {
      console.error("Quiz Error:", err);

      setError(
        err.message ||
          "Something went wrong while generating the quiz."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = [
      ...answers,
      selectedAnswer,
    ];

    setAnswers(updatedAnswers);
    setSelectedAnswer("");

    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setFinished(false);
    setQuestions([]);
    setError("");
  };

  const tryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setFinished(false);
  };

  const score = answers.filter(
    (answer, index) =>
      answer === questions[index]?.answer
  ).length;

  /* ---------------- SETUP SCREEN ---------------- */

  if (!quizStarted) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <FiHelpCircle size={27} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            AI Quiz Generator
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Enter a topic and let EduMate AI create an
            interactive quiz for your exam preparation.
          </p>
        </div>

        {/* Setup Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Topic */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                What do you want to practice?
              </label>

              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. JavaScript, DBMS, OOP, Mathematics..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Questions */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Number of Questions
              </label>

              <select
                value={questionCount}
                onChange={(e) =>
                  setQuestionCount(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="5">5 Questions</option>
                <option value="10">10 Questions</option>
                <option value="15">15 Questions</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Generate */}
          <button
            onClick={startQuiz}
            disabled={!topic.trim() || isLoading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <FiLoader
                  className="animate-spin"
                  size={18}
                />
                Generating AI Quiz...
              </>
            ) : (
              <>
                <FiStar size={18} />
                Generate AI Quiz
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            Topic: {topic || "Not selected"} • Difficulty:{" "}
            {difficulty}
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-3 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <FiStar
              className="mx-auto text-blue-600"
              size={20}
            />

            <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
              AI Generated
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Smart questions
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <FiCheckCircle
              className="mx-auto text-emerald-600"
              size={20}
            />

            <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
              Instant Score
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Know your result
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <FiRotateCcw
              className="mx-auto text-violet-600"
              size={20}
            />

            <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
              Practice Again
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Improve your score
            </p>
          </div>

        </div>
      </div>
    );
  }

  /* ---------------- RESULT SCREEN ---------------- */

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <div className="mx-auto max-w-2xl">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            <FiCheckCircle size={38} />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Quiz Completed
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            Great Job! 🎉
          </h1>

          <div className="mt-8 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800">

            <p className="text-sm text-slate-500">
              Your Score
            </p>

            <p className="mt-2 text-5xl font-bold text-blue-600">
              {score}/{questions.length}
            </p>

            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">
              {percentage}% correct answers
            </p>
          </div>

          <div className="mt-6 flex gap-3">

            <button
              onClick={restartQuiz}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <FiRotateCcw size={17} />
              New Quiz
            </button>

            <button
              onClick={tryAgain}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
              <FiArrowRight size={17} />
            </button>

          </div>
        </div>
      </div>
    );
  }

  /* ---------------- QUESTION SCREEN ---------------- */

  const question = questions[currentQuestion];

  if (!question) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            AI Quiz
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {topic}
          </h1>
        </div>

        <div className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all"
          style={{
            width: `${
              ((currentQuestion + 1) /
                questions.length) *
              100
            }%`,
          }}
        ></div>

      </div>

      {/* Question */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

        <p className="text-lg font-semibold leading-7 text-slate-900 dark:text-white">
          {question.question}
        </p>

        {/* Options */}
        <div className="mt-6 space-y-3">

          {question.options.map((option, index) => {

            const letters = ["A", "B", "C", "D"];

            const selected =
              selectedAnswer === option;

            return (
              <button
                key={option}
                onClick={() =>
                  handleAnswer(option)
                }
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    selected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {letters[index]}
                </span>

                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {option}
                </span>

              </button>
            );
          })}

        </div>

        {/* Next */}
        <button
          onClick={nextQuestion}
          disabled={!selectedAnswer}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >

          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question"}

          <FiArrowRight size={17} />

        </button>

      </div>
    </div>
  );
}

export default Quiz;