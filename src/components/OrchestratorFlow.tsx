import React, { useState } from "react";
import { ArrowRight, Brain, Cpu, Database, CheckCircle2, ShieldCheck, MessageSquare, Compass, Play } from "lucide-react";

interface StepDetail {
  id: string;
  name: string;
  subsystem: string;
  classes: string[];
  description: string;
  inputOutput: { in: string; out: string };
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepDetail[] = [
  {
    id: "understand",
    name: "01. UNDERSTAND",
    subsystem: "Natural Language & Intent Classification",
    classes: ["MyraOrchestrator", "IntentClassifier"],
    description: "Parses user input from microphone PCM stream, text field, camera context, or background automation into structured semantic intent.",
    inputOutput: { in: "Raw Audio / Text / Screen Context", out: "Classified Intent & Slot Entities" },
    icon: MessageSquare,
  },
  {
    id: "remember",
    name: "02. REMEMBER",
    subsystem: "Hierarchical Context Retrieval",
    classes: ["MyraUnifiedMemory", "Memory2Engine", "MemoryItem"],
    description: "Queries SessionMemory and Durable Room SQLite database for relevant facts, preferences, and past corrections without dumping entire history.",
    inputOutput: { in: "Intent & Entity Keywords", out: "Top-k Relevant Memory Context" },
    icon: Database,
  },
  {
    id: "plan",
    name: "03. PLAN",
    subsystem: "Structured Orchestration & Routing",
    classes: ["MyraOrchestrator", "GeminiClient", "PlanSchema"],
    description: "Uses Gemini (primary or fallback model) to formulate a structured JSON execution plan containing ordered tool invocations.",
    inputOutput: { in: "Intent + Retrieved Memories", out: "Structured Multi-Step Tool Plan" },
    icon: Brain,
  },
  {
    id: "discover",
    name: "04. DISCOVER CAPABILITIES",
    subsystem: "Plugin & Tool Registry",
    classes: ["PluginRegistry", "PluginMetadata"],
    description: "Queries the registry to resolve required tool capabilities to registered internal automators, public API handlers, or fallback plugins.",
    inputOutput: { in: "Plan Tool Signature", out: "Resolved Plugin Handler / Fallback" },
    icon: Compass,
  },
  {
    id: "execute",
    name: "05. EXECUTE",
    subsystem: "Android Action Bridge",
    classes: ["AgentToolExecutor", "SoltiniAccessibilityService", "MqttManager", "SmsSender"],
    description: "Dispatches concrete Android operations: clicking nodes, sending MQTT payloads, fetching web APIs, or queuing pending SMS.",
    inputOutput: { in: "Tool Parameters", out: "Android System / Network Execution" },
    icon: Play,
  },
  {
    id: "verify",
    name: "06. VERIFY",
    subsystem: "Result Validation & Guardrails",
    classes: ["MyraOrchestrator", "PluginResult", "FileSafetyManager"],
    description: "Validates execution return codes, catches UI node timeouts, and verifies operation safety before declaring completion.",
    inputOutput: { in: "Execution Output & UI State", out: "Verified Result Status" },
    icon: ShieldCheck,
  },
  {
    id: "learn",
    name: "07. LEARN / UPDATE MEMORY",
    subsystem: "Empirical Pattern Learning",
    classes: ["ExperienceLearningEngine", "ExperienceMemory", "WorkingMemory"],
    description: "Records the successful task pattern or user correction into ExperienceMemory after passing safety filters for future tasks.",
    inputOutput: { in: "Task Execution Record", out: "Persisted Experience Heuristic" },
    icon: Cpu,
  },
  {
    id: "respond",
    name: "08. RESPOND",
    subsystem: "Audio & UI Synthesis",
    classes: ["GeminiLiveManager", "AudioPlayer", "AudioVisualizerOrb"],
    description: "Streams verbal response via Gemini Live PCM WebSocket audio or displays rich Material 3 visual cards in the voice screen.",
    inputOutput: { in: "Final Plan Context & Status", out: "Streamed Audio / UI Card" },
    icon: CheckCircle2,
  },
];

export const OrchestratorFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<StepDetail>(STEPS[0]);

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <h3 className="text-xl font-semibold text-neutral-100">
            The Orchestrator Execution Pipeline
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            How MyraOrchestrator resolves an input through memory, planning, tools, and learning.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
          <span>Orchestrator: Decision</span>
          <span aria-hidden="true">·</span>
          <span>Memory: Context</span>
          <span aria-hidden="true">·</span>
          <span>Plugins: Capability</span>
        </div>
      </div>

      {/* Pipeline Step Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 py-6">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep.id === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className={`flex flex-col items-center text-center p-3 rounded-lg border transition-all relative ${
                isSelected
                  ? "bg-neutral-800/90 border-cyan-500/80 shadow-sm"
                  : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center mb-2 ${
                  isSelected ? "bg-cyan-500/20 text-cyan-400" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono tracking-tight font-medium text-neutral-300">
                {step.name.split(" ")[1]}
              </span>
              <span className="text-[9px] text-neutral-500 mt-0.5">
                Step 0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail Panel */}
      <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-5 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-850 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-cyan-400 font-mono">
              {selectedStep.name}
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-sm text-neutral-300 font-medium">
              {selectedStep.subsystem}
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {selectedStep.classes.map((cls) => (
              <span
                key={cls}
                className="text-[11px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded"
              >
                {cls}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed mt-3">
          {selectedStep.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-neutral-900 text-xs">
          <div className="flex items-start gap-2 bg-neutral-900/50 p-2.5 rounded border border-neutral-850">
            <span className="text-neutral-500 font-mono shrink-0 uppercase tracking-wider text-[10px]">
              Input
            </span>
            <span className="text-neutral-300 font-mono">{selectedStep.inputOutput.in}</span>
          </div>
          <div className="flex items-start gap-2 bg-neutral-900/50 p-2.5 rounded border border-neutral-850">
            <span className="text-neutral-500 font-mono shrink-0 uppercase tracking-wider text-[10px]">
              Output
            </span>
            <span className="text-cyan-300 font-mono">{selectedStep.inputOutput.out}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
