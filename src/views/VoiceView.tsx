import React from "react";
import { VoiceVisualizerSection } from "../components/VoiceVisualizerSection";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { Mic, ArrowRight, Radio, ShieldAlert, Cpu, Activity, PlayCircle } from "lucide-react";

export const VoiceView: React.FC = () => {
  const voiceFeatures = FEATURES_DATA.filter((f) => f.category === "Voice AI");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Real-Time Voice Architecture</span>
          <span aria-hidden="true">·</span>
          <span>WebSocket Full-Duplex</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Gemini Live Voice AI & System Integration
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA bridges Android's native audio hardware directly with Gemini Live via a persistent WebSocket connection, enabling natural spoken conversation with real-time interruption handling instead of turn-based text latency.
        </p>
      </div>

      {/* Visualizer & Streaming Protocol Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-linear-to-b from-neutral-900/60 to-neutral-950/80 border border-neutral-800 rounded-3xl p-6 lg:p-8 shadow-xl">
        {/* Left: The Visualizer waveform panel with state controls */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-800 pb-6 lg:pb-0 lg:pr-8">
          <VoiceVisualizerSection initialState="speaking" />
        </div>

        {/* Right: Technical Streaming Pipeline */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-semibold text-neutral-100">
            Real-Time Audio Pipeline (Microphone to Playback)
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed">
            GeminiLiveManager maintains a continuous WebSocket session. As you speak, AudioRecorder streams raw 16-bit PCM chunks. Gemini streams back audio and text concurrently. When you speak while MYRA is responding, the interruption is detected and AudioPlayer immediately flushes its buffer.
          </p>

          {/* Sequential Audio Flow Diagram */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 font-mono text-xs">
            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <span className="text-neutral-500 text-[10px] block">01. CAPTURE</span>
              <strong className="text-neutral-200 block text-[11px] mt-0.5">Microphone</strong>
              <span className="text-[10px] text-neutral-400">16kHz / 24kHz PCM</span>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <span className="text-neutral-500 text-[10px] block">02. BUFFER</span>
              <strong className="text-cyan-400 block text-[11px] mt-0.5">AudioRecorder</strong>
              <span className="text-[10px] text-neutral-400">Binary chunk slicing</span>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <span className="text-neutral-500 text-[10px] block">03. TRANSPORT</span>
              <strong className="text-blue-400 block text-[11px] mt-0.5">Gemini Live</strong>
              <span className="text-[10px] text-neutral-400">Bi-directional WS</span>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <span className="text-neutral-500 text-[10px] block">04. REASON</span>
              <strong className="text-purple-400 block text-[11px] mt-0.5">Gemini Model</strong>
              <span className="text-[10px] text-neutral-400">Audio / Tool Calls</span>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <span className="text-neutral-500 text-[10px] block">05. PLAYBACK</span>
              <strong className="text-emerald-400 block text-[11px] mt-0.5">AudioPlayer</strong>
              <span className="text-[10px] text-neutral-400">Streaming AudioTrack</span>
            </div>

            <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
              <span className="text-neutral-500 text-[10px] block">06. DISPLAY</span>
              <strong className="text-neutral-200 block text-[11px] mt-0.5">MYRA UI</strong>
              <span className="text-[10px] text-neutral-400">Live transcripts</span>
            </div>
          </div>

          <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <span>
              <strong>Latency & Recognition Reality:</strong> Recognition accuracy is subject to background acoustic noise, accent variation, and packet latency over mobile data. Zero latency does not exist in network-bound LLM pipelines.
            </span>
          </div>
        </div>
      </div>

      {/* Feature Deep Dive (What it does → How it works → What it requires) */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Voice & Android Integration
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {voiceFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
