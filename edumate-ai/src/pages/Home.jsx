import {
  FiMessageCircle,
  FiFileText,
  FiHelpCircle,
  FiBriefcase,
  FiCode,
  FiCalendar,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Chat",
    description: "Ask questions and get instant AI-powered explanations.",
    icon: FiMessageCircle,
    path: "/chat",
    iconBg: "bg-blue-100 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "AI Notes",
    description: "Turn your study material into clear and smart notes.",
    icon: FiFileText,
    path: "/notes",
    iconBg: "bg-violet-100 dark:bg-violet-500/10",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Quiz Generator",
    description: "Generate practice quizzes from your study topics.",
    icon: FiHelpCircle,
    path: "/quiz",
    iconBg: "bg-emerald-100 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Career Mentor",
    description: "Get personalized career guidance and learning roadmaps.",
    icon: FiBriefcase,
    path: "/career",
    iconBg: "bg-orange-100 dark:bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Coding Assistant",
    description: "Debug, explain and improve your code with AI.",
    icon: FiCode,
    path: "/coding",
    iconBg: "bg-pink-100 dark:bg-pink-500/10",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "Study Planner",
    description: "Create an intelligent study plan for your exams.",
    icon: FiCalendar,
    path: "/planner",
    iconBg: "bg-cyan-100 dark:bg-cyan-500/10",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
];

function Home() {
  return (
    <div className="space-y-8">
      
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 p-6 text-white shadow-xl shadow-blue-500/10 sm:p-8 lg:p-10">
        
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-white/5"></div>

        <div className="relative max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
            <FiStar size={18} />
            AI-Powered Learning
          </div>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Learn smarter with
            <span className="block text-blue-100">
              EduMate AI.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Your intelligent study companion for learning, coding,
            career guidance, notes, quizzes and personalized study
            planning.
          </p>

          <Link
            to="/chat"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start Learning
            <FiArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Section Header */}
      <section>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            AI Tools
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            Everything you need to learn
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose a tool and let EduMate AI help you.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.path}
                to={feature.path}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/20"
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor}`}
                >
                  <Icon size={21} />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100 dark:text-blue-400">
                  Open tool
                  <FiArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">AI Questions</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            0
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Notes Created</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            0
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Quizzes Completed</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            0
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;