import React, { useState } from "react";
import { Mic, Volume2, Radio, Activity, Sparkles } from "lucide-react";

export type VisualizerState = "idle" | "listening" | "processing" | "speaking" | "error";

interface VoiceVisualizerSectionProps {
  initialState?: VisualizerState;
}

export const VoiceVisualizerSection: React.FC<VoiceVisualizerSectionProps> = ({
  initialState = "speaking"
}) => {
  const [state, setState] = useState<VisualizerState>(initialState);

  const stateConfigs = {
    idle: {
      color: "from-neutral-600 via-neutral-500 to-neutral-400",
      accent: "text-neutral-400",
      badge: "border-neutral-700 bg-neutral-800 text-neutral-300",
      description: "Audio hardware is initialized; awaiting speech activity or invocation trigger."
    },
    listening: {
      color: "from-emerald-500 via-teal-400 to-cyan-400",
      accent: "text-emerald-400",
      badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
      description: "AudioRecorder capturing 16-bit PCM microphone frames and streaming to WebSocket."
    },
    processing: {
      color: "from-indigo-500 via-purple-500 to-pink-500",
      accent: "text-purple-400",
      badge: "border-purple-500/40 bg-purple-500/10 text-purple-300",
      description: "Gemini reasoning engine classifying intent, retrieving Memory 2.0 context, and formulating plan."
    },
    speaking: {
      color: "from-cyan-400 via-blue-500 to-indigo-500",
      accent: "text-cyan-400",
      badge: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
      description: "AudioPlayer rendering returned PCM stream chunks in MODE_STREAM with instant barge-in support."
    },
    error: {
      color: "from-rose-600 via-red-500 to-amber-500",
      accent: "text-rose-400",
      badge: "border-rose-500/40 bg-rose-500/10 text-rose-300",
      description: "Network timeout or permission rejection handled gracefully by fallback manager."
    }
  };

  const currentConfig = stateConfigs[state];

  return (
    <div className="w-full rounded-2xl bg-neutral-950/80 border border-neutral-800 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${currentConfig.accent}`} />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Voice Interaction Engine
            </span>
          </div>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border capitalize ${currentConfig.badge}`}>
            {state}
          </span>
        </div>

        {/* Dynamic Studio Sound Waveform visualization */}
        <div className="py-8 flex items-center justify-center">
          <div className="w-full max-w-xs flex items-center justify-between h-24 px-4 bg-neutral-900/60 rounded-2xl border border-neutral-850 gap-1.5 shadow-inner">
            {[25, 45, 75, 95, 60, 30, 85, 100, 70, 40, 90, 80, 50, 95, 65, 35, 75, 50, 30].map((h, idx) => {
              const activeHeight = state === "idle" ? 15 : state === "listening" ? (h * 0.7) : state === "processing" ? (30 + (idx % 3) * 20) : h;
              return (
                <div
                  key={idx}
                  style={{ height: `${activeHeight}%` }}
                  className={`w-2.5 rounded-full bg-linear-to-t ${currentConfig.color} transition-all duration-300 shadow-sm`}
                />
              );
            })}
          </div>
        </div>

        <p className="text-xs text-neutral-300 text-center leading-relaxed">
          {currentConfig.description}
        </p>
      </div>

      {/* State Switcher Buttons */}
      <div className="mt-6 pt-4 border-t border-neutral-850 flex flex-wrap items-center justify-center gap-1.5">
        {(["idle", "listening", "processing", "speaking", "error"] as VisualizerState[]).map((st) => (
          <button
            key={st}
            onClick={() => setState(st)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors capitalize ${
              state === st
                ? "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-xs font-semibold"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
            }`}
          >
            {st}
          </button>
        ))}
      </div>
    </div>
  );
};
