---
title: "Publishing to JSR using release-please"
teaser: "With a little work, you can use release-please and GitHub Actions to publish to JSR."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - TypeScript
  - npm
  - JSR
---

There is no JSR-specific release strategy for [release-please](https://github.com/google-github-actions/release-please-action), so you'll need to use the `"node"` strategy and include a `package.json` file in your root. Then, you'll need to tell release-please to update your `jsr.json` file version (in addition to the `package.json` file) when a new release is created. To do so, update your `release-please-config.json` file to use `extra-files`, like this:

```json
{
  "packages": {
    ".": {
      "release-type": "node",
      "extra-files": [
        {
          "type": "json",
          "path": "jsr.json",
          "jsonpath": "$.version"
        }
      ]
    }
  }
}
```

The `"path"` should be to the location of your `jsr.json` file. The `"jsonpath"` specifies the location of the field with a version number to update.

Then, you can publish to JSR using a GitHub action. Assuming you want to publish to both npm and JSR, it's easiest to use the `jsr` npm module, like this:

```yaml
on:
  push:
    branches:
      - main
name: release-please

permissions:
  contents: write
  pull-requests: write
  id-token: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: GoogleCloudPlatform/release-please-action@v4
        id: release
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
  
      - uses: actions/checkout@v4
        if: ${{ steps.release.outputs.release_created }}

      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
          registry-url: 'https://registry.npmjs.org'
        if: ${{ steps.release.outputs.release_created }}

      - run: npm ci
        if: ${{ steps.release.outputs.release_created }}

      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
        if: ${{ steps.release.outputs.release_created }}

      - name: Publish to JSR
        run: |
          npm run build --if-present
          npx jsr publish
        if: ${{ steps.release.outputs.release_created }}
```

Keep in mind that `jsr publish` does not run any scripts beforehand, so if you want to run something like `npm run build`, you'll need to explicitly specify it as part of your `run` command.
