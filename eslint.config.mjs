// @ts-nocheck
import withNuxt from "./.nuxt/eslint.config.mjs";
import tailwindcss from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettierConfig from "eslint-config-prettier";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const tailwindEslintConfigPath = path.join(
  projectRoot,
  "tailwind.eslint.config.cjs",
);

export default withNuxt(
  // Tailwind suggestions (warn + quick-fix)
  {
    name: "tailwindcss/suggestions",
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        config: tailwindEslintConfigPath,
      },
    },
    rules: {
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
    },
  },
  // Disable ESLint rules that conflict with Prettier
  prettierConfig,
);
