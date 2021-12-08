module.exports = {
  "stories": [
    "../lib/widgets/**/*.stories.mdx",
    "../lib/widgets/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-styled-component-theme/dist/preset"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}