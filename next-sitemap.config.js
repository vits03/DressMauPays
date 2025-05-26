/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dressmaupays.com", // ✅ Replace with your actual domain
  generateRobotsTxt: true, // ✅ Also generate robots.txt
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true, // For multi-sitemaps
};
