const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const FORMATS = ['md', 'html', 'njk'];

const yearFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

module.exports = (conf) => {
    conf.addPassthroughCopy('src/assets');

    conf.addFilter('formatDate', (date) => {
        const d = Number(date);

        if (isNaN(d)) {
            throw new Error(`${date} is not a proper date`);
        }

        return yearFormatter.format(date);
    });

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
