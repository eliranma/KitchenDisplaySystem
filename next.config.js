/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
