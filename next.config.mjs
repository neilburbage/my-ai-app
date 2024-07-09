import 'dotenv/config';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  webpack(config, options) {
    return config;
  },
  postcssLoaderOptions: {
    ident: 'postcss',
    plugins: [
      tailwindcss,
      autoprefixer,
    ],
  },
};

export default nextConfig;
