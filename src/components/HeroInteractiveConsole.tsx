import React, { useState } from "react";
import {
  Mic,
  Activity,
  Layers,
  Database,
  Radio,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  ArrowRight,
  Sparkles,
  Smartphone,
  Lock,
  Cpu
} from "lucide-react";

export const HeroInteractiveConsole: React.FC = () => {
  const [activeSession, setActiveSession] = useState<"voice" | "orchestrator" | "memory" | "hardware">("voice");

  return (
    <div className="w-full rounded-3xl border border-neutral-800 bg-neutral-950/90 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Console Top Window Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50" />
          <span className="ml-2 font-mono text-[11px] text-neutral-400">
            MYRA Architecture Node · com.soltini.app
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">Gemini Live WS Active</span>
        </div>
      </div>

      {/* Subsystem Switcher Navigation Tabs */}
      <div className="grid grid-cols-4 border-b border-neutral-800 bg-neutral-950 text-xs font-mono">
        <button
          onClick={() => setActiveSession("voice")}
          className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeSession === "voice"
              ? "border-cyan-400 bg-cyan-950/20 text-cyan-300 font-semibold"
              : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Voice AI</span>
          <span className="sm:hidden">Voice</span>
        </button>

        <button
          onClick={() => setActiveSession("orchestrator")}
          className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeSession === "orchestrator"
              ? "border-indigo-400 bg-indigo-950/20 text-indigo-300 font-semibold"
              : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Orchestrator</span>
          <span className="sm:hidden">Plan</span>
        </button>

        <button
          onClick={() => setActiveSession("memory")}
          className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeSession === "memory"
              ? "border-purple-400 bg-purple-950/20 text-purple-300 font-semibold"
              : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
          }`}
        >
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Memory 2.0</span>
          <span className="sm:hidden">Memory</span>
        </button>

        <button
          onClick={() => setActiveSession("hardware")}
          className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 ${
            activeSession === "hardware"
              ? "border-emerald-400 bg-emerald-950/20 text-emerald-300 font-semibold"
              : "border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">ESP32 / IoT</span>
          <span className="sm:hidden">IoT</span>
        </button>
      </div>

      {/* Main Interactive Screen Content */}
      <div className="p-6 sm:p-7 min-h-[300px] flex flex-col justify-between">
        {activeSession === "voice" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  GeminiLiveManager Full-Duplex Stream
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                  16-bit PCM 24kHz
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500">AudioRecorder → WebSocket</span>
            </div>

            {/* Audio Waveform simulation visual */}
            <div className="flex items-end justify-between h-14 px-2 py-1 bg-neutral-900/60 rounded-xl border border-neutral-850 gap-1 overflow-hidden">
              {[40, 65, 25, 80, 95, 45, 30, 85, 100, 70, 50, 90, 60, 35, 75, 95, 40, 80, 60, 45, 90, 100, 70, 55, 30].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-full bg-linear-to-t from-cyan-600 via-blue-500 to-indigo-400 opacity-90 transition-all duration-300"
                />
              ))}
            </div>

            {/* Live Telemetry Data */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-850">
                <span className="text-[10px] text-neutral-500 block">PROTOCOL</span>
                <span className="text-neutral-200 font-semibold">WebSocket Binary</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-850">
                <span className="text-[10px] text-neutral-500 block">BUFFER LATENCY</span>
                <span className="text-cyan-300 font-semibold">~180ms</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-850">
                <span className="text-[10px] text-neutral-500 block">BARGE-IN STATE</span>
                <span className="text-emerald-400 font-semibold">Instant Flush</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/70 border border-neutral-850">
                <span className="text-[10px] text-neutral-500 block">AUDIO OUT</span>
                <span className="text-neutral-200 font-semibold">AudioTrack STREAM</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans pt-1">
              Microphone chunks are binary-sliced in real time. Incoming speech from the user immediately halts assistant audio playback.
            </p>
          </div>
        )}

        {activeSession === "orchestrator" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  MyraOrchestrator Execution Pipeline
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40">
                  8-Stage State Machine
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500">Gemini 2.5 Flash / Pro</span>
            </div>

            {/* Pipeline Stage Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                01. UNDERSTAND
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                02. REMEMBER
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-cyan-300">
                03. PLAN
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-indigo-300">
                04. DISCOVER
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-emerald-300">
                05. EXECUTE
              </span>
            </div>

            {/* Structured Schema Output Preview */}
            <div className="p-3 bg-neutral-900/70 rounded-xl border border-neutral-850 font-mono text-[11px] text-neutral-300 space-y-1">
              <div className="text-cyan-400">{"{"}</div>
              <div className="pl-4 text-neutral-400">"intent": <span className="text-emerald-300">"SCHEDULE_REMINDER"</span>,</div>
              <div className="pl-4 text-neutral-400">"targetTool": <span className="text-purple-300">"ScheduledTaskManager"</span>,</div>
              <div className="pl-4 text-neutral-400">"triggerTime": <span className="text-amber-300">"2026-09-27T08:00:00Z"</span>,</div>
              <div className="pl-4 text-neutral-400">"verificationGate": <span className="text-cyan-300">"CONFIRMED"</span></div>
              <div className="text-cyan-400">{"}"}</div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              The orchestrator formulates structured tool calls, checks permissions, and verifies results before updating the Experience Learning Engine.
            </p>
          </div>
        )}

        {activeSession === "memory" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  Memory 2.0 Multi-Tier Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40">
                  Room SQLite + MemoryItem
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500">Selective Top-k</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850">
                <span className="text-[10px] text-cyan-400 block font-semibold">SESSION MEMORY</span>
                <span className="text-neutral-200 block text-xs mt-0.5 font-bold">Ephemeral Cache</span>
                <span className="text-neutral-500 text-[10px] mt-1 block">Active conversation turn</span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850">
                <span className="text-[10px] text-blue-400 block font-semibold">WORKING MEMORY</span>
                <span className="text-neutral-200 block text-xs mt-0.5 font-bold">Task State & Slots</span>
                <span className="text-neutral-500 text-[10px] mt-1 block">Form drafts & parameters</span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850">
                <span className="text-[10px] text-emerald-400 block font-semibold">DURABLE MEMORY</span>
                <span className="text-neutral-200 block text-xs mt-0.5 font-bold">Room SQLite DB</span>
                <span className="text-neutral-500 text-[10px] mt-1 block">Explicit user corrections</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-850 text-xs text-neutral-300 flex items-center justify-between">
              <span>ExperienceLearningEngine Pattern Check:</span>
              <span className="text-emerald-400 font-mono font-semibold">Safety Filter: PASSED</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Only contextually relevant memories are passed to prompts, preventing token exhaustion and hallucinations.
            </p>
          </div>
        )}

        {activeSession === "hardware" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  MQTT 3.1.1 & ESP32 Code Generator
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                  Two-Way Telemetry
                </span>
              </div>
              <span className="text-xs font-mono text-neutral-500">MqttManager · Port 1883</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850">
                <span className="text-[10px] text-cyan-400 block">COMMAND TOPIC (PUB)</span>
                <span className="text-neutral-200 text-[11px] block mt-1">myra/devices/desk_relay/set</span>
                <span className="text-neutral-400 text-[10px] block mt-0.5">Payload: {"{\"state\": \"ON\"}"}</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-850">
                <span className="text-[10px] text-emerald-400 block">FEEDBACK TOPIC (SUB)</span>
                <span className="text-neutral-200 text-[11px] block mt-1">myra/devices/desk_relay/state</span>
                <span className="text-emerald-400 text-[10px] block mt-0.5">Payload: {"{\"state\": \"ON\", \"temp\": 24.5}"}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-850 flex items-center justify-between text-xs">
              <span className="text-neutral-300">Esp32CodeGenerator:</span>
              <span className="text-cyan-400 font-mono">Ready-to-flash C++ sketch compiled</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Operates locally over your Wi-Fi network without requiring proprietary smart-home cloud subscriptions.
            </p>
          </div>
        )}

        {/* Footer info bar inside console */}
        <div className="pt-4 border-t border-neutral-850/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Android Keystore AES-256 Protected</span>
          </div>
          <span className="text-neutral-500">Target SDK 36 · Kotlin 2.x</span>
        </div>
      </div>
    </div>
  );
};
