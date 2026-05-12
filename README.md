# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Algolia DocSearch

Set these environment variables in your deploy environment to enable documentation search:

- `ALGOLIA_APP_ID`
- `ALGOLIA_API_KEY` (search-only key)
- `ALGOLIA_INDEX_NAME`

When configured, Docusaurus shows the DocSearch modal from the navbar and supports keyboard shortcuts like `Cmd+K` / `Ctrl+K`, with relevance-ranked results from your Algolia index.

To keep results fresh, configure your Algolia crawler to reindex on each deploy (for example, by connecting your hosting provider deploy webhook to Algolia crawl triggers).

## Last-Updated Timestamps

`showLastUpdateTime: true` is enabled on the docs preset. Docusaurus reads each file's most recent git commit timestamp at build time and renders it as "Last updated on …" at the bottom of every doc page.

**Vercel deploy note:** the default Vercel shallow clone (`--depth=1`) silently breaks `git log`-based timestamps — every page renders the current build date. To fix:

- In the Vercel project settings → **Git** → set **Clone Depth** to **Unlimited** (or 0), OR
- Add `git fetch --unshallow || true` as the first line of the Vercel Install Command.

Without this, the "Last updated" stamp will show every page as updated on every deploy.
