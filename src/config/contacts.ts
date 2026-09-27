/**
 * Centralized Contact and Social Configuration for MYRA
 * Lead Developer: Harshit Raahi
 */

export interface ContactLink {
  label: string;
  url: string;
  displayUrl?: string;
  icon: string;
  description: string;
}

export const DEVELOPER_INFO = {
  name: "Harshit Raahi",
  role: "Creator & Lead Developer of MYRA",
  location: "India",
  primaryEmail: "harshitkumarup82@gmail.com",
  packageId: "com.soltini.app",
  minSdk: 26, // Android 8.0 Oreo
  targetSdk: 36, // Android 16
  version: "1.0.0-beta",
  links: {
    email: "harshitkumarup82@gmail.com",
    instagram: "https://www.instagram.com/mr_rahi_officialx/",
    githubPersonal: "https://github.com/Harshit0982",
    githubOrg: "https://github.com/rahiharshit644-source",
    linkedin: "https://www.linkedin.com/in/harshit-ab7785408?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    youtube: "https://youtube.com/@mr_rahi_ff",
    // Placeholders for releases as required
    apkDownloadPlaceholder: "https://github.com/Harshit0982/myra-releases/releases/latest/download/myra-universal-release.apk",
    githubRepoPlaceholder: "https://github.com/Harshit0982/myra-android-os",
  }
} as const;

export const SOCIAL_CARDS: ContactLink[] = [
  {
    label: "Email",
    url: `mailto:${DEVELOPER_INFO.links.email}`,
    displayUrl: DEVELOPER_INFO.links.email,
    icon: "mail",
    description: "Direct engineering inquiries, security disclosures, and architectural discussions."
  },
  {
    label: "GitHub Profile",
    url: DEVELOPER_INFO.links.githubPersonal,
    displayUrl: "github.com/Harshit0982",
    icon: "github",
    description: "Personal developer repository and open source contributions."
  },
  {
    label: "GitHub Source & Orgs",
    url: DEVELOPER_INFO.links.githubOrg,
    displayUrl: "github.com/rahiharshit644-source",
    icon: "code",
    description: "Source code distributions, CI pipelines, and architecture modules."
  },
  {
    label: "LinkedIn",
    url: DEVELOPER_INFO.links.linkedin,
    displayUrl: "linkedin.com/in/harshit-ab7785408",
    icon: "linkedin",
    description: "Professional updates, Android engineering insights, and tech profile."
  },
  {
    label: "Instagram",
    url: DEVELOPER_INFO.links.instagram,
    displayUrl: "@mr_rahi_officialx",
    icon: "instagram",
    description: "Development devlogs, mobile tech previews, and design journey."
  },
  {
    label: "YouTube",
    url: DEVELOPER_INFO.links.youtube,
    displayUrl: "@mr_rahi_ff",
    icon: "youtube",
    description: "Video demos of voice interactions, ESP32 hardware integrations, and walkthroughs."
  }
];
