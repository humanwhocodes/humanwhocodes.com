---
title: "Passing GitHub Actions workflow step output to JavaScript"
teaser: "When you want your JavaScript code to access all of the data from a previous GitHub Actions workflow step."
author: Nicholas C. Zakas
categories:
  - Programming
tags:
  - JavaScript
  - GitHub
  - GitHub Actions
  - Environment Variables
---

GitHub Actions workflows allow each step to create output that is available in other steps, such as:

```yaml
name: Test Steps Output
on: workflow_dispatch
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - id: release
        run: |
          echo "release_created=true" >> "$GITHUB_OUTPUT"
          echo "project_name=MyProject" >> "$GITHUB_OUTPUT"

      - run: echo ${{ steps.release.outputs.release_created }}
```

This outputs the `release_created` value from the `release` step in the next step. You can pass this individually into a JavaScript file by creating environment variables:

```yaml
name: Test Steps Output
on: workflow_dispatch
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4

      - id: release
        run: |
          echo "release_created=true" >> "$GITHUB_OUTPUT"
          echo "project_name=MyProject" >> "$GITHUB_OUTPUT"

      - run: node extract.mjs
        env:
          RELEASE_CREATED: ${{ steps.release.outputs.release_created }}
          PROJECT_NAME: ${{ steps.release.outputs.project_name }}
```

However, that can get unwieldy if there are more than a few step outputs, and especially if you're unsure exactly which outputs will be created. 

Instead, you can use the `toJSON()` helper to serialize all of the step outputs into a JSON object and create one environment variable to capture it:

```yaml
name: Test Steps Output
on: workflow_dispatch
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repo
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4

      - id: release
        run: |
          echo "release_created=true" >> "$GITHUB_OUTPUT"
          echo "project_name=MyProject" >> "$GITHUB_OUTPUT"

      - run: node extract.mjs
        env:
          RELEASE_OUTPUTS: ${{ toJSON(steps.release.outputs) }}
```

Now, inside of `extract.mjs`, you can use retrieve all of the data from the `release` step by parsing the `RELEASE_OUTPUTS` environment variable:

```js
const releaseOutputs = JSON.parse(process.env.RELEASE_OUTPUTS || "{}");

console.log(releaseOutputs.released_created);   // true
console.log(releaseOutputs.project_name);   // MyProject
```

This makes it a lot easier to create JavaScript files to work in your GitHub Actions workflow.
