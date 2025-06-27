/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const { loadEnvConfig } = require('@next/env');

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
