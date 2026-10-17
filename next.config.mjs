// The blog posts and their cover images come from the PFEC blog CMS (see src/lib/blogs.js)
const blogCmsUrl = new URL(process.env.BLOG_CMS_URL || "https://countrycms.pfecglobal.com");

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
    remotePatterns: [
      {
        protocol: blogCmsUrl.protocol.replace(":", ""),
        hostname: blogCmsUrl.hostname,
        port: blogCmsUrl.port,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
