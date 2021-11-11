const tools = require("11ty-tools");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(tools);
  eleventyConfig.addPassthroughCopy({ static: "/" });
  eleventyConfig.addWatchTarget("./assets");

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "out",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
  };
};
