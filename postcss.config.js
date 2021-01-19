const { defaultPostCssPlugins } = require('@lookback/lookbook');
const postcssCustomMedia = require('postcss-custom-media');
const minify = require('postcss-csso');

module.exports = (ctx) => ({
    map: ctx.options.map, // Sourcemaps
    plugins: [
        ...defaultPostCssPlugins(),
        postcssCustomMedia({
            preserve: true,
        }),
        ctx.env === 'production' ? minify : null,
    ],
});
