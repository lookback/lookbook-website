const { defaultPostCssPlugins } = require('lookbook');

module.exports = (ctx) => ({
    map: ctx.options.map, // Sourcemaps
    plugins: [
        ...defaultPostCssPlugins(),
        // TODO Minify
    ],
});
