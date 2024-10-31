import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: { ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "semi": ["warn", "always"],
      "arrow-body-style": ["error", "as-needed"],
    }
  }
];