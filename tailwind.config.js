import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
    "./resources/js/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [forms, require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],

          primary: "#4ade80",

          secondary: "#06b6d4",

          accent: "#fb923c",

          neutral: "#111827",

          "base-100": "#1f2937",

          info: "#76d3ff",

          success: "#bef264",

          warning: "#fbbf24",

          error: "#ef4444",
        },
      },

      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],

          primary: "#a3e635",

          secondary: "#06b6d4",

          accent: "#fb923c",

          neutral: "#93c5fd",

          "base-100": "#f3f4f6",

          info: "#76d3ff",

          success: "#bef264",

          warning: "#fbbf24",

          error: "#ef4444",
        },
      },
    ],

    styled: true,
    // themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
