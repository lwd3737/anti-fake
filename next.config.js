/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'cheerio',
      'googleapis',
      'yt-dlp-wrap',
      'ffmpeg-static',
    ],
    outputFileTracingIncludes: {
      '/api/**': ['./bin/yt-dlp', './bin/ffmpeg'],
    },
    // instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       punycode: false,
  //     };
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;
