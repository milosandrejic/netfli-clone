import React from "react";

import {
    Typography
} from "./index";

export default {
    title: "Widgets/Typography",
    component: Typography,
    argTypes: {
        variant: {
          options: ["light", "medium", "bold"],
          control: { type: "radio" },
        },
      },
};


export const Example = (args) =>
    <Typography {...args}>
        This is extra light example text with line height 30
    </Typography>
