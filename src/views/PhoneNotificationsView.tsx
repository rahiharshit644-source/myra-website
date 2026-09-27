import React from "react";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { Phone, Bell, Shield, MessageSquare, CheckCircle, ShieldAlert, ArrowRight } from "lucide-react";

export const PhoneNotificationsView: React.FC = () => {
  const phoneFeatures = FEATURES_DATA.filter((f) => f.category === "Phone, Calls & Notifications");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Telephony & System Notifications</span>
          <span aria-hidden="true">·</span>
          <span>Confirmation Safeguards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Phone, Calls, SMS & Notification Safety
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA integrates with Android's notification and telephony stacks with explicit safeguards: mandatory confirmation gates for SMS dispatch, group chat auto-reply suppression, and zero secret call recording.
        </p>
      </div>

      {/* Safety Safeguards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: SMS Pending Confirmation Gate */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-mono text-cyan-400 uppercase">Safeguard 01</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-100 mt-3">
              Pending Message Confirmation Gate
            </h3>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              When an SMS intent is formed, SmsSender registers a pending confirmation token. MYRA strictly pauses and demands affirmative user voice or touch confirmation before dispatching SmsManager.sendTextMessage.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 mt-4 space-y-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">
              Enforced Verification Flow
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <span className="text-cyan-400">Recipient + Body</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-amber-400">Pending State</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-emerald-400">User Yes/Confirm</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span>SmsManager</span>
            </div>
          </div>
        </div>

        {/* Card 2: Group Chat Filter */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-mono text-emerald-400 uppercase">Safeguard 02</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-100 mt-3">
              Group Chat Auto-Reply Suppression
            </h3>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
              NotificationRepository checks notification extras (EXTRA_IS_GROUP_CONVERSATION, group title delimiters, participant headers) to distinguish group chats from 1-on-1 conversations, blocking unintended automated replies.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 mt-4 space-y-2">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block">
              Filter Logic in NotificationRepository
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <span>Notification Ingest</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-rose-400">Group Detected</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-neutral-400">Auto-Reply Suppressed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Overlay vs Main Orb Clarification */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8">
        <h3 className="text-lg font-semibold text-neutral-100">
          OverlayService & RingIndicatorView (Separate from Voice Orb)
        </h3>
        <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
          MYRA provides an optional lightweight floating ring indicator that renders via Android's <code className="text-cyan-400 font-mono text-xs">SYSTEM_ALERT_WINDOW</code> permission. This floating indicator is an unobtrusive 40px circular view that provides instant voice tap activation without covering the screen. It is intentionally kept minimal and separate from the central 3D visualizer orb to preserve device battery and prevent GPU throttling.
        </p>
      </div>

      {/* Component Details */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Phone, Calls, SMS & Notifications
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {phoneFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
