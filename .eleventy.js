const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const FORMATS = ['md', 'html', 'njk'];

module.exports = (conf) => {
    conf.addPassthroughCopy('src/assets');

    conf.addPlugin(inclusiveLangPlugin, {
        templateFormats: FORMATS,
    });
    conf.addPlugin(syntaxHighlight);

    return {
        templateFormats: FORMATS,
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'docs',
        },
    };
};
