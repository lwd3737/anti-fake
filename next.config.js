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
      '/api/factcheck-sessions/[factCheckSessionId]/claims': [
        './bin/yt-dlp',
        'node_modules/ffmpeg-static/**',
      ],
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
