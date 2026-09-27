import React, { useState } from "react";
import { Shield, ShieldAlert, Check, Touchpad, MessageSquare, Send, Sparkles } from "lucide-react";

export const PhoneSimulator: React.FC = () => {
  const [bankingModeActive, setBankingModeActive] = useState(false);
  const [selectedAutomator, setSelectedAutomator] = useState<"whatsapp" | "gmail" | "banking">("whatsapp");
  const [automationStep, setAutomationStep] = useState(0);

  const automatorScenarios = {
    whatsapp: {
      name: "WhatsAppAutomator",
      target: "com.whatsapp",
      title: "WhatsApp Dispatch Workflow",
      steps: [
        "1. SoltiniAccessibilityService traverses active window hierarchy",
        "2. ScreenOperator locates chat search view by ID: `com.whatsapp:id/search`",
        "3. Coordinates dispatched to tap recipient chat entry",
        "4. Text injected into `com.whatsapp:id/entry` via ACTION_SET_TEXT",
        "5. ScreenOperator taps `com.whatsapp:id/send` to finalize dispatch",
      ],
      safeInBanking: false,
    },
    gmail: {
      name: "GmailAutomator",
      target: "com.google.android.gm",
      title: "Gmail Composition Workflow",
      steps: [
        "1. Launches compose Intent via AgentToolExecutor.openApp()",
        "2. SoltiniAccessibilityService waits for compose UI tree to hydrate",
        "3. Sets Recipient field to target contact email",
        "4. Injects structured Subject and Body text into edit fields",
        "5. Retains email as draft or awaits explicit user confirmation before send",
      ],
      safeInBanking: false,
    },
    banking: {
      name: "BankingModeTileService",
      target: "com.secure.banking",
      title: "Financial App Protection State",
      steps: [
        "1. Android Quick Settings tile toggles BankingMode on",
        "2. SoltiniAccessibilityService suppresses all automated tap/click gestures",
        "3. ScreenAnalyzer disables node text scraping for secure windows",
        "4. OverlayService hides floating ring indicator to prevent tap-jacking",
        "5. Banking session remains 100% human-controlled and isolated",
      ],
      safeInBanking: true,
    },
  };

  const activeScenario = automatorScenarios[selectedAutomator];

  return (
    <div className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <h3 className="text-xl font-semibold text-neutral-100">
            Android Accessibility & Safeguard Simulation
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            Simulate how SoltiniAccessibilityService, ScreenOperator, and BankingModeTileService interact with Android apps.
          </p>
        </div>

        {/* Banking Mode Quick Settings Tile Toggle */}
        <div className="flex items-center gap-3 bg-neutral-950 p-2 px-3 rounded-lg border border-neutral-800">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-200">
              Banking Mode Tile
            </span>
            <span className="text-[10px] text-neutral-500">
              Quick Settings Tile
            </span>
          </div>
          <button
            onClick={() => {
              setBankingModeActive(!bankingModeActive);
              if (!bankingModeActive) setSelectedAutomator("banking");
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              bankingModeActive
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {bankingModeActive ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>RESTRICTED</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5" />
                <span>OFF (Standard)</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column: Workflow Selector & Steps */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 p-1 bg-neutral-950 rounded-lg border border-neutral-850">
            <button
              onClick={() => setSelectedAutomator("whatsapp")}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded transition-colors ${
                selectedAutomator === "whatsapp"
                  ? "bg-neutral-800 text-neutral-100 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              WhatsAppAutomator
            </button>
            <button
              onClick={() => setSelectedAutomator("gmail")}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded transition-colors ${
                selectedAutomator === "gmail"
                  ? "bg-neutral-800 text-neutral-100 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              GmailAutomator
            </button>
            <button
              onClick={() => setSelectedAutomator("banking")}
              className={`flex-1 py-1.5 px-3 text-xs font-medium rounded transition-colors ${
                selectedAutomator === "banking"
                  ? "bg-neutral-800 text-neutral-100 shadow-xs"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              Banking Protection
            </button>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <span className="text-sm font-semibold text-neutral-200">
                {activeScenario.title}
              </span>
              <span className="text-xs font-mono text-neutral-500">
                {activeScenario.target}
              </span>
            </div>

            {bankingModeActive && selectedAutomator !== "banking" ? (
              <div className="p-4 my-4 rounded border border-amber-900/60 bg-amber-950/20 text-amber-300 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">
                    Automation Blocked by BankingModeTileService
                  </strong>
                  Accessibility gesture dispatching and screen node inspection are suppressed to protect financial privacy.
                </div>
              </div>
            ) : (
              <div className="space-y-2 mt-4">
                {activeScenario.steps.map((st, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-900/40 p-2.5 rounded border border-neutral-850"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 font-mono text-[10px]">
                      0{i + 1}
                    </span>
                    <span className="font-mono leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Clean Android Phone Wireframe */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[260px] h-[480px] bg-neutral-950 border-4 border-neutral-800 rounded-3xl p-3 flex flex-col justify-between relative shadow-xl overflow-hidden">
            {/* Phone Notch / Camera */}
            <div className="w-20 h-4 bg-neutral-900 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
            </div>

            {/* Android Screen Body */}
            <div className="flex-1 bg-neutral-900/80 rounded-xl p-3 flex flex-col justify-between border border-neutral-800 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[10px] text-neutral-400">
                <span>12:00</span>
                <span>com.soltini.app</span>
              </div>

              {bankingModeActive ? (
                <div className="flex flex-col items-center justify-center text-center p-4 my-auto">
                  <Shield className="w-10 h-10 text-amber-400 mb-2" />
                  <span className="font-semibold text-neutral-200 text-xs">
                    Banking Mode Active
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-1">
                    Accessibility automation halted. Overlays detached.
                  </span>
                </div>
              ) : selectedAutomator === "whatsapp" ? (
                <div className="space-y-2 my-auto">
                  <div className="bg-emerald-950/40 border border-emerald-800/40 p-2 rounded text-[11px] text-emerald-300">
                    <span className="font-semibold block text-[10px]">WhatsApp Chat</span>
                    "Sending meeting link..."
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                    <Touchpad className="w-3 h-3 text-cyan-400" />
                    <span>dispatchGesture(x: 210, y: 440)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 my-auto">
                  <div className="bg-rose-950/40 border border-rose-800/40 p-2 rounded text-[11px] text-rose-300">
                    <span className="font-semibold block text-[10px]">Gmail Compose</span>
                    Subject: Project Update
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                    <Touchpad className="w-3 h-3 text-cyan-400" />
                    <span>ACTION_SET_TEXT injected</span>
                  </div>
                </div>
              )}

              {/* Soltini Overlay Indicator Badge on phone */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-[10px]">
                <span className="text-neutral-500">RingIndicatorView</span>
                <span className={`w-2.5 h-2.5 rounded-full ${bankingModeActive ? "bg-amber-500" : "bg-cyan-400 animate-pulse"}`}></span>
              </div>
            </div>

            {/* Android Navigation Bar */}
            <div className="w-24 h-1 bg-neutral-700 rounded-full mx-auto mt-2 shrink-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
