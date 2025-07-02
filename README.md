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
$ npm link ../lookbook
```

In another shell:

```bash
cd lookbook && npm start
```

Now changes made in `lookbook/src` will be reflected immediately when reloading the Lookbook website window.

## Deploy

Just git push to `main` and a [GitHub Action](https://github.com/lookback/lookbook-website/actions) will trigger and deploy the site from the `gh-pages` branch.
