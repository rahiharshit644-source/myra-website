import React from "react";
import { PhoneSimulator } from "../components/PhoneSimulator";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { APP_SPECS } from "../config/appInfo";
import { Smartphone, ArrowRight, ShieldAlert, Cpu, Terminal, Layers } from "lucide-react";

export const AutomationView: React.FC = () => {
  const automationFeatures = FEATURES_DATA.filter((f) => f.category === "Automation & Tools");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
          <span>Android Action Layer</span>
          <span aria-hidden="true">·</span>
          <span>Accessibility Service & Agent Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Accessibility Automation & App Automators
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA translates high-level cognitive plans into concrete physical Android UI actions using Android's Accessibility framework. It interacts with node hierarchies, dispatches gesture strokes, and executes targeted application automations.
        </p>
      </div>

      {/* Interactive Phone Simulator & Safeguards */}
      <PhoneSimulator />

      {/* Target Application Automators Grid */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Verified Application Automator Classes
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Targeted routines in com.soltini.app engineered for specific apps rather than speculative blind tapping.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded">
            Target-Specific State Machines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {APP_SPECS.appAutomators.map((auto) => (
            <div
              key={auto.name}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  {auto.name}
                </span>
                <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                  Target: {auto.target}
                </div>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  {auto.actions}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                <span>Accessibility Node Traversal</span>
                <span className="text-emerald-500">Verified</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            <strong>UI Dependency Notice:</strong> Automators rely on known Android view IDs and layout trees. Third-party app updates that alter DOM trees or redesign layouts can temporarily disrupt automated flows until updated in the codebase.
          </span>
        </div>
      </div>

      {/* Feature Deep Dive Cards */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Tools, Screen Inspection & Browser Use
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {automationFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
