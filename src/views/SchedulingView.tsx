import React from "react";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { Clock, Calendar, MapPin, ArrowRight, Bell, ShieldAlert } from "lucide-react";

export const SchedulingView: React.FC = () => {
  const schedulingFeatures = FEATURES_DATA.filter((f) => f.category === "Scheduling & Routines");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
          <span>Temporal & Spatial Triggers</span>
          <span aria-hidden="true">·</span>
          <span>AlarmManager & WorkManager</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Scheduling, Alarms & Geofencing
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA bridges natural-language time expressions with Android's exact alarm subsystem, enabling precise reminder execution, battery-conscious WorkManager routines, and geofence boundary triggers.
        </p>
      </div>

      {/* Visual Pipeline: Natural Language to Alarm Execution */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Natural Language Scheduling Pipeline
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              How spoken phrases transform into hardware-backed Android AlarmManager intents.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-neutral-950 border border-neutral-800 px-2.5 py-1 rounded">
            SCHEDULE_EXACT_ALARM
          </span>
        </div>

        {/* 5-Step Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-xs">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase block">01. Utterance</span>
              <strong className="text-neutral-200 block text-xs mt-1">Natural Spoken Time</strong>
              <p className="text-[11px] text-neutral-400 font-sans mt-1">
                "Remind me to check server logs in 45 minutes"
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] text-neutral-500">
              Raw String Input
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-cyan-400 uppercase block">02. Parser</span>
              <strong className="text-cyan-300 block text-xs mt-1">NaturalTimeParser</strong>
              <p className="text-[11px] text-neutral-400 font-sans mt-1">
                Resolves relative offsets (+45m) and absolute clock timestamps.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] text-neutral-500">
              Epoch Timestamp (ms)
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-blue-400 uppercase block">03. Persistence</span>
              <strong className="text-blue-300 block text-xs mt-1">ScheduledTask Entity</strong>
              <p className="text-[11px] text-neutral-400 font-sans mt-1">
                Persisted in Room DB with task payload and retry metadata.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] text-neutral-500">
              Room SQLite Record
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-purple-400 uppercase block">04. Hardware Alarm</span>
              <strong className="text-purple-300 block text-xs mt-1">Android AlarmManager</strong>
              <p className="text-[11px] text-neutral-400 font-sans mt-1">
                setExactAndAllowWhileIdle() wakes CPU even during Doze state.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] text-neutral-500">
              PendingIntent Armed
            </div>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-emerald-400 uppercase block">05. Execution</span>
              <strong className="text-emerald-300 block text-xs mt-1">AlarmReceiver</strong>
              <p className="text-[11px] text-neutral-400 font-sans mt-1">
                Posts notification and dispatches task to MyraOrchestrator.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-neutral-900 text-[10px] text-emerald-400">
              Task Fired & Verified
            </div>
          </div>
        </div>

        {/* Battery & Background Caveat */}
        <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            <strong>Android Battery Restrictions:</strong> Geofencing uses cell-tower and Wi-Fi fences rather than continuous active GPS to conserve battery life. Exact alarms require user approval under Android 12+ Special App Access.
          </span>
        </div>
      </div>

      {/* Feature Deep Dive */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: Alarms, WorkManager & Geofences
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {schedulingFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
