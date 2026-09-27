/**
 * Official Website for MYRA Android OS (com.soltini.app)
 * Author: Harshit Raahi
 */

import React, { useState, useEffect } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./views/HomeView";
import { VoiceView } from "./views/VoiceView";
import { MemoryView } from "./views/MemoryView";
import { AutomationView } from "./views/AutomationView";
import { PhoneNotificationsView } from "./views/PhoneNotificationsView";
import { SchedulingView } from "./views/SchedulingView";
import { RagStorageView } from "./views/RagStorageView";
import { PluginsApisView } from "./views/PluginsApisView";
import { SmartHomeView } from "./views/SmartHomeView";
import { SecurityView } from "./views/SecurityView";
import { DocumentationView } from "./views/DocumentationView";
import { PermissionsView } from "./views/PermissionsView";
import { PrivacyView } from "./views/PrivacyView";
import { TermsView } from "./views/TermsView";
import { DownloadView } from "./views/DownloadView";
import { DeveloperView } from "./views/DeveloperView";
import { FaqView } from "./views/FaqView";
import { ContactView } from "./views/ContactView";
import { AiSupportView } from "./views/AiSupportView";
import { AiSupportWidget } from "./components/AiSupportWidget";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("home");

  // Auto scroll to top on tab change and sync page title
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.scrollTop = 0;
    }

    const titles: Record<NavTab, string> = {
      home: "MYRA – Your AI. Your Voice. Your Android.",
      voice: "Gemini Live Voice AI · MYRA Architecture",
      memory: "Memory 2.0 & Learning · MYRA Architecture",
      automation: "Accessibility Automation · MYRA Architecture",
      "phone-notifications": "Phone, Calls & Notifications · MYRA Architecture",
      scheduling: "Scheduling & Geofencing · MYRA Architecture",
      "rag-storage": "Local RAG & SAF Storage · MYRA Architecture",
      "plugins-apis": "Plugin System & Public APIs · MYRA Architecture",
      "smart-home": "Smart Home & ESP32 Generator · MYRA Architecture",
      security: "Security, Voice Biometrics & Keystore · MYRA",
      docs: "Documentation & Technical Manual · MYRA",
      permissions: "Android Permissions Audit · MYRA",
      privacy: "Privacy Policy & Data Architecture · MYRA",
      terms: "Terms of Service · MYRA",
      download: "Download MYRA APK (Universal Release) · com.soltini.app",
      developer: "Harshit Raahi – Creator & Lead Developer · MYRA",
      faq: "Frequently Asked Architecture Questions · MYRA",
      contact: "Contact & Collaboration · Harshit Raahi",
      "ai-support": "AI Support & Technical Enquiry Center · MYRA",
    };

    document.title = titles[currentTab] || "MYRA – Your AI. Your Voice. Your Android.";
  }, [currentTab]);

  const renderActiveView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView onSelectTab={setCurrentTab} />;
      case "voice":
        return <VoiceView />;
      case "memory":
        return <MemoryView />;
      case "automation":
        return <AutomationView />;
      case "phone-notifications":
        return <PhoneNotificationsView />;
      case "scheduling":
        return <SchedulingView />;
      case "rag-storage":
        return <RagStorageView />;
      case "plugins-apis":
        return <PluginsApisView />;
      case "smart-home":
        return <SmartHomeView />;
      case "security":
        return <SecurityView />;
      case "docs":
        return <DocumentationView />;
      case "permissions":
        return <PermissionsView />;
      case "privacy":
        return <PrivacyView />;
      case "terms":
        return <TermsView />;
      case "download":
        return <DownloadView />;
      case "developer":
        return <DeveloperView />;
      case "faq":
        return <FaqView />;
      case "contact":
        return <ContactView />;
      case "ai-support":
        return <AiSupportView onSelectTab={setCurrentTab} />;
      default:
        return <HomeView onSelectTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar following Top Bar Contract */}
      <Navbar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Quiet Footer */}
      <Footer onSelectTab={setCurrentTab} />

      {/* Global AI Support Assistant Floating Dock */}
      <AiSupportWidget onNavigate={setCurrentTab} />
    </div>
  );
}
