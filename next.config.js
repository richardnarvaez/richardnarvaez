const { withContentlayer } = require("next-contentlayer")
// const withMDX = require("@next/mdx")()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      { protocol: "https", hostname: "asset.brandfetch.io" },
    ],
  },
}

module.exports = withContentlayer(nextConfig)
