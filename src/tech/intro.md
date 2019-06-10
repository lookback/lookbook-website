---
layout: layout.njk
---

<section>

# Introduction

Welcome to the tech section of the Lookbook! In here, we go through some must-know things when working with the Lookbook.

_tldr;_ please read the Tailwind docs before getting started with the Lookbook CSS:

<a href="https://tailwindcss.com/docs/utility-first" class="btn text-f4">Tailwind docs →</a>

## Functional CSS

The Lookbook uses a style of CSS coding nicknamed "Functional CSS". The "Functional" part in it comes from Functional Programming (FP), where the focus is _composability and immutability_.

Please read [_"Functional CSS"_](https://jon.gold/2015/07/functional-css/) by Jon Gold for a short primer on the terminology.

What problem does functional CSS solve? Anybody who's been working with CSS at scale during the last decade is aware of the burden involved in maintaining a large CSS codebase. A codebase that might need to scale across several services, include multiple authors, be used in various environments and devices.

Please read [_"CSS and Scalability"_](http://mrmrs.cc/writing/2016/03/24/scalable-css/) by Adam Morse for an ideologic essay about these subjects.

## Tailwind

You might see references to "Tailwind" throughout the Lookbook. [Tailwind](https://tailwindcss.com) is a "utility-first CSS framework for rapidly building custom designs". It builds on the principles of functional CSS, and lets us generate functional CSS based on a configuration file.

This is incredibly powerful. Tailwind will generate a bunch of utility classes – super small and composable – based on config values we feed to it. Those config values are managed in a Javascript file. The deliverable is a drop-in `lookbook.css` file which includes everything needed for a great web frontend foundation in a Lookback product.

**If you're gonna work directly with the Lookbook CSS, please read the Tailwind docs!** We won't cover the nitty gritty of the utility classes on this site.

<a href="https://tailwindcss.com/docs/utility-first" class="btn text-f4">Tailwind docs →</a>

## On this site

This site includes two things:

1. Guidelines and demos of Lookback's current UI language
2. Tech specs and docs on how to work with the UI language in web code

</section>
