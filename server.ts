import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY environment variable not set. Fallback mode enabled for AI inquiries.");
}

const MYRA_SYSTEM_INSTRUCTION = `You are the official Technical AI Support Assistant for MYRA (Android package: com.soltini.app).
MYRA is an advanced Android AI voice operating system built natively with Kotlin, Jetpack Compose, and Material 3.
The creator and lead developer is Harshit Raahi (email: harshitkumarup82@gmail.com, Instagram: @mr_rahi_officialx).

CRITICAL GROUNDING RULES:
1. Only answer based on features and subsystems that ACTUALLY EXIST in the MYRA project.
2. Never invent features, mock capabilities, or claim unsupported functionality.
3. If asked about something MYRA does not support (e.g. background call recording, silent SMS sending without confirmation, iOS support, biometric voice lock without enrollment), explain the security boundary and why it is restricted.
4. Maintain a helpful, precise, technical, and professional tone. Reference actual project classes where relevant.

TECHNICAL SUBSYSTEM KNOWLEDGE BASE:
- Central Orchestrator (MyraOrchestrator):
  * Execution Pipeline: UNDERSTAND -> REMEMBER -> PLAN -> DISCOVER CAPABILITIES -> EXECUTE -> VERIFY -> LEARN/UPDATE MEMORY -> RESPOND.
  * Role: Orchestrator decides what should happen; memory provides context; plugins/tools provide concrete capabilities.
- Gemini Live Voice AI:
  * GeminiLiveManager connects via full-duplex WebSocket to Gemini Live.
  * AudioRecorder captures 16-bit PCM microphone chunks at 16kHz/24kHz.
  * AudioPlayer plays incoming PCM streaming chunks in MODE_STREAM.
  * Instant barge-in / interruption handling: flushes playback buffer immediately when user speaks.
  * Android Voice Interaction: SoltiniVoiceInteractionService, SoltiniVoiceInteractionSession, AssistLaunchActivity.
  * Background Voice: BackgroundVoiceService with foreground microphone notification (respects Android background execution limits).
- Memory 2.0 & Unified Memory:
  * Three tiers: SessionMemory (in-flight state), WorkingMemory (active multi-turn goals), Durable Room DB (Memory2Database, MemoryItem).
  * Managed by Memory2Engine. Selective context retrieval rather than loading all memories.
  * ExperienceLearningEngine & ExperienceMemory: records task attempts, user corrections, and learned experience patterns. Verifies safety before storing.
  * DailyDiaryScreen: user-facing daily context log.
  * Optional Mem0 integration (Mem0ApiClient) for external cross-session sync when API key is provided.
- Android Accessibility Automation:
  * SoltiniAccessibilityService & ScreenOperator inspect UI node hierarchies, inject touch coordinates, gestures, and text.
  * AgentToolExecutor links AI reasoning plans to concrete Android actions.
  * Dedicated Target Automators: WhatsAppAutomator, InstagramAutomator, GmailAutomator, YouTubeAutomator, MapsAutomator.
  * Visual & UI Analysis: ScreenAnalyzer (accessibility nodes) and VisualScreenAnalyzer (MediaProjection visual analysis when permitted).
- Telephony & Notifications:
  * AgentPhoneController, CallNotificationManager, IncomingCallReceiver: announces callers, supports voice answer/reject via TelecomManager. NEVER records phone calls.
  * SmsSender: strictly enforces confirmation gates before sending messages.
  * SoltiniNotificationListener & NotificationRepository: captures, filters, and extracts reply actions; identifies group chats to prevent accidental broadcasting.
- Scheduling:
  * ScheduledTaskManager, ScheduledTask, ScheduledTaskAlarmReceiver.
  * NaturalTimeParser converts natural expressions ("tomorrow at 9 AM", "in 20 minutes") into exact epoch alarms via AlarmManager.
- Storage & Local RAG:
  * SafStorageManager: Android Storage Access Framework (SAF) for user-authorized directory and file access.
  * RagKnowledgeEngine & RecursiveDocumentSplitter: indexes local PDFs, code, markdown, and plain text into SQLite search chunks.
  * FileSafetyManager: pending action queue requiring explicit verbal or touch confirmation for destructive file operations.
- Plugins & Public APIs:
  * PluginRegistry, PluginMetadata, PluginResult, BuiltinPluginInitializer. Supports dynamic discovery and fallbacks.
  * Built-in: StorageManagerPlugin.
  * PublicApiRegistry & PublicApiExecutor for cataloged external endpoints.
- Smart Home & Hardware:
  * MqttManager: maintains persistent TCP/TLS MQTT connection to Mosquitto or cloud brokers.
  * Two-way state sync via topic convention 'myra/devices/{id}/state' and 'myra/devices/{id}/set'.
  * DeviceDao & DeviceEntity in local Room HomeDatabase.
  * Esp32CodeGenerator: generates flashable Arduino C++ firmware sketches for ESP32 microcontrollers controlling relays and sensors.
- Security & Biometrics:
  * KeystoreCryptoManager: hardware-backed Android Keystore AES-256 GCM encryption for credentials.
  * VoiceBiometricsManager & VoiceProfileManager: extracts acoustic feature embeddings from enrollment phrases; verifies speaker using cosine similarity.
  * BankingModeTileService: Quick Settings tile that temporarily freezes automation and overlay services when opening sensitive financial apps.
- Target Requirements:
  * Min SDK: API 26 (Android 8.0 Oreo).
  * Target SDK: SDK 36 (Android 16).
  * Recommended RAM: 6-8 GB (minimum 3 GB).
`;

// AI Support Enquiry API
app.post("/api/ai/chat", async (req: Request, res: Response) => {
  try {
    const { messages, query } = req.body;

    const userMessage = query || (Array.isArray(messages) && messages.length > 0 
      ? messages[messages.length - 1].content 
      : "");

    if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
      return res.status(400).json({ error: "Missing inquiry message" });
    }

    if (!aiClient) {
      // Provide a rich, grounded offline fallback response if API key is not yet configured
      return res.json({
        reply: `Thank you for your inquiry about MYRA!

I am currently running in local architectural guide mode because the \`GEMINI_API_KEY\` is being initialized in your environment.

Regarding **"${userMessage.trim()}"**:
MYRA (\`com.soltini.app\`) is engineered with strict Android native boundaries:
- **Core Orchestrator**: Decides execution using an 8-step pipeline (Understand → Remember → Plan → Discover Capabilities → Execute → Verify → Learn → Respond).
- **Gemini Live Voice AI**: Full-duplex WebSocket streaming with raw 16-bit PCM audio, instant interruption handling, and native Android voice interaction services (\`SoltiniVoiceInteractionService\`).
- **Memory 2.0**: Three-tiered memory (Session, Working, and Durable Room DB) with semantic retrieval and safety-gated experience learning.
- **Accessibility Automation**: Direct node-based UI control via \`SoltiniAccessibilityService\` with specialized automators for WhatsApp, Gmail, YouTube, and Maps.
- **Hardware & Smart Home**: Native MQTT broker synchronization and on-device ESP32 Arduino C++ firmware generation.
- **Safety & Biometrics**: Hardware-backed Android Keystore, voice biometrics cosine similarity verification, and a Quick Settings Banking Mode tile to safeguard financial apps.

For direct developer contact, reach Harshit Raahi at **harshitkumarup82@gmail.com**.`,
        suggestedQuestions: [
          "How does Gemini Live handle interruptions in AudioPlayer?",
          "Explain the difference between Session, Working, and Durable memory.",
          "What permissions does SoltiniAccessibilityService require?",
          "How does the ESP32 code generator format MQTT topics?"
        ]
      });
    }

    // Format chat contents for @google/genai
    const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages)) {
      for (const m of messages.slice(-8)) {
        if (m.content) {
          formattedContents.push({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: String(m.content) }]
          });
        }
      }
    }

    if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== "user") {
      formattedContents.push({
        role: "user",
        parts: [{ text: userMessage.trim() }]
      });
    }

    const response = await aiClient.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: MYRA_SYSTEM_INSTRUCTION,
        temperature: 0.4,
      }
    });

    const reply = response.text || "I was unable to generate a detailed response. Please check your query or consult the architecture documentation.";

    res.json({
      reply,
      suggestedQuestions: [
        "How does Gemini Live WebSocket audio streaming work?",
        "What are the 3 tiers of Memory 2.0?",
        "How does Banking Mode protect banking apps?",
        "What are the minimum hardware and RAM requirements for MYRA?"
      ]
    });
  } catch (error: any) {
    console.error("Error in /api/ai/chat:", error);
    res.status(500).json({
      error: "Failed to process AI support inquiry",
      details: error?.message || "Unknown server error"
    });
  }
});

// App specifications and quick health endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "MYRA Official Technical Portal",
    package: "com.soltini.app",
    aiEnabled: Boolean(aiClient),
    minSdk: 26,
    targetSdk: 36
  });
});

// Dev or Production Static Serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MYRA server running on http://0.0.0.0:${PORT} [${isProduction ? "production" : "development"}]`);
  });
}

startServer();
