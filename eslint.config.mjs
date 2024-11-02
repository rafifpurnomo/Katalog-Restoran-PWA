import globals from "globals";
import pluginJs from "@eslint/js";
import daStyle from 'eslint-config-dicodingacademy';

export default [
  daStyle,
  
  {
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
    rules: {
      semi: ["error", "always"], 
      "no-undef": "error",     
    },
  },

  {
    files: ["src/scripts/config/service-worker.js", "src/scripts/config/workbox-*.js"],
    languageOptions: {
      globals: {
        importScripts: "readonly",
        define: "readonly",
        registration: "readonly",
        FetchEvent: "readonly",
      },
    },
  },
  {
    ignores: ["src/scripts/config/workbox-*.js"],
  },
];
