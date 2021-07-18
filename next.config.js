module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/collection/:path*",
        destination: "/collection", // The :path parameter isn't used here so will be automatically passed in the query
      },
      {
        source: "/tag/:path*",
        destination: "/tag", // The :path parameter isn't used here so will be automatically passed in the query
      },
    ];
  },
};
