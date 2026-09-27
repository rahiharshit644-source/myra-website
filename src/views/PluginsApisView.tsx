import React, { useState } from "react";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { APP_SPECS, PublicApiItem } from "../config/appInfo";
import { Compass, Globe, ArrowRight, ShieldCheck, Cpu, Code, CheckCircle2 } from "lucide-react";

export const PluginsApisView: React.FC = () => {
  const pluginFeatures = FEATURES_DATA.filter((f) => f.category === "Plugins & APIs");
  const [selectedApi, setSelectedApi] = useState<PublicApiItem>(APP_SPECS.implementedPublicApis[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Extensibility & Tool Manifest</span>
          <span aria-hidden="true">·</span>
          <span>Public APIs & Fallback Mechanism</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Plugin Registry & Implemented Public APIs
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA's plugin system allows internal tools and public services to register capabilities dynamically. The orchestrator queries the registry manifest, selects appropriate tools, executes them, and automatically routes to fallback plugins if errors occur.
        </p>
      </div>

      {/* Plugin Architecture & Fallback Diagram */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Plugin Lifecycle & Fallback Routing
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Orchestrator makes decisions; plugins supply modular capabilities.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded">
            PluginRegistry Manifest
          </span>
        </div>

        {/* Modular Plugin Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 font-mono text-xs">
          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-neutral-500 text-[10px] block">01. INGEST</span>
            <strong className="text-neutral-200 block text-[11px] mt-0.5">Orchestrator</strong>
            <span className="text-[10px] text-neutral-400">Classifies tool need</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-cyan-400 text-[10px] block">02. QUERY</span>
            <strong className="text-cyan-300 block text-[11px] mt-0.5">PluginRegistry</strong>
            <span className="text-[10px] text-neutral-400">Matches capability tag</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
            <span className="text-blue-400 text-[10px] block">03. INVOKE</span>
            <strong className="text-blue-300 block text-[11px] mt-0.5">Primary Plugin</strong>
            <span className="text-[10px] text-neutral-400">e.g. StorageManager</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-amber-900/40">
            <span className="text-amber-400 text-[10px] block">04. EVALUATE</span>
            <strong className="text-amber-300 block text-[11px] mt-0.5">PluginResult</strong>
            <span className="text-[10px] text-neutral-400">Catches error / success</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-purple-900/40">
            <span className="text-purple-400 text-[10px] block">05. FALLBACK</span>
            <strong className="text-purple-300 block text-[11px] mt-0.5">Fallback Lookup</strong>
            <span className="text-[10px] text-neutral-400">Selects backup plugin</span>
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-emerald-900/40">
            <span className="text-emerald-400 text-[10px] block">06. COMPLETE</span>
            <strong className="text-emerald-300 block text-[11px] mt-0.5">Orchestrator</strong>
            <span className="text-[10px] text-neutral-400">Learns & responds</span>
          </div>
        </div>
      </div>

      {/* Public APIs Catalog vs Currently Implemented Executor */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-neutral-100">
              Currently Implemented Public API Executors
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            The bundled project contains an extensive directory of public APIs, but only the 9 services below have concrete, working executors in PublicApiExecutor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {APP_SPECS.implementedPublicApis.map((api) => (
            <div
              key={api.name}
              onClick={() => setSelectedApi(api)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedApi.name === api.name
                  ? "bg-neutral-950 border-cyan-500/80 shadow-xs"
                  : "bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-200">
                  {api.name}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  Implemented
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                {api.desc}
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-900 font-mono text-[10px] text-neutral-500 truncate">
                Host: {api.endpoint}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Deep Dive */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Registry, Plugins & Fallbacks
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {pluginFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
