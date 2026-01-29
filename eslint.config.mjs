import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,

  // 👇 Yahan humne rules ko disable kiya hai
  {
    rules: {
      "react/no-unescaped-entities": "off", // ' use karne par error nahi aayega
      "@next/next/no-img-element": "off",   // <img> tag use karne par warning nahi aayegi
      "react-hooks/exhaustive-deps": "off", // useEffect dependency warning hat jayegi
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;