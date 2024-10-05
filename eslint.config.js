import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  {
    plugins: {
      "@tanstack/query": pluginQuery,
    },
    rules: {
      "@tanstack/query/exhaustive-deps": "error",
    },
    extends: ["next/core-web-vitals", "next/typescript"],
  },
  // Any other config...
];
