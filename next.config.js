/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true
  // },
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/blog': { page: '/blog' },
      '/about': { page: '/about' },
      '/projects': { page: '/projects' },
      '/contact': { page: '/contact' }
    };

    // Get your blog posts data
    const { getSortedPostsData } = require('./lib/posts');
    const posts = getSortedPostsData();
    
    // Add blog post paths
    posts.forEach((post) => {
      paths[`/blog/${post.id}`] = {
        page: '/blog/[id]',
        query: { id: post.id }
      };
    });

    return paths;
  },
  output: 'export'
}

module.exports = nextConfig 