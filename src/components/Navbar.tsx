import React, { useState } from "react";
import { Menu, X, Download, ChevronDown, Sparkles } from "lucide-react";

export type NavTab =
  | "home"
  | "voice"
  | "memory"
  | "automation"
  | "phone-notifications"
  | "scheduling"
  | "rag-storage"
  | "plugins-apis"
  | "smart-home"
  | "security"
  | "docs"
  | "permissions"
  | "privacy"
  | "terms"
  | "download"
  | "developer"
  | "faq"
  | "contact"
  | "ai-support";

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const mainNavItems: { label: string; tab: NavTab }[] = [
    { label: "Overview", tab: "home" },
    { label: "Voice AI", tab: "voice" },
    { label: "Memory", tab: "memory" },
    { label: "Automation", tab: "automation" },
    { label: "Smart Home", tab: "smart-home" },
    { label: "Documentation", tab: "docs" },
  ];

  const secondaryNavItems: { label: string; tab: NavTab }[] = [
    { label: "AI Support & Enquiries", tab: "ai-support" },
    { label: "Phone & Notifications", tab: "phone-notifications" },
    { label: "Scheduling & Routines", tab: "scheduling" },
    { label: "RAG & Storage", tab: "rag-storage" },
    { label: "Plugins & APIs", tab: "plugins-apis" },
    { label: "Security & Biometrics", tab: "security" },
    { label: "Android Permissions", tab: "permissions" },
    { label: "Privacy Policy", tab: "privacy" },
    { label: "FAQ", tab: "faq" },
    { label: "Developer", tab: "developer" },
    { label: "Contact", tab: "contact" },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick("home")}
          className="text-lg font-bold tracking-tight text-neutral-100 hover:text-cyan-400 transition-colors shrink-0 text-left"
        >
          MYRA
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          {mainNavItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`transition-colors whitespace-nowrap ${
                currentTab === item.tab
                  ? "text-neutral-100 font-semibold"
                  : "hover:text-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* More Subsystems Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className="flex items-center gap-1 hover:text-neutral-200 transition-colors whitespace-nowrap"
            >
              <span>Subsystems</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-2 z-50">
                {secondaryNavItems.map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleNavClick(item.tab)}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors block ${
                      currentTab === item.tab
                        ? "text-cyan-400 bg-neutral-850 font-semibold"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleNavClick("ai-support")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              currentTab === "ai-support"
                ? "bg-cyan-500 text-neutral-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-linear-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Support</span>
          </button>

          <button
            onClick={() => handleNavClick("download")}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-neutral-950 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-neutral-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-neutral-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-1">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider py-1 px-2">
            Main Architecture
          </div>
          {mainNavItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full text-left px-3 py-2 rounded text-sm block ${
                currentTab === item.tab
                  ? "bg-neutral-900 text-cyan-400 font-medium"
                  : "text-neutral-300 hover:bg-neutral-900"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider pt-3 pb-1 px-2 border-t border-neutral-900 mt-2">
            All Subsystems & Legal
          </div>
          {secondaryNavItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full text-left px-3 py-1.5 rounded text-xs block ${
                currentTab === item.tab
                  ? "bg-neutral-900 text-cyan-400 font-medium"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3">
            <button
              onClick={() => handleNavClick("download")}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-neutral-950 bg-neutral-100 rounded-lg hover:bg-neutral-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download APK</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
