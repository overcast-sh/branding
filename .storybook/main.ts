import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  staticDirs: [
    { from: "../logo", to: "/logo" },
    { from: "../mark", to: "/mark" },
    { from: "../icons", to: "/icons" },
    { from: "../favicon", to: "/favicon" },
    { from: "../loading", to: "/loading" },
    { from: "../social", to: "/social" },
    { from: "../brand", to: "/brand" },
    { from: "../png", to: "/png" },
    { from: "../fonts", to: "/fonts" },
    { from: "../alternates", to: "/alternates" },
  ],
};

export default config;
