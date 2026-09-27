import React from "react";
import { RagPipelineDiagram } from "../components/RagPipelineDiagram";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { FileText, ShieldCheck, Database, HardDrive, ArrowRight, Lock, ShieldAlert } from "lucide-react";

export const RagStorageView: React.FC = () => {
  const ragFeatures = FEATURES_DATA.filter((f) => f.category === "RAG & Storage");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
          <span>Grounding & Document Knowledge</span>
          <span aria-hidden="true">·</span>
          <span>Storage Access Framework</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Local RAG Engine & SAF File Safety
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA incorporates an on-device Retrieval-Augmented Generation (RAG) engine that indexes user-authorized documents to provide grounded, factual answers. Destructive file operations are strictly guarded by verbal confirmation gates and optional voice biometrics.
        </p>
      </div>

      {/* Interactive RAG Pipeline Component */}
      <RagPipelineDiagram />

      {/* File Safety & Voice Lock Confirmation Workflow */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              FileSafetyManager: Destructive Action Safeguard Flow
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Prevents autonomous plugins from deleting or overwriting user files without human authorization.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded">
            Confirmation Gate Enforced
          </span>
        </div>

        {/* 4-Step Verification Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase block">Step 01</span>
            <strong className="text-neutral-200 block text-xs mt-1">Destructive Intent</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Plugin or user issues file delete or directory wipe request.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-amber-400 uppercase block">Step 02</span>
            <strong className="text-amber-300 block text-xs mt-1">Pending Registration</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              FileSafetyManager pauses task, creating a pending action token.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-blue-400 uppercase block">Step 03</span>
            <strong className="text-blue-300 block text-xs mt-1">Confirmation Prompt</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Prompts: "Are you sure you want to delete [filename]?"
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-[10px] text-emerald-400 uppercase block">Step 04</span>
            <strong className="text-emerald-300 block text-xs mt-1">Voice Biometric Check</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              If Voice Lock enabled, verifies voice embedding before deletion.
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            <strong>Storage Access Boundaries:</strong> MYRA relies strictly on Android's Storage Access Framework (ACTION_OPEN_DOCUMENT_TREE). It does not request broad root file system privileges and can only read folders you explicitly choose.
          </span>
        </div>
      </div>

      {/* Feature Deep Dive */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Parsers, Splitters & Storage
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {ragFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
