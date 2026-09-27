# MYRA – Your AI. Your Voice. Your Android.

Official website and technical architecture documentation for **MYRA** (`com.soltini.app`), an Android AI voice operating system built with Kotlin, Jetpack Compose, and Material 3.

---

## Overview

MYRA integrates voice interaction, AI reasoning, multi-tier memory, Android Accessibility automation, plugins, public APIs, document knowledge (RAG), system notifications, scheduling, and ESP32 smart home control into one unified Android assistant.

- **Android Package**: `com.soltini.app`
- **Minimum SDK**: API 26 (Android 8.0 Oreo)
- **Target SDK**: SDK 36 (Android 16)
- **Framework**: Kotlin 2.x, Jetpack Compose, Material 3
- **Creator & Lead Developer**: Harshit Raahi

---

## Core Decision Pipeline

`MyraOrchestrator` implements an 8-stage decision and verification pipeline:

$$\text{UNDERSTAND} \longrightarrow \text{REMEMBER} \longrightarrow \text{PLAN} \longrightarrow \text{DISCOVER CAPABILITIES} \longrightarrow \text{EXECUTE} \longrightarrow \text{VERIFY} \longrightarrow \text{LEARN/UPDATE MEMORY} \longrightarrow \text{RESPOND}$$

1. **UNDERSTAND**: Ingests input from microphone PCM stream, text, camera context, or background automation and classifies intent.
2. **REMEMBER**: Queries `MyraUnifiedMemory` and `Memory2Engine` for relevant facts without dumping full conversation history.
3. **PLAN**: Forms structured JSON schemas and tool calls using primary/fallback Gemini models.
4. **DISCOVER CAPABILITIES**: Queries `PluginRegistry` to resolve tool signatures to internal plugins or fallbacks.
5. **EXECUTE**: Dispatches concrete Android actions via `AgentToolExecutor`, `SoltiniAccessibilityService`, or `MqttManager`.
6. **VERIFY**: Validates return codes and catches execution timeouts.
7. **LEARN / UPDATE MEMORY**: Persists verified patterns into `ExperienceLearningEngine` after passing safety filters.
8. **RESPOND**: Streams audio chunks via `AudioPlayer` or displays Jetpack Compose UI cards.

---

## Key Subsystems

- **Gemini Live Voice AI**: Full-duplex WebSocket connection via `GeminiLiveManager`, streaming 16-bit PCM audio (`AudioRecorder` and `AudioPlayer`) with real-time speech interruption handling.
- **Audio Visualizer Orb**: `AudioVisualizerOrb` visualizes voice interaction states (Idle, Listening, Processing, Speaking, Error).
- **Accessibility Automation**: `SoltiniAccessibilityService` and `ScreenOperator` traverse Android view hierarchies, tap coordinates, swipe, and inject text across applications.
- **App Automators**: Step-by-step routines for WhatsApp (`WhatsAppAutomator`), Instagram, Gmail, YouTube, Maps, Reels, and forms.
- **Memory 2.0**: Three-tier architecture: `SessionMemory` (ephemeral), `WorkingMemory` (task cache), and `Memory2Database` (durable Room SQLite).
- **Local RAG Knowledge Engine**: Indexes authorized documents (`PdfDocumentParser`, `CodeDocumentParser`, `TextDocumentParser`, `ImageVisionParser`, `ZipArchiveParser`) using `RecursiveDocumentSplitter` into `KnowledgeDatabase`.
- **Smart Home & ESP32 Generator**: Two-way MQTT synchronization (`MqttManager`) and automated Arduino C++ sketch generator (`Esp32CodeGenerator`).
- **Safety & Biometrics**: Acoustic voice embedding cosine similarity (`VoiceBiometricsManager`), Android Keystore hardware encryption (`KeystoreCryptoManager`), and Quick Settings Banking Mode tile (`BankingModeTileService`).

---

## Developer Contact Links

- **Email**: harshitkumarup82@gmail.com
- **Instagram**: https://www.instagram.com/mr_rahi_officialx/
- **GitHub**: https://github.com/Harshit0982
- **GitHub Source**: https://github.com/rahiharshit644-source
- **LinkedIn**: https://www.linkedin.com/in/harshit-ab7785408?utm_source=share_via&utm_content=profile&utm_medium=member_android
- **YouTube**: https://youtube.com/@mr_rahi_ff

---

## Security & Secrets Policy

This project strictly adheres to security best practices. No private developer credentials, production API keys, tokens, or passwords are baked into code or exposed in public repositories.
