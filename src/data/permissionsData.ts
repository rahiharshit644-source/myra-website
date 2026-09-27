/**
 * Comprehensive Android Permissions Audit for MYRA (com.soltini.app)
 * Real Android permissions used in the codebase
 */

export interface PermissionAuditItem {
  permission: string;
  category: "Runtime" | "Special Access" | "Service Integration" | "Normal";
  level: "Sensitive" | "Dangerous" | "Standard";
  usedByClass: string[];
  purpose: string;
  userImpactIfDenied: string;
  settingsPath: string;
}

export const PERMISSIONS_DATA: PermissionAuditItem[] = [
  {
    permission: "android.permission.RECORD_AUDIO",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["AudioRecorder", "GeminiLiveManager", "VoiceBiometricsManager"],
    purpose: "Captures microphone audio PCM streams for real-time Gemini Live voice interaction and voice biometric enrollment.",
    userImpactIfDenied: "Voice input is completely disabled. User can only interact via text.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Microphone"
  },
  {
    permission: "android.permission.BIND_ACCESSIBILITY_SERVICE",
    category: "Special Access",
    level: "Sensitive",
    usedByClass: ["SoltiniAccessibilityService", "ScreenOperator", "AgentToolExecutor"],
    purpose: "Enables UI automation: element discovery, button clicks, coordinate tapping, scrolling, and reading accessible screen nodes for app automators.",
    userImpactIfDenied: "All UI automation, app automators (WhatsApp, Gmail, etc.), and screen reading features will fail.",
    settingsPath: "Settings → Accessibility → Installed apps → MYRA Accessibility Service"
  },
  {
    permission: "android.permission.BIND_VOICE_INTERACTION_SERVICE",
    category: "Service Integration",
    level: "Sensitive",
    usedByClass: ["SoltiniVoiceInteractionService", "SoltiniVoiceInteractionSession", "AssistLaunchActivity"],
    purpose: "Allows MYRA to serve as Android's default digital assistant, launching on home button hold or power gesture.",
    userImpactIfDenied: "MYRA cannot be invoked through Android's system assistant shortcuts.",
    settingsPath: "Settings → Apps → Default apps → Digital assistant app → MYRA"
  },
  {
    permission: "android.permission.BIND_NOTIFICATION_LISTENER_SERVICE",
    category: "Special Access",
    level: "Sensitive",
    usedByClass: ["SoltiniNotificationListener", "NotificationRepository"],
    purpose: "Inspects incoming system notifications to announce messages, filter group chats, and execute direct notification quick-replies.",
    userImpactIfDenied: "MYRA cannot read notifications, announce callers, or send notification inline replies.",
    settingsPath: "Settings → Apps → Special app access → Notification access → MYRA"
  },
  {
    permission: "android.permission.SYSTEM_ALERT_WINDOW",
    category: "Special Access",
    level: "Sensitive",
    usedByClass: ["OverlayService", "RingIndicatorView"],
    purpose: "Displays the floating, draggable ring indicator over other running applications for one-tap assistant access.",
    userImpactIfDenied: "The floating overlay indicator cannot be rendered.",
    settingsPath: "Settings → Apps → Special app access → Display over other apps → MYRA"
  },
  {
    permission: "android.permission.SEND_SMS",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["SmsSender"],
    purpose: "Dispatches SMS messages after explicit user confirmation.",
    userImpactIfDenied: "Voice-guided SMS dispatch is unavailable.",
    settingsPath: "Settings → Apps → MYRA → Permissions → SMS"
  },
  {
    permission: "android.permission.READ_PHONE_STATE",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["IncomingCallReceiver", "AgentPhoneController"],
    purpose: "Detects incoming and outgoing call states to announce caller information and pause audio playback.",
    userImpactIfDenied: "MYRA cannot detect when phone calls are incoming or active.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Phone"
  },
  {
    permission: "android.permission.ANSWER_PHONE_CALLS",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["AgentPhoneController", "CallNotificationManager"],
    purpose: "Allows voice-commanded answering of incoming phone calls when prompted by the user.",
    userImpactIfDenied: "Hands-free voice call answering cannot be executed.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Phone"
  },
  {
    permission: "android.permission.READ_CALL_LOG",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["CallNotificationManager"],
    purpose: "Retrieves missed call alerts and caller contact details.",
    userImpactIfDenied: "Caller identification and missed call summaries are disabled.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Call logs"
  },
  {
    permission: "android.permission.READ_CONTACTS",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["SmsSender", "CallNotificationManager", "AgentToolExecutor"],
    purpose: "Resolves names to phone numbers when sending messages or placing calls (e.g. 'call Mom').",
    userImpactIfDenied: "User must speak raw phone numbers instead of contact names.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Contacts"
  },
  {
    permission: "android.permission.CAMERA",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["DeviceHardwareController", "VisualScreenAnalyzer"],
    purpose: "Controls the device flashlight/torch and captures camera frames for visual analysis when requested.",
    userImpactIfDenied: "Flashlight control and visual reasoning will not work.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Camera"
  },
  {
    permission: "android.permission.ACCESS_FINE_LOCATION",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["GeofenceManager", "GeofenceBroadcastReceiver"],
    purpose: "Provides accurate coordinates for location-based reminders and geofenced trigger routines.",
    userImpactIfDenied: "Geofenced reminders and local weather auto-detection are disabled.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Location"
  },
  {
    permission: "android.permission.ACCESS_BACKGROUND_LOCATION",
    category: "Runtime",
    level: "Dangerous",
    usedByClass: ["GeofenceManager"],
    purpose: "Allows geofences to trigger when entering an area while the app is closed or in the background.",
    userImpactIfDenied: "Location triggers only fire while MYRA is actively in the foreground.",
    settingsPath: "Settings → Apps → MYRA → Permissions → Location → Allow all the time"
  },
  {
    permission: "android.permission.SCHEDULE_EXACT_ALARM",
    category: "Special Access",
    level: "Standard",
    usedByClass: ["ScheduledTaskManager", "ScheduledTaskAlarmReceiver"],
    purpose: "Arms exact timestamp alarms for user reminders, timers, and scheduled tasks via AlarmManager.",
    userImpactIfDenied: "Reminders may be batched or delayed by several minutes during Doze mode.",
    settingsPath: "Settings → Apps → Special app access → Alarms & reminders → MYRA"
  },
  {
    permission: "android.permission.POST_NOTIFICATIONS",
    category: "Runtime",
    level: "Standard",
    usedByClass: ["BackgroundVoiceService", "ScheduledTaskManager", "CallNotificationManager"],
    purpose: "Required on Android 13+ to post reminder alerts, task completion notices, and foreground service status.",
    userImpactIfDenied: "Scheduled reminders and foreground service status cannot show in the status bar.",
    settingsPath: "Settings → Apps → MYRA → Notifications"
  },
  {
    permission: "android.permission.FOREGROUND_SERVICE",
    category: "Normal",
    level: "Standard",
    usedByClass: ["BackgroundVoiceService", "OverlayService"],
    purpose: "Maintains background audio listening and floating overlay view execution.",
    userImpactIfDenied: "Background voice service will be killed immediately by the OS.",
    settingsPath: "Configured in AndroidManifest.xml"
  },
  {
    permission: "android.permission.FOREGROUND_SERVICE_MICROPHONE",
    category: "Normal",
    level: "Sensitive",
    usedByClass: ["BackgroundVoiceService"],
    purpose: "Mandatory Android 14+ permission declaration to capture microphone audio in a foreground service.",
    userImpactIfDenied: "Android 14+ will throw SecurityException on background microphone access.",
    settingsPath: "Configured in AndroidManifest.xml"
  },
  {
    permission: "android.permission.RECEIVE_BOOT_COMPLETED",
    category: "Normal",
    level: "Standard",
    usedByClass: ["BootReceiver", "ScheduledTaskManager"],
    purpose: "Reschedules alarms and restores configured background services when the phone reboots.",
    userImpactIfDenied: "Scheduled alarms and proactive workers will be lost after a reboot until MYRA is reopened.",
    settingsPath: "Configured in AndroidManifest.xml"
  },
  {
    permission: "android.permission.INTERNET",
    category: "Normal",
    level: "Standard",
    usedByClass: ["GeminiLiveManager", "MqttManager", "PublicApiExecutor", "Mem0ApiClient"],
    purpose: "Communicates with Gemini Live WebSocket, MQTT brokers, and public web APIs.",
    userImpactIfDenied: "Cloud AI reasoning and online services cannot operate.",
    settingsPath: "Granted automatically by Android at install"
  }
];
