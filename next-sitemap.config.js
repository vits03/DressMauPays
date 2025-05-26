/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dressmaupays.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  exclude: ["/admin*", "/admin/**"], // ✅ Exclude all admin routes
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: ["/admin"] },
    ],
  },
};
