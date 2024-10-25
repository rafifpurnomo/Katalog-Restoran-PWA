import globals from "globals";
import pluginJs from "@eslint/js";

export default [

  {
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
    rules: {
      semi: ["error", "always"], // Tambahkan aturan semi-colon (opsional)
      "no-console": "warn",      // Peringatan untuk console.log (opsional)
      "no-undef": "error",       // Error jika ada variabel yang tidak didefinisikan
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
