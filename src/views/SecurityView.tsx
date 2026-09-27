import React, { useState } from "react";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { ShieldCheck, KeyRound, Mic, Lock, Smartphone, ShieldAlert, Cpu, ArrowRight } from "lucide-react";

export const SecurityView: React.FC = () => {
  const securityFeatures = FEATURES_DATA.filter((f) => f.category === "Security & Safety");
  const [similarityThreshold, setSimilarityThreshold] = useState(0.82);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider mb-2">
          <span>Cryptographic & Biometric Guardrails</span>
          <span aria-hidden="true">·</span>
          <span>Android Keystore & Cosine Similarity</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Security, Voice Biometrics & Banking Mode
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA incorporates defense-in-depth safeguards: hardware-backed key protection in the Android Secure Element, acoustic voice embedding verification, and an instant Banking Mode Quick Settings tile to suspend automation when entering sensitive apps.
        </p>
      </div>

      {/* Voice Biometrics Cosine Matching Flow */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Voice Biometrics: Acoustic Embedding & Cosine Similarity
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              How VoiceBiometricsManager verifies speaker identity for sensitive actions.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-neutral-950 px-3 py-1 rounded border border-neutral-800">
            <span>Threshold: {similarityThreshold}</span>
          </div>
        </div>

        {/* 6-Step Visual Biometric Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 font-mono text-xs">
          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-neutral-500 text-[10px] block">01. ENROLL</span>
            <strong className="text-neutral-200 block text-[11px] mt-0.5">Phrases</strong>
            <span className="text-[10px] text-neutral-400">3-5 voice samples</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-cyan-400 text-[10px] block">02. EXTRACT</span>
            <strong className="text-cyan-300 block text-[11px] mt-0.5">Filterbanks</strong>
            <span className="text-[10px] text-neutral-400">MFCC spectral features</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-blue-400 text-[10px] block">03. EMBED</span>
            <strong className="text-blue-300 block text-[11px] mt-0.5">Norm Vector</strong>
            <span className="text-[10px] text-neutral-400">L2 normalized array</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-purple-900/40">
            <span className="text-purple-400 text-[10px] block">04. CHALLENGE</span>
            <strong className="text-purple-300 block text-[11px] mt-0.5">Live Sample</strong>
            <span className="text-[10px] text-neutral-400">Target action sample</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-amber-900/40">
            <span className="text-amber-400 text-[10px] block">05. COMPARE</span>
            <strong className="text-amber-300 block text-[11px] mt-0.5">Cosine Sim</strong>
            <span className="text-[10px] text-neutral-400">dot(A, B) / (|A|*|B|)</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-emerald-900/40">
            <span className="text-emerald-400 text-[10px] block">06. VERIFY</span>
            <strong className="text-emerald-300 block text-[11px] mt-0.5">Gate Passed</strong>
            <span className="text-[10px] text-neutral-400">Execute if &gt; {similarityThreshold}</span>
          </div>
        </div>

        <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            <strong>Biometric Boundary Notice:</strong> Voice biometrics in MYRA is software-based acoustic verification. It is not equivalent to dedicated hardware biometric sensors (such as capacitive fingerprint scanners or 3D structured light facial recognition). Heavy background noise, colds, or hoarseness can impact matching scores.
          </span>
        </div>
      </div>

      {/* Banking Mode Tile Detail */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              BankingModeTileService (Android Quick Settings Tile)
            </h3>
            <p className="text-xs text-neutral-400">
              Proactive privacy isolation for financial operations.
            </p>
          </div>
        </div>

        <p className="text-sm text-neutral-300 leading-relaxed">
          The project provides a registered Android Quick Settings tile that users can add to their system notification shade. Toggling Banking Mode activates an immediate lock: ScreenOperator suspends all simulated touches, SoltiniAccessibilityService halts node text extraction, and OverlayService hides the floating ring. While not a substitute for standard device hygiene, this prevents unintended automation interference while using banking apps.
        </p>
      </div>

      {/* Feature Deep Dive */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Keystore, Biometrics & System Startup
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {securityFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
