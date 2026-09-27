import React, { useState } from "react";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { Database, Clock, ShieldCheck, ArrowRight, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export const MemoryView: React.FC = () => {
  const memoryFeatures = FEATURES_DATA.filter((f) => f.category === "Memory & Learning");

  // Sample Diary Entries for DailyDiaryScreen visual representation
  const sampleDiaryEntries = [
    { date: "Today, 09:30 AM", title: "Morning Routine", text: "Checked weather (24°C wttr.in), reminded about team sync at 2 PM." },
    { date: "Yesterday, 06:15 PM", title: "Smart Home", text: "Turned off office ESP32 relay and set Do Not Disturb for focus time." },
    { date: "Sept 25, 11:00 AM", title: "Code Exploration", text: "Parsed Android project modules and indexed Room database schema." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
          <span>Multi-Tier Context Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Room SQLite & Empirical Learning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Memory 2.0 & Experience Learning
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA separates context from execution. Memory supplies historical and working context to the orchestrator, but holds zero authority to execute actions independently.
        </p>
      </div>

      {/* Hierarchical Memory Visual: Session vs Working vs Durable */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Three Distinct Memory Lifecycles
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Selective context retrieval protects against LLM token bloat and context poisoning.
            </p>
          </div>
          <div className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded">
            Selective Top-k Retrieval Only
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1: Session Memory */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-850">
                <span className="text-xs font-mono text-cyan-400">01. In-Memory StateFlow</span>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-base font-semibold text-neutral-100 mt-2">
                SessionMemory
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Volatile cache tracking the immediate voice conversational turn, active participant context, and audio interruption states. Cleared when session terminates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] font-mono text-neutral-500">
              Lifecycle: Ephemeral (Single Session)
            </div>
          </div>

          {/* Tier 2: Working Memory */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-850">
                <span className="text-xs font-mono text-blue-400">02. Active Task Cache</span>
                <Layers className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-base font-semibold text-neutral-100 mt-2">
                WorkingMemory
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Stores intermediate slot variables, draft messages, partially filled form states, and tool return payloads during multi-step automations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] font-mono text-neutral-500">
              Lifecycle: Task Duration
            </div>
          </div>

          {/* Tier 3: Durable Room DB */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-850">
                <span className="text-xs font-mono text-emerald-400">03. Persisted Database</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-base font-semibold text-neutral-100 mt-2">
                Memory2Database (Room)
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Encrypted on-device SQLite database storing explicit user facts, persistent preferences, contact associations, and user corrections with full search and deletion.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-900 text-[11px] font-mono text-neutral-500">
              Lifecycle: Permanent on Device
            </div>
          </div>
        </div>

        {/* Experience Learning Engine Flow */}
        <div className="mt-6 pt-6 border-t border-neutral-800">
          <h4 className="text-sm font-semibold text-neutral-200 mb-3">
            ExperienceLearningEngine: Empirical Pattern Feedback Loop
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 text-neutral-300">
              Task Request
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 text-neutral-300">
              Execution Attempt
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 text-neutral-300">
              Result Evaluation
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="bg-amber-950/60 px-3 py-1.5 rounded border border-amber-800/80 text-amber-300">
              Safety Verification Check
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 text-cyan-300">
              ExperienceMemory Store
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 text-emerald-300">
              Future Similar Task Recall
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            *MYRA checks whether a learned routine is safe before persisting. This is heuristic pattern learning, not human-level artificial general intelligence.
          </p>
        </div>
      </div>

      {/* Daily Diary Screen Presentation */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8">
        <div className="flex items-center gap-2 pb-4 border-b border-neutral-800">
          <BookOpen className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              DailyDiaryScreen · Chronological Context Feed
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              User-facing journal in Material 3 that allows users to record daily notes that feed into MYRA's contextual awareness.
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          {sampleDiaryEntries.map((entry, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <span className="text-xs font-semibold text-neutral-200">
                  {entry.title}
                </span>
                <p className="text-xs text-neutral-400 mt-0.5">{entry.text}</p>
              </div>
              <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                {entry.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Technical Feature Explanations */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Memory, Learning & Backup
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {memoryFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
