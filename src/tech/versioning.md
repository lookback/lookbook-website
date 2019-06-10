---
layout: layout.njk
---

<section>

# Versioning

We want to do updates to the Lookbook CSS in a sane manner, and reduce breakage in web apps using it. That means:

- For each change, we _must_ bump the version and you need to refer to the new version in your `link` tag if you want to use those changes.
- We won't ever break anything without bumping the MAJOR version. E.g. going from `1.0.0 -> 2.0.0`.
- New features or additions will bump the MINOR version. E.g. going from `1.0.0 -> 1.1.0`.
- Fixes and adjustments will bump the PATCH version. E.g. going from `1.0.0 -> 1.0.1`.

How does this work in real life CSS world?

- Changes to colour variables will bump the PATCH version. _UNLESS_ it's a major change of the colour(s).
- Changes to styles to things like forms will bump the PATCH version.
- New components or added styling of HTML elements will bump the MINOR version.
- Major changes to colours, typography, components, or other default styling of elements will bump the MAJOR version.

We realise that it's a bit blurry what really is a _"major"_ change in CSS world, but hopefully we can agree on a common thinking for this.

</section>
