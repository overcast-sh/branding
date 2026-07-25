// Overcast brand preset for Tailwind CSS v3.
// Usage in a consuming app's tailwind.config:
//   import overcast from "@overcast-sh/branding/design-system/tailwind.preset.ts";
//   export default { presets: [overcast], content: [...] };
// For Tailwind v4, use tokens.tailwind.css (@theme) instead.
// Source of truth: tokens.json — keep in sync.

const preset = {
  theme: {
    extend: {
      colors: {
        oc: {
          ink: "#16222E",
          night: "#10161D",
          cloud: { slate: "#33536F", mist: "#C4D8EA" },
          signal: { DEFAULT: "#1273C4", dark: "#5FB8FF" },
          cursor: { DEFAULT: "#3E97DF", dark: "#8FD0FF" },
          text: { DEFAULT: "#16222E", body: "#33465A", muted: "#54718A" },
          "text-dark": { DEFAULT: "#DCEBF8", body: "#A9C2D8", muted: "#7FA8C9" },
          surface: { DEFAULT: "#F4F8FC", card: "#FFFFFF", line: "#D5E2EE", soft: "#E3F0FB" },
          "surface-dark": { DEFAULT: "#10161D", card: "#16222E", line: "#24384C", soft: "#1A2E42" },
          success: "#2E9E6B",
          warning: "#C08A2D",
          danger: "#C9564A",
        },
      },
      fontFamily: {
        "oc-mono": ["JetBrains Mono", "ui-monospace", "Cascadia Code", "SF Mono", "Menlo", "Consolas", "monospace"],
        "oc-sans": ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "oc-control": "6px",
        "oc-card": "10px",
      },
      animation: {
        "oc-blink": "oc-blink 1.1s steps(1) infinite",
      },
      keyframes: {
        "oc-blink": {
          "0%, 49.9%": { opacity: "1" },
          "50%, 99.9%": { opacity: "0" },
        },
      },
    },
  },
};

export default preset;
