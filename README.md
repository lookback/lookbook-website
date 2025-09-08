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

```bash
./script/deploy.sh
```

This script will:

1. Switch (or create) a local `gh-pages` branch.
2. Install deps and build site.
3. Force push to remote.
4. Switch back to current branch.

The reason for building locally is that we're using private npm registries, which I can't be bothered setting up on GitHub at the moment.
