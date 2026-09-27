import React from "react";
import { FeatureDetail } from "../data/featuresData";
import { ArrowRight, AlertCircle, CheckCircle2, KeyRound } from "lucide-react";

interface FeatureExplainerCardProps {
  feature: FeatureDetail;
}

export const FeatureExplainerCard: React.FC<FeatureExplainerCardProps> = ({ feature }) => {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800/80 pb-3">
        <h4 className="text-lg font-semibold text-neutral-100 tracking-tight">
          {feature.title}
        </h4>
        <div className="flex items-center gap-1.5 flex-wrap">
          {feature.classes.map((cls) => (
            <span
              key={cls}
              className="text-[11px] font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded"
            >
              {cls}
            </span>
          ))}
        </div>
      </div>

      {/* Triad Format: What it does → How it works → What it requires */}
      <div className="space-y-4 mt-4 text-sm">
        {/* What it does */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>What it does</span>
          </div>
          <p className="text-neutral-300 leading-relaxed pl-3 border-l-2 border-cyan-500/30">
            {feature.whatItDoes}
          </p>
        </div>

        {/* How it works */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>How it works internally</span>
          </div>
          <p className="text-neutral-300 leading-relaxed pl-3 border-l-2 border-blue-500/30">
            {feature.howItWorks}
          </p>
        </div>

        {/* What it requires */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>What it requires</span>
          </div>
          <p className="text-neutral-300 leading-relaxed pl-3 border-l-2 border-amber-500/30">
            {feature.whatItRequires}
          </p>
        </div>

        {/* Optional Flow Steps */}
        {feature.flowSteps && feature.flowSteps.length > 0 && (
          <div className="pt-2">
            <span className="text-xs font-mono text-neutral-500 block mb-1.5">
              Flow Sequence:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              {feature.flowSteps.map((step, idx) => (
                <React.Fragment key={step}>
                  <span className="bg-neutral-950 border border-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                    {step}
                  </span>
                  {idx < feature.flowSteps!.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Caveats / Safeguard note */}
        {feature.caveats && (
          <div className="flex items-start gap-2 pt-2 text-xs text-neutral-400 italic bg-neutral-950/40 p-2.5 rounded border border-neutral-850">
            <AlertCircle className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
            <span>{feature.caveats}</span>
          </div>
        )}
      </div>
    </div>
  );
};
