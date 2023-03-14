/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: true,
  },
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
  },
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: `http://101.101.218.154:81/api/v1/login/oauth`
      },
      {
        source: "/api/refresh",
        destination: `http://101.101.218.154:81/api/v1/login/refresh`
      },
      {
        source: "/api/sttSubtitleStorage",
        destination: `http://101.101.218.154:81/api/v1/content/`
      },
      {
        source: "/api/sttSubtitleDetail",
        destination: `http://101.101.218.154:81/api/v1/content/detail/`
      },      
      {
        source: "/api/sttSubtitleDownload",
        destination: `http://101.101.218.154:81/api/v1/subtitle/download/`
      }, 
      {
        source: "/api/ocr",
        destination: `https://backup.maisco.kr/api/v1/searchs/image_search_url/`
      },
      {
        source: "/api/sttSubtitleUpdate",
        destination: `http://101.101.218.154:81/api/v1/subtitle/`
      },
      {
        source: "/api/ttsAiVoice",
        destination: `http://133.186.251.227:8000/api/v1/tts/prediction/`
      },
      {
        source: "/api/aiSearch",
        destination: `http://101.101.218.154:81/api/v1/content/search/`
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.megastudy.net',
      },
    ],
  },

  reactStrictMode: false,


}

module.exports = nextConfig