---
layout: layout.njk
---

<section>
  
# Using the CSS

Using the Lookbook CSS depends on what your needs are. There are mainly three use cases:

1. You need the basic Lookbook base styling and helpers in a big ol' CSS file.
2. You'd like to use the Lookbook's config variables in your custom stylesheet.
3. Both of 1) and 2).

In this section, we'll treat the first case. For the custom use case, see ["Building Custom CSS"](/tech/custom-build).

## Linking to the CSS

This is probably the most straight-forward method.

Add a `link` element to a `head` tag:

```html
<link
  rel="stylesheet"
  href="{{env.cdnPath}}/{{pkg.version}}/lookbook.dist.css"
/>
```

A few things to note:

- This CSS file is cached with `immutable, max-age: 31536000` (one year). That means, you can assume it's content won't _ever_ change.
- Put this above your custom CSS. Otherwise, the styles in the Lookback will override your own.

---

<!--  *TODO:* Document caching strategy for `latest`. -->

If you want to be on the bleeding edge, use `latest` as version:

```html
<link rel="stylesheet" href="{{env.cdnPath}}/latest/lookbook.dist.css" />
```

This one is always the latest version. It's not cached as hard as the versioned stylesheets above. Keep in mind that minor things might change under your feet in this stylesheet.
