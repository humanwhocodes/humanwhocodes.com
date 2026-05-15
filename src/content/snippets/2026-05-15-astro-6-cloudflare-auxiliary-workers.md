---
title: "Wiring auxiliary Cloudflare workers into an Astro 6 application"
teaser: "Astro 6's Cloudflare integration lets your run additional workers alongside your application, but there are some gotchas."
author: Nicholas C. Zakas
image: /images/posts/2026/astro-6-cloudflare.png
categories:
  - Programming
tags:
  - Astro
  - Cloudflare
---

[Astro](https://astro.build) has been my go-to web application framework for a while now and I've been happy deploying it to [Cloudflare](https://cloudflare.com). However, when an Astro application depends on other Cloudflare workers, it was a pain to get a local environment set up to test everything end-to-end. Astro 6 changes that by running directly within `workerd` locally, allowing it to share the same session with other Cloudflare workers.

To add workers that your Astro application depends on, use the [`auxiliaryWorkers`](https://developers.cloudflare.com/workers/vite-plugin/reference/api/#interface-auxiliaryworkerconfig) key:


```js
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({
    auxiliaryWorkers: [
      {
        configPath: "../workers/mailer/wrangler.jsonc",
      }
    ],
    configPath: "wrangler.jsonc",
  })
});
```

The `configPath` of each `auxiliaryWorkers` entry specifies the `wrangler.jsonc` file for the worker that should be loaded along with the Astro application.

**Important:** You must still create a binding in Astro's `wrangler.jsonc` to actually use the auxiliary worker in the Astro application. Adding it `astro.config.mjs` just ensures that the worker is started when the application is started.

## Gotcha: `nodejs_compat` and workers

If you follow the setup documentation for Astro on Cloudflare, you'll have added the `nodejs_compat` flag to your `wrangler.jsonc` file, like this:

```jsonc
{
  "compatibility_flags": [
    "nodejs_compat"
  ],
}
```

For some reason, if you then specify an auxiliary worker that does not have `nodejs_compat`, this causes an error. To work around this, you can either add `nodejs_compat` to each worker's `wrangler.jsonc` file, or you can add it dynamically in your `astro.config.mjs` file using the `config` key:

```js
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({
    auxiliaryWorkers: [
      {
        configPath: "../workers/mailer/wrangler.jsonc",
        config: {
          compatibility_flags: ["nodejs_compat"]
        }
      }
    ],
    configPath: "wrangler.jsonc",
  })
});
```

## Gotcha: Astro Preact and React workers

If Astro is using Preact and you have one or more workers using React, it's possible that the Preact compatibility will break the worker as the Vite config prefers to use that over the worker's own React package. 

To avoid this, exclude the worker directory from the Astro Preact configuration:

```js
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact({
    exclude: ["../workers/**/*"]
  })],
})
```

## Gotcha: Building with auxiliary workers

If you just add the `auxiliaryWorkers` key to your config, Astro will then build all of those workers when you run `npx astro build`, which is probably not what you want. To ensure that doesn't happen, only add `auxiliaryWorkers` when you're not in dev mode:

```js
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const isAstroDev = process.argv.includes('dev');

export default defineConfig({
  adapter: cloudflare({
    auxiliaryWorkers: isAstroDev ? [
      {
        configPath: "../workers/mailer/wrangler.jsonc",
        config: {
          compatibility_flags: ["nodejs_compat"]
        }
      }
    ] : [],
    configPath: "wrangler.jsonc",
  })
});
```
