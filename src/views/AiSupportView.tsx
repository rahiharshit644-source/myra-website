import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Send,
  Terminal,
  Cpu,
  Layers,
  Radio,
  ShieldCheck,
  Smartphone,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Info,
  HelpCircle
} from "lucide-react";
import { NavTab } from "../components/Navbar";
import { DEVELOPER_INFO } from "../config/contacts";

interface AiSupportViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const AiSupportView: React.FC<AiSupportViewProps> = ({ onSelectTab }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [chatLog, setChatLog] = useState<Array<{ role: "user" | "assistant"; text: string; time: string; suggestions?: string[] }>>([
    {
      role: "assistant",
      text: `Welcome to the official **MYRA AI Technical Support & Architecture Assistant**.

I am strictly instructed to ground my responses in the **com.soltini.app** Android codebase (Kotlin, Jetpack Compose, Material 3, API 26 to SDK 36).

### You can ask about:
- **MyraOrchestrator**: Understand → Remember → Plan → Discover → Execute → Verify → Learn → Respond
- **Gemini Live Engine**: AudioRecorder (16-bit PCM), AudioPlayer streaming with barge-in, WebSocket management
- **Memory 2.0**: Three tiers (Session, Working, Room DB), semantic retrieval, Experience Learning
- **Accessibility Automation**: SoltiniAccessibilityService node traversal, gesture clicks, targeted WhatsApp/Gmail automators
- **Hardware & IoT**: MQTT two-way broker sync and ESP32 Arduino C++ firmware generation
- **Safety & OS Constraints**: Android Keystore AES-256 GCM, Banking Mode Quick Settings tile, and explicit SMS/File confirmation gates

Type any technical question below or pick one of the curated inquiries on the left.`,
      time: "Initial",
      suggestions: [
        "How does Gemini Live handle interruptions in AudioPlayer?",
        "Explain the difference between Session, Working, and Durable memory in Memory 2.0.",
        "How does Banking Mode protect banking apps?",
        "What are the minimum hardware and RAM requirements for MYRA?"
      ]
    }
  ]);

  const handleAsk = async (textToSubmit?: string) => {
    const text = (textToSubmit || query).trim();
    if (!text || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const updatedLog = [
      ...chatLog,
      { role: "user" as const, text, time: timeStr }
    ];

    setChatLog(updatedLog);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedLog.map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            content: m.text
          })),
          query: text
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      setChatLog(prev => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "No response received.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: data.suggestedQuestions || []
        }
      ]);
    } catch (err: any) {
      console.error("AI Support Error:", err);
      setChatLog(prev => [
        ...prev,
        {
          role: "assistant",
          text: `⚠️ **Technical Support Service Notice**:
Could not reach the server AI endpoint. 

**Quick Fact Check for "${text}"**:
MYRA (\`com.soltini.app\`) is an Android voice operating system where:
- The **Orchestrator** coordinates 8 explicit lifecycle steps.
- **Microphone frames** are converted to 16-bit PCM by \`AudioRecorder\` and streamed via WebSockets to Gemini Live.
- **Memory 2.0** uses three distinct tiers (in-memory Session, working context, and Room SQLite) without loading the whole database blindly.
- **Safety checks** prevent unauthorized phone calls or silent file edits.

If you have urgent inquiries, reach developer **Harshit Raahi** at \`${DEVELOPER_INFO.primaryEmail}\`.`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleReset = () => {
    setChatLog([
      {
        role: "assistant",
        text: "Conversation reset. You are connected to MYRA Technical AI Support. How can I help you understand com.soltini.app?",
        time: "Initial",
        suggestions: [
          "How does GeminiLiveManager manage WebSockets?",
          "What is the role of SoltiniAccessibilityService?",
          "How does the ESP32 code generator format MQTT topics?"
        ]
      }
    ]);
  };

  const CURATED_QUESTIONS = [
    {
      category: "Voice & Real-Time",
      icon: Sparkles,
      color: "text-cyan-400",
      questions: [
        "How does Gemini Live handle interruptions in AudioPlayer?",
        "What sample rate and audio format does AudioRecorder capture?",
        "How does SoltiniVoiceInteractionService integrate with Android's system assistant?"
      ]
    },
    {
      category: "Memory & Learning",
      icon: Layers,
      color: "text-indigo-400",
      questions: [
        "Explain the difference between Session, Working, and Durable memory.",
        "How does ExperienceLearningEngine check if a learning method is safe?",
        "What does DailyDiaryScreen contribute to the user's context?"
      ]
    },
    {
      category: "Automation & Safety",
      icon: ShieldCheck,
      color: "text-emerald-400",
      questions: [
        "How does BankingModeTileService protect users when opening financial apps?",
        "Why can't MYRA silently send SMS without user confirmation?",
        "How does SoltiniAccessibilityService perform targeted WhatsApp interactions?"
      ]
    },
    {
      category: "Hardware & IoT",
      icon: Radio,
      color: "text-amber-400",
      questions: [
        "What MQTT topic structure is used to synchronize ESP32 device states?",
        "Does Esp32CodeGenerator generate ready-to-flash Arduino C++ sketches?",
        "What are the minimum hardware and RAM requirements for MYRA?"
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>24/7 Technical Knowledge Engine</span>
            <span className="text-neutral-500">·</span>
            <span>Gemini 3.8 Flash</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
            MYRA AI Support & Enquiry Center
          </h1>
          <p className="text-base text-neutral-300 mt-2 max-w-3xl leading-relaxed">
            Have questions about MYRA's architecture, permissions, memory engine, or Android 16 compatibility? Ask the AI Support Specialist, grounded strictly in the verified <code className="font-mono text-cyan-300 bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">com.soltini.app</code> codebase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab("docs")}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-750 text-neutral-200 hover:text-white hover:border-cyan-500/50 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Read Docs</span>
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-750 text-neutral-400 hover:text-neutral-200 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Curated Inquiries & Specs; Right Chat Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Curated Topic Inquiries */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider pb-2 border-b border-neutral-800">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Verified Inquiries by Subsystem</span>
            </div>

            <div className="space-y-4">
              {CURATED_QUESTIONS.map((cat, cIdx) => {
                const Icon = cat.icon;
                return (
                  <div key={cIdx} className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-200">
                      <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                      <span>{cat.category}</span>
                    </div>
                    <div className="space-y-1.5 pl-2 border-l border-neutral-800">
                      {cat.questions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleAsk(q)}
                          disabled={isLoading}
                          className="w-full text-left text-xs text-neutral-300 hover:text-cyan-300 py-1 px-2 rounded-lg hover:bg-neutral-850/70 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Developer Grounding Card */}
          <div className="bg-linear-to-br from-neutral-900/80 via-neutral-950 to-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Strict Non-Hallucination Policy</span>
            </h3>
            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              This AI assistant is configured with a system prompt that mandates direct grounding in the <code className="font-mono text-cyan-300">com.soltini.app</code> Kotlin source code. It refuses to invent unsupported capabilities or claim fake autonomous features.
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between text-xs text-neutral-400">
              <span>Need human support?</span>
              <button
                onClick={() => onSelectTab("contact")}
                className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span>Contact Harshit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive AI Terminal */}
        <div className="lg:col-span-8 flex flex-col h-[720px] bg-neutral-950/90 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Terminal Window Bar */}
          <div className="px-6 py-4 bg-linear-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-neutral-400 pl-2">
                myra-ai-support@soltini.app: ~
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-emerald-300">Online & Ready</span>
            </div>
          </div>

          {/* Conversation Log */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatLog.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                >
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span className="text-[11px] font-mono text-neutral-400 font-semibold">
                      {isAssistant ? "MYRA AI Specialist" : "You"}
                    </span>
                    <span className="text-xs text-neutral-500">·</span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {msg.time}
                    </span>
                  </div>

                  <div
                    className={`group relative p-5 rounded-2xl max-w-[90%] leading-relaxed ${
                      isAssistant
                        ? "bg-neutral-900/90 text-neutral-200 border border-neutral-800 shadow-lg"
                        : "bg-linear-to-r from-cyan-600 via-sky-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-500/10"
                    }`}
                  >
                    {/* Copy Button */}
                    {isAssistant && (
                      <button
                        onClick={() => handleCopy(index, msg.text)}
                        title="Copy to clipboard"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-400 hover:text-neutral-200 transition-all cursor-pointer"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    <div className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                      {msg.text}
                    </div>

                    {/* Suggestions */}
                    {isAssistant && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                          Follow-up Questions:
                        </span>
                        <div className="flex flex-col gap-1.5">
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleAsk(sug)}
                              disabled={isLoading}
                              className="text-left text-xs text-cyan-400 hover:text-cyan-300 hover:underline py-0.5 transition-colors cursor-pointer flex items-center gap-2"
                            >
                              <span className="text-cyan-500 font-mono text-xs">→</span>
                              <span>{sug}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex flex-col items-start space-y-2">
                <span className="text-xs font-mono text-cyan-400">
                  Processing architecture query...
                </span>
                <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-xs font-mono">
                    Querying Gemini 3.8 Flash with com.soltini.app system context...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Query Input Bar */}
          <div className="p-4 bg-neutral-950 border-t border-neutral-850">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk();
              }}
              className="flex items-center gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about MYRA (e.g., 'How does the orchestrator execute tools?')"
                  disabled={isLoading}
                  className="w-full bg-neutral-900/90 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-medium text-xs sm:text-sm hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-2 shrink-0"
              >
                <span>Ask AI</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400 font-mono px-1">
              <span>Supported: Kotlin · Jetpack Compose · Material 3 · API 26-36</span>
              <span>Backend: /api/ai/chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
