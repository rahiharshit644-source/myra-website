import React from "react";
import { NavTab } from "./Navbar";
import { DEVELOPER_INFO } from "../config/contacts";
import { Github, Mail, Linkedin, Instagram, Youtube, ExternalLink } from "lucide-react";

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-850 pt-16 pb-12 text-sm text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand & Project Identity Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xl font-bold tracking-tight text-neutral-100">
              MYRA
            </span>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Your AI. Your Voice. Your Android. An Android AI assistant and voice operating system connecting voice reasoning, memory, UI automation, RAG documents, and smart home control.
            </p>
            <div className="text-xs font-mono text-neutral-500 space-y-1">
              <div>Package: <span className="text-neutral-300 font-mono">com.soltini.app</span></div>
              <div>Min SDK: 26 (Android 8.0) · Target SDK: 36 (Android 16)</div>
              <div>Stack: Kotlin · Jetpack Compose · Material 3</div>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={DEVELOPER_INFO.links.githubPersonal}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="GitHub Developer Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_INFO.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_INFO.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={DEVELOPER_INFO.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${DEVELOPER_INFO.links.email}`}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
                aria-label="Email Developer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Subsystems Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab("home")} className="hover:text-neutral-200">
                  Orchestrator Pipeline
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("voice")} className="hover:text-neutral-200">
                  Gemini Live Voice AI
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("memory")} className="hover:text-neutral-200">
                  Memory 2.0 & Learning
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("automation")} className="hover:text-neutral-200">
                  Accessibility Automation
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("smart-home")} className="hover:text-neutral-200">
                  ESP32 & MQTT Control
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities & Tools Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab("phone-notifications")} className="hover:text-neutral-200">
                  Calls & Notification Safety
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("scheduling")} className="hover:text-neutral-200">
                  Alarms & Geofencing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("rag-storage")} className="hover:text-neutral-200">
                  Local RAG Document Engine
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("plugins-apis")} className="hover:text-neutral-200">
                  Plugin Registry & APIs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("security")} className="hover:text-neutral-200">
                  Voice Biometrics & Keystore
                </button>
              </li>
            </ul>
          </div>

          {/* Documentation & Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider">
              Resources & Privacy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab("ai-support")} className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 cursor-pointer">
                  <span>AI Support & Enquiries</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("docs")} className="hover:text-neutral-200">
                  Technical Documentation
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("permissions")} className="hover:text-neutral-200">
                  Android Permissions Audit
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("privacy")} className="hover:text-neutral-200">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("terms")} className="hover:text-neutral-200">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("faq")} className="hover:text-neutral-200">
                  Architecture FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab("developer")} className="hover:text-neutral-200">
                  Lead Developer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} MYRA Project · Authored by{" "}
            <button
              onClick={() => onSelectTab("developer")}
              className="text-neutral-300 hover:text-cyan-400 font-medium transition-colors"
            >
              Harshit Raahi
            </button>
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onSelectTab("privacy")} className="hover:text-neutral-400">
              Privacy
            </button>
            <button onClick={() => onSelectTab("terms")} className="hover:text-neutral-400">
              Terms
            </button>
            <button onClick={() => onSelectTab("contact")} className="hover:text-neutral-400">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
