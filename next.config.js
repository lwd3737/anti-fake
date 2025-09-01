/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'cheerio',
      'googleapis',
      'yt-dlp-wrap',
      // ffmpeg-static resolves to a platform binary at runtime; avoid bundling bin copy
    ],
    outputFileTracingIncludes: {
      '/api/**': ['./bin/yt-dlp'],
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
