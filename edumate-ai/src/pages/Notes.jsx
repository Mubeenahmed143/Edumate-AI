import { useState } from "react";
import {
  FiUploadCloud,
  FiFileText,
  FiBookOpen,
  FiList,
  FiDownload,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";

function Notes() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setSelectedFile(file);
    setGenerated(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setGenerated(false);
  };

  const generateNotes = () => {
    if (!selectedFile) return;

    // Temporary demo state.
    // Actual AI processing will be connected later.
    setGenerated(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <FiFileText size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Notes Generator
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Upload your study material and let AI create smart notes.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Upload Study Material
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Upload a PDF containing your lecture notes, textbook,
              assignment or study material.
            </p>

            {/* Upload Area */}
            {!selectedFile ? (
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                  dragActive
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    : "border-slate-300 hover:border-blue-400 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <FiUploadCloud size={27} />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-white">
                  Drop your PDF here
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  or click to browse
                </p>

                <span className="mt-4 rounded-lg bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800">
                  PDF only
                </span>
              </label>
            ) : (
              /* Selected File */
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                <div className="flex items-center gap-3">
                  
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <FiFileText size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {selectedFile.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={removeFile}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-red-500 dark:hover:bg-slate-800"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <FiCheckCircle size={15} />
                  PDF ready for processing
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateNotes}
              disabled={!selectedFile}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiBookOpen size={17} />
              Generate AI Notes
            </button>

            <p className="mt-3 text-center text-[10px] text-slate-400">
              Supported format: PDF
            </p>
          </div>
        </div>

        {/* Result Section */}
        <div className="lg:col-span-3">
          <div className="min-h-[480px] rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            
            {!generated ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <FiBookOpen size={28} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
                  Your AI notes will appear here
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Upload a PDF and click "Generate AI Notes" to
                  transform your study material into easy-to-understand
                  notes.
                </p>
              </div>
            ) : (
              <div>
                {/* Result Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      AI Generated
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                      Introduction to Database Systems
                    </h2>
                  </div>

                  <button
                    className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:hover:bg-slate-800"
                    title="Download notes"
                  >
                    <FiDownload size={18} />
                  </button>
                </div>

                {/* Summary */}
                <div className="mt-5">
                  <div className="flex items-center gap-2">
                    <FiBookOpen className="text-blue-600" size={18} />

                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Summary
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    A database system is a collection of related data
                    and the software used to manage that data. It allows
                    users to store, organize, retrieve and update
                    information efficiently.
                  </p>
                </div>

                {/* Important Points */}
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <FiList className="text-violet-600" size={18} />

                    <h3 className="font-semibold text-slate-800 dark:text-white">
                      Important Points
                    </h3>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"></span>
                      Data is organized in a structured way.
                    </li>

                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"></span>
                      DBMS provides tools to manage stored information.
                    </li>

                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"></span>
                      SQL is commonly used to interact with databases.
                    </li>

                    <li className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500"></span>
                      Databases improve data consistency and accessibility.
                    </li>
                  </ul>
                </div>

                {/* Status */}
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <FiCheckCircle size={16} />
                  Notes generated successfully.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;