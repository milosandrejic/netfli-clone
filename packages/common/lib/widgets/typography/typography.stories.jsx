import React from "react";

import {
    Typography
} from "./index";

export default {
    title: "Typography",
    component: Typography,
    argTypes: {
        variant: {
          options: ["extraLight", "light", "semiBold", "bold"],
          control: { type: "radio" },
        },
      },
};


export const Variants = (args) =>
    <Typography {...args}>
        This is extra light example text with line height 30
    </Typography>
