/**
 * In-Depth Technical Documentation for MYRA (com.soltini.app)
 */

export interface DocSection {
  id: string;
  title: string;
  category: string;
  summary: string;
  classesInvolved: string[];
  markdownContent: string;
}

export const DOCS_DATA: DocSection[] = [
  {
    id: "system-overview",
    title: "System Architecture & Lifecycle",
    category: "Architecture",
    summary: "Architectural overview of MYRA's clean separation between reasoning, memory, tools, and Android system services.",
    classesInvolved: ["MyraOrchestrator", "ModularArchitectureScreen", "AppLogger"],
    markdownContent: `
### Clean Modular Separation

MYRA (*com.soltini.app*) is built strictly adhering to clean architecture principles on modern Android (Min SDK 26, Target SDK 36):

1. **The Reasoning Layer (MyraOrchestrator)**: Formulates intent schemas, plans multi-step tasks, and generates responses. It operates at an abstract level and has zero direct references to Android UI widgets or native drivers.
2. **The Memory Layer (Memory2Engine & MyraUnifiedMemory)**: Serves purely as a read/write context supplier. It stores facts, working memory slots, and experience memories, but holds **no authority to execute actions**.
3. **The Capability Layer (PluginRegistry & AgentToolExecutor)**: Implements concrete tools. Tools execute actions (clicking UI, fetching weather, publishing MQTT payloads, sending SMS) and return structured status codes to the orchestrator.
4. **The Android OS Integration Layer**: Manages system services (*SoltiniVoiceInteractionService*, *SoltiniAccessibilityService*, *SoltiniNotificationListener*, *OverlayService*).

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │                  MyraOrchestrator                      │
   │  UNDERSTAND → REMEMBER → PLAN → DISCOVER → VERIFY      │
   └────────┬───────────────────┬───────────────────┬───────┘
            │                   │                   │
    [Memory2Engine]      [PluginRegistry]    [GeminiLiveManager]
    • SessionMemory      • Builtin Plugins   • PCM WebSocket
    • WorkingMemory      • Fallbacks         • Realtime Audio
    • Durable Memory     • Public APIs       • Tool Callbacks
            │                   │
            ▼                   ▼
    [Room SQLite DB]     [AgentToolExecutor]
                         • SoltiniAccessibilityService
                         • DeviceHardwareController
                         • MqttManager
\`\`\`
`
  },
  {
    id: "gemini-live-setup",
    title: "Gemini Live Real-Time Voice Configuration",
    category: "Voice AI",
    summary: "How GeminiLiveManager establishes bidirectional WebSocket streams, manages PCM audio, handles interruptions, and routes tool calls.",
    classesInvolved: ["GeminiLiveManager", "AudioRecorder", "AudioPlayer", "AudioVisualizerOrb"],
    markdownContent: `
### WebSocket Streaming Protocol

Unlike traditional voice assistants that record an entire speech snippet, send it to a speech-to-text API, wait for a completion, and then run text-to-speech, MYRA utilizes **Gemini Live's full-duplex WebSocket protocol**.

#### Audio Streaming Pipeline
1. **Audio Capture**: \`AudioRecorder\` initializes an \`AudioRecord\` instance configured for:
   - Sample Rate: \`16000Hz\` or \`24000Hz\`
   - Channel: \`CHANNEL_IN_MONO\`
   - Format: \`ENCODING_PCM_16BIT\`
   - Buffer size calculated via \`AudioRecord.getMinBufferSize()\`
2. **WebSocket Frames**: Raw PCM byte buffers are packaged into binary WebSocket frames and transmitted continuously.
3. **Downstream Playback**: Gemini returns streamed PCM chunks. \`AudioPlayer\` writes to an \`AudioTrack\` in streaming mode (\`MODE_STREAM\`), achieving near-immediate playback.
4. **Interruption Handling**: If \`AudioRecorder\` detects user speech while \`AudioPlayer\` is currently rendering an assistant response, \`GeminiLiveManager\` immediately flushes the \`AudioTrack\` buffer and sends an interruption token over WebSocket.

\`\`\`kotlin
// Core pipeline abstraction in com.soltini.app
class GeminiLiveManager(
    private val audioRecorder: AudioRecorder,
    private val audioPlayer: AudioPlayer,
    private val orchestrator: MyraOrchestrator
) {
    fun handleInterruption() {
        audioPlayer.flush()
        sendInterruptionSignal()
    }
}
\`\`\`
`
  },
  {
    id: "memory-2-architecture",
    title: "Memory 2.0 & Contextual Retrieval",
    category: "Memory",
    summary: "Hierarchical memory architecture separating session, working, and durable memories with semantic search.",
    classesInvolved: ["Memory2Engine", "Memory2Database", "MemoryItem", "SessionMemory", "WorkingMemory"],
    markdownContent: `
### Hierarchical Memory Design

To prevent token blowout and hallucination, MYRA does not load every past memory into the LLM context window. Instead, it maintains a 3-tiered memory lifecycle:

| Tier | Lifecycle | Storage Medium | Purpose |
| :--- | :--- | :--- | :--- |
| **SessionMemory** | Transient (per session) | In-Memory StateFlow | Tracks current conversational context and active turn history |
| **WorkingMemory** | Active Task | Volatile Cache | Stores slots, partial form data, and pending step results |
| **Durable Memory** | Persistent | Room SQLite (Memory2Database) | Stores explicit facts, user preferences, and verified corrections |

#### Retrieval Flow
When a user asks: *"Turn on the light in my brother's bedroom"*:
1. \`MyraOrchestrator\` issues a query to \`Memory2Engine.findRelevantMemories("brother's bedroom")\`.
2. The engine performs full-text and tag matching on \`MemoryItem\` records.
3. Returns: \`{ "key": "brother_room_device_id", "value": "esp32_relay_04" }\`.
4. Only this specific fact is injected into the orchestrator's planning prompt.
`
  },
  {
    id: "accessibility-automation-guide",
    title: "Accessibility Service & Screen Operator",
    category: "Automation",
    summary: "How SoltiniAccessibilityService inspects view trees and how ScreenOperator performs programmatic gestures.",
    classesInvolved: ["SoltiniAccessibilityService", "ScreenOperator", "AgentToolExecutor"],
    markdownContent: `
### Android Accessibility Inspection & Actions

MYRA's automation is powered by \`SoltiniAccessibilityService\`, a subclass of Android's \`AccessibilityService\`.

#### Key Capabilities
- **Node Traversal**: Searches the active window hierarchy using \`findAccessibilityNodeInfosByViewId\` and \`findAccessibilityNodeInfosByText\`.
- **Coordinate Gestures**: For custom canvas or non-standard views, uses \`dispatchGesture\` with a \`GestureDescription\` (Path coordinates, start time, stroke duration).
- **Text Injection**: Populates input fields via \`ACTION_SET_TEXT\` on the target \`AccessibilityNodeInfo\`, avoiding software keyboard popup lag.
- **Safety Safeguard**: When \`BankingModeTileService\` is enabled or when \`FLAG_SECURE\` is detected, all screen observation and gesture dispatching are immediately blocked.

\`\`\`kotlin
// ScreenOperator gesture execution
fun tapCoordinates(x: Float, y: Float): Boolean {
    val path = Path().apply { moveTo(x, y) }
    val stroke = GestureDescription.StrokeDescription(path, 0, 50)
    val gesture = GestureDescription.Builder().addStroke(stroke).build()
    return accessibilityService.dispatchGesture(gesture, null, null)
}
\`\`\`
`
  },
  {
    id: "rag-knowledge-pipeline",
    title: "Local RAG Knowledge Engine & Parsers",
    category: "RAG & Storage",
    summary: "How documents are parsed, recursively split, indexed into SQLite, and retrieved for contextual generation.",
    classesInvolved: ["RagKnowledgeEngine", "RecursiveDocumentSplitter", "PdfDocumentParser", "CodeDocumentParser"],
    markdownContent: `
### RAG Pipeline: Ingest to Generation

MYRA includes an on-device Retrieval-Augmented Generation (RAG) engine that operates on files authorized via the Storage Access Framework (SAF).

#### Step-by-Step Flow:
1. **Document Authorization**: User selects a folder or document using Android's system document picker.
2. **Parser Selection**:
   - \`PdfDocumentParser\`: Reads PDF streams, extracts text and layout.
   - \`TextDocumentParser\`: Processes Markdown, plain text, and CSV.
   - \`CodeDocumentParser\`: Analyzes source code files (.kt, .py, .java, .js), preserving class, method, and function boundary metadata.
   - \`ImageVisionParser\`: Passes selected imagery to Gemini Vision for textual description generation.
3. **Recursive Splitting**: \`RecursiveDocumentSplitter\` segments documents on semantic boundaries (double newline, periods) into overlapping 512-token chunks.
4. **Local Indexing**: Chunks are stored in \`KnowledgeDatabase\` with inverted indices for keyword search and metadata tags.
5. **Context Injection**: During orchestrator queries, top relevant chunks are merged into the prompt context.
`
  },
  {
    id: "esp32-mqtt-guide",
    title: "ESP32 Hardware & MQTT Smart Home Setup",
    category: "Smart Home",
    summary: "Two-way MQTT state synchronization, local device database, and automated Arduino/ESP32 sketch generation.",
    classesInvolved: ["MqttManager", "Esp32CodeGenerator", "HomeDatabase", "DeviceController"],
    markdownContent: `
### Smart Home Architecture

MYRA connects directly to standard MQTT brokers (e.g. Mosquitto running on a local Raspberry Pi or cloud broker) without requiring a third-party smart home hub.

#### Two-Way State Synchronization:
- **Command Topic**: \`myra/devices/{device_id}/set\` (Payload: \`{"state": "ON"}\`)
- **Feedback Topic**: \`myra/devices/{device_id}/state\` (Payload: \`{"state": "ON", "temp": 24.2}\`)

#### ESP32 Sketch Generator:
Within \`HomeAutomationScreen\`, users can select **Add Device**, configure the GPIO pin, select relay logic (Active HIGH or LOW), and tap **Generate Firmware**. \`Esp32CodeGenerator\` outputs a complete, compilable Arduino sketch incorporating Wi-Fi reconnect and MQTT subscription routines.
`
  },
  {
    id: "security-voice-biometrics",
    title: "Voice Biometrics & Keystore Security",
    category: "Security",
    summary: "Acoustic embedding extraction, cosine similarity matching, and hardware-backed key protection.",
    classesInvolved: ["VoiceBiometricsManager", "VoiceProfileManager", "KeystoreCryptoManager"],
    markdownContent: `
### Biometrics and Hardware Security

#### Voice Biometrics Pipeline:
1. **Enrollment**: The user records 3-5 designated enrollment phrases in \`VoiceProfileEnrollmentPhrases\`.
2. **Feature Extraction**: Extracts acoustic spectral filterbanks and normalizes the vector to unit length.
3. **Cosine Similarity**: During sensitive operations (e.g. confirming a destructive file deletion or triggering voice unlock), \`VoiceBiometricsManager\` extracts an embedding from the verification sample and computes:
   $$\\text{similarity} = \\frac{\\mathbf{A} \\cdot \\mathbf{B}}{\\|\\mathbf{A}\\| \\|\\mathbf{B}\\|}$$
4. If similarity is above the configurable threshold (typically 0.82), the action is authorized.

#### Android Keystore:
\`KeystoreCryptoManager\` generates a 256-bit AES-GCM master key in the device's hardware Secure Element / TEE (\`AndroidKeyStore\`). All API keys and MQTT credentials are encrypted prior to being stored on disk.
`
  }
];
