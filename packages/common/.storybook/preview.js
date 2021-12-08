import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";

import {
  storybookTheme
} from "./storybookTheme";

export const getAllThemes = () => {
  return [storybookTheme];
};

addDecorator(withThemesProvider(getAllThemes(), ThemeProvider));