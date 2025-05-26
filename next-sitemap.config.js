/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dressmaupays.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  exclude: ["/admin"], // ⛔ Exclude this route from sitemap
};

