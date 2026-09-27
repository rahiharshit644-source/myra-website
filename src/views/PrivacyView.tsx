import React from "react";
import { ShieldCheck, Database, Globe, Lock, AlertTriangle, ArrowRight } from "lucide-react";

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-850 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Privacy & Data Architecture Disclosure</span>
          <span aria-hidden="true">·</span>
          <span>com.soltini.app</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Privacy Policy
        </h1>
        <p className="text-base text-neutral-400 mt-2 leading-relaxed">
          This document explains precisely how data is processed within MYRA (Android package <code className="text-neutral-200 font-mono text-xs">com.soltini.app</code>), clearly distinguishing between local on-device persistence and network communications.
        </p>
      </div>

      {/* Critical Core Architecture Disclosure */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-4">
        <h2 className="text-xl font-semibold text-neutral-100 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <span>On-Device Storage vs. Network Integrations</span>
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed">
          MYRA is <strong>not a purely offline application</strong>. While several core subsystems operate strictly on-device using local Room SQLite databases, other features communicate over the network with cloud APIs:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
            <span className="font-semibold text-emerald-400 block font-mono text-xs">
              ON-DEVICE PERSISTENCE (ROOM SQLITE)
            </span>
            <ul className="text-neutral-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><strong>Memory2Database:</strong> Explicit memories, user corrections, working memory slots, and session states.</li>
              <li><strong>HomeDatabase:</strong> Configured ESP32 and smart home devices, MQTT topics, and relay states.</li>
              <li><strong>Scheduled Tasks:</strong> Alarm timestamps, scheduled reminders, and recurring intervals.</li>
              <li><strong>KnowledgeDatabase (RAG):</strong> Text chunks extracted from user-authorized local files.</li>
              <li><strong>Voice Profiles:</strong> Acoustic embeddings for speaker similarity checks.</li>
            </ul>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
            <span className="font-semibold text-cyan-400 block font-mono text-xs">
              NETWORK COMMUNICATIONS
            </span>
            <ul className="text-neutral-300 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><strong>Gemini Live:</strong> Bidirectional WebSocket audio streams (16-bit PCM) and reasoning prompts sent to Google AI Studio / Gemini servers.</li>
              <li><strong>Mem0 (Optional):</strong> If configured with an external API key, memory facts synchronize with Mem0 semantic endpoints.</li>
              <li><strong>Public APIs:</strong> Web requests sent to CoinGecko, wttr.in, Dictionary API, Frankfurter currency, and IP-API when executing corresponding tools.</li>
              <li><strong>MQTT Broker:</strong> Connection established to user-configured local or cloud MQTT servers.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sensitive Android Permissions Breakdown */}
      <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-neutral-100 pt-4 border-b border-neutral-800 pb-2">
          Sensitive Android Permissions & Usage Boundaries
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              1. Microphone (RECORD_AUDIO & FOREGROUND_SERVICE_MICROPHONE)
            </h3>
            <p className="text-neutral-400 mt-1">
              Audio is captured when the user initiates a voice interaction or when the background voice foreground service is active. The raw PCM stream is transmitted over WebSocket to Gemini Live. MYRA does not record or store ambient room audio permanently on disk.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              2. Android Accessibility Service (BIND_ACCESSIBILITY_SERVICE)
            </h3>
            <p className="text-neutral-400 mt-1">
              Accessibility is required for ScreenOperator to inspect on-screen view nodes, perform coordinate taps, and inject text during app automations (e.g. WhatsApp, Gmail). Screen observation is executed strictly during active automation tasks. Secure windows flagged with Android's <code className="text-neutral-200 font-mono text-xs">FLAG_SECURE</code> (e.g. banking apps, password vaults) are completely inaccessible and blacked out by the OS.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              3. Telephony & Call Logs (READ_PHONE_STATE, ANSWER_PHONE_CALLS, READ_CALL_LOG)
            </h3>
            <p className="text-neutral-400 mt-1">
              Used solely to detect incoming calls, announce caller names, and allow voice-commanded call answering or rejection. <strong>MYRA does not secretly record phone calls.</strong> Android system security prevents third-party apps from intercepting cellular voice audio without root/carrier access.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              4. SMS (SEND_SMS)
            </h3>
            <p className="text-neutral-400 mt-1">
              Used exclusively through the Pending Confirmation System. When an SMS draft is generated, MYRA pauses and requires affirmative user confirmation before transmitting. No SMS is ever dispatched silently.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              5. Notification Access (BIND_NOTIFICATION_LISTENER_SERVICE)
            </h3>
            <p className="text-neutral-400 mt-1">
              Enables active notification inspection to summarize alerts and execute inline RemoteInput quick replies. Group chat heuristics prevent accidental automated group replies. Users can blacklist specific applications in settings.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              6. Location & Geofencing (ACCESS_FINE_LOCATION, ACCESS_BACKGROUND_LOCATION)
            </h3>
            <p className="text-neutral-400 mt-1">
              Location data is used solely to evaluate configured geofence triggers (e.g., location-based reminders). MYRA does not maintain a continuous GPS tracking log.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-200">
              7. Screen Overlay (SYSTEM_ALERT_WINDOW)
            </h3>
            <p className="text-neutral-400 mt-1">
              Renders the compact floating RingIndicatorView for one-tap voice invocation over other apps. The overlay is dismissed automatically when Banking Mode is enabled.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-neutral-100 pt-6 border-b border-neutral-800 pb-2">
          User Control & Revocation
        </h2>
        <p className="text-neutral-400">
          Android system settings give users complete authority to grant or revoke any runtime permission or special access feature at any time. Revoking a permission will gracefully disable the associated subsystem without crashing the application.
        </p>
      </div>
    </div>
  );
};
