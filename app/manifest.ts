import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LangListening",
    short_name: "LangListening",
    description: "Pratiquez l’anglais chaque jour avec LangListening.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#c9a84c",
    icons: [
      { src: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon-circle.png", sizes: "1254x1254", type: "image/png" },
    ],
  };
}
