import React, { useState } from "react";
import { DOCS_DATA, DocSection } from "../data/docsData";
import { BookOpen, FileCode, CheckCircle2, ChevronRight, Terminal } from "lucide-react";

export const DocumentationView: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState(DOCS_DATA[0].id);

  const selectedDoc = DOCS_DATA.find((d) => d.id === selectedDocId) || DOCS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-850 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Engineering Manual</span>
          <span aria-hidden="true">·</span>
          <span>com.soltini.app</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Architecture & Integration Documentation
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          Comprehensive guides explaining how MYRA's Kotlin subsystems, coroutine StateFlow pipelines, Android system services, and Gemini Live interfaces function.
        </p>
      </div>

      {/* Main Documentation Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 bg-neutral-900/40 border border-neutral-800 rounded-xl p-4 space-y-2 sticky top-24">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block px-3 py-1">
            Documentation Modules
          </span>

          <div className="space-y-1">
            {DOCS_DATA.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  selectedDocId === doc.id
                    ? "bg-neutral-850 text-cyan-400 font-semibold border border-neutral-750"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                }`}
              >
                <span>{doc.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Pane */}
        <div className="lg:col-span-8 bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 lg:p-8 space-y-6">
          <div className="border-b border-neutral-800 pb-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              {selectedDoc.category}
            </span>
            <h2 className="text-2xl font-bold text-neutral-100 mt-1">
              {selectedDoc.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
              {selectedDoc.summary}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-neutral-850">
              <span className="text-xs text-neutral-500 font-mono">Classes:</span>
              {selectedDoc.classesInvolved.map((cls) => (
                <span
                  key={cls}
                  className="text-[11px] font-mono text-neutral-300 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded"
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>

          {/* Render Markdown Content Body */}
          <div className="prose prose-invert prose-neutral max-w-none text-sm text-neutral-300 leading-relaxed space-y-4">
            {selectedDoc.markdownContent.split("\n\n").map((para, i) => {
              if (para.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-lg font-semibold text-neutral-100 pt-2 border-b border-neutral-850 pb-2">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("#### ")) {
                return (
                  <h4 key={i} className="text-base font-semibold text-cyan-400 pt-2">
                    {para.replace("#### ", "")}
                  </h4>
                );
              }
              if (para.startsWith("```")) {
                const cleaned = para.replace(/```[a-z]*/g, "").trim();
                return (
                  <pre
                    key={i}
                    className="p-4 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 overflow-x-auto my-3"
                  >
                    {cleaned}
                  </pre>
                );
              }
              return (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
