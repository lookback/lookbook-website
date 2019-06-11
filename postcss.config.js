const { defaultPostCssPlugins } = require('lookbook');
const postcssCustomMedia = require('postcss-custom-media');

module.exports = (ctx) => ({
    map: ctx.options.map, // Sourcemaps
    plugins: [
        ...defaultPostCssPlugins(),
        postcssCustomMedia({
            preserve: true,
        }),
        // TODO Minify
    ],
});
