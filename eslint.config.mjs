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
    ignores: ["src/scripts/config/service-worker.js","src/scripts/config/workbox-*.js"],
  },
];