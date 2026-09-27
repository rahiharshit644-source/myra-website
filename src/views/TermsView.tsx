import React from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-neutral-850 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Terms of Use & Architecture Disclaimers</span>
          <span aria-hidden="true">·</span>
          <span>com.soltini.app</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Terms of Service
        </h1>
        <p className="text-base text-neutral-400 mt-2 leading-relaxed">
          Please review these terms and system disclaimers before using MYRA (Android package <code className="text-neutral-200 font-mono text-xs">com.soltini.app</code>).
        </p>
      </div>

      <div className="space-y-8 text-sm text-neutral-300 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            01. Application Scope & Operating System Dependency
          </h2>
          <p className="text-neutral-400">
            MYRA is an advanced Android assistant application built using Kotlin, Jetpack Compose, and Material 3, designed for Android devices running minimum API 26 (Android 8.0 Oreo) up to SDK 36 (Android 16). Because MYRA depends deeply on Android platform services (such as <code className="text-neutral-200 font-mono text-xs">AccessibilityService</code>, <code className="text-neutral-200 font-mono text-xs">NotificationListenerService</code>, and <code className="text-neutral-200 font-mono text-xs">AlarmManager</code>), functionality is strictly constrained by your device manufacturer's ROM, OS version, and active battery-saver policies.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            02. Accessibility Automation & Third-Party App Interfaces
          </h2>
          <p className="text-neutral-400">
            When you enable the MYRA Accessibility Service, you authorize <code className="text-neutral-200 font-mono text-xs">ScreenOperator</code> to perform user-initiated gestures, clicks, and text entries on your behalf. MYRA does not guarantee that third-party applications (such as WhatsApp, Instagram, or Gmail) will maintain stable layout hierarchies. Third-party interface updates may alter element IDs or coordinate geometry, causing automators to halt safely.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            03. Smart Home, Microcontrollers & Electrical Safety
          </h2>
          <p className="text-neutral-400">
            MYRA provides MQTT communication and an automated Arduino C++ code generator for ESP32 and ESP8266 microcontrollers. You are solely responsible for compiling, flashing, verifying electrical wiring, and safely isolating all external relay hardware, mains voltage connections, and power supplies. The developer assumes no liability for hardware damage or electrical faults resulting from custom microcontroller deployments.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            04. Third-Party API Keys & Network Quotas
          </h2>
          <p className="text-neutral-400">
            Connecting MYRA to Gemini Live or optional Mem0 services requires the provision of valid API credentials. You are responsible for monitoring your upstream API quotas, billing tiers, and key confidentiality. Keys stored in MYRA are encrypted via the Android Keystore, but you must safeguard your original tokens.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            05. Voice Biometrics & Unlock Capabilities
          </h2>
          <p className="text-neutral-400">
            Voice verification in MYRA relies on acoustic feature embedding cosine similarity. It is provided as an auxiliary software-level gate for voice sessions and sensitive actions; it is not a cryptographically certified biometric lock equivalent to Android's hardware fingerprint or iris HAL.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-neutral-100">
            06. Disclaimer of Warranties
          </h2>
          <p className="text-neutral-400">
            MYRA is provided "AS IS", without warranty of any kind, express or implied. In no event shall the developer (Harshit Raahi) be liable for any claim, damages, or other liability arising from the use or inability to use the software.
          </p>
        </section>
      </div>
    </div>
  );
};
