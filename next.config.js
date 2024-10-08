/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "yazasnkrz.ams3.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
