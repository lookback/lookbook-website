const { defaultPostCssPlugins } = require('@lookback/lookbook');
const postcssCustomMedia = require('postcss-custom-media');
const minify = require('cssnano');

module.exports = (ctx) => ({
    map: ctx.options.map, // Sourcemaps
    plugins: [
        ...defaultPostCssPlugins(),
        postcssCustomMedia({
            preserve: true,
        }),
        ctx.env === 'production'
            ? minify({
                  preset: 'default',
              })
            : null,
    ],
});
