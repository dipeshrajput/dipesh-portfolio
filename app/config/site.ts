import type { Metadata } from "next";
import constants from "../content/constants.json";

const profileName = constants.profile.name;
const role = "Full Stack & ServiceNow Developer";

export const SITE_METADATA: Metadata = {
  metadataBase: new URL("https://deepeshrongara.dev"),
  title: `${profileName} | ${role}`,
  description:
    `Portfolio of ${profileName}, Full Stack Developer and ServiceNow Developer building scalable systems, custom portals, and high-impact enterprise solutions.`,
  keywords: [
    profileName,
    "Full Stack Developer",
    "ServiceNow Developer",
    "React Portfolio",
    "Node.js",
    "MongoDB",
    "AngularJS",
    "Accenture",
  ],
  openGraph: {
    title: `${profileName} | ${role}`,
    description:
      "Building scalable systems with precision across full stack engineering and ServiceNow platforms.",
    type: "website",
    url: "https://deepeshrongara.dev",
    siteName: "Deepesh Portfolio",
  },
};
