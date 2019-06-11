---
layout: layout.njk
---

<section>

# Tips & Tricks

## Use the VS Code extension

There's a super cool VS Code extension for Tailwind, which supports class name suggestions, CSS previews, `@apply` suggestions, and syntax highlighting in `.css` files.

<a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss" class="btn btn-secondary" title="VS Code marketplace">Get it here</a>

## Remove unused CSS

The main criticism against Tailwind or CSS utility frameworks is the amount of CSS code ending up unused. You might generate 1000 classes but only use 10 of them. In Lookbook's case, the main distributable file on the CDN (see ["Using the CSS"]({{ "/tech/css" | url }})) is heavily cached, so users would only download it once. But if you embed the Lookbook in another project's CSS, you might wanna _purge_ the unused CSS classes before pushing to production.

Tailwind has a great section on this, in the page ["Controlling file size"](https://tailwindcss.com/docs/controlling-file-size#removing-unused-css).

The tool used in Tailwind's docs is [PurgeCSS](https://www.purgecss.com).

PurgeCSS can be used in a PostCSS pipeline like this:

```js
// Example extractor which looks through Handlebars templates on the server
// and Typescript JSX React files on the client.
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/frontend/**/*.tsx', './src/backend/views/**/*.hbs'],
  extractors: [
    {
      extractor: class {
        static extract(content) {
          return content.match(/[A-Za-z0-9-_:/]+/g) || [];
        }
      },

      extensions: ['html', 'hbs', 'tsx'],
    },
  ],
});

postcss([
  ...require('lookbook').defaultPostCssPlugins(),
  ...(isDevelopment() ? [] : [purgecss]), // Remove unused CSS in prod
]);
```

</section>
