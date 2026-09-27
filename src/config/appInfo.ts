/**
 * Technical Specifications and Architecture Constants for MYRA Android OS
 * Based on the com.soltini.app codebase
 */

export interface PublicApiItem {
  name: string;
  desc: string;
  endpoint: string;
}

export const APP_SPECS = {
  name: "MYRA",
  headline: "Your AI. Your Voice. Your Android.",
  tagline: "Voice interaction, AI reasoning, memory, Android actions, plugins, APIs, documents, notifications, scheduling and smart-home control into one Android assistant.",
  package: "com.soltini.app",
  minSdk: 26,
  minAndroidVersion: "Android 8.0 (Oreo)",
  targetSdk: 36,
  targetAndroidVersion: "Android 16",
  uiFramework: "Jetpack Compose + Material 3",
  language: "Kotlin 2.x",
  architecture: "Modular Clean Architecture (MVI / MVVM with StateFlow)",
  persistence: "Room (SQLite) + EncryptedSharedPreferences / Android Keystore",
  geminiModelConfig: {
    primaryModel: "gemini-2.5-flash (configurable)",
    fallbackModel: "gemini-2.5-pro / gemini-1.5-flash",
    protocol: "WebSocket (Bi-directional PCM 16-bit 16kHz / 24kHz)",
  },
  implementedPublicApis: [
    { name: "CoinGecko", desc: "Live cryptocurrency prices and market valuation", endpoint: "api.coingecko.com" },
    { name: "wttr.in", desc: "Real-time weather reports and forecasts", endpoint: "wttr.in" },
    { name: "Dictionary API", desc: "Word definitions, phonetic transcription, and usage examples", endpoint: "api.dictionaryapi.dev" },
    { name: "Frankfurter", desc: "Foreign exchange rates and currency conversion", endpoint: "api.frankfurter.app" },
    { name: "IP-API", desc: "Network geolocation and IP routing data", endpoint: "ip-api.com" },
    { name: "Official Joke API", desc: "Curated programming and general humor", endpoint: "official-joke-api.appspot.com" },
    { name: "Advice Slip", desc: "Actionable thought snippets and daily advice", endpoint: "api.adviceslip.com" },
    { name: "Cat Facts", desc: "Feline trivia queries", endpoint: "catfact.ninja" },
    { name: "Dog Facts", desc: "Canine trivia queries", endpoint: "dog-api.kinduff.com" },
  ],
  appAutomators: [
    { name: "WhatsAppAutomator", target: "com.whatsapp", actions: "Locate chat, enter recipient, compose message, send dispatch" },
    { name: "InstagramAutomator", target: "com.instagram.android", actions: "Navigate feed/direct messages, search users, compose text" },
    { name: "GmailAutomator", target: "com.google.android.gm", actions: "Open compose activity, populate To/Subject/Body fields, draft or send" },
    { name: "YouTubeAutomator", target: "com.google.android.youtube", actions: "Activate search bar, input query, trigger playback of top result" },
    { name: "MapsAutomator", target: "com.google.android.apps.maps", actions: "Input destination query, trigger turn-by-turn navigation route" },
    { name: "ReelsAutomator", target: "com.instagram.android", actions: "Navigate to short-video tabs, scroll feed, manage playback gestures" },
    { name: "FormAutomator", target: "System / Web view forms", actions: "Detect accessible input fields, inject contextual text, press submit" },
  ]
} as const;
