import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Cpu,
  ShieldCheck,
  Radio,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare
} from "lucide-react";
import { NavTab } from "./Navbar";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

interface AiSupportWidgetProps {
  onNavigate?: (tab: NavTab) => void;
}

const PRESET_TOPICS = [
  {
    icon: Sparkles,
    label: "Gemini Live Audio",
    query: "How does GeminiLiveManager handle audio streaming and instant user interruptions?"
  },
  {
    icon: Layers,
    label: "Memory 2.0 Tiers",
    query: "Explain the difference between SessionMemory, WorkingMemory, and Room Durable DB in Memory 2.0."
  },
  {
    icon: ShieldCheck,
    label: "Banking Mode Safety",
    query: "How does BankingModeTileService protect financial apps and prevent automation leakage?"
  },
  {
    icon: Radio,
    label: "ESP32 & MQTT Sync",
    query: "How does MYRA synchronize device states with an ESP32 using MQTT topics?"
  },
  {
    icon: Cpu,
    label: "Hardware & RAM",
    query: "What are the exact RAM and Android SDK requirements to run MYRA without memory pressure?"
  }
];

export const AiSupportWidget: React.FC<AiSupportWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: `Hello! I am the **MYRA Technical AI Support Specialist**.

I am directly grounded in the official \`com.soltini.app\` Android codebase. You can ask me anything about:
- **MyraOrchestrator** & 8-step decision pipeline
- **Gemini Live** WebSocket streaming & PCM audio
- **Memory 2.0**, Experience Learning & Daily Diary
- **Accessibility Automation** for WhatsApp, Gmail, YouTube & Maps
- **ESP32 Arduino C++** firmware & MQTT two-way synchronization
- **Hardware-backed Keystore** & Voice Biometrics cosine similarity

How can I assist your review or development today?`,
      timestamp: "Just now",
      suggestedQuestions: [
        "How does Gemini Live handle interruptions in AudioPlayer?",
        "What are the 3 tiers of Memory 2.0?",
        "How does Banking Mode protect banking apps?",
        "What are the minimum hardware and RAM requirements for MYRA?"
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setIsMinimized(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    };

    window.addEventListener("open-ai-support", handleOpenEvent);
    return () => window.removeEventListener("open-ai-support", handleOpenEvent);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: "user",
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ];

    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const apiPayload = {
        messages: newMessages.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          content: m.content
        })),
        query: text
      };

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload)
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const data = await res.json();
      const assistantReply = data.reply || "No response received from the support service.";

      setMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: assistantReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestedQuestions: data.suggestedQuestions || []
        }
      ]);
    } catch (err: any) {
      console.error("AI Support inquiry error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: `⚠️ Unable to reach the server AI service right now.

Here is the verified architectural summary for **${text}**:
- **Package**: \`com.soltini.app\`
- **Core Pipeline**: Orchestrator (Decision) → Memory (Context) → Plugins (Actions)
- **Voice Stack**: \`GeminiLiveManager\` over WebSocket streaming raw PCM chunks with \`AudioRecorder\` and \`AudioPlayer\`.
- **Memory**: \`Memory2Engine\` managing Session, Working, and Durable Room DB items with semantic search.
- **Safety**: Sensitive actions require explicit verbal/touch confirmation gates.

Please ensure the local server is running or contact **Harshit Raahi** at \`harshitkumarup82@gmail.com\`.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: `Chat session reset. You are connected to the official MYRA Technical Support AI. Ask any question about Android architecture, Gemini Live, memory, or permissions.`,
        timestamp: "Just now",
        suggestedQuestions: [
          "How does Gemini Live handle interruptions in AudioPlayer?",
          "What are the 3 tiers of Memory 2.0?",
          "How does Banking Mode protect banking apps?",
          "What are the minimum hardware and RAM requirements for MYRA?"
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-cyan-400/40 cursor-pointer"
            aria-label="Open AI Support"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 animate-pulse text-cyan-200" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-950 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-950" />
            </div>
            <div className="text-left font-sans pr-1">
              <span className="block text-xs font-bold leading-tight tracking-wide">
                AI Support
              </span>
              <span className="block text-[10px] text-cyan-100 font-mono opacity-90">
                Ask anything about MYRA
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Support Dialog Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[440px] md:w-[480px] max-h-[85vh] flex flex-col rounded-3xl bg-neutral-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-linear-to-r from-cyan-950/60 via-blue-950/40 to-neutral-950 border-b border-neutral-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-neutral-100">
                    MYRA AI Support
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[11px] font-mono text-cyan-300/80">
                  com.soltini.app · Architecture Specialist
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-400">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg hover:bg-neutral-850 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand" : "Minimize"}
                className="p-1.5 rounded-lg hover:bg-neutral-850 hover:text-neutral-200 transition-colors cursor-pointer"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close AI Support"
                className="p-1.5 rounded-lg hover:bg-neutral-850 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Preset Quick Topics Bar */}
              <div className="px-4 py-2 bg-neutral-900/60 border-b border-neutral-850/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                <span className="text-[10px] font-mono text-neutral-400 shrink-0 uppercase tracking-wider pl-1">
                  Topics:
                </span>
                {PRESET_TOPICS.map((topic, i) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(topic.query)}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-850 hover:bg-neutral-800 text-neutral-300 hover:text-cyan-300 border border-neutral-750 text-[11px] font-medium shrink-0 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Icon className="w-3 h-3 text-cyan-400" />
                      <span>{topic.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Message History List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[460px] text-sm">
                {messages.map((m) => {
                  const isAssistant = m.role === "assistant";
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-[10px] font-mono text-neutral-400">
                          {isAssistant ? "MYRA AI Support" : "You"}
                        </span>
                        <span className="text-[10px] text-neutral-400">·</span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {m.timestamp}
                        </span>
                      </div>

                      <div
                        className={`group relative p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                          isAssistant
                            ? "bg-neutral-900/90 text-neutral-200 border border-neutral-800 shadow-md"
                            : "bg-linear-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-600/10"
                        }`}
                      >
                        {/* Copy button for Assistant */}
                        {isAssistant && (
                          <button
                            onClick={() => handleCopyText(m.id, m.content)}
                            title="Copy response"
                            className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-all cursor-pointer"
                          >
                            {copiedId === m.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        <div className="whitespace-pre-wrap text-[13px] leading-relaxed break-words font-sans">
                          {m.content}
                        </div>

                        {/* Suggested Follow-up Prompts */}
                        {isAssistant && m.suggestedQuestions && m.suggestedQuestions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-neutral-800 space-y-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                              Suggested questions:
                            </span>
                            <div className="flex flex-col gap-1">
                              {m.suggestedQuestions.map((q, qIdx) => (
                                <button
                                  key={qIdx}
                                  onClick={() => handleSendMessage(q)}
                                  disabled={isLoading}
                                  className="text-left text-xs text-cyan-400 hover:text-cyan-300 hover:underline py-0.5 transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <span className="text-cyan-500 font-mono text-[11px]">→</span>
                                  <span>{q}</span>
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
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 pl-1">
                      MYRA AI is reasoning...
                    </span>
                    <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-xs font-mono">Consulting com.soltini.app architecture...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-neutral-950 border-t border-neutral-850">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask any question about MYRA..."
                    disabled={isLoading}
                    className="flex-1 bg-neutral-900/90 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-cyan-500/80 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                    aria-label="Send query"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 font-mono px-1">
                  <span>Grounded in Android Kotlin & Material 3 specs</span>
                  {onNavigate && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate("ai-support");
                      }}
                      className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Console</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
