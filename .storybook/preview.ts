import type { Preview } from "@storybook/react-vite";
import "../design-system/fonts.css";
import "../design-system/tokens.css";

// Docs pages don't run story decorators — pin the default theme at load so
// token-styled content doesn't fall through to the OS preference on them.
document.documentElement.dataset.theme = "light";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: "light", value: "#F4F8FC" },
        dark: { name: "dark", value: "#10161D" },
      },
    },
    options: {
      storySort: {
        order: ["Brand", ["Overview", "Logo", "Color", "Typography", "Icons", "Motion", "Voice"], "Tokens"],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Brand theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light", backgrounds: { value: "light" } },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as string) ?? "light";
      document.documentElement.dataset.theme = theme;
      return Story();
    },
  ],
};

export default preview;
