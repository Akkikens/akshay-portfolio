/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the site deploys as plain files (Vercel static + any host).
  output: "export",
  // folder/index.html output so deep links resolve on dumb static hosts too.
  trailingSlash: true,
  images: {
    // No image optimizer under static export.
    unoptimized: true,
  },
};

module.exports = nextConfig;
