// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./src/server/env');
const removeImports = require('next-remove-imports')();

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 *
 *
 * See also: removeImports()
 * https://github.com/vercel/next.js/blob/deprecated-main/errors/css-npm.md
 *
 */
module.exports = removeImports(
  getConfig({
    /**
     * Dynamic configuration available for the browser and server.
     * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
     * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
     */
    publicRuntimeConfig: {
      NODE_ENV: env.NODE_ENV,
    },
    // Docker config requires standalone build
    output: 'standalone',
    images: {
      domains: ['https://lh3.googleusercontent.com'],
    },
  }),
);
