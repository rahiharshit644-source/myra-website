/**
 * Technical FAQ for MYRA Android OS
 */

export interface FaqItem {
  question: string;
  answer: string;
  category: "Architecture" | "Privacy & Security" | "Permissions" | "Hardware";
}

export const FAQ_DATA: FaqItem[] = [
  {
    category: "Architecture",
    question: "Does MYRA require an active internet connection to function?",
    answer: "For complex reasoning, natural conversation, and WebSocket audio streaming via Gemini Live, MYRA requires an active internet connection. However, local Room database lookups, MQTT smart home commands on local Wi-Fi, scheduled alarms, device hardware controls (torch, volume), and local file operations can operate on-device."
  },
  {
    category: "Architecture",
    question: "What is the pipeline flow of the MyraOrchestrator?",
    answer: "The orchestrator strictly executes: UNDERSTAND (classify intent) → REMEMBER (retrieve relevant context from Memory 2.0) → PLAN (build structured JSON plan) → DISCOVER CAPABILITIES (query PluginRegistry) → EXECUTE (run via AgentToolExecutor or Plugin) → VERIFY (validate return code) → LEARN/UPDATE MEMORY (update ExperienceLearningEngine) → RESPOND (generate output via Gemini)."
  },
  {
    category: "Privacy & Security",
    question: "Does MYRA continuously send microphone audio or screen data to the cloud?",
    answer: "No. Microphone streaming to Gemini Live occurs only when a voice session is actively started by the user or when the microphone foreground service is active with its persistent notification. Screen analysis (ScreenAnalyzer) is only executed on-demand during active tasks. Furthermore, any window flagged with Android's FLAG_SECURE (e.g. banking apps, password vaults) is completely blacked out by the OS."
  },
  {
    category: "Privacy & Security",
    question: "Can MYRA secretly record phone calls?",
    answer: "No. MYRA does not record phone calls. Android's telephony architecture restricts third-party audio recording of telephone calls. MYRA uses PhoneStateListener and TelecomManager exclusively to announce incoming caller names and allow hands-free call answering or ending when prompted."
  },
  {
    category: "Privacy & Security",
    question: "How does the Voice Biometrics matching work?",
    answer: "The VoiceBiometricsManager extracts acoustic features and computes a normalized embedding vector from the user's voice samples during enrollment. When verifying, it extracts an embedding from the incoming sample and compares it to the enrolled embedding using cosine similarity against a configurable threshold. It is designed for voice-gating sensitive actions, not as a replacement for hardware biometric authentication."
  },
  {
    category: "Permissions",
    question: "Why does MYRA request the Android Accessibility Service permission?",
    answer: "Android's Accessibility Service (SoltiniAccessibilityService) enables MYRA to interact with the device on your behalf—clicking UI elements, scrolling feeds, filling form fields, and automating workflows in apps like WhatsApp, Gmail, or Maps. This permission must be manually granted in Android Settings."
  },
  {
    category: "Permissions",
    question: "Can MYRA send SMS messages automatically without my knowledge?",
    answer: "No. The project includes a Pending Confirmation System. When an SMS task is prepared by SmsSender, MYRA holds the action in a pending state and asks the user for explicit verbal or visual confirmation before transmitting."
  },
  {
    category: "Permissions",
    question: "What does the Banking Mode Quick Settings Tile do?",
    answer: "BankingModeTileService provides a one-tap Quick Settings toggle in the Android notification shade. When active, it halts all Accessibility automated clicks, suppresses screen overlays, and blocks interactions with known financial applications to protect your sensitive banking sessions."
  },
  {
    category: "Hardware",
    question: "How does MYRA connect to smart home devices like ESP32?",
    answer: "MYRA uses the standard MQTT protocol via MqttManager. It connects to an MQTT broker (local or remote), subscribes to device state topics, and publishes command payloads. The app includes an ESP32 Code Generator that produces ready-to-flash Arduino C++ sketches for your custom relays and sensors."
  },
  {
    category: "Hardware",
    question: "What are the minimum Android OS requirements?",
    answer: "MYRA requires a minimum of Android 8.0 (API level 26, Oreo) and is compiled against Android 16 (Target SDK 36) using Kotlin, Jetpack Compose, and Material 3 design components."
  }
];
