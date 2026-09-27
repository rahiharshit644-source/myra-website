import React from "react";
import { Esp32MqttDiagram } from "../components/Esp32MqttDiagram";
import { FeatureExplainerCard } from "../components/FeatureExplainerCard";
import { FEATURES_DATA } from "../data/featuresData";
import { Radio, Cpu, Database, Code, Sliders, ShieldAlert, CheckCircle2 } from "lucide-react";

export const SmartHomeView: React.FC = () => {
  const homeFeatures = FEATURES_DATA.filter((f) => f.category === "Smart Home & Hardware");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
          <span>Local IoT & Hardware Synthesis</span>
          <span aria-hidden="true">·</span>
          <span>MQTT 3.1.1 & ESP32 Code Generator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
          Smart Home, MQTT & ESP32 Generator
        </h1>
        <p className="text-base text-neutral-400 mt-2 max-w-3xl leading-relaxed">
          MYRA acts as a local smart home controller without requiring proprietary cloud hubs. It maintains bi-directional MQTT state communication with microcontrollers and includes a built-in ESP32 C++ code generator for your custom relays and sensors.
        </p>
      </div>

      {/* Interactive MQTT & ESP32 Component */}
      <Esp32MqttDiagram />

      {/* Jetpack Compose Smart Home UI Preview */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <h3 className="text-lg font-semibold text-neutral-100">
            Jetpack Compose Material 3 Home UI Architecture
          </h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
            Built using modern MVI/MVVM reactive flows. The UI reflects physical device states in real-time as MQTT state messages arrive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-cyan-400 text-[10px] block">UI SCREEN</span>
            <strong className="text-neutral-200 block text-xs mt-1">HomeAutomationScreen</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Displays rooms, categorized devices, relay switches, and live sensor telemetry.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-blue-400 text-[10px] block">VIEWMODEL</span>
            <strong className="text-neutral-200 block text-xs mt-1">HomeAutomationViewModel</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Exposes StateFlow&lt;List&lt;DeviceEntity&gt;&gt; synchronized with Room and MqttManager.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-purple-400 text-[10px] block">DEVICE WIZARD</span>
            <strong className="text-neutral-200 block text-xs mt-1">AddDeviceScreen</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Selects GPIO pins, device types, assigns room tags, and configures MQTT topics.
            </p>
          </div>

          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <span className="text-emerald-400 text-[10px] block">CODE PREVIEW</span>
            <strong className="text-neutral-200 block text-xs mt-1">CodePreviewDialog</strong>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Displays syntax-highlighted Arduino C++ sketches ready for export to local storage.
            </p>
          </div>
        </div>

        <div className="text-xs text-neutral-400 bg-neutral-950/60 p-3 rounded-lg border border-neutral-850 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
          <span>
            <strong>Hardware Scope Notice:</strong> Esp32CodeGenerator creates standardized sketches utilizing the standard PubSubClient and WiFi libraries for ESP32 and ESP8266. It does not fabricate firmware for arbitrary proprietary Zigbee/Z-Wave bridges.
          </span>
        </div>
      </div>

      {/* Feature Deep Dive */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
          Component Breakdown: MQTT, Hardware & Storage
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {homeFeatures.map((feat) => (
            <FeatureExplainerCard key={feat.id} feature={feat} />
          ))}
        </div>
      </div>
    </div>
  );
};
