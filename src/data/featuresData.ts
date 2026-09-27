/**
 * Technical Feature Specifications for MYRA Android Assistant
 * Strict "What it does → How it works → What it requires" format
 * Based strictly on com.soltini.app codebase
 */

export interface FeatureDetail {
  id: string;
  category: string;
  title: string;
  classes: string[];
  whatItDoes: string;
  howItWorks: string;
  whatItRequires: string;
  flowSteps?: string[];
  caveats?: string;
}

export const FEATURES_DATA: FeatureDetail[] = [
  // 1. ORCHESTRATION & CORE FLOW
  {
    id: "orchestrator",
    category: "Architecture & Orchestration",
    title: "MYRA Central Orchestrator",
    classes: ["MyraOrchestrator", "OrchestratorPlan", "IntentClassifier"],
    whatItDoes: "Acts as the central cognitive brain and decision engine of MYRA. It ingests user requests from voice, text, camera context, or background automation, decides what should happen, coordinates memory retrieval, selects plugins/tools, executes concrete operations, validates outputs, learns from results, and synthesizes the user response.",
    howItWorks: "The orchestrator executes a strict sequential decision pipeline: 1. UNDERSTAND: parses input and classifies intent. 2. REMEMBER: queries MyraUnifiedMemory and Memory2Engine for relevant context. 3. PLAN: constructs a structured intent and execution plan. 4. DISCOVER: queries PluginRegistry for matching tool capabilities. 5. EXECUTE: dispatches tasks to AgentToolExecutor or registered plugins. 6. VERIFY: inspects execution result codes. 7. LEARN: updates ExperienceLearningEngine and working memory with verified outcomes. 8. RESPOND: generates the response via Gemini endpoints with primary and fallback model routing.",
    whatItRequires: "Configured Gemini API key, network connectivity for cloud inference, and registered local plugins/tools. Memory supplies context; tools provide capabilities.",
    flowSteps: [
      "UNDERSTAND",
      "REMEMBER",
      "PLAN",
      "DISCOVER CAPABILITIES",
      "EXECUTE",
      "VERIFY",
      "LEARN / UPDATE MEMORY",
      "RESPOND"
    ],
    caveats: "The orchestrator makes high-level decisions but never executes low-level Android operations directly; all actions are delegated to AgentToolExecutor or Plugins."
  },
  {
    id: "ai-model-routing",
    category: "Architecture & Orchestration",
    title: "AI Generation & Fallback Routing",
    classes: ["MyraOrchestrator", "GeminiClient", "ModelConfig"],
    whatItDoes: "Routes reasoning prompts, structured JSON schema plans, and function calls through Gemini models, managing failovers when primary model capacity or network states change.",
    howItWorks: "MyraOrchestrator defines a primary Gemini model (e.g., gemini-2.5-flash) for rapid structured planning and intent classification, paired with a fallback model (e.g., gemini-2.5-pro or gemini-1.5-flash) to preserve continuity if rate limits, network timeouts, or schema generation errors occur.",
    whatItRequires: "Valid Google AI Studio or Vertex Gemini API key, internet access, and valid system prompt schema definitions.",
    caveats: "Specific model endpoints depend on user configuration and upstream Google API availability; MYRA does not guarantee offline LLM reasoning."
  },
  {
    id: "modular-architecture",
    category: "Architecture & Orchestration",
    title: "Modular Clean Architecture UI",
    classes: ["ModularArchitectureScreen", "ArchitectureViewModel"],
    whatItDoes: "Provides a user-facing visual inspection screen within the Android settings to see how MYRA isolates subsystems rather than coupling them into a monolithic blob.",
    howItWorks: "Visualizes the boundaries between the Orchestrator, Memory Layer, Plugin Registry, Tool Executors, Accessibility Service, and Hardware/Smart-home modules. Reflects module readiness and health status in real time.",
    whatItRequires: "Android Jetpack Compose UI runtime.",
    caveats: "Purely an analytical inspection and debugging tool within the app settings."
  },
  {
    id: "logging-system",
    category: "Architecture & Orchestration",
    title: "Internal App Logging & Diagnostics",
    classes: ["AppLogger", "LogScreen"],
    whatItDoes: "Maintains circular memory buffers of system events, intent classification logs, plugin execution status, and tool responses for on-device developer troubleshooting.",
    howItWorks: "AppLogger intercepts system log calls, tags them by subsystem (ORCHESTRATOR, GEMINI_LIVE, MQTT, ACCESSIBILITY, RAG), and exposes a scrollable, filterable LogScreen in the app settings.",
    whatItRequires: "Internal application storage; requires no network access and sends no public telemetry.",
    caveats: "Logs are stored strictly in local memory/cache and are not broadcast to third-party tracking services."
  },

  // 2. VOICE AI & AUDIO
  {
    id: "gemini-live",
    category: "Voice AI",
    title: "Gemini Live Real-Time Voice Connection",
    classes: ["GeminiLiveManager", "AudioRecorder", "AudioPlayer"],
    whatItDoes: "Establishes a bi-directional, persistent WebSocket connection with Gemini Live, enabling natural spoken conversation with real-time interruption handling instead of turn-based text request-response cycles.",
    howItWorks: "AudioRecorder captures raw microphone audio in 16-bit PCM (16kHz / 24kHz), splits it into binary frames, and streams them over WebSocket. GeminiLiveManager handles initial handshake setup messages, tool definitions, incoming audio chunks, streamed text transcripts, user speech interruptions (stopping playback immediately), turn completions, reconnect logic, tool calls, tool responses, and video/image frames.",
    whatItRequires: "RECORD_AUDIO permission, INTERNET permission, Gemini Live API credentials, and active WebSocket connection.",
    flowSteps: [
      "Microphone Input",
      "AudioRecorder (PCM)",
      "WebSocket Channel",
      "Gemini Live Service",
      "Streaming PCM / Text",
      "AudioPlayer / MYRA UI"
    ],
    caveats: "Subject to network latency, packet loss, and upstream Gemini Live server availability; does not claim zero latency or flawless transcription in noisy environments."
  },
  {
    id: "voice-visualizer",
    category: "Voice AI",
    title: "Audio Visualizer Orb & Dedicated Voice Screen",
    classes: ["AudioVisualizerOrb", "VoiceInteractionScreen"],
    whatItDoes: "Displays an interactive visual orb that pulses, contracts, and shifts states to represent whether MYRA is Idle, Listening, Processing, Speaking, or encountering an Error.",
    howItWorks: "AudioVisualizerOrb receives amplitude and state flows from GeminiLiveManager and AudioRecorder. In Jetpack Compose, it renders dynamic radial gradients and frequency ripples synchronized to microphone decibel levels and speaker output buffers.",
    whatItRequires: "Active voice session and audio amplitude stream.",
    caveats: "The orb is restricted to the dedicated voice screen and hero documentation; it is not visually stamped onto every section of the application."
  },
  {
    id: "voice-interaction-service",
    category: "Voice AI",
    title: "Android Voice Interaction Service Integration",
    classes: ["SoltiniVoiceInteractionService", "SoltiniVoiceInteractionSession", "AssistLaunchActivity"],
    whatItDoes: "Integrates MYRA into the official Android system assistant architecture, allowing users to invoke MYRA via the home-button long-press, power-button shortcut, or system assistant gesture.",
    howItWorks: "Implements Android's VoiceInteractionService and VoiceInteractionSession APIs. When triggered by the OS, AssistLaunchActivity launches the session window, reads optional system assist data (screen context / assist bundle), and binds to MyraOrchestrator.",
    whatItRequires: "User must explicitly set MYRA as the default 'Digital assistant app' in Android System Settings (Settings → Apps → Default apps → Digital assistant app).",
    caveats: "Availability depends on device manufacturer ROM, Android version, and whether the user explicitly designates MYRA as the system assistant."
  },
  {
    id: "background-voice",
    category: "Voice AI",
    title: "Background Voice Service",
    classes: ["BackgroundVoiceService"],
    whatItDoes: "Maintains supported voice listening and response capabilities while the MYRA application is minimized or when the screen is active in other applications.",
    howItWorks: "Runs an Android foreground service with the FOREGROUND_SERVICE_MICROPHONE type, displaying a persistent notification as mandated by Android 14+. The service binds to GeminiLiveManager to stream audio chunks.",
    whatItRequires: "FOREGROUND_SERVICE, FOREGROUND_SERVICE_MICROPHONE, RECORD_AUDIO permissions, and battery optimization exemptions.",
    caveats: "Subject to strict Android OEM battery killers, Doze mode, and background microphone restrictions. Android does not permit unrestricted background microphone capture in all states."
  },

  // 3. MEMORY & EXPERIENCE LEARNING
  {
    id: "unified-memory",
    category: "Memory & Learning",
    title: "Unified Memory Architecture",
    classes: ["MyraUnifiedMemory", "MemoryManager"],
    whatItDoes: "Stores and retrieves user preferences, past interactions, facts, and conversation context so later requests utilize prior knowledge.",
    howItWorks: "Separates memory from execution: MemoryManager manages storage and relevance querying, passing contextual memory items into MyraOrchestrator. Memory never invokes tools or executes actions independently.",
    whatItRequires: "Local SQLite/Room storage.",
    flowSteps: [
      "User Interaction",
      "Memory Storage",
      "Relevance Query",
      "Context Enrichment",
      "Orchestrator Plan",
      "Response / Action"
    ],
    caveats: "Context is supplied to the orchestrator to inform decisions; memory itself possesses no execution authority."
  },
  {
    id: "memory-2",
    category: "Memory & Learning",
    title: "Memory 2.0 Engine & Structured Context",
    classes: ["Memory2Engine", "Memory2Database", "MemoryItem", "SessionMemory", "WorkingMemory"],
    whatItDoes: "Implements structured multi-tier memory storage, selectively querying relevant items instead of blindly loading every stored memory into LLM context windows.",
    howItWorks: "Maintains three distinct tiers: 1. SessionMemory (in-memory, volatile, holds current conversational thread), 2. WorkingMemory (active task state, pending slots, immediate goals), 3. Durable Memory (persisted in Memory2Database via MemoryItem records). Supports saving explicit user memories, saving user corrections, full-text vector/keyword search, selective updating, deletion of specific items, and memory wipe.",
    whatItRequires: "Room SQLite database, local device storage.",
    caveats: "MYRA limits context injection to top-k relevant items to prevent prompt bloat and token exhaustion."
  },
  {
    id: "experience-learning",
    category: "Memory & Learning",
    title: "Experience Learning Engine",
    classes: ["ExperienceLearningEngine", "ExperienceMemory"],
    whatItDoes: "Records task attempts, execution results, user corrections, and successful patterns. When a similar task is encountered, MYRA retrieves the learned pattern to avoid repeating past mistakes.",
    howItWorks: "Follows an evaluation cycle: Task Request → Execution Attempt → Result Evaluation → Pattern Formation → Safety Validation → Storage in ExperienceMemory. Before persisting any learned pattern, ExperienceLearningEngine verifies that the pattern conforms to safety guidelines and does not encode harmful automation.",
    whatItRequires: "Local Room database, successful task validation.",
    flowSteps: [
      "Task Request",
      "Execution Attempt",
      "Result Validation",
      "Safety Verification",
      "Experience Store",
      "Future Task Retrieval"
    ],
    caveats: "This is empirical pattern caching and heuristic reinforcement, not general human-level intelligence or unsupervised model fine-tuning."
  },
  {
    id: "daily-diary",
    category: "Memory & Learning",
    title: "Daily Diary Context Feed",
    classes: ["DailyDiaryScreen", "DiaryEntry", "DiaryViewModel"],
    whatItDoes: "Provides a chronological, user-editable daily diary log where notes, thoughts, and scheduled summaries can be entered and integrated into MYRA's contextual awareness.",
    howItWorks: "Stores dated entries in the local database. When relevant to a user query, MyraOrchestrator queries the diary store to enrich its responses with daily context.",
    whatItRequires: "Local database access, user input.",
    caveats: "Only entries explicitly recorded or verified are stored; MYRA does not fabricate journal entries."
  },
  {
    id: "mem0-integration",
    category: "Memory & Learning",
    title: "Mem0 Optional External Memory Engine",
    classes: ["Mem0ApiClient", "Mem0MemoryEngine", "Mem0Database", "Mem0Deduplicator"],
    whatItDoes: "Provides an optional external memory layer using Mem0 services for advanced deduplication and cross-session semantic search when configured.",
    howItWorks: "When enabled via API key in settings, Mem0ApiClient synchronizes memory facts with Mem0 endpoints, running Mem0Deduplicator to avoid redundant memory entries.",
    whatItRequires: "Optional Mem0 API Key and network connection.",
    caveats: "Optional; MYRA operates fully using its built-in local Room database if Mem0 is not configured."
  },
  {
    id: "memory-backup",
    category: "Memory & Learning",
    title: "Memory Backup & Export Manager",
    classes: ["MemoryBackupManager"],
    whatItDoes: "Allows users to export and restore their structured memory and experience databases to local files.",
    howItWorks: "Serializes Memory2Database and ExperienceMemory into encrypted or structured JSON files via Android's Storage Access Framework.",
    whatItRequires: "Android Storage Access Framework (SAF) permission.",
    caveats: "Backups are stored locally where the user chooses; no automated cloud sync without user action."
  },

  // 4. AUTOMATION & TOOLS
  {
    id: "accessibility-automation",
    category: "Automation & Tools",
    title: "Accessibility Service UI Automation",
    classes: ["SoltiniAccessibilityService", "ScreenOperator"],
    whatItDoes: "Performs physical UI actions across third-party Android applications by interacting with the Android Accessibility node hierarchy.",
    howItWorks: "SoltiniAccessibilityService traverses AccessibilityNodeInfo trees to locate buttons, text fields, lists, and view IDs. ScreenOperator dispatches actions: performAction(ACTION_CLICK), dispatchGesture (for precise coordinate taps, pinches, and directional swipes), setText (for typing without software keyboard interference), and scrollForward/Backward.",
    whatItRequires: "BIND_ACCESSIBILITY_SERVICE permission. User must manually enable 'MYRA Accessibility Service' in Android Settings → Accessibility → Installed apps.",
    flowSteps: [
      "User Voice / Text Request",
      "Orchestrator Plan",
      "AgentToolExecutor",
      "ScreenOperator",
      "SoltiniAccessibilityService",
      "Target Android App UI",
      "Execution Verification"
    ],
    caveats: "Requires explicit user enablement. Behavior varies across OEM skins, custom non-standard UI canvases (e.g. Flutter/Unity without accessibility tags), and secure windows (FLAG_SECURE)."
  },
  {
    id: "agent-tool-executor",
    category: "Automation & Tools",
    title: "Agent Tool Executor Bridge",
    classes: ["AgentToolExecutor", "ToolDefinition"],
    whatItDoes: "Serves as the concrete execution bridge between the high-level cognitive plan of MyraOrchestrator and low-level Android operating system commands.",
    howItWorks: "Exposes concrete callable methods to the orchestrator: openApp(packageName), wakeDevice(), observeScreen(), clickElement(id/text), tapCoordinates(x, y), swipe(x1, y1, x2, y2), typeText(text), searchGoogle(query), openUrl(url), and executeAccessibilityAction(). Returns structured execution status codes.",
    whatItRequires: "Accessibility Service (for UI interactions), Intent permissions, and active device state.",
    caveats: "Will return failure codes if target apps are missing, screens are locked without credentials, or accessibility nodes cannot be resolved."
  },
  {
    id: "screen-analyzer",
    category: "Automation & Tools",
    title: "Screen Understanding & Visual Analysis",
    classes: ["ScreenAnalyzer", "VisualScreenAnalyzer"],
    whatItDoes: "Inspects currently visible on-screen elements, hierarchy trees, and visual context to inform assistant reasoning.",
    howItWorks: "ScreenAnalyzer reads text, labels, and view bounds from the current window's AccessibilityNodeInfo. VisualScreenAnalyzer captures supported screen projection frames (via MediaProjection when granted) to understand non-accessible visual elements.",
    whatItRequires: "Accessibility Service or MediaProjection token.",
    caveats: "Android strictly blanks out screens marked with FLAG_SECURE (e.g., banking apps, DRM video, password managers). Screen analysis operates only when actively invoked."
  },
  {
    id: "app-automators",
    category: "Automation & Tools",
    title: "Targeted Application Automators",
    classes: [
      "WhatsAppAutomator",
      "InstagramAutomator",
      "GmailAutomator",
      "YouTubeAutomator",
      "MapsAutomator",
      "ReelsAutomator",
      "FormAutomator"
    ],
    whatItDoes: "Provides tested, step-by-step navigation scripts for popular Android applications rather than relying solely on open-ended trial-and-error screen tapping.",
    howItWorks: "Each automator contains state-machine routines: WhatsAppAutomator targets com.whatsapp to find chats and send messages; GmailAutomator populates To/Subject/Body fields; MapsAutomator enters destinations and starts navigation; FormAutomator locates input fields in standard views. Each step verifies UI response before proceeding.",
    whatItRequires: "Target application installed on device, Accessibility Service enabled.",
    caveats: "Third-party app updates that alter view IDs, layouts, or flow will break automators until updated. Does NOT claim universal control of every arbitrary app."
  },
  {
    id: "browser-use",
    category: "Automation & Tools",
    title: "Browser Use Interaction Client",
    classes: ["BrowserUseClient"],
    whatItDoes: "Coordinates web-based workflows through Android Chrome or default browser instances when tasks require web navigation.",
    howItWorks: "Dispatches browser intents, inspects DOM text rendered into the accessibility hierarchy, inputs queries, and scrolls pages.",
    whatItRequires: "Default browser installed, Accessibility Service.",
    caveats: "Limited to accessible browser rendering; cannot bypass complex bot detection or JavaScript challenges."
  },

  // 5. PHONE, CALLS, SMS & NOTIFICATIONS
  {
    id: "phone-control",
    category: "Phone, Calls & Notifications",
    title: "Telephony & Incoming Call Management",
    classes: ["AgentPhoneController", "CallNotificationManager", "IncomingCallReceiver"],
    whatItDoes: "Monitors incoming telephony state, announces callers, and enables voice-controlled call answering or rejecting when supported by the Android OS.",
    howItWorks: "IncomingCallReceiver listens for TelephonyManager.ACTION_PHONE_STATE_CHANGED broadcasts. AgentPhoneController interacts with TelecomManager (or Notification actions) to answer or end calls.",
    whatItRequires: "READ_PHONE_STATE, READ_CALL_LOG, ANSWER_PHONE_CALLS permissions.",
    caveats: "Android severely restricts background call audio capture; MYRA cannot and does not secretly record phone calls."
  },
  {
    id: "sms-sender",
    category: "Phone, Calls & Notifications",
    title: "SMS Dispatch with Confirmation Safeguard",
    classes: ["SmsSender", "PendingConfirmationSystem"],
    whatItDoes: "Sends SMS text messages to specified phone numbers while enforcing a strict confirmation gate before transmission.",
    howItWorks: "When an SMS intent is formed, SmsSender creates a pending confirmation token detailing the recipient and text. MyraOrchestrator halts and asks the user for explicit verbal or touch confirmation ('Do you want me to send: ...?'). Only after explicit confirmation is SmsManager.sendTextMessage invoked.",
    whatItRequires: "SEND_SMS, READ_CONTACTS permissions.",
    flowSteps: [
      "SMS Intent Triggered",
      "Recipient & Text Extracted",
      "Pending Action Registered",
      "User Verbal / UI Confirmation",
      "SmsManager Dispatch",
      "Delivery Confirmation"
    ],
    caveats: "MYRA never dispatches SMS messages silently in the background without user confirmation."
  },
  {
    id: "notification-listener",
    category: "Phone, Calls & Notifications",
    title: "Notification Access & Active Sync",
    classes: ["SoltiniNotificationListener", "NotificationRepository"],
    whatItDoes: "Receives, filters, and manages incoming system notifications from approved messaging and utility applications.",
    howItWorks: "Extends Android's NotificationListenerService. NotificationRepository stores active notifications in an in-memory cache, filters out blacklisted or system noise packages, and extracts quick action buttons.",
    whatItRequires: "BIND_NOTIFICATION_LISTENER_SERVICE. User must explicitly grant 'Notification Access' in Android Settings.",
    caveats: "Sensitive permission. Users can configure which applications are observed or ignored."
  },
  {
    id: "group-chat-safety",
    category: "Phone, Calls & Notifications",
    title: "Group Chat Auto-Reply Safety Filter",
    classes: ["NotificationRepository", "GroupChatDetector"],
    whatItDoes: "Detects whether an incoming message notification originated from a group chat to prevent disastrous automated assistant replies to group audiences.",
    howItWorks: "NotificationRepository inspects Notification.EXTRA_IS_GROUP_CONVERSATION, title delimiters (e.g. '@', ':', commas), and conversation participant counts. If marked as a group, automated reply actions are suppressed unless the user explicitly requests a group response.",
    whatItRequires: "Active NotificationListenerService.",
    caveats: "Heuristic and metadata based; does not claim 100% detection on proprietary messaging apps that omit standard Android notification extras."
  },
  {
    id: "notification-reply",
    category: "Phone, Calls & Notifications",
    title: "Direct Notification Quick Reply",
    classes: ["SoltiniNotificationListener", "RemoteInputHandler"],
    whatItDoes: "Replies directly to incoming chat messages from notifications without opening the target application.",
    howItWorks: "Extracts NotificationCompat.Action containing a RemoteInput object from the notification payload, bundles the generated reply string into an intent, and sends the action's PendingIntent.",
    whatItRequires: "Notification Listener permission and apps that supply standard RemoteInput actions.",
    caveats: "Only works with messaging apps that provide Android RemoteInput reply actions (e.g. WhatsApp, Telegram, Signal, Messages)."
  },
  {
    id: "busy-mode",
    category: "Phone, Calls & Notifications",
    title: "Busy Mode Assistant Gate",
    classes: ["BusyModeManager"],
    whatItDoes: "Controls assistant behavior and notification interruptions during meetings, focus time, or sleep.",
    howItWorks: "Maintains a reactive BusyState. When active, non-critical voice interruptions and proactive notifications are suppressed or queued.",
    whatItRequires: "Internal state storage; optional Do Not Disturb (DND) access.",
    caveats: "Restricted to implemented application states; does not alter system-wide phone alarms or emergency alerts."
  },
  {
    id: "overlay-indicator",
    category: "Phone, Calls & Notifications",
    title: "Floating Screen Overlay & Ring Indicator",
    classes: ["OverlayService", "RingIndicatorView"],
    whatItDoes: "Presents a minimalist, draggable floating ring indicator on top of Android applications to show assistant state and provide one-tap voice trigger access.",
    howItWorks: "Runs via WindowManager with TYPE_APPLICATION_OVERLAY layout params. RingIndicatorView renders a compact animated ring that expands when tapped.",
    whatItRequires: "SYSTEM_ALERT_WINDOW ('Display over other apps') permission.",
    caveats: "Users must grant the 'Display over other apps' permission in Android Settings. Kept separate from the main 3D orb to preserve system battery and avoid screen clutter."
  },

  // 6. SCHEDULING & PROACTIVE ROUTINES
  {
    id: "scheduled-tasks",
    category: "Scheduling & Routines",
    title: "Natural Time Parser & Scheduled Tasks",
    classes: ["ScheduledTaskManager", "ScheduledTask", "ScheduledTaskAlarmReceiver", "NaturalTimeParser"],
    whatItDoes: "Converts natural-language time requests (e.g., 'remind me to check the oven in 25 minutes', 'wake me tomorrow at 7 AM') into precise timestamps and schedules exact Android alarms.",
    howItWorks: "NaturalTimeParser parses relative expressions, duration offsets, and clock times. ScheduledTaskManager persists the task into Room database and arms AlarmManager.setExactAndAllowWhileIdle(). When the alarm fires, ScheduledTaskAlarmReceiver triggers the configured task or notification.",
    whatItRequires: "SCHEDULE_EXACT_ALARM or USE_EXACT_ALARM permission, WAKE_LOCK, POST_NOTIFICATIONS.",
    flowSteps: [
      "Natural Language Request",
      "NaturalTimeParser",
      "ScheduledTask Entity Created",
      "Room DB Persistence",
      "AlarmManager.setExactAndAllowWhileIdle",
      "ScheduledTaskAlarmReceiver",
      "Action / Notification Fired"
    ],
    caveats: "Exact alarms require Android 12+ user permission. Aggressive OEM power management may delay non-exact alarms."
  },
  {
    id: "proactive-routines",
    category: "Scheduling & Routines",
    title: "Proactive Routine Scheduler",
    classes: ["ProactiveRoutineScheduler", "ProactiveRoutineWorker"],
    whatItDoes: "Executes recurring background routines (e.g., morning weather briefs, calendar summaries, device battery checks) at designated daily intervals.",
    howItWorks: "Uses Android WorkManager with PeriodicWorkRequestBuilder and constraints (e.g. NetworkConnected, DeviceNotLowBattery). ProactiveRoutineWorker runs the routine flow through MyraOrchestrator.",
    whatItRequires: "Android WorkManager, background execution allowances.",
    caveats: "Execution timing is subject to Android WorkManager batched intervals and Doze mode restrictions."
  },
  {
    id: "geofencing",
    category: "Scheduling & Routines",
    title: "Location-Based Geofencing",
    classes: ["GeofenceManager", "GeofenceBroadcastReceiver"],
    whatItDoes: "Triggers configured tasks or reminders when entering or exiting specific geographic areas (e.g. 'remind me to buy milk when I reach the grocery store').",
    howItWorks: "Registers geofences with Google Play Services GeofencingClient. When an entry or exit transition occurs, GeofenceBroadcastReceiver wakes and triggers the linked action.",
    whatItRequires: "ACCESS_FINE_LOCATION, ACCESS_BACKGROUND_LOCATION permissions, Google Play Services.",
    caveats: "Requires background location permission. Does NOT perform continuous GPS tracking, using cell tower and Wi-Fi fences to conserve battery."
  },

  // 7. RAG & STORAGE
  {
    id: "rag-engine",
    category: "RAG & Storage",
    title: "Local RAG Knowledge Engine",
    classes: ["RagKnowledgeEngine", "KnowledgeChunkEntity", "KnowledgeDatabase"],
    whatItDoes: "Indexes authorized local documents, PDFs, notes, and code files into a searchable local knowledge database, supplying relevant factual context to the orchestrator.",
    howItWorks: "Retrieval-Augmented Generation pipeline: 1. Document parsed by specialized parser. 2. RecursiveDocumentSplitter divides text into overlapping chunks. 3. Text chunks indexed into KnowledgeDatabase with keyword and semantic metadata. 4. Upon user query, RagKnowledgeEngine searches top-k relevant chunks. 5. Context is injected into MyraOrchestrator prompt.",
    whatItRequires: "Storage Access Framework access, local device storage.",
    flowSteps: [
      "Authorized Document",
      "DocumentParser",
      "RecursiveDocumentSplitter",
      "KnowledgeDatabase Indexing",
      "Semantic / Keyword Search",
      "Relevant Context Injected",
      "Gemini Response"
    ],
    caveats: "Only indexes files explicitly authorized by the user via Storage Access Framework."
  },
  {
    id: "document-parsers",
    category: "RAG & Storage",
    title: "Multi-Format Document Parsers",
    classes: [
      "PdfDocumentParser",
      "TextDocumentParser",
      "CodeDocumentParser",
      "ImageVisionParser",
      "ZipArchiveParser",
      "DocumentParser"
    ],
    whatItDoes: "Extracts structured text and metadata from diverse file formats for RAG indexing.",
    howItWorks: "Specialized implementations: PdfDocumentParser uses Android PdfRenderer and text extractors; TextDocumentParser handles .txt, .md, .csv; CodeDocumentParser extracts symbols, classes, and functions from .kt, .java, .py, .js; ImageVisionParser passes images to Gemini vision for textual scene descriptions; ZipArchiveParser safely unpacks archives.",
    whatItRequires: "SAF file URI, parsing memory.",
    caveats: "Only the file types with implemented parsers are supported. Encrypted PDFs or corrupted files fail gracefully."
  },
  {
    id: "document-splitter",
    category: "RAG & Storage",
    title: "Recursive Document Splitter",
    classes: ["RecursiveDocumentSplitter"],
    whatItDoes: "Splits large text documents into semantically coherent chunks with configurable overlap to optimize retrieval relevance.",
    howItWorks: "Recursively splits on paragraph breaks (`\\n\\n`), sentence boundaries (`.` `!` `?`), and whitespace until chunks fit within target token limits while maintaining context overlap.",
    whatItRequires: "CPU execution during document indexing.",
    caveats: "Ensures chunks fit within model context limits without truncating sentences."
  },
  {
    id: "saf-file-management",
    category: "RAG & Storage",
    title: "Storage Access Framework (SAF) File Management",
    classes: ["SafStorageManager", "StorageModels", "FileBackupManager"],
    whatItDoes: "Reads, writes, lists, and manages user-authorized files and backup directories using modern Android storage standards.",
    howItWorks: "Uses DocumentFile and ContentResolver with persistable URI permissions via ACTION_OPEN_DOCUMENT_TREE. Does not request broad MANAGE_EXTERNAL_STORAGE.",
    whatItRequires: "User selection via Android system file picker.",
    caveats: "MYRA can only access directories explicitly picked by the user; it cannot inspect private system partitions or unauthorized folders."
  },
  {
    id: "file-safety",
    category: "RAG & Storage",
    title: "File Safety & Destructive Action Gate",
    classes: ["FileSafetyManager", "PendingDestructiveAction"],
    whatItDoes: "Protects files from accidental deletion or destructive overwriting through explicit confirmation prompts and optional voice biometric verification.",
    howItWorks: "When a delete or overwrite command is issued, FileSafetyManager pauses execution, generates a pending destructive action token, and requires the user to give an affirmative verbal or touch confirmation. If Voice Lock is active, it verifies the acoustic voice embedding before proceeding.",
    whatItRequires: "User confirmation; optional voice profile verification.",
    flowSteps: [
      "Destructive File Request",
      "Pending Action Registered",
      "User Confirmation Required",
      "Optional Voice Biometric Check",
      "File Execution or Abort"
    ],
    caveats: "Destructive operations cannot be bypassed by automated plugins without going through the confirmation gate."
  },

  // 8. PLUGINS & PUBLIC APIS
  {
    id: "plugin-system",
    category: "Plugins & APIs",
    title: "Extensible Plugin System & Capabilities Registry",
    classes: ["PluginRegistry", "PluginMetadata", "PluginResult", "BuiltinPluginInitializer", "StorageManagerPlugin"],
    whatItDoes: "Provides a modular registry where internal capabilities and third-party tools register manifests, allowing the orchestrator to discover and invoke tools dynamically.",
    howItWorks: "Plugins implement the IMyraPlugin interface, providing PluginMetadata (name, description, parameter schema). BuiltinPluginInitializer loads default plugins like StorageManagerPlugin. PluginRegistry tracks execution statistics, matches user intents to plugins, and validates PluginResult payloads.",
    whatItRequires: "Application lifecycle initialization.",
    flowSteps: [
      "Orchestrator Request",
      "PluginRegistry Manifest Lookup",
      "Capability Selection",
      "Plugin.execute(params)",
      "PluginResult Validation",
      "Orchestrator Context"
    ],
    caveats: "Plugins provide tool capabilities, but the orchestrator retains final authority over whether and when to execute them."
  },
  {
    id: "plugin-fallback",
    category: "Plugins & APIs",
    title: "Plugin Fallback Mechanism",
    classes: ["PluginRegistry"],
    whatItDoes: "Automatically locates alternative compatible plugins when a primary plugin returns an error or failure code.",
    howItWorks: "PluginRegistry inspects capability tags. If an executed plugin fails, the registry queries candidate plugins with matching capability tags and attempts secondary execution.",
    whatItRequires: "Alternative compatible plugin registered in the registry.",
    caveats: "Only functions if a compatible alternative is registered; cannot invent fallbacks for unique operations."
  },
  {
    id: "public-apis",
    category: "Plugins & APIs",
    title: "Public API Registry & Implemented Executors",
    classes: ["PublicApiRegistry", "PublicApiExecutor"],
    whatItDoes: "Exposes curated web API lookups to MYRA for real-time information retrieval without requiring external authentication tokens.",
    howItWorks: "While the project includes a catalog of public APIs, PublicApiExecutor contains concrete, implemented handlers for: 1. CoinGecko (cryptocurrency prices), 2. wttr.in (weather), 3. Free Dictionary API (definitions), 4. Frankfurter (currency exchange), 5. IP-API (geolocation), 6. Official Joke API, 7. Advice Slip, 8. Cat Facts, 9. Dog Facts.",
    whatItRequires: "INTERNET permission.",
    caveats: "The app features a wide catalog directory, but only the listed services have active executor implementations in the codebase."
  },

  // 9. SMART HOME & HARDWARE
  {
    id: "smart-home-db",
    category: "Smart Home & Hardware",
    title: "Smart Home Local Database & Entities",
    classes: ["HomeDatabase", "DeviceDao", "DeviceEntity"],
    whatItDoes: "Stores configured smart-home devices, rooms, hardware types, MQTT command topics, and current states locally on the device.",
    howItWorks: "Room SQLite database containing DeviceEntity records with fields: id, name, room, deviceType (LIGHT, RELAY, SENSOR, FAN), mqttTopic, stateJson, and lastSeen timestamp.",
    whatItRequires: "Room database storage on device.",
    caveats: "All home configuration is kept on-device; no proprietary third-party smart home cloud subscription required."
  },
  {
    id: "mqtt-manager",
    category: "Smart Home & Hardware",
    title: "MQTT 2-Way State Broker Integration",
    classes: ["MqttManager", "WifiMqttCredentialsStore", "DeviceController"],
    whatItDoes: "Maintains a persistent MQTT client connection to local or cloud brokers, subscribing to device telemetry and publishing command payloads.",
    howItWorks: "MqttManager handles broker connections, auto-reconnect with exponential backoff, topic subscriptions (`myra/devices/+/state`), and publishing commands (`myra/devices/{id}/set`). DeviceController converts assistant voice intents into structured MQTT payloads.",
    whatItRequires: "INTERNET, ACCESS_NETWORK_STATE, configured broker host/port/credentials stored in WifiMqttCredentialsStore.",
    flowSteps: [
      "Voice Command ('Turn on desk lamp')",
      "DeviceController Resolves Device & Topic",
      "MqttManager Publishes Command Payload",
      "MQTT Broker",
      "ESP32 / Smart Device Executes Relay",
      "ESP32 Publishes State Feedback",
      "MqttManager Receives State Update",
      "HomeDatabase & UI Synced"
    ],
    caveats: "Requires a reachable MQTT broker (such as Mosquitto on a local Raspberry Pi/NAS or cloud broker) and proper Wi-Fi credentials."
  },
  {
    id: "esp32-generator",
    category: "Smart Home & Hardware",
    title: "ESP32 Firmware Code Generator",
    classes: ["Esp32CodeGenerator", "FirmwareFileUtils", "CodePreviewDialog"],
    whatItDoes: "Generates fully functional, ready-to-flash C++ / Arduino sketches for ESP32 and ESP8266 microcontrollers based on user-configured devices and pins.",
    howItWorks: "Esp32CodeGenerator takes device configurations (Wi-Fi SSID, password, MQTT broker IP, GPIO pin assignments, relay logic) and compiles an Arduino .ino sketch using PubSubClient and WiFi libraries. Users can preview in CodePreviewDialog and export via FirmwareFileUtils.",
    whatItRequires: "User input for device pins and Wi-Fi configuration.",
    caveats: "Generates standard Arduino/ESP32 C++ code; users must compile and flash the sketch to their microcontroller using Arduino IDE or PlatformIO."
  },
  {
    id: "smart-home-ui",
    category: "Smart Home & Hardware",
    title: "Smart Home Management UI",
    classes: ["HomeAutomationScreen", "HomeAutomationViewModel", "AddDeviceScreen"],
    whatItDoes: "Provides a full Jetpack Compose Material 3 interface to view devices by room, toggle relays, monitor sensor values, and configure new hardware.",
    howItWorks: "HomeAutomationViewModel exposes StateFlow<List<DeviceEntity>> from DeviceDao. AddDeviceScreen guides users through selecting GPIO pins, device types, and auto-generating MQTT topics.",
    whatItRequires: "Android UI runtime.",
    caveats: "Direct manual toggling is always available alongside voice control."
  },
  {
    id: "device-hardware-control",
    category: "Smart Home & Hardware",
    title: "Android Device Hardware Control",
    classes: ["DeviceHardwareController"],
    whatItDoes: "Controls native smartphone hardware features via voice or assistant actions.",
    howItWorks: "Interfaces directly with Android system managers: CameraManager for flashlight/torch toggling, AudioManager for volume/ringer modes, WifiManager/BluetoothAdapter for wireless toggles where permitted by OS.",
    whatItRequires: "CAMERA permission (for flashlight), MODIFY_AUDIO_SETTINGS, BLUETOOTH permissions.",
    caveats: "Modern Android restricts direct programmatic toggling of Wi-Fi without showing the system Internet Panel."
  },

  // 10. SECURITY & SAFETY
  {
    id: "keystore-security",
    category: "Security & Safety",
    title: "Android Keystore Cryptographic Manager",
    classes: ["KeystoreCryptoManager"],
    whatItDoes: "Protects sensitive credentials (API keys, MQTT passwords, protected memory items) using hardware-backed cryptographic keys.",
    howItWorks: "Uses AndroidKeyStore provider to generate AES-256 GCM keys inside the device's Secure Element (TEE/StrongBox). Sensitive strings are encrypted before storage in EncryptedSharedPreferences.",
    whatItRequires: "Device hardware cryptographic provider (TEE/StrongBox).",
    caveats: "Secures stored credentials; does not claim that every unclassified app log or cache is encrypted."
  },
  {
    id: "voice-biometrics",
    category: "Security & Safety",
    title: "Voice Biometrics & Acoustic Verification",
    classes: ["VoiceProfile", "VoiceProfileManager", "VoiceProfileEnrollmentPhrases", "VoiceBiometricsManager", "VoiceUnlockActivity"],
    whatItDoes: "Enrolls and verifies the user's unique voice characteristics to gate sensitive assistant actions or unlock voice sessions.",
    howItWorks: "During enrollment (VoiceProfileEnrollmentPhrases), the system extracts acoustic features (MFCC / spectral filterbanks), creates a normalized embedding vector, and stores it in VoiceProfile. During verification, VoiceBiometricsManager extracts embedding from the incoming sample and calculates cosine similarity against the enrolled vector. If similarity exceeds the configured threshold, authentication succeeds.",
    whatItRequires: "RECORD_AUDIO permission, microphone input.",
    flowSteps: [
      "Enrollment Utterances",
      "Acoustic Feature Extraction",
      "Voice Embedding Vector",
      "Verification Voice Sample",
      "Cosine Similarity Computation",
      "Threshold Comparison (> threshold)",
      "Match Verified / Rejected"
    ],
    caveats: "Software acoustic verification; not equivalent to dedicated FIDO/hardware-grade fingerprint/iris biometric hardware. Ambient noise or colds can affect verification."
  },
  {
    id: "banking-mode",
    category: "Security & Safety",
    title: "Banking Mode Safety Quick Settings Tile",
    classes: ["BankingModeTileService", "BankingModeManager"],
    whatItDoes: "Exposes a dedicated Android Quick Settings tile that instantly disables automation, screen reading, and overlay services when using sensitive financial apps.",
    howItWorks: "When toggled on via the notification shade tile, BankingModeTileService instructs ScreenOperator and SoltiniAccessibilityService to halt all programmatic clicks, disable overlays, and refuse interactions with registered financial package names.",
    whatItRequires: "Android Quick Settings Tile registration.",
    caveats: "A proactive safety restriction layer; does not claim complete banking system security or replace user vigilance."
  },
  {
    id: "boot-startup",
    category: "Security & Safety",
    title: "Android Startup & Boot Receiver",
    classes: ["BootReceiver"],
    whatItDoes: "Restores configured background services, scheduled alarms, and proactive workers after the Android device reboots or updates.",
    howItWorks: "Listens for ACTION_BOOT_COMPLETED, ACTION_MY_PACKAGE_REPLACED, and ACTION_USER_PRESENT. Reschedules persisted alarms in ScheduledTaskManager and starts enabled background services if permitted.",
    whatItRequires: "RECEIVE_BOOT_COMPLETED permission.",
    caveats: "Subject to device lock state (Direct Boot mode: some credential storage is encrypted until first user unlock)."
  },
  {
    id: "settings-configuration",
    category: "Security & Safety",
    title: "Centralized Settings & Permissions Hub",
    classes: [
      "AppSettings",
      "SettingsScreen",
      "PermissionsScreen",
      "VoiceProfilesSection",
      "ScheduledTasksScreen",
      "StorageRagSettingsSection"
    ],
    whatItDoes: "Gives users complete transparency and control over every permission, API key, model selection, voice profile, and storage directory.",
    howItWorks: "PermissionsScreen audits all runtime and special access permissions, directing users to the exact Android system settings screens when permissions are missing.",
    whatItRequires: "Android UI runtime.",
    caveats: "Users retain full sovereign control to disable any subsystem or revoke permissions at any time."
  }
];
