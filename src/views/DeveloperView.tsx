import React from "react";
import { DEVELOPER_INFO, SOCIAL_CARDS } from "../config/contacts";
import { Mail, Github, Linkedin, Instagram, Youtube, ExternalLink, Code2, Terminal, Cpu } from "lucide-react";

export const DeveloperView: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case "mail":
        return <Mail className="w-5 h-5 text-cyan-400" />;
      case "github":
      case "code":
        return <Github className="w-5 h-5 text-neutral-200" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-blue-400" />;
      case "instagram":
        return <Instagram className="w-5 h-5 text-rose-400" />;
      case "youtube":
        return <Youtube className="w-5 h-5 text-red-500" />;
      default:
        return <Terminal className="w-5 h-5 text-neutral-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Profile Card */}
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
              Architect & Engineer
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              {DEVELOPER_INFO.name}
            </h1>
            <p className="text-sm font-mono text-neutral-300">
              {DEVELOPER_INFO.role}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${DEVELOPER_INFO.primaryEmail}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-neutral-950 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact via Email</span>
            </a>
          </div>
        </div>

        {/* Engineering Philosophy */}
        <div className="space-y-3 text-sm text-neutral-300 leading-relaxed max-w-3xl">
          <p>
            Harshit Raahi engineered MYRA (<strong>com.soltini.app</strong>) as an integrated native Android voice operating system. Rather than treating an AI assistant as an isolated cloud chat box, MYRA unites low-level Android operating system services (Accessibility traversal, Voice Interaction sessions, Notification listeners, and exact alarms) with Gemini Live's real-time WebSocket protocol and local Room SQLite memory persistence.
          </p>
          <p className="text-xs text-neutral-400">
            Stack: Kotlin 2.x · Jetpack Compose · Material 3 · Coroutines & StateFlow · Room SQLite · OkHttp / Ktor WebSocket · Android KeyStore AES-256 · MQTT 3.1.1.
          </p>
        </div>
      </div>

      {/* Verified Official Links and Profiles */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-100">
            Official Developer Channels & Social Profiles
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Connect directly for technical collaboration, security disclosures, and source updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOCIAL_CARDS.map((card) => (
            <a
              key={card.label}
              href={card.url}
              target="_blank"
              rel="noreferrer"
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
                  <div className="flex items-center gap-2.5">
                    {getIcon(card.icon)}
                    <span className="text-sm font-semibold text-neutral-100 group-hover:text-cyan-400 transition-colors">
                      {card.label}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 transition-colors" />
                </div>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-900 font-mono text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors truncate">
                {card.displayUrl}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
