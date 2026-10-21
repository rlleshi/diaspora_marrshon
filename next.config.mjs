/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // app/global-not-found.tsx: the site has two root layouts, one per language.
  experimental: { globalNotFound: true },
};

export default nextConfig;
