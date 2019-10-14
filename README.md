# Lookbook website

This repo is for documenting and showcasing the [Lookbook](https://github.com/lookback/lookbook).

## Develop

```bash
$ npm install
$ npm start
```

Visit site at `localhost:8080`. The site will rebuild on changes.

### Testing local changes with Lookbook

If you'd like to test local changes in the Lookbook in the website:

```bash
$ npm link ../lookbook # or whatever path to your local Lookbook folder
```

## Deploy

Just git push to `master` and a [GitHub Action](https://github.com/lookback/lookbook-website/actions) will trigger and deploy the site from the `gh-pages` branch.
