const Image = require("@11ty/eleventy-img");
const assets = require("./out/_proc/assets-manifest.json");
const fs = require('fs');

// usage: {% image './src/images/cat.jpg', 'photo of my cat' %}
async function imageShortcode(src, alt = undefined, sizes = "100vw") {
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"],
    outputDir: "./out/_proc/img/",
    urlPath: "/_proc/img/",
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(", ")}" sizes="${sizes}">`;
      })
      .join("\n")}
      <img
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

async function assetPathShortcode(name) {
  return `/_proc/${assets[name]}`;
}

async function inlineAssetShortcode(name) {
  const output = fs.readFileSync(`./out/_proc/${assets[name]}`).toString();
  console.log(output);
  return output;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" });
  eleventyConfig.addWatchTarget("./assets");

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addHandlebarsShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("asset", assetPathShortcode);
  eleventyConfig.addLiquidShortcode("asset", assetPathShortcode);
  eleventyConfig.addHandlebarsShortcode("asset", assetPathShortcode);
  eleventyConfig.addJavaScriptFunction("asset", assetPathShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("inlineasset", inlineAssetShortcode);
  eleventyConfig.addLiquidShortcode("inlineasset", inlineAssetShortcode);
  eleventyConfig.addHandlebarsShortcode("inlineasset", inlineAssetShortcode);
  eleventyConfig.addJavaScriptFunction("inlineasset", inlineAssetShortcode);

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
