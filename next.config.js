/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})
// PWA ISSUES WITH LOCAL STORAGE TO SOLVE!!!

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    return config;
  },
};

// module.exports = nextConfig;
module.exports = withPWA(nextConfig);
