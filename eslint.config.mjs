import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config for ESLint 9. `next lint` no longer exists in Next 16, so the
 * `lint` script runs ESLint directly with the same Next presets.
 */
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".claude/**", "legacy/**", "out/**", "public/**", ".next/**", "node_modules/**", "next-env.d.ts"],
  },
  {
    // Static export with images.unoptimized — plain <img> is the intended path.
    rules: { "@next/next/no-img-element": "off" },
  },
  {
    // Vendored ThreeUI source — kept byte-exact and hash-verified, so it is
    // not reformatted or re-linted here.
    files: ["components/threeui/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/refs": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
