// The blog posts and their cover images come from the PFEC blog CMS (see src/lib/blogs.js)
const blogCmsUrl = new URL(process.env.BLOG_CMS_URL || "https://countrycms.pfecglobal.com");
// The home page content and its uploaded images come from the Enhance English admin (see src/lib/api.js)
const apiUrl = new URL(process.env.API_URL || "http://localhost:8010");
// During development the admin runs on this computer; its image addresses may use either name for it
const localHosts = ["localhost", "127.0.0.1"];
const apiIsLocal = localHosts.includes(apiUrl.hostname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets the blog CMS show a post inside its "preview" panel (see isBlogPreview in src/lib/blogs.js)
  async headers() {
    return [
      {
        source: "/blogs/:slug",
        headers: [{ key: "Content-Security-Policy", value: `frame-ancestors 'self' ${blogCmsUrl.origin}` }],
      },
    ];
  },
  images: {
    // Fill the large 384px → 640px default gap so card-sized images can use a
    // source close to their rendered width instead of jumping to 640px.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480, 560],
    qualities: [60, 65, 75],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: blogCmsUrl.protocol.replace(":", ""),
        hostname: blogCmsUrl.hostname,
        port: blogCmsUrl.port,
        pathname: "/**",
      },
      ...(apiIsLocal ? localHosts : [apiUrl.hostname]).map((hostname) => ({
        protocol: apiUrl.protocol.replace(":", ""),
        hostname,
        port: apiUrl.port,
        pathname: "/storage/**",
      })),
    ],
    // Next.js refuses images from local addresses; the admin runs on one during development
    dangerouslyAllowLocalIP: apiIsLocal,
  },
};

export default nextConfig;
